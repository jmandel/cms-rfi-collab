import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';
// @ts-ignore
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

interface PointFrontmatter {
    rfi_question_code: string;
    short_title: string;
    summary: string;
    categories: string[];
    rfi_question_text?: string;
}

interface RfiPoint extends Omit<PointFrontmatter, 'referenced_principles'> {
    id: string;
    referenced_principles: string[];
    markdown_content: string;
    source_filename: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Regex to find Markdown links like [any text](#CAPTURE_THIS_KEY)
const genericLinkRegex = /\B\[[^\]]+\]\(#([\w_]+)\)/g; // Using \B to avoid matching if part of a word character, e.g. foo[bar](#baz)

// Helper function to get all valid CC_KEYs from the source markdown
async function getKnownCrossCuttingPrincipleKeys(): Promise<Set<string>> {
    const ccFilePath = path.join(__dirname, '..', 'cross_cutting_principles.md');
    const knownKeys = new Set<string>();
    try {
        const fileContent = await fs.readFile(ccFilePath, 'utf-8');
        const sections = fileContent.split(/\n---\n/);
        const keyRegex = /### \d+\. ([\w_]+) —/;
        for (const section of sections) {
            const match = section.trim().match(keyRegex);
            if (match && match[1]) {
                knownKeys.add(match[1].trim());
            }
        }
    } catch (error) {
        console.warn(`Warning: Could not read or parse cross_cutting_principles.md to get known principle keys. Link detection might be less accurate.`, error);
    }
    return knownKeys;
}

async function buildRfiPointsJson() {
    const knownPrincipleKeys = await getKnownCrossCuttingPrincipleKeys();
    if (knownPrincipleKeys.size === 0) {
        console.warn("Warning: No cross-cutting principle keys were loaded. No principles will be linked.");
    }

    const pointsDir = path.join(__dirname, '..', 'rfi_answers_consolidated');
    const markdownFiles = await glob(`${pointsDir}/**/*.md`);
    const allPoints: RfiPoint[] = [];

    for (const filePath of markdownFiles) {
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const rawMatter = matter(fileContent);
            const frontmatterData = rawMatter.data as Omit<PointFrontmatter, 'referenced_principles'>;
            const markdown_content = rawMatter.content;
            const source_filename = path.basename(filePath);

            if (!frontmatterData.rfi_question_code || !frontmatterData.short_title || !frontmatterData.summary || !frontmatterData.categories || !Array.isArray(frontmatterData.categories)) {
                console.warn(`Skipping file with missing/invalid required frontmatter (rfi_question_code, short_title, summary, categories): ${source_filename}`);
                continue;
            }

            const foundPrinciples = new Set<string>();
            let match;
            // Reset regex state for each file content check
            genericLinkRegex.lastIndex = 0; 
            while ((match = genericLinkRegex.exec(markdown_content)) !== null) {
                if (match[1] && knownPrincipleKeys.has(match[1])) {
                    foundPrinciples.add(match[1]);
                }
            }
            const referenced_principles = Array.from(foundPrinciples).sort();

            const validatedFrontmatter = frontmatterData as Omit<PointFrontmatter, 'referenced_principles'>;

            allPoints.push({
                ...validatedFrontmatter,
                id: validatedFrontmatter.rfi_question_code,
                referenced_principles: referenced_principles,
                markdown_content: markdown_content.trim(),
                source_filename: source_filename,
            });
        } catch (error) {
            console.error(`Error processing file ${path.basename(filePath)}:`, error);
        }
    }

    allPoints.sort((a, b) => {
        return a.id.localeCompare(b.id);
    });
    
    process.stdout.write(JSON.stringify(allPoints, null, 2));
}

buildRfiPointsJson().catch(console.error);

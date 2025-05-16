import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';
// @ts-ignore
import matter from 'gray-matter';

interface PointFrontmatter {
    id: string;
    rfi_question_code: string;
    point_key: string;
    short_title: string;
    summary: string;
    categories: string[];
    rfi_question_text?: string;
}

interface RfiPoint extends PointFrontmatter {
    markdown_content: string;
}

async function buildRfiPointsJson() {
    const pointsDir = path.join(import.meta.dir, '..', 'rfi_points_markdown');
    const markdownFiles = await glob(`${pointsDir}/**/*.md`);
    const allPoints: RfiPoint[] = [];

    for (const filePath of markdownFiles) {
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const { data, content: markdown_content } = matter(fileContent) as { data: PointFrontmatter, content: string };

            if (!data.id || !data.rfi_question_code || !data.point_key || !data.short_title || !data.summary || !data.categories || !Array.isArray(data.categories)) {
                console.warn(`Skipping file with missing/invalid required frontmatter: ${path.basename(filePath)}`);
                continue;
            }

            allPoints.push({
                ...data,
                markdown_content: markdown_content.trim(),
            });
        } catch (error) {
            console.error(`Error processing file ${path.basename(filePath)}:`, error);
        }
    }

    allPoints.sort((a, b) => {
        const rfiCompare = a.rfi_question_code.localeCompare(b.rfi_question_code);
        if (rfiCompare !== 0) return rfiCompare;
        const pointKeyCompare = a.point_key.localeCompare(b.point_key);
        if (pointKeyCompare !== 0) return pointKeyCompare;
        return a.id.localeCompare(b.id);
    });
    
    process.stdout.write(JSON.stringify(allPoints, null, 2));
}

buildRfiPointsJson().catch(console.error);

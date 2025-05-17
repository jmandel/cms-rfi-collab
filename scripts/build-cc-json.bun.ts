import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url'; // Added for compatibility

interface CrossCuttingPrinciple {
    key: string;
    title: string;
    problem: string;
    capability: string;
    // Optional: referenced_in_rfi_questions?: string[]; // To be populated later if needed
}

// Helper to get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildCrossCuttingPrinciplesJson() {
    const ccFilePath = path.join(__dirname, '..', 'cross_cutting_principles.md');
    const principles: CrossCuttingPrinciple[] = [];

    try {
        const fileContent = await fs.readFile(ccFilePath, 'utf-8');
        const sections = fileContent.split(/\n---\n/); // Split by the "---" separator

        const principleRegex = /### \d+\. ([\w_]+) — (.+?)\n\n\*\*Problem:\*\*([\s\S]+?)\n\n\*\*Capability:\*\*([\s\S]+)/;

        for (const section of sections) {
            const match = section.trim().match(principleRegex);
            if (match) {
                const key = match[1].trim();
                const title = match[2].trim();
                const problem = match[3].trim();
                const capability = match[4].trim();
                principles.push({ key, title, problem, capability });
            }
        }

    } catch (error) {
        console.error(`Error processing file ${ccFilePath}:`, error);
        process.exit(1); // Exit with error
    }

    // Sort alphabetically by key for consistent output
    principles.sort((a, b) => a.key.localeCompare(b.key));
    
    process.stdout.write(JSON.stringify(principles, null, 2));
}

buildCrossCuttingPrinciplesJson().catch(error => {
    console.error(error);
    process.exit(1);
}); 
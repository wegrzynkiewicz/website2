import {resolve} from 'path';

export async function createFileProcessor(container) {
    return {
        async processFile(filePath) {
            const relativePath = resolve(filePath);
            const module = await import(relativePath);
            const pageCallback = module.default;
            await pageCallback(container);
        }
    }
}

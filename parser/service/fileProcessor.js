import {readFile} from "../helpers/files";
import {parseAllDocuments} from "yaml";

export async function createFileProcessor(container) {
    const documentProcessor = container.get('documentProcessor');

    return {
        async processFile(filePath) {
            const fileContent = await readFile(filePath);
            const documents = parseAllDocuments(fileContent.toString());
            const promises = documents.map(async (document) => {
                await documentProcessor.processDocument(document, {filePath})
            });
        }
    }
}

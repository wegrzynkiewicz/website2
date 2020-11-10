import {readFile} from "../helpers/files";
import marked from "marked";

export async function createMarkdownProcessor() {
    return {
        async processMarkdown(filePath) {
            const binaryData = await readFile(filePath);
            const content = marked(binaryData.toString());
            return content;
        }
    }
}

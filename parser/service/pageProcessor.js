import marked from "marked";
import path from "path";
import mkdirp from "mkdirp";
import {readFile, writeFile} from "../helpers/files";

async function processPreload(preloadItem, options) {
    const contextDir = path.dirname(options.filePath);
    const preloadPath = path.resolve(contextDir, preloadItem.path);
    const binaryData = await readFile(preloadPath);
    const content = marked(binaryData.toString());
    return {
        name: preloadItem.name,
        content: content,
    }
}

async function writeOutputFile(data, content) {
    const basename = path.basename(data.uri);
    const fileName = basename === '' ? 'index' : '';
    const filePath = `./dist${data.uri}${fileName}.html`;
    const dirName = path.dirname(filePath);
    await mkdirp(dirName);
    await writeFile(filePath, content);
}

export async function createPageProcessor(container) {
    const rendererFactory = container.get('rendererFactory');
    return {
        async process(data, options) {
            const preload = {};
            if (data.preload) {
                const preloadPromises = data.preload.map(async (item) => processPreload(item, options));
                const preloadData = await Promise.all(preloadPromises);
                for (const preloadItem of preloadData) {
                    preload[preloadItem.name] = preloadItem.content;
                }
            }

            const variables = {
                ...data,
                preload,
            };

            const renderer = rendererFactory.createRenderer();
            const content = renderer.renderTemplate(data.template, variables);

            await writeOutputFile(data, content);
        }
    }
}

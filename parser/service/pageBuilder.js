import path from "path";
import mkdirp from "mkdirp";
import {writeFile} from "../helpers/files";

async function writeOutputFile(uri, content) {
    const basename = path.basename(uri);
    const fileName = basename === '' ? 'index' : '';
    const filePath = `./dist${uri}${fileName}.html`;
    const dirName = path.dirname(filePath);
    await mkdirp(dirName);
    await writeFile(filePath, content);
}

export async function createPageBuilder({renderer}) {
    return {
        async build({template, uri, data}) {
            const content = renderer.render(template, data);
            await writeOutputFile(uri, content);
        }
    }
}

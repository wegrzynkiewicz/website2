import {createFileProcessor} from "../service/fileProcessor";
import {createInjector} from "../service/injector";
import {createMarkdownProcessor} from "../service/markdown";
import {createPageBuilder} from "../service/pageBuilder";
import {createRenderer} from "../service/renderer";

export async function bootstrapContainer() {
    const container = {};

    container.injector = await createInjector(container);
    container.renderer = await createRenderer(container);
    container.markdown = await createMarkdownProcessor(container);
    container.pageBuilder = await createPageBuilder(container);
    container.fileProcessor = await createFileProcessor(container);

    return container;
}

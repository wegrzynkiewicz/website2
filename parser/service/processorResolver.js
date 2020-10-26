import {createPageProcessor} from "./pageProcessor";

export async function createProcesorResolver(container) {

    const processors = {
        page: await createPageProcessor(container),
    }

    return {
        resolveProcessor(data) {
            if (!data.kind) {
                throw new Error('Document (kind) key is undefined.');
            }

            const processor = processors[data.kind];
            if (!processor) {
                throw new Error(`Processor named (${processor}) is not registered.`)
            }

            return processor;
        }
    }
}

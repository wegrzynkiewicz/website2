import {createProcesorResolver} from "../service/processorResolver";
import {createDocumentProcessor} from "../service/documentProcessor";
import {createFileProcessor} from "../service/fileProcessor";
import {createInjector} from "../service/injector";
import {createRendererFactory} from "../service/rendererFactory";

class Container {

    constructor() {
        this.services = new Map();
    }

    get(serviceName) {
        if (!this.services.has(serviceName)) {
            throw new Error(`Service named (${serviceName}) not exists.`);
        }
        return this.services.get(serviceName);
    }

    set(serviceName, service) {
        return this.services.set(serviceName, service);
    }
}

export async function bootstrapContainer() {
    const container = new Container();

    container.set('injector', await createInjector(container));
    container.set('rendererFactory', await createRendererFactory(container));
    container.set('processResolver', await createProcesorResolver(container));
    container.set('documentProcessor', await createDocumentProcessor(container));
    container.set('fileProcessor', await createFileProcessor(container));

    return container;
}

import {Environment, FileSystemLoader, precompile} from "nunjucks";

export async function createRenderer(container) {

    const options = {
        autoescape: false,
        lstripBlocks: true,
        trimBlocks: true,
        throwOnUndefined: true,
    };
    const loaders = [new FileSystemLoader('views/templates')];
    const env = new Environment(loaders, options);

    for (const [property, service] of Object.entries(container)) {
        env.addGlobal(property, service);
    }

    precompile('views/templates', {env});

    return {
        render(fileName, parameters) {
            return env.render(fileName, parameters);
        }
    }
}

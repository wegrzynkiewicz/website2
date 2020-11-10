import {readFile} from "../helpers/files";

const renderers = {
    js: function renderScript(path, options) {
        return `<script src="${path}" defer crossorigin="anonymous"></script>`;
    },
    css: function renderLink(path, options) {
        return `<link rel="stylesheet" href="${path}" crossorigin="anonymous"/>`;
    }
}

function forceArray(entries, entryPointName, extension) {
    const extensions = entries[entryPointName];
    const data = extensions[extension];
    const files = Array.isArray(data) ? data : [data];
    return files;
}

function generateInjector(entries, extension) {
    return function (entryPointName, options) {
        const files = forceArray(entries, entryPointName, extension);
        const renderer = renderers[extension];
        const rendered = files.map(path => renderer(path, options)).join('');
        return rendered;
    }
}

export async function createInjector() {
    const binary = await readFile('./build/assets.json');
    const json = binary.toString();
    const entries = JSON.parse(json);
    return {
        injectScript: generateInjector(entries, 'js'),
        injectStyle: generateInjector(entries, 'css'),
    }
}

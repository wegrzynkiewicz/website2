import {renderBlockEntry} from "../../templates/block-entry";
import {renderHomePage} from "../../templates/homepage";

const templateRenderers = {
    'block-entry': renderBlockEntry,
    'homepage': renderHomePage,
}

class Renderer {

    constructor(container) {
        this.blocks = new Map();
        this.container = container;
    }

    renderBlock(blockName) {
        const block = this.blocks.get(blockName);
        return block.call(this);
    }

    renderTemplate(templateName, data) {
        const renderTemplate = templateRenderers[templateName];
        return renderTemplate.call(this, data);
    }
}

export async function createRendererFactory(container) {
    return {
        createRenderer() {
            const renderer = new Renderer(container);
            return renderer;
        }
    }
}

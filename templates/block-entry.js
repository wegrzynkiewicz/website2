import {renderPage} from "./parts/page";

export function renderBlockEntry(data) {
    this.blocks.set('page_content', () => `Hello World!`);
    return renderPage.call(this, data);
}

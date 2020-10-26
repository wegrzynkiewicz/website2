import {renderPage} from "./parts/page";

export function renderHomePage(data) {
    this.blocks.set('page_content', () => "HomePage");
    return renderPage.call(this, data);
}

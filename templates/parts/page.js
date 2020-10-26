import {renderDocument} from "./document";
import {renderNavTop} from "./nav-top";

function renderDocumentContent(data) {
    return `
        <div class="page">
            ${renderNavTop.call(this, data)}
        </div>
    `;
}

export function renderPage(data) {
    this.blocks.set('document_content', renderDocumentContent);
    return renderDocument.call(this, data);
}

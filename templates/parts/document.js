export function renderDocument({entries, language, title}) {
    return `
        <!doctype html>
            <html lang="${language}">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>${title}</title>
                ${entries.map(this.container.get('injector').injectScript)}
                ${entries.map(this.container.get('injector').injectStyle)}
            </head>
            <body>
                ${this.renderBlock('document_content')}
            </body>
        </html>
    `;
}

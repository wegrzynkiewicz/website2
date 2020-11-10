export default async ({markdown, pageBuilder}) => {
    await pageBuilder.build({
        data: {
            content: await markdown.processMarkdown(`${__dirname}/content.md`),
            entries: ["homepage"],
            language: "pl",
            title: 'Example'
        },
        template: 'block-entry.twig',
        uri: '/blog/example',
    });
}

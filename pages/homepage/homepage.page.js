export default async ({pageBuilder}) => {
    await pageBuilder.build({
        data: {
            entries: ["homepage"],
            language: "pl",
            title: 'Homepage'
        },
        template: 'homepage.twig',
        uri: '/',
    });
}

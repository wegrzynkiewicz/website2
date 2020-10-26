export async function createDocumentProcessor(container) {
    return {
        async processDocument (document, options) {
            const data = document.toJSON();
            const processResolver = container.get('processResolver');
            const processor = processResolver.resolveProcessor(data);
            await processor.process(data, options);
        }
    }
}

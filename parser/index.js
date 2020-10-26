import glob from 'glob-promise';
import {bootstrapContainer} from "./helpers/container";

process.addListener('unhandledRejection', (exception) => {
    throw new Error(exception.stack);
});

(async () => {
    const container = await bootstrapContainer();
    const fileProcessor = container.get('fileProcessor');
    const files = await glob('./pages/**/*.yml');
    const promises = files.map(async file => fileProcessor.processFile(file));
})();

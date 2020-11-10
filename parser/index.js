import glob from 'glob-promise';
import {bootstrapContainer} from "./helpers/container";

process.addListener('unhandledRejection', (exception) => {
    throw new Error(exception.stack);
});

(async () => {
    const {fileProcessor} = await bootstrapContainer();
    const files = await glob('./pages/**/*.page.js');
    const promises = files.map(async file => fileProcessor.processFile(file));
})();

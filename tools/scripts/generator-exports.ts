import { resolve } from 'path';
import { format, resolveConfig } from 'prettier';
import { generateExceptionListExport, generateExportFile, log } from './generator-exports-core';
import { getClassNameFromFileData, getEnumNameFromFileData } from './shared-script';

(async () => {
    const prettierConfig = await resolveConfig(resolve(process.cwd(), '.prettierrc'));
    const prettierFormat = (source: string) => format(source, prettierConfig ?? undefined);

    generateExportFile({
        exportFilePath: resolve(process.cwd(), `libs/shared-model/src/request-responses.ts`),
        staticImports: [],
        dirPath: resolve(process.cwd(), 'libs/shared-model/src/request-responses'),
        relativeImportBuilder: ({ className, fileNameWithoutType }) =>
            `import { ${className} } from './request-responses/${fileNameWithoutType}'`,
        extend: (data) => {
            return [
                data.map(({ className }) => `export { ${className} };`).join('\n'),
                `export const requestResponseModels = [ ${data.map(({ className }) => className).join(', ')} ];`
            ];
        },
        classNameFinder: ({ fileData }) => getClassNameFromFileData(fileData),
        prettier: prettierFormat
    });

    generateExportFile({
        exportFilePath: resolve(process.cwd(), `libs/shared-model/src/models.ts`),
        staticImports: [],
        dirPath: resolve(process.cwd(), 'libs/shared-model/src/models'),
        relativeImportBuilder: ({ className, fileNameWithoutType }) => `import { ${className} } from './models/${fileNameWithoutType}'`,
        extend: (data) => {
            return [
                data.map(({ className }) => `export { ${className} };`).join('\n'),
                `export const models = [ ${data.map(({ className }) => className).join(', ')} ];`
            ];
        },
        classNameFinder: ({ fileData }) => getClassNameFromFileData(fileData),
        prettier: prettierFormat
    });

    generateExportFile({
        exportFilePath: resolve(process.cwd(), `libs/api-database/src/entities.ts`),
        staticImports: [],
        dirPath: resolve(process.cwd(), 'libs/api-database/src/entities'),
        relativeImportBuilder: ({ className, fileNameWithoutType }) => `import { ${className} } from './entities/${fileNameWithoutType}'`,
        extend: (data) => {
            return [
                data.map(({ className }) => `export type { ${className} };`).join('\n'),
                `export const entities = [ ${data.map(({ className }) => className).join(', ')} ];`
            ];
        },
        classNameFinder: ({ fileData }) => getClassNameFromFileData(fileData),
        prettier: prettierFormat
    });

    generateExportFile({
        exportFilePath: resolve(process.cwd(), `libs/api-database/src/migrations.ts`),
        staticImports: [],
        dirPath: resolve(process.cwd(), 'libs/api-database/src/migrations'),
        relativeImportBuilder: ({ className, fileNameWithoutType }) => `import { ${className} } from './migrations/${fileNameWithoutType}'`,
        extend: (data) => {
            return [`export const migrations = [ ${data.map(({ className }) => className).join(', ')} ];`];
        },
        classNameFinder: ({ fileData }) => getClassNameFromFileData(fileData),
        prettier: prettierFormat
    });

    generateExportFile({
        exportFilePath: resolve(process.cwd(), `libs/shared-enum/src/enums.ts`),
        staticImports: [],
        dirPath: resolve(process.cwd(), 'libs/shared-enum/src/enums'),
        relativeImportBuilder: ({ className, fileNameWithoutType }) => `import { ${className} } from './enums/${fileNameWithoutType}'`,
        extend: (data) => {
            return [
                data.map(({ className }) => `export { ${className} };`).join('\n'),
                `export const enums = [ ${data.map(({ className }) => className).join(', ')} ];`
            ];
        },
        classNameFinder: ({ fileData }) => getEnumNameFromFileData(fileData),
        prettier: prettierFormat
    });

    generateExceptionListExport({
        exceptionListFile: resolve(process.cwd(), 'libs/shared-common/src/exception.list.ts'),
        exceptionListFinder: resolve(process.cwd(), 'libs/shared-common/src/exception.finder.ts'),
        exceptionListFactory: resolve(process.cwd(), 'libs/shared-common/src/exception.factory.ts'),
        prettier: prettierFormat
    });

    log('Successfully generated.');
})();

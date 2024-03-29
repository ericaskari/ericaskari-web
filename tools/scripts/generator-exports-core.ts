import { readdirSync, readFileSync, writeFileSync } from 'fs';
import path, { resolve } from 'path';
import { getClassNameFromFileData, pascalCaseToKebabCase } from './shared-script';

export function log(text: string) {
    console.log(' 🛠 ', text);
}
export function error(text: string) {
    console.log(' ⛔️ ', text);
}

const autoGeneratedMessage = '// Auto generated file with generate:exports npm command';
interface FileData {
    fileNameWithType: string;
    fileNameWithoutType: string;
    fileData: string;
    className: string;
}
export function generateExportFile(input: {
    staticImports: string[],
    dirPath: string,
    relativeImportBuilder: (input: Pick<FileData, 'fileNameWithoutType' | 'className'>) => string,
    classNameFinder: (input: Pick<FileData, 'fileNameWithType' | 'fileData'>) => string | null,
    extend: (data: FileData[]) => string | string[],
    exportFilePath: string,
    prettier: (fileData: string) => string
}) {
    const { staticImports, extend, exportFilePath, dirPath, relativeImportBuilder, classNameFinder, prettier } = input;

    const comment = autoGeneratedMessage;
    const fileNamesWithType = readdirSync(dirPath);

    const fileDataList: Omit<FileData, 'className'>[] = fileNamesWithType.map((fileNameWithType, index) => ({
        fileNameWithType,
        fileNameWithoutType: path.parse(fileNameWithType).name,
        fileData: readFileSync(resolve(dirPath, fileNameWithType)).toString()
    }));

    const classNames: FileData[] = fileDataList
        .map(({ fileNameWithType, fileNameWithoutType, fileData }) => ({
            fileNameWithType,
            fileNameWithoutType,
            fileData,
            className: classNameFinder({ fileNameWithType, fileData })
        }))
        .filter((x) => !!x.className);

    const relativeImports = classNames
        .map(({ fileNameWithoutType, className }) => relativeImportBuilder({ fileNameWithoutType, className }))
        .join('\n');

    const extended = extend(classNames);
    const parsedExtended = Array.isArray(extended) ? extended.join('\n') : extended;
    const final: string[] = [comment, staticImports.join('\n'), relativeImports, parsedExtended];

    writeFileSync(exportFilePath, prettier(final.join('\n\n')));
}
export function generateExceptionListExport(input: {
    exceptionListFile: string,
    exceptionListFactory: string,
    exceptionListFinder: string,
    prettier: (fileData: string) => string
}) {
    const file = (() => {
        try {
            return readFileSync(input.exceptionListFile).toString();
        } catch (e) {
            error(`Cannot read ${input.exceptionListFile}`);
            return '';
        }
    })();

    const regex = new RegExp('(?<=export class )(.*)(?= extends HttpException)', 'gi');

    // @ts-ignore
    const classNames = [...file.matchAll(regex)];

    const classNameList = [];
    for (const match of classNames) {
        const fullMatch = match[0];
        classNameList.push(fullMatch);
    }

    const imports = `import {\n    ${classNameList.join(',\n    ')}\n} from './exception.list';`;

    const nameFinders = classNameList.map((className) => `    if (httpException instanceof ${className}) return '${className}';`);

    const factories = classNameList.map(
        (className) =>
            `    if (exceptionName === '${className}') {\n        return new ${className}(formFieldValidationErrors, formValidationErrors);\n    }`
    );

    const factory = `export const ExceptionFactory = (
    exceptionName: string,
    formFieldValidationErrors: { [formFieldName: string]: { [key: string]: boolean } } = {},
    formValidationErrors: { [key: string]: boolean } = {}
) => {
${factories.join('\n')}
    return new HttpException();
};`;

    const nameFinder = `export const ExceptionNameFinder = (httpException: HttpException): string => {
${nameFinders.join('\n')}
    return 'HttpException';
};`;

    writeFileSync(
        input.exceptionListFactory,
        input.prettier(['import { HttpException } from "./http-exception";', autoGeneratedMessage, imports, factory].join('\n\n'))
    );
    writeFileSync(
        input.exceptionListFinder,
        input.prettier(['import { HttpException } from "./http-exception";', imports, autoGeneratedMessage, nameFinder].join('\n\n'))
    );
}

export function generateDatabaseEntityRepositoryServices(input: {
    entitiesDir: string,
    formatter: (source: string) => string,
    autogeneratedFile: string,
    repositoriesDir: string
}) {
    const { entitiesDir, repositoriesDir, autogeneratedFile, formatter } = input;
    const entityFileNames = readdirSync(entitiesDir);
    const entitiesData = entityFileNames.map((m) => readFileSync(resolve(entitiesDir, m)).toString());
    const entitiesClassNames = entitiesData.map((m) => getClassNameFromFileData(m)).filter((x) => !!x);
    const repositoryServiceClassNames = entitiesClassNames.map((x) => ({
        entityClassName: x,
        repositoryClassName: `${x}RepositoryService`,
        modelClassName: `${x}Model`
    }));
    const repositoryFiles = repositoryServiceClassNames.map((x) => {
        const modelClassName = `${x.modelClassName.split('Entity')[0]}Model`;

        return {
            ...x,
            importName: `${pascalCaseToKebabCase(x.entityClassName + 'Repository')}.service`,
            fileName: `${pascalCaseToKebabCase(x.entityClassName + 'Repository')}.service.ts`,
            classData: `
import { Injectable } from '@nestjs/common';
import { RepositoryServiceImpl } from '../repository.service';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { ${x.entityClassName} } from '../entities';
import { ${modelClassName} } from '@ericaskari/shared/model';

@Injectable()
export class ${x.repositoryClassName} extends RepositoryServiceImpl<
    ${x.entityClassName},
    ${modelClassName}
> {
    constructor(@InjectRepository(${x.entityClassName}) override repository: Repository<${x.entityClassName}>) {
        super(
            repository,
            ${x.entityClassName},
            ${modelClassName},
            (model: ${modelClassName}) => plainToClass(${x.entityClassName}, model),
            (model: ${x.entityClassName}) => plainToClass(${modelClassName}, model),
            (model: Partial<${x.entityClassName}>) => plainToClass(${modelClassName}, model),
        );
    }
}
`
        };
    });

    for (const { fileName, classData } of repositoryFiles) {
        writeFileSync(resolve(repositoriesDir, fileName), classData);
    }
}

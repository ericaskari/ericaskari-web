import { exec } from 'child_process';
import { config } from 'dotenv';
import { resolve } from 'path';

const env = resolve(process.cwd(), '.env');

export const BACKUP_DIR = resolve(process.cwd(), '_backups');

config({
    path: env,
});

export async function execAsync(command: string) {
    return new Promise((resolveIt, rejectIt) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                rejectIt({ err, stderr });
            } else {
                resolveIt(stdout);
            }
        });
    });
}

export async function startDocker(serviceName: string) {
    await execAsync(`docker start ${serviceName} || true`);
}

export async function stopDocker(serviceName: string) {
    await execAsync(`docker stop ${serviceName} || true`);
}

export async function backup(volumeName: string, backupDir: string, backupName: string) {
    await execAsync(
        `docker run -v ${volumeName}:/volume --rm --log-driver none loomchild/volume-backup backup - > ${backupDir}/${backupName}`
    );
}

export async function restoreBackup(volumeName: string, backupDir: string, backupName: string) {
    await execAsync(
        `cat ${backupDir}/${backupName} | docker run -i -v ${volumeName}:/volume --rm loomchild/volume-backup restore -f -`
    );
}

export function backupFileNameGenerator(timeStamp: string, type: 'postgres' | 'pgadmin4' | 'minio'): string {
    return `${timeStamp}-${type}.tar.bz2`;
}

export function getClassNameFromExtend(fileData: string, extendClassName: string): string | null {
    const startSearchStr = 'export class ';
    const endSearchStr = `extends ${extendClassName}`;
    if (fileData.indexOf(startSearchStr) === -1) {
        return null;
    }
    const cutStart = fileData.indexOf(startSearchStr) + startSearchStr.length;
    const cutEnd = fileData.indexOf(endSearchStr, cutStart);
    const str = fileData.substring(cutStart, cutEnd);
    return str.split(' ')[0];
}

export function getClassNameFromFileData(fileData: string): string | null {
    const startSearchStr = 'export class ';
    const endSearchStr = '{';
    if (fileData.indexOf(startSearchStr) === -1) {
        return null;
    }
    const cutStart = fileData.indexOf(startSearchStr) + startSearchStr.length;
    const cutEnd = fileData.indexOf(endSearchStr, cutStart);
    const str = fileData.substring(cutStart, cutEnd);
    return str.split(' ')[0];
}

export function getInterfaceNameFromFileData(fileData: string): string | null {
    const startSearchStr = 'export interface ';
    const endSearchStr = '{';
    if (fileData.indexOf(startSearchStr) === -1) {
        return null;
    }
    const cutStart = fileData.indexOf(startSearchStr) + startSearchStr.length;
    const cutEnd = fileData.indexOf(endSearchStr, cutStart);
    const str = fileData.substring(cutStart, cutEnd);
    return str.split(' ')[0];
}

export const COMPOSE_PROJECT_NAME = process.env.COMPOSE_PROJECT_NAME || 'COMPOSE_PROJECT_NAME';
export const COMPOSE_SERVICE_NAME = process.env.COMPOSE_SERVICE_NAME || 'COMPOSE_SERVICE_NAME';

export const POSTGRES_NAME = `${COMPOSE_SERVICE_NAME}--postgres`;
export const MINIO_NAME = `${COMPOSE_SERVICE_NAME}--minio`;

export const POSTGRES_VOLUME_NAME = `${COMPOSE_PROJECT_NAME}_${POSTGRES_NAME}`;
export const MINIO_VOLUME_NAME = `${COMPOSE_PROJECT_NAME}_${MINIO_NAME}`;

import { app } from 'electron';
import * as fs from 'fs/promises';
import * as path from 'path';
const mapsFile = process.env.MAPS_FILE;
async function fileExists(filePath) {
    try {
        await fs.access(filePath, fs.constants.F_OK);
        return true;
    }
    catch (error) {
        return false;
    }
}
function getConfigFilePath(fileName) {
    return path.join(app.getPath('userData'), fileName);
}
async function createConfigFiles() {
    if (!mapsFile)
        throw Error('Environment variables missing');
    const filePath = getConfigFilePath(mapsFile);
    const exists = await fileExists(filePath);
    if (!exists)
        await fs.writeFile(filePath, '{}', 'utf8');
    return true;
}
/**
 * Writes the given data into the {mapsFile}
 * inside the app data dir.
 * File must be utf8 encoded
 */
async function writeMaps(event, data) {
    const filePath = getConfigFilePath(mapsFile);
    await fs.writeFile(filePath, data, 'utf8');
    return true;
}
/**
 * Reads the {mapsFile} from the app-data dir.
 * Returns the contents of the file.
 * File must be utf8 encoded
 */
async function readMaps() {
    const filePath = getConfigFilePath(mapsFile);
    const data = await fs.readFile(filePath, 'utf8');
    return data;
}
export { writeMaps, readMaps, createConfigFiles };

import path from "path";
import Json from "./class/Json";
import UntisData from "./class/UntisData";
import SecretJson from "./class/interface/SecretJson";
import Csv from "./class/Csv";
import Cache from "./class/CacheChecker";

/**
 * Gets the credentials from the secret.json
 */
const jsonFile = new Json(path.join(__dirname + "/../json/secret.json"));
const credentials: SecretJson = jsonFile.read();

/**
 * Check when last updated date and update if necessary
 */
const cacheChecker = new Cache();
const isValid: boolean = cacheChecker.check();

/**
 * Generates a cache json file with webuntis data
 */
if (isValid) {
    new UntisData(credentials);
}

/**
 * Generates the CSV with the untis cache
 */
if (!isValid) {
    const jsonCacheFile = new Json(path.join(__dirname + "/../exports/cache.json"));
    const jsonCacheData: SecretJson = jsonCacheFile.read();
    const csv = new Csv();
    csv.create(jsonCacheData);
}

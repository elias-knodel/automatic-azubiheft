import path from "path";
import Json from "./class/Json";
import UntisData from "./class/UntisData";
import SecretJson from "./class/interface/SecretJson";
import Output from "./class/Output";
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
 * Generates a cache file with webuntis data when the old one is invalid
 */
if (!isValid) {
    const untisData = new UntisData(credentials);
    untisData.startYear = 2019;
    untisData.endYear = 2021;
}

/**
 * Generates the CSV with the untis cache if it is valid
 */
if (isValid) {
    const jsonCacheFile = new Json(path.join(__dirname + "/../exports/cache.json"));
    const jsonCacheData: SecretJson = jsonCacheFile.read();
    const output = new Output();
    output.reverseDate = true;
    output.create(jsonCacheData);
}

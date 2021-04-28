import path from "path";
import Json from "./class/Json";
import Untis from "./class/Untis";
import SecretJson from "./class/interface/SecretJson";
import Csv from "./class/Csv";

/**
 * Gets the credentials from the secret.json
 */
const jsonFile = new Json(path.join(__dirname + "/../json/secret.json"));
const credentials: SecretJson = jsonFile.read();

/**
 * Generates a json file with webuntis data
 * Need to be set on true on the FIRST time
 */
const requestData = false;
if (requestData) {
    const untisData = new Untis(credentials);
    untisData.customTimespan = false;
}

/**
 * Generates the CSV
 * Set it to false on the first time because there is no promise yet
 */
const generateCsv = true;
if (generateCsv) {
    const jsonCacheFile = new Json(path.join(__dirname + "/../exports/cache.json"));
    const jsonCacheData: SecretJson = jsonCacheFile.read();
    const csv = new Csv();
    csv.create(jsonCacheData);
}

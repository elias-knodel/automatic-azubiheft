import Json from "./Json";
import path from "path";

export default class Cache {
    constructor() {
    }

    public check(): boolean {
        const today = new Date().toLocaleDateString("de-DE");

        const jsonFile = new Json(path.join(__dirname + "/../../exports/cacheCheck.json"));
        const jsonData = jsonFile.read();

        if (!jsonData["lastUpdated"] || jsonData["lastUpdated"] != today) {
            jsonData["lastUpdated"] = today;

            jsonFile.writeSync(jsonData);

            return false;
        }

        return true;
    }
}

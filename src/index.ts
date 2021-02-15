import path from "path";
import Json from "./class/Json";
import Untis from "./class/Untis";
import SecretJson from "./class/interface/SecretJson";

const jsonFile = new Json(path.join(__dirname + "/../json/secret.json"));
const credentials: SecretJson = jsonFile.read();

const untisData = new Untis(credentials);
untisData.customTimespan = false;
console.log(untisData);
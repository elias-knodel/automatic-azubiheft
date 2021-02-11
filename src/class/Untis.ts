import WebUntis from "webuntis";
import { SecretJson } from "./interface/SecretJson";
import Json from "./Json";
import path from "path";

export default class Untis {

    constructor() {
        const secret = this.getCredentials();
        this.getData(secret);
    }

    private getCredentials() {
        const jsonFile = new Json;
        const jsonFilePath = path.join(__dirname + "/../../json/secret.json");
        const secret: SecretJson = jsonFile.read(jsonFilePath);
        return secret;
    }

    public getData(secret: any) {
        const untis = new WebUntis(
	        secret.school,
            secret.user,
            secret.password,
            secret.url
        );

        const today = new Date;
        console.log (today);
        console.log(untis.convertDateToUntis(today));

        untis
	    .login()
	    .then(() => {
		    return untis.getLatestSchoolyear();
	    })
        .then(timetable => {
		    console.log(timetable)
	    });        
    }
}
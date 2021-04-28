import SecretJson from "./interface/SecretJson";
import Json from "./Json";
import path from "path";
import { WebUntisCustom } from "./WebUntisCustom";

export default class UntisData {

    private _customTimespan: boolean = false;

    public get customTimespan(): boolean {
        return this._customTimespan;
    }

    public set customTimespan(value: boolean) {
        this._customTimespan = value;
    }

    constructor(credentials: SecretJson) {
        this.getData(credentials);
    }

    public getData(secret: SecretJson) {
        const untis = new WebUntisCustom(
            secret.school,
            secret.user,
            secret.password,
            secret.url
        );

        untis
            .login()
            .then(() => {
                return untis.getLatestSchoolyear();
            })
            .then(timetable => {
                if (this.customTimespan) {
                    const date = this.getDate();
                    timetable = date;
                }

                return untis.getOwnTimetableForRange(timetable.startDate, timetable.endDate);
            })
            .then(timetable => {
                const jsonFile = new Json(path.join(__dirname + "/../../exports/cache.json"));
                const jsonData = jsonFile.read();

                timetable.forEach(e => {
                    if (e.code != "cancelled") {
                        if (e.date && e.date <= <number><unknown>untis.convertDateToUntis(new Date)) {
                            if (!jsonData[e.date]) jsonData[e.date] = {};
                            if (!jsonData[e.date][e.id]) jsonData[e.date][e.id] = e;
                            if (!jsonData[e.date][e.id]["lessonTopic"]) {
                                untis.getLessonTopic(
                                    e.date, // e.date
                                    e.startTime, // e.startTime
                                    e.endTime, // e.endTime
                                    e.id // e.id
                                ).then(res => {
                                    jsonData[e.date][e.id]["lessonTopic"] = <string>res;
                                    jsonFile.writeSync(jsonData);
                                }).catch(err => {
                                    console.log(err);
                                });
                            }
                        }
                    }
                });

                jsonFile.writeSync(jsonData);
            })
            .catch(error => {
                console.log("Sadly webuntis only allows viewing one year at the time.\n" +
                "You cannot overlap dates from different schoolyears!");
                throw new Error(error);
            });
    }

    public getDate() {
        const startDate = new Date("2020-09-13T22:00:00.000Z");
        const endDate = new Date("2021-02-12T22:00:00.000Z");

        const date = {
            name: "custom",
            id: 1,
            startDate,
            endDate
        };

        return date;
    }
}

import SecretJson from "./interface/SecretJson";
import Json from "./Json";
import path from "path";
import { WebUntisCustom } from "./WebUntisCustom";

export default class UntisData {

    private _startYear: boolean = false;

    public get startYear(): boolean {
        return this._startYear;
    }

    public set startYear(value: boolean) {
        this._startYear = value;
    }

    private _endYear: boolean = false;

    public get endYear(): boolean {
        return this._endYear;
    }

    public set endYear(value: boolean) {
        this._endYear = value;
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
                return untis.getSchoolyears(2019, 2020);
            })
            .then(schoolyears => {

                // @ts-ignore
                const timetables = [];
                // @ts-ignore
                const promises = [];

                schoolyears.forEach(e => {
                    promises.push(
                        untis.getOwnTimetableForRange(e.startDate, e.endDate)
                            .then( lessons => {
                                lessons.forEach(lesson =>{
                                    // @ts-ignore
                                    timetables.push(lesson);
                                });
                            })
                            .catch( err => {
                                console.log(err);
                            })
                    );
                });

                // @ts-ignore
                return Promise.all(promises)
                    .then( () => {
                        // @ts-ignore
                        console.log(timetables);
                        // @ts-ignore
                        return timetables;
                    });
            })
            .then(timetables => {
                console.log(timetables);
                const jsonFile = new Json(path.join(__dirname + "/../../exports/cache.json"));
                const jsonData = jsonFile.read();

                timetables.forEach(e => {
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
                throw new Error(error);
            });
    }
}

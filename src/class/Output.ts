// @ts-nocheck
import { writeFileSync } from "fs";
import { convertUntisDate } from "webuntis";

export default class Output {

    private _reverseDate: boolean = true;

    public get reverseDate(): boolean {
        return this._reverseDate;
    }

    public set reverseDate(reverseDate: boolean) {
        this._reverseDate = reverseDate;
    }

    constructor() {
    }

    private getLessons(data: object): object[] {
        const lessons: object[] = [];
        for(const k in data) {
            for(const j in data[k]) {
                lessons.push(data[k][j]);
            }
        }
        return lessons;
    }

    public create(data: object) {
        const lessons = this.getLessons(data);

        const azubiheftTxt = __dirname + "/../../exports/azubiheft.txt";
        let text = "Date, Lesson: Topic\n";
        let lessonBefore = "";
        let dateF = "";

        lessons.forEach(e => {
            dateF = new Date(convertUntisDate(e.date));
            if (e.date != lessonBefore.date) {
                text += "\n";
            }
            if (lessonBefore.lessonTopic != e.lessonTopic) {
                if (e.lessonTopic && e.su[0]) {
                    text += dateF.toLocaleDateString("de-DE") + ", " + e.su[0].name + ": " + e.lessonTopic + "\n";
                }
            }
            lessonBefore = e;
        });

        writeFileSync(
            azubiheftTxt,
            text
        );
    }

    private compare = (a: unknown, b: unknown) => {
        const dateA = a.date;
        const dateB = b.date;

        let comparison = 0;
        if (dateA > dateB) {
            comparison = 1;
        } else if (dateA < dateB) {
            comparison = -1;
        }

        // if (this.reverseDate) {
        //     comparison = comparison * -1;
        // }

        return comparison;
    }
}

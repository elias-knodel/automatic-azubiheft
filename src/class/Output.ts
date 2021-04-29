// @ts-nocheck
import { writeFileSync } from "fs";
import { convertUntisDate } from "webuntis";
import path from "path";

export default class Output {

    private _reverseDate: boolean = false;

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
        for (const k in data) {
            for (const j in data[k]) {
                lessons.push(data[k][j]);
            }
        }
        lessons.sort(this.compare);
        return lessons;
    }

    public create(data: object) {
        const lessons = this.getLessons(data);

        const azubiheftTxt = path.join(__dirname + "/../../exports/azubiheft.txt");
        let text = "Date:\nLesson: Topic\n";
        let lessonBefore = "";
        let dateF = "";

        lessons.forEach(e => {
            dateF = new Date(convertUntisDate(e.date));
            if (e.lessonTopic) {
                if (lessonBefore.lessonTopic != e.lessonTopic) {
                    if (e.su[0]) {
                        if (e.date != lessonBefore.date) {
                            text += "\n" + dateF.toLocaleDateString("de-DE") + ":\n";
                        }
                        text += e.su[0].name + ": " + e.lessonTopic + "\n";
                    }
                }
                lessonBefore = e;
            }
        });

        writeFileSync(
            azubiheftTxt,
            text
        );
    }

    private compare = (a: unknown, b: unknown) => {
        const dateA = a.date;
        const dateB = b.date;

        if (!this.reverseDate) {
            return dateA - dateB;
        }

        return dateB - dateA;
    }
}

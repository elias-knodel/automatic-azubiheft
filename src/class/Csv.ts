// @ts-nocheck
import { writeFileSync } from "fs";
import { convertUntisDate } from "webuntis";

export default class Csv {
    constructor() {
    }

    private getLessons(data: object): object[] {
        const lessons: object[] = [];
        for(const k in data) {
            for(const j in data[k]) {
                lessons.sort(this.compare);
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

    private compare(a: unknown, b: unknown) {
        const dateA = a.date;
        const dateB = b.date;

        let comparison = 0;
        // if date is bigger than date before
        if (dateA < dateB) {
            comparison = 1;
        // if date is smaller than date before
        } else if (dateA > dateB) {
            comparison = -1;
        }
        return comparison;
    }
}

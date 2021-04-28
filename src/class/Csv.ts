import { writeFileSync, readFileSync } from "fs";

export default class Csv {
    constructor() {
    }

    private getLessons(data: object): object[] {
        const lessons: object[] = [];
        for(const k in data) for(const j in data[k]) {
            lessons.push(data[k][j]);
        }
        return lessons;
    }

    public create(data: object) {
        const lessons = this.getLessons(data);

        const azubiheftTxt = __dirname + "/../../exports/azubiheft.txt";
        let text = "";


        lessons.forEach(e => {
            if (e.lessonTopic && e.su[0]) {
                text += e.date + e.su[0].name + ": " + e.lessonTopic + "\n";
            }
        });

        writeFileSync(
            azubiheftTxt,
            text
        );
    }
}

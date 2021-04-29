import { AxiosInstance } from "axios";
import WebUntis from "webuntis";
import { parse } from "date-fns";

export class WebUntisCustom extends WebUntis {

    private axiosInstance: AxiosInstance;

    private buildCookiesCustom: Function;

    private request: Function;

    constructor(
        school: string,
        username: string,
        password: string,
        baseurl: string,
        identity: string = "Awesome"
    ) {
        super(school, username, password, baseurl, identity);
        // @ts-ignore
        this.axiosInstance = <AxiosInstance>this["axios"];
        this.buildCookiesCustom = this["_buildCookies"];
        this.request = this["_request"];
    }

    /**
     * Get Topic of lesson
     * @param {boolean} [validateSession=true]
     * @returns {Promise<String>}
     */
    async getLessonTopic(
        date: number,
        startTime: number,
        endTime: number,
        selectedPeriodId: number,
        validateSession = true
    ) {
        if (validateSession && !(await this.validateSession()))
            throw new Error("Current Session is not valid");
        const response = await this.axiosInstance({
            method: "GET",
            url: "/WebUntis/api/public/period/info?date=" + date +
                "&starttime=" + startTime +
                "&endtime=" + endTime +
                "&elemid=10487" +
                "&elemtype=5" +
                "&ttFmtId=1" +
                "&selectedPeriodId=" + selectedPeriodId,
            headers: {
                Cookie: this.buildCookiesCustom()
            }
        });
        const lessonTopicRes: String = response.data.data.blocks[0][0].lessonTopic.text;
        try {
            if (typeof lessonTopicRes !== "string")
                console.log("Server returned invalid data.");
            // remove linebreaks with regex and replace
            return lessonTopicRes.replace(/(\r\n|\n|\r)/gm, " ");
        } catch (err) {
            console.log("Server returned no data.");
        }
    }

    /**
     * Get the latest WebUntis Schoolyear
     * @param {number} fromYear
     * @param {number} toYear
     * @param {Boolean} [validateSession=true]
     * @returns {Promise<[{name: String, id: Number, startDate: Date, endDate: Date}]>}
     */
    async getSchoolyears(
        fromYear: number,
        toYear: number,
        validateSession = true
    ) {
        const data = await this.request("getSchoolyears", {}, validateSession);
        if (!data[0]) throw new Error("Failed to receive school year");

        // @ts-ignore
        // Create new array with all schoolyears
        const schoolyears = [];

        for (let i = fromYear; i <= toYear; i++) {

            let j = i;
            const years = i + "/" + ++j;

            // @ts-ignore
            data.forEach(e => {
                if ( e.name.includes( years )) {
                    schoolyears.push({
                        id: e.id,
                        name: e.name,
                        startDate: parse(e.startDate, "yyyyMMdd", new Date()),
                        endDate: parse(e.endDate, "yyyyMMdd", new Date())
                    });
                }
            });
        }

        // @ts-ignore
        // Delete all duplicates and create new unique schoolyear array
        const uniqueSchoolyears = schoolyears.filter(function(elem, pos) {
            // @ts-ignore
            return schoolyears.indexOf(elem) == pos;
        });

        // Sort array after years
        uniqueSchoolyears.sort((a, b) => {
            const na = parse(a.startDate, "yyyyMMdd", new Date());
            const nb = parse(b.startDate, "yyyyMMdd", new Date());
            // @ts-ignore
            return nb - na;
        });

        // @ts-ignore
        return uniqueSchoolyears;
    }
}

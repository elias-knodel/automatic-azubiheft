import { AxiosInstance } from "axios";
import WebUntis from "webuntis";

export class WebUntisCustom extends WebUntis {

    private axiosInstance: AxiosInstance;

    private buildCookiesCustom: Function;

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
        try {
            if (typeof response.data.data.blocks[0][0].lessonTopic.text !== "string")
                console.log("Server returned invalid data.");
            return response.data.data.blocks[0][0].lessonTopic.text;
        } catch (err) {
            console.log("Server returned no data.");
        }
    }
}

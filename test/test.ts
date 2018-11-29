import {Crawler} from "../src/";
import {Student} from "../src";
import * as fs from "fs";

const sessionId: string = process.env.SESSION_ID || '';

(async () => {

    const crawl: Crawler = new Crawler(sessionId);

    if (!await crawl.isLogged())
        throw new Error("Invalid session id");

    let year: number = 1;

    while (year < 3) {

        const students: Student[] = await crawl.fetchPromotion(year);

        if (students.length === 0)
            break;

        students.forEach(student => {
            fs.writeFileSync("data/" + student.id, JSON.stringify(student));
        });

        ++ year;
    }
})();

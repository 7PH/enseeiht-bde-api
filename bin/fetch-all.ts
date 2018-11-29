import {Crawler} from "../src/";
import {Student} from "../src";
import * as fs from "fs";

const DATA_FOLDER: string = 'data';

function sleep(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}

const sessionId: string = process.env.SESSION_ID || '';

(async () => {

    const crawl: Crawler = new Crawler(sessionId);

    if (!await crawl.isLogged())
        throw new Error("Invalid session id");

    let year: number = 1;

    while (true) {

        const studentIds: string[] = await crawl.fetchPromotion(year);

        for (let studentId of studentIds) {

            const student: Student = await crawl.fetchStudent(studentId);

            await sleep(2000);

            fs.writeFileSync(DATA_FOLDER + '/' + student.id, JSON.stringify(student));
        }

        if (studentIds.length === 0)
            break;

        ++ year;
    }
})();

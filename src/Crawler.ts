import * as request from "request-promise-native";
import {BDE} from "./BDE";
import {RequestPromise} from "request-promise-native";
import {Parser} from "./Parser";
import {Student} from "./Student";

export class Crawler {

    private static readonly REQUEST_COOLDOWN: number = 2000;

    private readonly cookieString: string;

    private readonly parser: Parser;

    constructor(sessionId: string) {

        this.cookieString = BDE.SESSION_ID_KEY + '=' + sessionId;

        this.parser = new Parser();
    }

    private sleep(ms: number): Promise<void> {
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    }

    private doGet(path: string): RequestPromise {

        const url: string = BDE.getUrl(path);

        console.log(url);

        return request.get(url, {
            headers: {
                'Cookie': this.cookieString
            }
        });
    }

    public async isLogged(): Promise<boolean> {

        return this.parser.isLogged(await this.doGet('/'));
    }

    public async fetchPromotion(year: number): Promise<Student[]> {

        const url: string = `/annuaire/?q=${year}A`;
        let studentIds: string[] = this.parser.parseSearch(await this.doGet(url));

        // anti spam does not like that apparently
        //return Promise.all(studentIds.map(studentId => this.fetchStudent(studentId)));

        let students: Student[] = [];
        for (let studentId of studentIds) {
            await this.sleep(Crawler.REQUEST_COOLDOWN);
            students.push(await this.fetchStudent(studentId));
        }
        return students;
    }

    public async fetchStudent(studentId: string): Promise<Student> {

        const url: string = '/annuaire/fiche/' + studentId;
        return this.parser.parseStudent(studentId, await this.doGet(url));
    }
}

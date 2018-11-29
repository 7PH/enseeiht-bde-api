import * as request from "request-promise-native";
import {BDE} from "./BDE";
import {RequestPromise} from "request-promise-native";
import {Parser} from "./Parser";
import {Student} from "./Student";

export class Crawler {

    private readonly cookieString: string;

    private readonly parser: Parser;

    constructor(sessionId: string) {

        this.cookieString = BDE.SESSION_ID_KEY + '=' + sessionId;

        this.parser = new Parser();
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

    public async fetchPromotion(year: number): Promise<string[]> {

        const url: string = `/annuaire/?q=${year}A`;
        return this.parser.parseSearch(await this.doGet(url));
    }

    public async fetchStudent(studentId: string): Promise<Student> {

        const url: string = '/annuaire/fiche/' + studentId;
        return this.parser.parseStudent(studentId, await this.doGet(url));
    }
}

import * as request from "request-promise-native";
import {BDE} from "./BDE";
import {RequestPromise} from "request-promise-native";
import {Parser} from "./Parser";

export class Crawler {

    private readonly cookieString: string;

    private readonly parser: Parser;

    constructor(sessionId: string) {

        this.cookieString = BDE.SESSION_ID_KEY + '=' + sessionId;

        this.parser = new Parser();
    }

    private doGet(path: string): RequestPromise {

        return request.get(BDE.getUrl(path), {
            headers: {
                'Cookie': this.cookieString
            }
        });
    }

    public async isLogged(): Promise<boolean> {

        return this.parser.isLogged(await this.doGet('/'));
    }
}

import {Crawler} from "./Crawler";

const sessionId: string = '';

(async () => {

    const crawl: Crawler = new Crawler(sessionId);
    const isLogged: boolean = await crawl.isLogged();
    console.log(isLogged);
})();

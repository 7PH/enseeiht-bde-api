import * as cheerio from "cheerio";
import {Student} from "./Student";

export class Parser {

    /**
     * Check if the user is currently logged
     *
     * @param html
     * @return {boolean} Whether the user is logged
     */
    public isLogged(html: string) {

        return html.indexOf('<a href="/auth/logout/?') !== -1;
    }

    /**
     * Parse a search result
     *
     * @param html
     * @return {string} List of paths to students page
     */
    public parseSearch(html: string): string[] {
        let $: CheerioStatic = cheerio.load(html);
        return $('.profil_court')
            .toArray()
            .map(v => v.attribs.href.replace('/annuaire/fiche/', ''));
    }

    /**
     * Parse a student page
     *
     * @param studentId
     * @param html
     */
    public parseStudent(studentId: string, html: string): Student {

        let $: CheerioStatic = cheerio.load(html);
        let student: Student = {
            id: studentId
        };
        $('table').find('tr').toArray().forEach(tr => {
            student[$(tr.children[1]).text()] = $(tr.children[3]).text();
        });
        return student;
    }
}

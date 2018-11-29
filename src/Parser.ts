
export class Parser {

    /**
     *
     *
     * @param html
     */
    public isLogged(html: string) {

        return html.indexOf('<a href="/auth/logout/?') !== -1;
    }
}

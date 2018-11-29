
export class BDE {

    public static readonly PROT: string = 'https';

    public static readonly HOST: string = 'www.bde.enseeiht.fr';

    public static readonly SESSION_ID_KEY: string = 'INPnetsessionid';

    public static getUrl(path: string): string {

        return BDE.PROT + '://' + BDE.HOST + path;
    }

}

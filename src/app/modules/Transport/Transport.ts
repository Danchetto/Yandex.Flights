import {HTTP_DOMEN, HEADER_CONTENT_TYPE, JSON_CONTENT_TYPE, POST, GET} from '../../constants/HttpConstants';

class Transport {

    private domen: any = HTTP_DOMEN;

    public async doGet(url: string) {
        return this.send(GET, url);
    }

    public async doPost(url: string, data: any = {}) {
        return this.send(POST, url, data);
    }

    private async send(method: string, url: string = '/', data: any = {}) {
        const options: any = {
            method: method,
            mode: 'cors'
        };

        if (method === POST) {
            options.body = JSON.stringify(data);
            const headers = new Headers();
            headers.append(HEADER_CONTENT_TYPE, JSON_CONTENT_TYPE);

            options.headers = headers;
        }

        return fetch(`${this.domen}${url}`, options)
            .then((response) => {
                return response;
            });
    }
}

const transport: any = new Transport();
export default transport;
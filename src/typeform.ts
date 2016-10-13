/**
 * Created by Maartje on 13/10/16.
 */
import request from 'request';
// import Promise from 'bluebird';

export class Typeform  {
    constructor(key) {
        this.key = key;
    }
    private key;
    private singleFormUrl = 'https://api.typeform.com/v1/form/';
    private multiFormsUrl = 'https://api.typeform.com/v1/forms';
    private keyUrl = '?key=';

    private _request(url) {
        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                if(res.statusCode === 200) {
                    resolve(res.body);
                } else if(err) {
                    reject(err);
                } else {
                    reject(res);
                }
            })
        })
    }

    public async getForms() {
        const fullUrl = this.multiFormsUrl.concat(this.keyUrl, this.key);
        const response = await this._request(fullUrl);
        return JSON.parse(response);
    }

     public async getForm (formId) {
        const fullUrl = this.singleFormUrl.concat(formId, this.keyUrl, this.key);
        const response = await this._request(fullUrl);
        return JSON.parse(response);

    }

}

const typeForm = new Typeform('451eb37af49fae6b347b3d143082fa8d9b5c272c');

typeForm.getForm('yWoKCp').then(data => {
    console.log(data);
});

typeForm.getForms().then(data => {
    console.log(data);
});
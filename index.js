exports.DiceWheelCallback = class {
    constructor (callbackSecret) {
        if(!callbackSecret) throw new Error('DiceWheel Callback: Вы не передали параметр callback_secret.');
    
        this.callbackSecret = callbackSecret;

        this.callbacks = [];

        this.fastify = new require('fastify')();

        this.fastify.post('/', request => {
            const { body } = request;

            if(!this.#check(body)) return { ok: false };

            this.callbacks.map(callback => callback(body));

            return { ok: true };
        });
    };

    #check (body) {
        const { sign } = body;
        
        delete body.sign;

        return (require('js-md5')(Object.keys(body).sort((a, b) => a.localeCompare(b)).reduce((_, key) => (_ + `&${key}=${body[key]}`), '') + `&${this.callbackSecret}`) === sign);
    };

    on (callback) {
        if(typeof callback !== 'function') throw new Error('DiceWheel Callback: Callback must be a function.');

        this.callbacks.push(callback);
    };

    start (port = 3000, host = '0.0.0.0') {
        return this.fastify.listen({ port, host });
    };

    stop () {
        return this.fastify.close();
    };
};

exports.DiceWheel = class {
    constructor (options = {}) {
        const { token, version } = options;

        if(!token) throw new Error('DiceWheel: Вы не передали ключ авторизации (token).');

        this.api = {
            token,
            headers: { Authorization: 'Bearer ' + token },
            url: 'http://194.58.96.8/api/',
            version: version || 'v1'
        };
    };

    callApi (method, data = {}, type = 'get') {
        return require('axios')[type](this.api.url + `${this.api.version}/` + method, { [type === 'get' ? 'params' : 'data']: data, headers: this.api.headers }).then(({ data }) => data);
    };

    getBalance () {
        return this.callApi('balance');
    };

    getTransactions (type = 'all', afterId = 0, limit = 20) {
        return this.callApi('transactions', { type, after_id: afterId, limit });
    };

    sendCoins (recipientId, amount) {
        return this.callApi('send_coins', { recipient_id: recipientId, amount }, 'post');
    };

    setCallback (url = '') {
        return this.callApi('callback', { url }, 'post');
    };

    dropCallback () {
        return this.callApi('callback', {}, 'delete');
    };
};
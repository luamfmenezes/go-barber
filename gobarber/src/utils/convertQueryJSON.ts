interface IObject {
    [key: string]: any;
}

export const JsonToQuery = (obj: IObject) => {
    if (obj === undefined || obj === null) return '';

    const values = Object.values(obj);
    const keys = Object.keys(obj);

    const resp = keys.reduce((save, current, index) => {
        if (
            values[index] === null ||
            values[index] === undefined ||
            values[index] === ''
        )
            return save;
        return save.concat(
            (index === 0 ? '?' : '&') +
                current +
                '=' +
                encodeURIComponent(values[index]),
        );
    }, '');

    return resp;
};

export const QueryToJson = (query: string): IObject => {
    let params = query.replace('?', '').split('&');
    let resp: IObject = {};

    params.forEach((el) => {
        const [key, content] = el.split('=');
        resp[key] = content;
    });
    return resp;
};

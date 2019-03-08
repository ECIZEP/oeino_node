// 过滤掉null和undefined值
export function filterNullAndUndefined(obj: Object): Object | Boolean {
    if (typeof obj === 'object' && !!obj) {
        Object.keys(obj).forEach(key => {
            if(!obj[key] && obj[key] !== 0) delete obj[key];
        })
        return obj;
    } else {
        return false;
    }
}
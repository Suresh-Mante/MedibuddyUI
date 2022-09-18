export const pascalCase = (str) => {
    let pascalStr = str;
    if (str != null && str.length > 0) {
        pascalStr = str[0].toUpperCase() + (str.length > 1 ? str.substr(1) : '');
    }

    return pascalStr;
}

export const getOptionsArray = (arr, property) => {
    return arr.map((item) => item[property]);
}

export const delayByXMs = async (X) => {
    return new Promise((a, b) => {
        setTimeout(() => {
            a();
        }, X);
    }).then(() => {
        return;
    }).catch(() => {
 
    });
 }

 export const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth().toString().length == 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate()}`;
 }
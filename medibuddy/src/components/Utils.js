export const pascalCase = (str) => {
    let pascalStr = str;
    if (str != null && str.length > 0) {
        pascalStr = str[0].toUpperCase() + (str.length > 1 ? str.substr(1) : '');
    }

    return pascalStr;
}
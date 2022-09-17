//returns response in following format
//{
//     statusCode: number,
//     message: string,
//     record: obj,
//     records: Array(obj)
// }
export const getDataFromServer = async (url, method, body = null, contentType = 'application/json') => {
    let response = await fetch(url, {
        method: method,
        headers:{
            "Content-Type": "application/json"
        },
        body: method.toLowerCase() != 'get' ? JSON.stringify(body): null
    }).then(async (response) => {
        return await response.json();
    }).catch((error) => {
        console.log(error);
        //write code for exception handling
    });

    return response;
}
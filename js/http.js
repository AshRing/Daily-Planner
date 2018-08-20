/*

Easy HTTP with ASYNC and AWAIT

*/

class EasyHTTP {
    //make an HTTP GET request
    async get(url) {
        const response = await fetch(url);

        const resData = await response.json();
        return resData;
    }

    //make HTTP POST request
    async post(url, data) {
        const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

        const resData = await response.json();
        return resData;    
        
    }

    //make an HTTP PUT 
    async put(url, data) {
        const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
        const resData = await response.json();
        return resData;
    }

    //make an HTTP DELETE request
    async delete(url) {
        const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            });

        const resData = await 'Resource deleted...';
        return resData;
    }
}

export const http = new EasyHTTP();
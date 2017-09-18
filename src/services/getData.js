const serverUrl = 'http://ec2-54-179-160-81.ap-southeast-1.compute.amazonaws.com:3000/';
export default function request(apiName, method, body, token){
    let headers = {
            'Accept': 'application/json',
            'Content-Type': 'x-www-form-urlencorded',
    }
    if(token){
        headers = { ...headers, 'Authorization': token };
    }
    let param = {
        method: method, 
        headers: headers,
        body: JSON.stringify(body)
    }
    if (method === 'GET') param = { headers: headers };
    let myRequest = new Request(serverUrl + apiName, param);

    return new Promise((resolve, reject) => {
        fetch(myRequest)
            .then((response) => {           
                 if(response.status == 200) return response.json(); 
                 else{
                     return reject(response) ;
                 }
            })

            .then((response) => { 
                return resolve(response);
            })           

            .catch((error) => {   
                console.error(error);           
                return reject(error) ;         
            })
    })
}


import { useCallback, useEffect, useState } from "react";

//function to handle the http request sending logic
// e.g., sending order data to backend server
//utility helpers for http requests
async function sendHttpRequest(url, config){
    const response = await fetch(url, config);
    const resData = await response.json();

    if(!response.ok){
        throw new Error(resData.message || 'Request failed!');
    }return resData;
}

export default function useHttp(url, config, intialData){
    const [data, setData] = useState(intialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const sendRequest = useCallback(async function sendRequest(){
        setIsLoading(true);
        try{
            const resData = await sendHttpRequest(url,config);
            setData(resData);
        }catch(error){
            setError(error.message || 'Something went wrong!');
        }
        setIsLoading(false);
    },[url, config]); 

    useEffect(() => {
        if(config && (config.method === 'GET' || !config.method) || !config)
        {
            sendRequest(); // auto send request for GET requests
        }

    },[sendRequest, config]);

    return{
        data,
        isLoading,
        error,
        sendRequest
    };
}
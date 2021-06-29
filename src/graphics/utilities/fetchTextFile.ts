
export const fetchTextFile = (url: string): Promise<string> => {
    return new Promise((resolve) => {

        const httpReq = new XMLHttpRequest();
        httpReq.open("GET", url, true);
        httpReq.send();

        httpReq.onreadystatechange = () => {
            if (httpReq.readyState == 4 && httpReq.status == 200)
                resolve(httpReq.responseText);
        };
    });
};

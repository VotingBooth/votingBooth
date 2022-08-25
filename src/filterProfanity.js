import axios from "axios";

export function filterProfanity(query) {

    return axios({
        url: `https://www.purgomalum.com/service/json?text=${query}`,
    }).then((response) => {
        return response.data.result;
    });

}
import { useEffect, useState } from "react";
import axios from "axios";

function useProfanityFilter(userInput) {
    const [filteredQuery, setFilteredQuery] = useState('')

    useEffect(() => {
        axios({
            url: `https://www.purgomalum.com/service/json?text=${userInput}`,
        }).then((response) => {
            setFilteredQuery(response.data.result);
            console.log(response.data.result)
        });
    }, [userInput])

    return { filteredQuery }
}

export default useProfanityFilter
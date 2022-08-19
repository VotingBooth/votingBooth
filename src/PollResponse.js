import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firebase } from './firebase'
import { ref, onValue, getDatabase } from 'firebase/database'

function PollResponse() {
    const [dataPollID, setDataPollID] = useState([]);

    useEffect(() => {
        const database = getDatabase(firebase)
        const dbRef = ref(database)

        onValue(dbRef, (response) => {
            const newState = [];

            const data = response.val()

            for (let fbkey in data) {
                newState.push([
                    data[fbkey]
                ])
            }
            setDataPollID(newState)
        })
    }, [])

    const { pollID } = useParams();

    return (
        <>
            <div>{pollID}</div>
            <p>Response</p>
        </>
    )
}

export default PollResponse
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firebase } from './firebase'
import { ref, getDatabase, onValue,  update, increment } from 'firebase/database'

function PollResponse() {
    const [dataPoll, setDataPoll] = useState([]);
    const [userSelection, setUserSelection] = useState("")
    const pollId = "-NA6ECppJ3JdPUXNNMpU"

    useEffect(() => {
        const database = getDatabase(firebase)
        const dbRef = ref(database, `${pollId}/question`)
        onValue(dbRef, (response) => {
            setDataPoll(response.val())
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const database = getDatabase(firebase)
        const dbRef = ref(database, `${pollId}/answer`)

        if (userSelection === "no" ) {
            update(dbRef, {
                no: increment(1)
            });
        } else if (userSelection === "yes") {
            update(dbRef, {
                yes: increment(1)
            });
        }
    }

    const handleChange = (e) => {
        setUserSelection(e.target.value)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>{dataPoll}</p>
                <label htmlFor='pollQuestion'>
                    <input type="radio" id="pollQuestion" value="yes" name="pollQuestion" onChange={handleChange}
                    />Yes
                    <input type="radio" id="pollQuestion" value="no" name="pollQuestion" onChange={handleChange}
                    />No
                </label>
                <button>Submit</button>
            </form>
        </>
    )
}

export default PollResponse
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { firebase } from './firebase'
import { ref, getDatabase, onValue,  update, increment } from 'firebase/database'
import ShareButton from './ShareButton'

function PollResponse() {
    const [dataPoll, setDataPoll] = useState([]);
    const [userSelection, setUserSelection] = useState("")
    const { pollID } = useParams();   
    let navigate = useNavigate();

    useEffect(() => {
        const database = getDatabase(firebase)
        const dbRef = ref(database, `${pollID}/question`)
        onValue(dbRef, (response) => {
            setDataPoll(response.val())
        })
    }, [pollID])

    const handleSubmit = (e) => {
        e.preventDefault();
        const database = getDatabase(firebase)
        const dbRef = ref(database, `${pollID}/answer`)

        if (userSelection === "no" ) {
            update(dbRef, {
                no: increment(1)
            });
        } else if (userSelection === "yes") {
            update(dbRef, {
                yes: increment(1)
            });
        }

        navigate(`/poll/${pollID}/results`)
    }

    const handleChange = (e) => {
        setUserSelection(e.target.value)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <legend>{dataPoll}</legend>
                <label htmlFor='pollQuestion'>
                    <input type="radio" id="pollQuestion" value="yes" name="pollQuestion" onChange={handleChange}
                    />Yes
                    <input type="radio" id="pollQuestion" value="no" name="pollQuestion" onChange={handleChange}
                    />No
                </label>
                <button>Submit</button>
                <ShareButton shareTitle='Poll Results' shareURL={window.location.href} />
            </form>
        </>
    )
}

export default PollResponse;
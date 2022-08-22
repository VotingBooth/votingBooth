
import {firebase} from './firebase';
import { getDatabase, ref, push, update } from 'firebase/database';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function PollCreate() {
    const [question, setQuestion] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setQuestion(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const database = getDatabase(firebase)
        const dbRef = ref(database)
        const newKey = push(dbRef).key;
        const postData = {
            question: question
        }
        const updates = {};
        updates[ newKey + '/'] = postData
        update(dbRef, updates);

        navigate(`/poll/${newKey}`);

    }


    return (

        <div>
            <h2>Enter your poll question below</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='userInput'>Please enter your question:</label>
                <input maxlength='140' type="text" id='userInput' onChange={handleChange}/>
                <button>
                    <p>Submit Question</p>
                </button>
            </form>
        </div>
    )
}

export default PollCreate
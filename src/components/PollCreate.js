
import { firebase } from '.././helpers/firebase';
import { getDatabase, ref, push, update } from 'firebase/database';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterProfanity } from '.././helpers/filterProfanity'
import '.././styling/PollCreate.scss'

function PollCreate() {
    const [question, setQuestion] = useState();
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setQuestion(e.target.value)
    }

    const handleAnswer1 = (e) => {
        setAnswer1(e.target.value)
    }

    const handleAnswer2 = (e) => {
        setAnswer2(e.target.value)
    }

    const handleAnswer3 = (e) => {
    setAnswer3(e.target.value)
    }

    const handleAnswer4 = (e) => {
    setAnswer4(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Error Handling to ensure unique answers
        if (answer1 === answer2 || answer1 === answer3 || answer1 === answer4 || answer2 === answer3 || answer2 === answer4 || (answer3 === answer4 && answer4 !== "") ) {
            alert('You need to enter unique answers')
            return
        }
        // RegExp inspired by Stack Overflow
        if ((answer1.replace(/\s/g, '').length > 0) || (answer2.replace(/\s/g, '').length > 0) || (answer3.replace(/\s/g, '').length> 0) || (answer4.replace(/\s/g, '').length > 0)) {
            alert('You cannot blank answers')
            return
        }
        
        // Firebase Database Initiatlization
        const database = getDatabase(firebase)
        const dbRef = ref(database)
        const newKey = push(dbRef).key;
        try {
            const [filteredA1, filteredA2, filteredA3, filteredA4, filteredQ] = await Promise.all([filterProfanity(answer1), filterProfanity(answer2), filterProfanity(answer3), filterProfanity(answer4), filterProfanity(question)]);
            const postData = {
                question: filteredQ,
                answer: {
                    [filteredA1]: 0,
                    [filteredA2]: 0,
                    [filteredA3]: 0,
                    [filteredA4]: 0
                }
            }
            const updates = {};
            updates[newKey + '/'] = postData
            update(dbRef, updates);
            navigate(`/poll/${newKey}`);

        } catch (error) {
            console.log(error)
            // if try fails, continue with database storage, with unfiltered questions
            const postData = {
                question: question,
                answer: {
                    [answer1]: 0,
                    [answer2]: 0,
                    [answer3]: 0,
                    [answer4]: 0
                }
            }
            const updates = {};
            updates[newKey + '/'] = postData
            update(dbRef, updates);
            navigate(`/poll/${newKey}`);
        }

    }

    return (
        <>
            <header>
                <div className="appInfo">
                    <h2>Welcome to your favorite Anonymous Voting Booth</h2>
                    <p>Enter your poll question below, along with options and we will create a shareable link.</p>
                    <p>Reducing the stress of decision making, one poll at a time </p>
                </div>
            </header>
            <main className='wrapper'>
                <div className='pollCreation'>
                    <h2>Create your Poll below</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='userInput' className='sr-only'>Question</label>
                        <input maxLength='140' type="text" id='userInput' onChange={handleChange} placeholder='What would you like to ask?' className='question' required />
                        <div className='answers'>
                            <label htmlFor='answer1' className='sr-only'>Option #1</label>
                            <input maxLength='140' type='text' id='answer1' onChange={handleAnswer1} placeholder='Required' required/>
                            <label htmlFor='answer2' className='sr-only'>Option #2</label>
                            <input maxLength='140' type='text' id='answer2' onChange={handleAnswer2} placeholder='Required' required/>
                            <label htmlFor='answer3' className='sr-only'>Option #3</label>
                            <input maxLength='140' type='text' id='answer3' onChange={handleAnswer3} placeholder='Optional' />
                            <label htmlFor='answer4' className='sr-only'>Option #4</label>
                            <input maxLength='140' type='text' id='answer4' onChange={handleAnswer4} placeholder='Optional' />
                        </div>
                        <button>
                            <p>Create Poll</p>
                        </button>
                    </form>
                </div>
            </main >
        </>
    )
}

export default PollCreate
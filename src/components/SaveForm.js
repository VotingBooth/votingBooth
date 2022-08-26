
import { useParams } from 'react-router-dom'
import firebase from '../helpers/firebase';
import { ref, getDatabase, onValue, update,remove } from 'firebase/database'
import '.././styling/PollResponse.scss';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

function SaveForm(){
    const { pollID } = useParams();
    const {currentUser} = useContext(AuthContext)

    const handleClick=()=>{
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        const loggedInRef = ref(database, `loggedIn/${[currentUser.uid]}`)
        const anonRef = ref(database, `anonymous/${[pollID]}`)
        onValue(dbRef, (response) => {
            const pollObject = (response.val().anonymous[pollID]);
            
            console.log(pollObject, currentUser.uid)
            const loggedInPoll = {
        
                    [pollID]:pollObject
                
            }
            update(loggedInRef, loggedInPoll)
            remove(anonRef)
            return
        })

    }



    return(
        
        
        currentUser ?
            <button onClick={handleClick}>save poll</button>
            :
            null
            // 
            // <button><Link to="/login">Login</Link></button>
        
    
    // <button>fsfsd</button>
    )
}

export default SaveForm
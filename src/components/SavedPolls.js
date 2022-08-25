import { Link } from "react-router-dom";


const SavedPolls = () => {
    return(
        <>
            <h2>These are your saved polls!</h2>
            <Link to="/">Create Polls</Link>
        </>    
    ) 
}

export default SavedPolls;
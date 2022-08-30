import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 

const ErrorPage = () => {
    return (
        <div>
            <Helmet>
                <title>Uh oh, Wrong Page</title>
            </Helmet>
            
            <h1>Uh oh,</h1>
            <p>Looks like you're not where you're supposed to be.</p>
            <p>Error 404</p>
                <button>
                    <Link to="/" className="homeButton">Create poll</Link>
                </button>
            
        </div>
    )
}

export default ErrorPage;
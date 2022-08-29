import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <h1>Uh oh,</h1>
            <p>Looks like you're not where you're supposed to be.</p>
                <button>
                    <Link to="/" className="homeButton">Create poll</Link>
                </button>
            
        </div>
    )
}

export default ErrorPage;
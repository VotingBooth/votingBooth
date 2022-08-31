import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Error Page used for routes that do not match existing routing.
// Espeically important as we use unique keys and user IDs as URL params.
function ErrorPage() {
    return (
        <div>
            {/* Helmet used to update Document Title */}
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
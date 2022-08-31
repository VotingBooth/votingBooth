import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";
import '.././styling/ShareButton.scss';

function ShareButton({ shareTitle, shareURL }) {
    // Creating state to show copied status
    const [copied, setCopied] = useState(false);

    // creating shareData object from props
    const shareData = {
        title: shareTitle,
        url: shareURL
    }

    // Create state to hold the URL
    const [share, setShare] = useState([])

    // on page load get shareURL data, and pass into setShare state
    useEffect(() => {
        setShare(shareURL)
    }, [shareURL])

    // handleClick calls built in navigator function with shareData
    const handleClick = async () => {
        try {
            await navigator.share(shareData)
        }
        catch (err) {
            alert('error')
        }

    }
    return (
        navigator.canShare ? <button onClick={handleClick} className='navButton'>Share!</button> :
            // if page doesn't have navigator, show url
            // use copy to clipboard component to copy url to users clipboard on click
            <CopyToClipboard text={share}>
                <div className="copyToClipBoardContainer">
                    <label className="sr-only" htmlFor="shareButton">Link to Share Poll</label>
                    <input type='text' id="shareButton" defaultValue={share} disabled />
                    <button className="shareButton" onClick={() => { setCopied(true) }}>
                        {
                            !copied ?
                                <p>Copy Poll Link</p>
                                :
                                <p>Copied ✔</p>
                        }
                    </button>
                </div>
            </CopyToClipboard>
    )
}

export default ShareButton
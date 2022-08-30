import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";
import '.././styling/ShareButton.scss';
import ReactTooltip from "react-tooltip";

function ShareButton({ shareTitle, shareURL }) {

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

    const handleClick = async () => {
        try {
            await navigator.share(shareData)
        }
        catch (err) {
            alert('error')
        }

    }
    return (
        navigator.canShare ? <button onClick={handleClick} className='shareButton'>Share!</button> :
            // if page doesn't have navigator, show url
            <CopyToClipboard text={share}>
                <div className="copyToClipBoardContainer">
                    <label className="sr-only" htmlFor="shareButton">Link to Share Poll</label>
                    <input type='text' id="shareButton" defaultValue={share} disabled/>
                    <button className="shareButton" data-tip data-for="copySuccessful" data-event='click' clickable={true} >Copy Poll Link</button>
                    <ReactTooltip type="success" id="copySuccessful" place="right" effect="solid" delayHide={1000}>
                        Copied ✔
                    </ReactTooltip>
                </div>
            </CopyToClipboard>

    )



}

export default ShareButton
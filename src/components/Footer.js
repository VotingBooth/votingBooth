import '.././styling/Footer.scss';


function Footer() {
    return (
        <footer>
            <div className='footerContent'>
                <p>
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/VotingBooth/votingBooth">Created at Juno</a>
                </p>
                <p>Collaborators -
                    <a target="_blank" rel="noopener noreferrer" href="https://www.connorrobock.com/">Connor,</a>
                    <a target="_blank" rel="noopener noreferrer" href="https://kaitlynwcodes.ca/">Kaitlyn,</a>
                    <a target="_blank" rel="noopener noreferrer" href="https://portfolio.gourlay.me/">Nick,</a>
                    and
                    <a target="_blank" rel="noopener noreferrer" href="https://paridhishah.dev/">Paridhi</a>
                </p>
            </div>
        </footer>
    )
}

export default Footer;
import { FaGithubSquare, FaLinkedin, FaFolderOpen } from 'react-icons/fa';
import '.././styling/AboutUs.scss';
import { Helmet } from 'react-helmet'; 


function AboutUs () {
    return (
        <section className="aboutUs">
            <Helmet>
                <title>About the Creators</title>
            </Helmet>
            <div className="wrapper flexContainer">
                <div className="imgContainer">
                    <img src="http://placekitten.com/300/300" alt="headshot of creators"/>
                    <div className="socialContainer">
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/ConnorRobock" >
                            <FaGithubSquare />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/connor-robock-00671968/">
                            <FaLinkedin />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://kaitlynwcodes.ca/">
                            <FaFolderOpen />
                        </a>
                    </div>
                </div>
                <div className="imgContainer">
                    <img src="http://placekitten.com/300/300" alt="headshot of creators"/>
                    <div className="socialContainer">
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/kaitlynw88">
                            <FaGithubSquare />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/kaitlyn-wickson-8a346766/">
                            <FaLinkedin />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://kaitlynwcodes.ca/">
                            <FaFolderOpen />
                        </a>
                    </div>
                </div>
                <div className="imgContainer">
                    <img src="http://placekitten.com/300/300" alt="headshot of creators"/>
                    <div className="socialContainer">
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/NicholG90">
                            <FaGithubSquare />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/connor-robock-00671968/">
                            <FaLinkedin />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://portfolio.gourlay.me/">
                            <FaFolderOpen />
                        </a>
                    </div>
                </div>
                <div className="imgContainer">
                    <img src="http://placekitten.com/300/300" alt="headshot of creators"/>
                    <div className="socialContainer">
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/ConnorRobock">
                            <FaGithubSquare />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/connor-robock-00671968/">
                            <FaLinkedin />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.connorrobock.com/">
                            <FaFolderOpen />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default AboutUs
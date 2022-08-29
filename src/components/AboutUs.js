import { FaGithubSquare, FaLinkedin, FaFolderOpen } from 'react-icons/fa';
import '.././styling/AboutUs.scss'

function AboutUs () {
    return (
        <section className="aboutUs">
            <div className="wrapper flexContainer">
                <div className="imgContainer">
                    <img src="http://placekitten.com/300/300" alt="headshot of creators"/>
                    <div className="socialContainer">
                        <a target="_blank" href="https://github.com/ConnorRobock">
                            <FaGithubSquare />
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/in/connor-robock-00671968/">
                            <FaLinkedin />
                        </a>
                        <a target="_blank" href="https://kaitlynwcodes.ca/">
                            <FaFolderOpen />
                        </a>
                    </div>
                </div>
                <div className="imgContainer">
                    <img src="http://placekitten.com/300/300" alt="headshot of creators"/>
                    <div className="socialContainer">
                        <a target="_blank" href="https://github.com/kaitlynw88">
                            <FaGithubSquare />
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/in/kaitlyn-wickson-8a346766/">
                            <FaLinkedin />
                        </a>
                        <a target="_blank" href="https://kaitlynwcodes.ca/">
                            <FaFolderOpen />
                        </a>
                    </div>
                </div>
                <div className="imgContainer">
                    <img src="http://placekitten.com/300/300" alt="headshot of creators"/>
                    <div className="socialContainer">
                        <a target="_blank" href="https://github.com/NicholG90">
                            <FaGithubSquare />
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/in/connor-robock-00671968/">
                            <FaLinkedin />
                        </a>
                        <a target="_blank" href="https://portfolio.gourlay.me/">
                            <FaFolderOpen />
                        </a>
                    </div>
                </div>
                <div className="imgContainer">
                    <img src="http://placekitten.com/300/300" alt="headshot of creators"/>
                    <div className="socialContainer">
                        <a target="_blank" href="https://github.com/ConnorRobock">
                            <FaGithubSquare />
                        </a>
                        <a target="_blank" href="https://www.linkedin.com/in/connor-robock-00671968/">
                            <FaLinkedin />
                        </a>
                        <a target="_blank" href="https://www.connorrobock.com/">
                            <FaFolderOpen />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default AboutUs
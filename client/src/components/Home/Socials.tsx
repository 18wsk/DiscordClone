import React from 'react'
import { BsGithub, BsLinkedin, BsTwitch, BsTwitter } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Socials = () => {
    return (
        <div className="flex flex-row gap-x-6">
            <Link to="https://github.com/18wsk" target="_blank" rel="noopener">
                <BsGithub size={30} color={"#3e47c9"} className="hover:fill-blue-600"/>
            </Link>
            <Link to="https://www.linkedin.com/in/william-kennedy-0a917319b/" target="_blank" rel="noopener">
                <BsLinkedin size={30} color={"#3e47c9"} className="hover:fill-blue-600"/>
            </Link>
            <Link to="https://twitter.com/notchillis" target="_blank" rel="noopener">
                <BsTwitter size={30} color={"#3e47c9"} className="hover:fill-blue-600"/>
            </Link>
            <Link to="https://www.twitch.tv/notchillis" target="_blank" rel="noopener">
                <BsTwitch size={30} color={"#3e47c9"} className="hover:fill-blue-600"/>
            </Link>
        </div>
    )
}

export default Socials
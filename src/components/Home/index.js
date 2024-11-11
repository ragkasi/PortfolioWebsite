import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import { Link } from 'react-router-dom';
import LogoR from '../../assets/images/R.png';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import Logo from './Logo';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = "aghav.".split("");

    useEffect(() => {
        const timerId = setTimeout(() => {
          setLetterClass('text-animate-hover');
        }, 4000);
      
        return () => {
          clearTimeout(timerId);
        };
      }, []);

    return(
      <>
        <div className = "container home-page">
            <div className="text-zone">
                <h1>
                <span className = {`${letterClass} _8`}>H</span>
                <span className = {`${letterClass} _9`}>i</span>
                <br /> 
                <span className = {`${letterClass} _10`}>I</span>
                <span className = {`${letterClass} _11`}>'m</span>
                <img src={LogoR} alt = "developer" />
                <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={12} />
                </h1>
                <h2>Computer Science & Engineering, 2026 at The Ohio State University</h2>
                <Link to="/contact" className="flat-button">CONTACT ME</Link>
            </div>
            <Logo className="Home"/>
        </div>
        <Loader type="pacman" />
      </>
    )
}

export default Home
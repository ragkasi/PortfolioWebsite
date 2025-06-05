import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import { Link } from 'react-router-dom';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import Logo from './Logo';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = "Raghav".split("");

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
                <span className = {`${letterClass} _9`}>e</span>
                <span className = {`${letterClass} _9`}>l</span>
                <span className = {`${letterClass} _9`}>l</span>
                <span className = {`${letterClass} _9`}>o</span>
                <span className = {`${letterClass} _9`}> </span>
                <span className = {`${letterClass} _9`}>W</span>
                <span className = {`${letterClass} _9`}>o</span>
                <span className = {`${letterClass} _9`}>r</span>
                <span className = {`${letterClass} _9`}>l</span>
                <span className = {`${letterClass} _9`}>d</span>
                <span className = {`${letterClass} _9`}>!</span>
                <br /> 
                <span className = {`${letterClass} _10`}>I</span>
                <span className = {`${letterClass} _11`}>'m</span>
                
                <span className = {`${letterClass} _11`}> </span>
                <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={12} />
                <span className = {`${letterClass} _9`}>. </span>
                </h1>
                <h2>Computer Science & Engineering at The Ohio State University</h2>
                <Link to="/contact" className="flat-button">CONTACT ME</Link>
            </div>
            <Logo className="Home"/>
        </div>
        <Loader type="pacman" />
      </>
    )
}

export default Home
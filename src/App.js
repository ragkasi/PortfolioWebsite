import React, { useEffect, useState, useCallback } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import Work from './components/Work';
import Tech from './components/About/Tech';
import Dev from './components/About/Dev';
import SubwaySurfersButton from './components/SubwaySurfersButton';
import SubwaySurfersPanel from './components/SubwaySurfersPanel';

// Custom hook for speech synthesis
const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [currentSubtitle, setCurrentSubtitle] = useState('');

  const speak = useCallback((text) => {
    // Don't speak if we're already speaking the same text
    if (isSpeaking && text === currentText) {
      return;
    }

    // Cancel any existing speech
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentText('');
    setCurrentSubtitle('');

    // Split text into sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    let currentIndex = 0;

    const speakNextSentence = () => {
      if (currentIndex >= sentences.length) {
        setIsSpeaking(false);
        setCurrentText('');
        setCurrentSubtitle('');
        return;
      }

      const sentence = sentences[currentIndex].trim();
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setCurrentText(text);
        setCurrentSubtitle(sentence);
      };

      utterance.onend = () => {
        currentIndex++;
        speakNextSentence();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentText('');
        setCurrentSubtitle('');
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNextSentence();
  }, [isSpeaking, currentText]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentText('');
    setCurrentSubtitle('');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { speak, stop, isSpeaking, currentSubtitle };
};

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { speak, stop, currentSubtitle } = useSpeechSynthesis();

  const handleSubwaySurfersClick = () => {
    // Stop any existing speech
    stop();
    
    // Check if we're on the work page
    const isWorkPage = window.location.pathname === '/work';
    
    let textContent = '';
    
    if (isWorkPage) {
      // On work page, get the heading and titles
      const heading = document.querySelector('.page-title')?.textContent || 'Work experience';
      const titles = Array.from(document.querySelectorAll('.timeline-content h2'))
        .map(h2 => h2.textContent)
        .join('. ');
      textContent = `${heading}. ${titles}`;
    } else {
      // For other pages, use the existing logic but preserve sentence structure
      const mainContent = document.querySelector('main') || document.body;
      const contentClone = mainContent.cloneNode(true);
      
      // Remove all interactive and unwanted elements
      const elementsToRemove = contentClone.querySelectorAll(`
        script, 
        .subway-surfers-button, 
        .subway-surfers-panel, 
        [class*="script"], 
        [id*="script"], 
        noscript, 
        button, 
        [role="button"], 
        [type="button"], 
        [type="submit"],
        a,
        [role="link"],
        [role="menuitem"],
        [role="tab"],
        [role="option"],
        [role="checkbox"],
        [role="radio"],
        [role="switch"],
        [role="searchbox"],
        [role="textbox"],
        [role="combobox"],
        [role="listbox"],
        [role="menu"],
        [role="menubar"],
        [role="navigation"],
        [role="tablist"],
        [role="toolbar"],
        [role="tree"],
        [role="treeitem"],
        [contenteditable="true"],
        [tabindex],
        [onclick],
        [onmouseover],
        [onmouseout],
        [onfocus],
        [onblur],
        [onkeydown],
        [onkeyup],
        [onkeypress],
        [onmousedown],
        [onmouseup],
        [onmousemove],
        [ondblclick],
        [onwheel],
        [onscroll],
        [onresize],
        [onload],
        [onunload],
        [onchange],
        [onsubmit],
        [onreset],
        [onselect],
        [onblur],
        [onfocus],
        [oninput],
        [oninvalid],
        [onreset],
        [onsearch],
        [onselect],
        [onsubmit]
      `);
      elementsToRemove.forEach(el => el.remove());

      // Get all text content while preserving sentence structure
      const paragraphs = Array.from(contentClone.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li'))
        .map(el => el.textContent.trim())
        .filter(text => text.length > 0);

      textContent = paragraphs.join('. ');
    }
    
    // Clean up the text content
    textContent = textContent
      .replace(/\s+/g, ' ')
      .replace(/[🏃‍♂️×]/g, '')
      .replace(/EmailJS.*$/, '')
      .replace(/You need to enable JavaScript.*$/, '')
      .replace(/Click here.*$/g, '')
      .replace(/Click to.*$/g, '')
      .replace(/Click.*$/g, '')
      .replace(/Button.*$/g, '')
      .replace(/Link.*$/g, '')
      .replace(/Menu.*$/g, '')
      .replace(/Submit.*$/g, '')
      .trim();
    
    setIsPanelOpen(true);
    
    // Start new speech
    speak(textContent);
  };

  const handlePanelClose = () => {
    stop();
    setIsPanelOpen(false);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="about/tech" element={<Tech />} />
          <Route path="about/dev" element={<Dev />} />
          <Route path="contact" element={<Contact />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="work" element={<Work />} />
        </Route>
      </Routes>
      <SubwaySurfersButton onClick={handleSubwaySurfersClick} />
      <SubwaySurfersPanel 
        isOpen={isPanelOpen}
        onClose={handlePanelClose}
        pageText={currentSubtitle}
      />
    </>
  );
}

export default App;

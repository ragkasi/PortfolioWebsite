import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './index.scss';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ResumeViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`resume-viewer-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="resume-header">
        <h3>My Resume</h3>
        <button 
          className="fullscreen-btn" 
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? 'Exit' : 'Fullscreen'}
        </button>
      </div>
      <div className="pdf-container">
        <Document
          file="/resume.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="loading">Loading resume...</div>}
          error={<div className="error">Failed to load resume. Please ensure resume.pdf is in the public folder.</div>}
        >
          <Page 
            pageNumber={pageNumber} 
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="pdf-page"
          />
        </Document>
      </div>
      {numPages > 1 && (
        <div className="pdf-controls">
          <button 
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
            className="nav-button"
          >
            Previous
          </button>
          <span className="page-info">
            Page {pageNumber} of {numPages}
          </span>
          <button 
            onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
            disabled={pageNumber >= numPages}
            className="nav-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeViewer;

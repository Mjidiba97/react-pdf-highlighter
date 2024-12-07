import React, { useState } from "react";
import { PDFHighlights } from "./components/PDFHighlights";
import { explanation } from "./explanation";
import "./style/App.css";

/** Main application component */
export function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div>
      <button onClick={togglePopup} className="btn-open-popup">
        Open PDF Highlights
      </button>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button onClick={togglePopup} className="btn-close-popup">
              Close
            </button>
            <PDFHighlights url={explanation.url} highlights={explanation.highlights} />
          </div>
        </div>
      )}
    </div>
  );
}

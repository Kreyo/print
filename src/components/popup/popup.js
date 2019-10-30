import React from 'react';
import './popup.css';

function Popup({ children }) {
    return (
        <div className="popup-overlay">
            <div className="popup">
                {children}
            </div>
        </div>
    );
}

export default Popup;

import React, { createContext, useState } from 'react';
import FlashAlert from '../components/elements/FlashAlert.jsx';

const FlashContext = createContext();

const FlashProvider = ({ children }) => {
    const [alert, setAlert] = useState("");

    const setFlash = (type, message) => {
        setAlert({ type, message });
    };    

    const clearAlert = () => {
        setAlert("");
    };

    return (
        <FlashContext.Provider value={{ alert, setFlash }}>
            {alert && (
                <div className="fixed bottom-4 right-4">
                    <FlashAlert type={alert.type} message={alert.message} onClose={clearAlert} />
                </div>
            )}
            {children}
        </FlashContext.Provider>
    );
};

export { FlashContext, FlashProvider };

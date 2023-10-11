import React, { createContext, useState } from 'react';
import useConfig from './hooks/useConfig.jsx';
import Loading from '../components/Loading.jsx';
const WebsiteContext = createContext();

const WebsiteProvider = ({ children }) => {
    const {
        website, loading, setConfig
    } = useConfig();

    return (loading ? <Loading /> : (
        <WebsiteContext.Provider value={{ website, loading, setConfig }}>
            {children}
        </WebsiteContext.Provider>
    ));
};

export { WebsiteContext, WebsiteProvider };

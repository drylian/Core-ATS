import { useState, useEffect } from 'react';

import http from '../../api/http';
export default function useConfig() {
    const [loading, setLoading] = useState(true);
    const [website, setWebsite] = useState();

    const setConfig = (payload) => {
        setWebsite({ ...payload });
    };
    useEffect(() => {
        (async () => {
            try {
                const response = await http(`/api/application`);
                const valores = response.data;
                /**
                 * Armazena as informações no state
                 */
                window.Website = valores.Website
                console.log(response)
                setConfig(valores)
            } catch (e) {
                console.error(e)
            }
            setLoading(false);
        })()
    }, []);

    return { website, loading, setConfig };
}
import React, { useState } from "react";

import Header from "../../components/Header";

const Tests: React.FC = () => {
    const [show, setShow] = useState(false);

    const handleButtonClick = () => {
        setShow(true);
    };

    return (
        <>
        <Header/>
 
        </>
    );
};

export default Tests;

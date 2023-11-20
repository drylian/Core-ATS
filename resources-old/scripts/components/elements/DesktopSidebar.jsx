import React, { useState } from "react";

const DesktopSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <nav
                className={`w-60 bg-white p-4 transition-transform duration-300 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Conteúdo da sidebar */}
            </nav>

            {/* Content */}
            <div className="flex-grow p-4">
                {/* Conteúdo principal */}
            </div>

            {/* Botão de alternância da sidebar */}
            <button
                className="fixed top-4 right-4 lg:hidden bg-gray-500 p-2 rounded-md text-white"
                onClick={toggleSidebar}
            >
                {isOpen ? "Fechar" : "Abrir"}
            </button>
        </div>
    );
};

export default DesktopSidebar;

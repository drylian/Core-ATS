import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import ContentBox from "../../components/admin/ContentBox"
function Admin() {
    return (
        <ContentBox title="Administração">
            <div className="flex">
                {/* Barra lateral */}
                <Sidebar />

                {/* Conteúdo principal */}
                <div className="flex-1 p-4">
                    
                </div>
            </div>
        </ContentBox>
    );
}

export default Admin;

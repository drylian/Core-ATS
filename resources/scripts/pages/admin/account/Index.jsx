import React, { useEffect, useState } from 'react';
import account from '../../../api/admin/account';

function Account() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fazer a solicitação GET para "/admin/account"
        account()
            .then((response) => {
                setUsers(response.data); // Armazenar os dados do usuário no estado
            })
            .catch((error) => {
                console.error('Erro ao buscar dados do usuário:', error);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Usuários</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Permissions</th>
                        <th>CreatedAt</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.permissions}</td>
                            <td>{user.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Account;

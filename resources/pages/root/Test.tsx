import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import ContentBox from "../../components/elements/ContentBox";
import application from "../../axios/api/application";

interface User {
  id: number;
  username: string;
  email: string;
}

const Test: React.FC = () => {
  const [users, setApiData] = useState<User[] | null >(null);

  useEffect(() => {
    application().then((data: Array<User>) => {
      setApiData(data);
    });
  }, []);

  const renderUserTable = () => {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tabela de Usuários</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">E-mail</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <Header />
      <ContentBox title="Bem-vindo ao Nosso Site">{renderUserTable()}</ContentBox>
    </>
  );
};

export default Test;

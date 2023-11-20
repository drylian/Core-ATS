import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../../../states';
import 'boxicons/css/boxicons.min.css';
import styled from 'styled-components';
import { delItem } from '../Storage';
import { delCookie } from '../CookieController';

const HeaderContainer = styled.header`
  position: fixed;
  top: 5px;
  left: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserBox = styled.div`
background-color: rgba(0, 0, 0, 0.4);
backdrop-filter: blur(8px);
color: white;

`

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #00f;
  }
`;

const FloatingMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #000;
  max-width: 300px;
  margin: 0 auto;
  margin-right: 50px;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  z-index: 1000;
  padding: 10px;
  overflow: hidden;
  border-radius: 8px;
  max-height: ${(props) => (props.isOpen ? '100%' : '0')};
  transition: max-height 0.5s ease;
  overflow: hidden;
`;

const MenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const MenuItem = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 5px 0;
  display: block;
  transition: color 0.3s ease;
  &:hover {
    color: #00f;
  }
`;

const Header = ({ links }) => {
  const website = store.getState().website.data;
  const User = store.getState().user.data;
  const navegate = useNavigate()


  const [showLinks, setShowLinks] = useState(false);
  const [showMenuButton, setShowMenuButton] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setShowMenuButton(screenWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!links) {
    links = [
      { name: 'Painel', to: 'https://alternight.com.br' },
      { name: 'MyPHPAdmin', to: 'https://admin.alternight.com.br' },
      { name: 'Termos de Serviço', to: '/termsofservice' },
    ];
  }

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  /**
   * remove o usuário
   */
  const handleLogout = () => {
    delCookie("alternightuser")
    delItem("remember_me")
    store.getActions().user.delUser()
    navegate("/auth/login")
  }

  return (
    <>
      <HeaderContainer>
        <div className={`text-xl font-bold animate-pulse`}>
          {!website ? 'Carregando...' : website.title}
        </div>
        {showMenuButton && (
          <MenuButton onClick={toggleLinks}>
            {showLinks ? (
              <i className={`bx bx-menu`} />
            ) : (
              <i className={`bx bx-menu`} />
            )}
          </MenuButton>
        )}
        {!showMenuButton && (
          <>
            <div className="space-x-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.to ? link.to : null}
                  onClick={link.onClick ? () => link.onClick : null}
                  className="transition duration-300 hover:text-blue-200 hover:bg-blue-500 hover:border-blue-500 border border-transparent px-4 py-2 rounded-full text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="space-x-1">
              {website && User ? (
                <UserBox className="p-1 rounded-lg shadow-md bg-gray-100">
                  <div className="flex items-center justify-center text-white text-sm">
                    {User.email}
                  </div>
                  <div className="mt-1 flex justify-between">
                    <Link
                      to="/account"
                      className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 transition duration-300"
                    >
                      Configurações
                    </Link>
                    {User.permissions >= 2000 &&(
                    <Link
                      to="/admin"
                      className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 transition duration-300"
                    >
                      Administração
                    </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="px-2 py-1 text-xs text-red-500 hover:text-red-700 transition duration-300"
                    >
                      Deslogar
                    </button>
                  </div>
                </UserBox>
              ) : (
                <Link
                  to="/auth/login"
                  className="transition duration-300 hover:text-blue-200 hover:bg-blue-500 hover:border-blue-500 border border-transparent px-4 py-2 rounded-full text-sm font-medium"
                >
                  Fazer Login
                </Link>
              )}
            </div></>
        )}
      </HeaderContainer>

      <FloatingMenu isOpen={showLinks}>
        {showMenuButton && (
          <MenuLinks>
            {links.map((link, index) => (
              <MenuItem key={index} to={link.to}>
                {link.name}
              </MenuItem>
            ))}
          </MenuLinks>
        )}
      </FloatingMenu>
    </>
  );
};

export default Header;

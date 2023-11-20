import React from 'react';
import Header from '../../components/elements/Header';
import ContentBox from '../../components/elements/ContentBox';
import ChangePassword from './change/Password';
import { ShollBarController } from '../../components/elements/ShollBarController';
import ChangeEmail from './change/Email';

export default function Account() {
  return (
    <ContentBox title="Configurações da conta">
      <Header links={[{ name: 'Voltar ao Menu', to: '/' }]} />
      <ShollBarController className='p-4 top-5 left-5 right-5 rounded-lg shadow-md overflow-y-scroll scrollbar-hide h-screen'>

      <div className="p-8"></div>

      <div className="flex flex-col md:flex-row justify-between p-5 md:px-20">
        <div className="md:w-1/2 p-1">
          <ChangePassword />
        </div>
        <div className="md:w-1/2 p-1">
          <ChangeEmail />
        </div>
        {/* <div className="md:w-1/3 p-1">
          <ChangePassword />
        </div> */}
      </div>
      </ShollBarController>
    </ContentBox>
  );
}

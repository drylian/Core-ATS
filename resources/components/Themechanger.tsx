import React, { useEffect, useState } from 'react';
import { store } from '../states';

interface LightSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const LightSwitch: React.FC<LightSwitchProps> = ({ checked, onChange }) => {
  return (
    <div className="flex flex-col justify-center ml-3" onClick={() => { onChange(!checked) }}>
      <label className="relative cursor-pointer p-2" htmlFor="light-switch">
        {checked ? (<svg className={'hidden dark:block'} width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <path className="fill-slate-300" d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
          <path className="fill-slate-400" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
        </svg>) : (<svg className={'dark:hidden'} width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <path className="fill-slate-400" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
          <path className="fill-slate-500" d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
        </svg>)}

        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  );
};

const LightSwitches: React.FC = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('dark-mode') === 'true'
  );

  const handleSwitchChange = (checked: boolean) => {
    const website = store.getState().website.data
    const updatedSwitch = document.querySelector('.light-switch') as HTMLInputElement;

    if (checked) {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-light-primary');
      document.body.classList.remove('bg-light-image');

      document.body.classList.add('bg-dark-primary')
      document.body.classList.add('bg-dark-image')

      localStorage.setItem('dark-mode', 'true');
      document.body.style.background = website?.colors[checked ? "black" : "white"]?.background || ""

    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-dark-primary');
      document.body.classList.remove('bg-dark-image');

      document.body.classList.add('bg-light-primary')
      document.body.classList.add('bg-light-image')

      document.body.style.background = website?.colors[checked ? "black" : "white"]?.background || ""
      ipcRenderer.send('SettingsChange', {dark:false});
    }

    if (updatedSwitch) {
      updatedSwitch.checked = checked;
    }
  };

  useEffect(() => {
    // Initialize switch based on local storage
    const updatedSwitch = document.querySelector('.light-switch') as HTMLInputElement;

    if (updatedSwitch) {
      updatedSwitch.checked = darkMode;
    }
  }, [darkMode]);

  return (
    <LightSwitch
      checked={darkMode}
      onChange={(checked) => {
        setDarkMode(checked);
        handleSwitchChange(checked);
      }}
    />
  );
};

export default LightSwitches;

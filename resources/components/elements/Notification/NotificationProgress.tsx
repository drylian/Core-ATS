import React, { Fragment, useEffect, useState } from 'react';
import { Transition } from "@headlessui/react";
import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

export interface NotificationProgressProps {
  onClose?: (ident: string) => void;
  ident?: string;
  timer: number;
  refresh: number;

}

const RGB = keyframes`
0% {
    border-color: rgb(255, 0, 0);
  }
  50% {
    border-color: rgb(0, 255, 0);
  }
  80% {
    border-color: rgb(0, 0, 255);
  }
  100% {
    border-color: rgb(200, 0, 78);
  }
`;
const AnimatedDiv = styled.div`
    ${tw`h-[90%] transition-all duration-[250ms] ease-in-out border-2 rounded-br-lg rounded-bl-lg`}
    /* Aplicando a animação */
  animation: ${RGB} 3000ms infinite; /* Ajuste a duração conforme necessário */
`;

export const NotificationProgress: React.FC<NotificationProgressProps> = ({ refresh, timer, onClose, ident }) => {
  const [corrent, setCorrent] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (show) {
      const Interval = setInterval(() => {
        setCorrent((corrent) => corrent + 100);
        const newPercent = (corrent / timer) * 100;
        setPercent(100 - newPercent);
        if (corrent > timer) {
          clearInterval(Interval);
        }
      }, 100);
      return () => clearInterval(Interval);
    }
  }, [corrent, timer]);
  useEffect(() => {
    setPercent(0)
    setCorrent(0)
  }, [refresh]);
  // finaliza o box
  if (corrent > timer) {
    setShow(false);
    if (onClose && ident) onClose(ident);
  }

  return show ?
    <>
      {/* Contador de tempo aqui */}
      <div className='w-full'>
        <Transition
          as={Fragment}
          show={show}
          enter='transition-opacity duration-150'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-150'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          appear
          unmount
        >
          <AnimatedDiv style={{ width: percent ? `${percent}%` : '100%' }} />
        </Transition>
      </div>
    </>
    : null;
};

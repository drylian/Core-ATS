import React, { useState } from "react";
import styled from "styled-components";

const StyledBoxSubtitle = styled.div`
  /* Other styling classes */
  overflow: hidden;
  transition: max-height 0.3s ease-in-out; /* Transition for max-height */
  max-height: 0; /* inicia fechada */

  &.open {
    opacity: 1;
    max-height: 100vh; /* mostra o conteudo */
  }
  &.close {
    opacity: 1; 
    max-height: 0px; /* minimiza o conteudo */
  }
`;

export interface BoxSubtitleProps {
  title: string;
  icon?: React.HTMLAttributes<HTMLElement>["className"];
  children: React.ReactNode;
  active?: boolean;
  iconName?:React.HTMLAttributes<HTMLElement>["className"];
}

export const BoxSubtitle: React.FC<BoxSubtitleProps> = ({ children, title, icon, active = false, iconName }) => {
  const [open, setOpen] = useState(active);

  const Switch = () => {
    setOpen(!open);
  };

  return (
    <div className="m-0.5 p-1 duration-300 bg-light-primary dark:bg-dark-primary rounded items-center justify-center">
      <div className="flex items-center duration-300 justify-between cursor-pointer" onClick={Switch}>
        <div className="flex items-center">
          {icon && <i className={`${icon} duration-300 ${iconName ? iconName : "text-light-primary dark:text-dark-primary"}`} style={{ fontSize: "20px",marginTop:"-3px" }} />}
          <p className="ml-1 text-light-primary duration-300 dark:text-dark-primary">{title}</p>
        </div>
        <i
          className={`bx bx-chevron-${open ? "up" : "down"} duration-300 text-light-primary dark:text-dark-primary`}
        />
      </div>
      <StyledBoxSubtitle
        className={`${open ? "open" : "close"}`}
      >
        {children}
      </StyledBoxSubtitle>
    </div>
  );
};

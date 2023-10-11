import React from "react";
import styled from "styled-components";
import { store } from "../../../states/index.js";

// Componente estilizado para o ContentBox
const StyledContentBox = styled.div`
  background: ${(props) =>
    props?.backgroundType === "img"
      ? `url(${props?.backgroundValue})`
      : props?.backgroundValue || "white"};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: ${(props) => props.textColor || "black"};
  /* Adicione mais estilos conforme necessário */
`;

// Classe para a div controladora
const ContentController = styled.div`
  max-height: calc(100vh - 40px); /* Altura máxima permitida pelo ContentBox */
  overflow: hidden; /* Oculta o conteúdo que ultrapassa a altura máxima */
`;
const ContentBox = (props) => {
  const website = store.getState().website.data
  const { title, children } = props;

  const backgroundColor = website?.colors?.primaria || "blue";
  const textColor = website?.colors?.secundaria || "white";
  const backgroundType = website?.colors?.background?.type || "color";
  const backgroundValue =
    backgroundType === "img"
      ? website?.colors?.background?.value
      : backgroundColor;

  const ConfigTitle = website.title || "Core";
  document.title = `${ConfigTitle} - ${title || "Desconhecido"}`;

  return (
    <StyledContentBox
      backgroundType={backgroundType}
      backgroundValue={backgroundValue}
      textColor={textColor}
    >
      <div className="overflow-hidden h-screen">
        {/* Use a div controladora para limitar o tamanho do conteúdo */}
        <ContentController>{children}
        </ContentController>
      </div>
    </StyledContentBox>
  );
};

export default ContentBox;

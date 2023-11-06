import React from "react";
import styled from "styled-components";
import { store } from "../../states";

// Define PropTypes
interface ContentBoxProps {
  title?: string;
  children: React.ReactNode;
}

interface StyledContentBoxProps {
  backgroundValue: string;
  textColor: string;
}

// Styled component for ContentBox
const StyledContentBox = styled.div<StyledContentBoxProps>`
  background: ${(props) => `${props.backgroundValue}`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: ${(props) => props.textColor || "black"};
  /* Add more styles as needed */
`;

// Styled component for ContentController
const ContentController = styled.div`
  max-height: calc(100vh - 40px); /* Maximum height allowed by ContentBox */
  overflow: hidden; /* Hide content that exceeds the maximum height */
`;

const ContentBox: React.FC<ContentBoxProps> = (props) => {
  // Get website data from the store
  const website = store.getState().website.data;
  const { title, children } = props;

  // Determine text color based on website color settings
  const color = website && website.colors && website.colors.selected
    ? website.colors[website.colors.selected]
    : website?.colors["black"];
  const textColor = color?.color?.secondary || "white";

  let backgroundImage = "";

  // Determine background image or color
  if (color?.background.startsWith("http://") || color?.background.startsWith("https://")) {
    backgroundImage = `url(${color?.background})`;
  } else if (color?.background.startsWith("/")) {
    backgroundImage = `url('${color?.background}')`;
  } else if (color && /^#[0-9a-fA-F]+$/.test(color?.background)) {
    backgroundImage = color?.background;
  }

  const backgroundValue = backgroundImage;

  // Set the document title
  const configTitle = website?.title || "Core";
  document.title = `${configTitle} - ${title || "Unknown"}`;

  return (
    <StyledContentBox
      backgroundValue={backgroundValue}
      textColor={textColor}
    >
      <div className="overflow-hidden h-screen">
        {/* Use a control div to limit content size */}
        <ContentController>{children}</ContentController>
      </div>
    </StyledContentBox>
  );
};

export default ContentBox;

import styled from "styled-components";
import { breakpoint } from "../../theme";
import tw from "twin.macro";

const ContentContainer = styled.div`
    max-width: 99%;
    ${tw`mx-4`};

    ${breakpoint("xl")`
        ${tw`mx-auto`};
    `};
`;
ContentContainer.displayName = "ContentContainer";

export default ContentContainer;
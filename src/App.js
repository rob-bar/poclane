import React from "react";
import styled from "styled-components";
import SwimLane from "./SwimLane";
import uniqolor from "uniqolor";
import { colors } from "./snippets";
function App() {
  return (
    <StyledApp>
      {[...Array(31)].map((el, i) => {
        if (!i) return null;
        return (
          <SwimLane
            key={`lane${i}`}
            amountOfCards={i}
            color={uniqolor.random().color}
          />
        );
      })}
    </StyledApp>
  );
}

const StyledApp = styled.main`
  background-color: ${colors.silver};
  height: 100%;
  overflow-x: hidden;
`;

export default App;

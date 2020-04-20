import React, { useState } from "react";
import styled from "styled-components";
import { mq, breakpoints, colors, easing, shadows } from "./snippets";

const slides = 30; // amount of loaded slides;
const cardWidth = 352; // width of one card plus its margin;
const arrowSpace = 160; // is the space left and right for arrows
// const margin = 24;

const calculateRange = () => {
  return Math.floor((window.innerWidth - arrowSpace) / cardWidth);
};

function App() {
  // console.log(calculateRange());
  const [page, setPage] = useState(0); // the current page

  const prevPage = () => {
    console.log(page);
    setPage(page - 1);
  };

  const nextPage = () => {
    console.log(page);
    setPage(page + 1);
  };

  return (
    <StyledApp>
      <SwimLane>
        {page > 0 && (
          <Icon onClick={prevPage} className="far fa-angle-left fa-3x"></Icon>
        )}
        <Container>
          <Grid page={page}>
            {[...Array(slides)].map((el, i) => (
              <Card key={`card${i}`} />
            ))}
          </Grid>
        </Container>
        {page < Math.floor(slides / calculateRange()) && (
          <Icon onClick={nextPage} className="far fa-angle-right  fa-3x"></Icon>
        )}
      </SwimLane>
    </StyledApp>
  );
}

const StyledApp = styled.main`
  background-color: ${colors.silver};
  height: 100%;
  overflow-x: hidden;
`;

const Icon = styled.a`
  color: ${colors.blue};
  padding: 1rem;
  position: relative;
  z-index: 2;
`;

const SwimLane = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  padding: 1rem 0;
  position: relative;
  z-index: 1;
  max-width: 65rem;
  margin: 0 auto;
  flex: 0 1 calc(100% - 10rem);

  ${mq.minWidth(breakpoints.phone)} {
    padding: 2.5rem 0;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  transition: transform 1.5s ${easing.expo.out};
  transform: ${(props) => `translateX(
    -${props.page * calculateRange() * cardWidth}px
  )`};

  > * {
    margin-right: 1.5rem;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.625rem;
  transition: box-shadow 700ms ${easing.expo.out},
    background-color 700ms ${easing.expo.out};
  text-decoration: none;
  width: 14rem;
  height: 22.5rem;
  flex-shrink: 0;
  flex-grow: 0;
  ${shadows.depth}

  ${mq.minWidth(breakpoints.phone)} {
    width: 20.5rem;
  }

  ${mq.hover("hover")} {
    box-shadow: none;

    &:hover {
      background-color: ${colors.white};
      ${shadows.depth}
    }
  }
`;

export default App;

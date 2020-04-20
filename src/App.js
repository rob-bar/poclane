import React, { useState } from "react";
import styled from "styled-components";
import { mq, breakpoints, colors, easing, shadows } from "./snippets";
import { useBbox } from "./useBox";
const slides = 30; // amount of loaded slides;
const cardWidth = 352; // width of one card plus its margin;
const arrowSpace = 160; // is the space left and right for arrows
const containerWidth = 1040;
// const margin = 24;

const calculatePageRange = () => {
  return Math.floor((window.innerWidth - arrowSpace) / cardWidth);
};

const calculateContainerWindowCardDiff = () => {
  const cardsInContainer = Math.floor(containerWidth / cardWidth);
  const cardsInWindow = calculatePageRange();
  return Math.floor((cardsInWindow - cardsInContainer) / 2);
};

const calculateRestCards = () => {
  return (slides - calculateContainerWindowCardDiff()) % calculatePageRange();
};

function App() {
  // console.log(calculateContainerWindowCardDiff());
  // console.log(calculatePageRange());
  // console.log(calculateRestCards());

  const [page, setPage] = useState(0); // the current page
  const [bbox, ref] = useBbox();
  // console.log(bbox);
  const [startTouch, setStartTouch] = useState();
  const [endTouch, setEndTouch] = useState();
  const [currentTouch, setCurrentTouch] = useState();
  // console.log(currentTouch);
  const firstPage = page === 0;
  const lastPage =
    page + 1 >=
    Math.floor(slides / calculatePageRange()) +
      calculateContainerWindowCardDiff();

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    console.log("onTouchStart" + touch.clientX);
    setStartTouch(touch.clientX);
  };

  const onTouchMove = (e) => {
    // console.log("onTouchMove");
    setCurrentTouch(bbox.x - e.touches[0].clientX);
    // console.log(bbox.x);
    console.log(e.touches[0].clientX);
  };

  const onTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    console.log("onTouchEnd" + touch.clientX);
    setEndTouch(touch.clientX);
  };

  return (
    <StyledApp>
      <SwimLane>
        <div>
          {!firstPage && (
            <Icon
              onClick={() => setPage(page - 1)}
              className="far fa-angle-left fa-3x"
            ></Icon>
          )}
        </div>
        <Container>
          <Grid
            page={page}
            lastPage={lastPage}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            ref={ref}
          >
            {[...Array(slides)].map((el, i) => (
              <Card key={`card${i}`} color={"white"}>
                {i + 1}
              </Card>
            ))}
          </Grid>
        </Container>
        <div>
          {!lastPage && (
            <Icon
              onClick={() => setPage(page + 1)}
              className="far fa-angle-right  fa-3x"
            ></Icon>
          )}
        </div>
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
  transform: ${(props) =>
    props.lastPage
      ? `translateX(
    -${(props.page * calculatePageRange() - calculateRestCards()) * cardWidth}px
  )`
      : `translateX(
    -${props.page * calculatePageRange() * cardWidth}px
  )`};

  > * {
    margin-right: 1.5rem;
  }
`;

const Card = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 0.625rem;
  transition: box-shadow 700ms ${easing.expo.out},
    background-color 700ms ${easing.expo.out};
  text-decoration: none;
  width: 14rem;
  font-size: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
      ${shadows.depth}
    }
  }
`;

export default App;

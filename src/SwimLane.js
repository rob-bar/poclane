import React, { useState } from "react";
import styled from "styled-components";
import {
  mq,
  breakpoints,
  colors,
  easing,
  shadows,
  cardQuery,
  valueToRem,
} from "./snippets";
import { useWindowWidth } from "./useWindowWidth";

const cardGutter = 24; // width of one card plus its margin;
const arrowSpace = 64; // 4rem is the space left and right for arrows
const cardQueries = [
  [breakpoints.zero, 1],
  ["520px", 2],
  ["720px", 3],
  ["1040px", 4],
  [breakpoints.desktop, 5],
  [breakpoints.projector, 6],
  [breakpoints.fourk, 7],
  [breakpoints.sixk, 8],
];

const calculateContainerWidth = () => {
  return window.innerWidth - arrowSpace * 2 + cardGutter;
};

const getCardsInView = (width) => {
  const index = cardQueries.findIndex(
    (el) => width < parseInt(el[0].split("px")[0], 10)
  );
  return cardQueries[index - 1][1];
};

// const calculateContainerWindowCardDiff = () => {
//   const cardsInContainer = Math.floor(containerWidth / cardWidth);
//   const cardsInWindow = calculatePageRange();
//   return Math.floor((cardsInWindow - cardsInContainer) / 2);
// };

const calculateRestCards = () => {
  return 0;
};

const SwimLane = ({ slides, color }) => {
  // console.log(getCardsInView());
  // console.log(calculatePageRange());
  // console.log(calculateRestCards());
  const [page, setPage] = useState(0); // the current page
  const windowWidth = useWindowWidth();
  // const [bbox, ref] = useBbox();
  // console.log(bbox);
  // const [startTouch, setStartTouch] = useState();
  // const [endTouch, setEndTouch] = useState();
  // const [currentTouch, setCurrentTouch] = useState();
  // console.log(currentTouch);
  const restCards = slides % getCardsInView(windowWidth);
  let pageCount = Math.floor(slides / getCardsInView(windowWidth));
  if (restCards) {
    pageCount++;
  }
  const firstPage = page === 0;
  const lastPage = page + 1 >= pageCount;

  // const onTouchStart = (e) => {
  //   const touch = e.touches[0];
  //   console.log("onTouchStart" + touch.clientX);
  //   setStartTouch(touch.clientX);
  // };

  // const onTouchMove = (e) => {
  //   // console.log("onTouchMove");
  //   setCurrentTouch(bbox.x - e.touches[0].clientX);
  //   // console.log(bbox.x);
  //   console.log(e.touches[0].clientX);
  // };

  // const onTouchEnd = (e) => {
  //   const touch = e.changedTouches[0];
  //   console.log("onTouchEnd" + touch.clientX);
  //   setEndTouch(touch.clientX);
  // };

  return (
    <SwimLaneStyled color={color}>
      {!firstPage && (
        <Icon
          onClick={() => setPage(page - 1)}
          className="far fa-angle-left fa-3x"
        ></Icon>
      )}
      <Container>
        <Grid
          page={page}
          lastPage={lastPage}
          windowWidth={windowWidth}
          // onTouchStart={onTouchStart}
          // onTouchMove={onTouchMove}
          // onTouchEnd={onTouchEnd}
          // ref={ref}
        >
          {[...Array(slides)].map((el, i) => (
            <Card key={`card${i}`} color={"white"}>
              {i + 1}
            </Card>
          ))}
        </Grid>
      </Container>
      {!lastPage && (
        <Icon
          onClick={() => setPage(page + 1)}
          className="far fa-angle-right  fa-3x"
        ></Icon>
      )}
    </SwimLaneStyled>
  );
};

const Icon = styled.i`
  width: ${valueToRem(arrowSpace)};
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0)
  );
  color: ${colors.blue};
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  &:hover {
    &:before {
      padding: 1rem;
    }
  }

  &:before {
    transition: padding 1.5s ${easing.expo.out};
    padding: 0.5rem;
  }

  &.fa-angle-left {
    left: 0;
  }

  &.fa-angle-right {
    right: 0;
    justify-content: flex-end;
    background: linear-gradient(
      -90deg,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
  }
`;

const SwimLaneStyled = styled.div`
  position: relative;
  padding: 2rem 0;
  background-color: ${(props) => props.color};
`;

const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
`;

const Grid = styled.div`
  display: flex;
  padding: 0 ${valueToRem(arrowSpace)};
  transition: transform 1.5s ${easing.expo.out};
  transform: ${(props) =>
    props.lastPage
      ? `translateX(
    -${
      props.page * calculateContainerWidth(props.windowWith) -
      calculateRestCards(props.windowWith)
    }px
  )`
      : `translateX(
    -${props.page * calculateContainerWidth(props.windowWith)}px
  )`};
`;

const Card = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 0.625rem;
  transition: box-shadow 700ms ${easing.expo.out},
    background-color 700ms ${easing.expo.out};
  text-decoration: none;
  min-width: 14rem;
  font-size: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22.5rem;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: ${valueToRem(cardGutter)};
  ${shadows.depth}

  ${cardQueries.map((query) => cardQuery(query[0], query[1]))}

  ${mq.hover("hover")} {
    box-shadow: none;

    &:hover {
      ${shadows.depth}
    }
  }
`;

export default SwimLane;
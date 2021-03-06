// TODO
// Refactor Page to currentCard
// Left => check amount of cards on left page
// right => check amount of cards on right page

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

const cardGutter = 24;
const arrowSpace = 64; // the space left and right for arrows (4rem)

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

const calculateContainerWidth = (width) => {
  return width - arrowSpace * 2 + cardGutter;
};

const getCardsInPage = (width) => {
  const index = cardQueries.findIndex(
    (el) => width < parseInt(el[0].split("px")[0], 10)
  );
  return cardQueries[index - 1][1];
};

const getPageCount = (amountOfCards, pageWidth) => {
  let pageCount = Math.floor(amountOfCards / getCardsInPage(pageWidth));

  if (amountOfCards % getCardsInPage(pageWidth)) {
    pageCount++;
  }

  return pageCount;
};

const SwimLane = ({ amountOfCards, color }) => {
  const [page, setPage] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [restValue, setRestValue] = useState(0);
  const [noPointerEvents, setNoPointerEvents] = useState(false);

  const touchThreshold = 200;
  const [startXCoord, setStartXCoord] = useState(0);
  const [swipeXCoord, setSwipeXCoord] = useState(0);

  const windowWidth = useWindowWidth();
  const pageWidth = calculateContainerWidth(windowWidth);
  let pageCount = getPageCount(amountOfCards, windowWidth);

  const isMultiPaged = pageCount > 1;
  const isFirstPage = page === 0;
  const isLastPage = page + 1 >= pageCount;

  const onStartSwipe = (e) => {
    e.preventDefault();
    setStartXCoord(e.clientX || e.touches[0].clientX);
    setIsSwiping(true);
    setSwipeXCoord(-page * calculateContainerWidth(windowWidth));
  };

  const onSwipe = (e) => {
    e.preventDefault();
    setNoPointerEvents(true);
    setSwipeXCoord(
      -page * calculateContainerWidth(windowWidth) +
        (e.clientX || (e.touches && e.touches[0].clientX)) -
        startXCoord
    );
  };

  const onEndSwipe = (e) => {
    e.preventDefault();
    const endXCoord = e.clientX || e.changedTouches[0].clientX;

    setSwipeXCoord(0);
    setIsSwiping(false);
    setIsSwiping(false);

    if (endXCoord - startXCoord >= touchThreshold && !isFirstPage) prevPage();
    if (startXCoord - endXCoord >= touchThreshold && !isLastPage) nextPage();
  };

  const prevPage = () => {
    if (amountOfCards % getCardsInPage(pageWidth) && page === 1) {
      setRestValue(0);
    }
    setPage(page - 1);
  };

  const nextPage = (e) => {
    if (amountOfCards % getCardsInPage(pageWidth) && page + 2 === pageCount) {
      setRestValue(
        (pageWidth / getCardsInPage(pageWidth)) *
          (getCardsInPage(pageWidth) -
            (amountOfCards % getCardsInPage(pageWidth)))
      );
    }
    setPage(page + 1);
  };

  return (
    <SwimLaneStyled color={color}>
      {!isFirstPage && (
        <Icon onClick={prevPage} className="far fa-angle-left fa-3x"></Icon>
      )}
      <Container
        onMouseLeave={isSwiping ? () => setIsSwiping(false) : undefined}
        onMouseDown={isMultiPaged ? onStartSwipe : undefined}
        onTouchStart={isMultiPaged ? onStartSwipe : undefined}
        onMouseUp={isMultiPaged ? onEndSwipe : undefined}
        onTouchEnd={isMultiPaged ? onEndSwipe : undefined}
        onTouchMove={isSwiping && isMultiPaged ? onSwipe : undefined}
        onMouseMove={isSwiping && isMultiPaged ? onSwipe : undefined}
      >
        <Grid
          page={page}
          pageWidth={pageWidth}
          isSwiping={isSwiping}
          swipeXCoord={swipeXCoord}
          noPointerEvents={noPointerEvents}
          restValue={restValue}
        >
          {[...Array(amountOfCards)].map((el, i) => (
            <Card key={`card${i}`} color={"white"}>
              {i + 1}
            </Card>
          ))}
        </Grid>
      </Container>
      {!isLastPage && (
        <Icon onClick={nextPage} className="far fa-angle-right fa-3x"></Icon>
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
  display: none;
  transition: opacity 0.7s ${easing.expo.out};

  ${mq.hover("hover")} {
    display: flex;
    opacity: 0;

    &:hover {
      opacity: 1;

      &:before {
        padding: 1rem;
      }
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
  width: 100%;
  background-color: ${(props) => props.color};
`;

const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
`;

const Grid = styled.div.attrs((props) => ({
  style: {
    transform: `translateX(${getTranslateX(props)}px)`,
    transition: getTransition(props),
  },
}))`
  display: flex;
  padding: 0 ${valueToRem(arrowSpace)};

  > * {
    ${(props) => (props.noPointerEvents ? "pointer-events: none;" : "")}
  }
`;

const getTranslateX = ({
  isSwiping,
  swipeXCoord,
  page,
  pageWidth,
  restValue,
}) => {
  return isSwiping ? swipeXCoord + restValue : -page * pageWidth + restValue;
};

const getTransition = ({ isSwiping }) => {
  return isSwiping ? "none" : `transform 1.5s ${easing.expo.out}`;
};

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
  user-select: none;
  margin-right: ${valueToRem(cardGutter)};
  ${shadows.depth}

  ${mq.hover("hover")} {
    box-shadow: none;

    &:hover {
      ${shadows.depth}
    }
  }

  ${cardQueries.map((query) => cardQuery(query[0], query[1]))}
`;

export default SwimLane;

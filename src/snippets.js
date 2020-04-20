export const breakpoints = {
  zero: "0px",
  phone: "480px",
  portrait: "600px",
  landscape: "900px",
  laptop: "1200px",
  desktop: "1600px",
  television: "1800px",
  projector: "2560px",
};

export const mq = {
  minWidth: (bp) => `@media (min-width: ${bp})`,
  hover: (hover) => `@media (hover: ${hover})`,
};

export const fontFamily = {
  base: `font-family: "Nunito", sans-serif;`,
};

export const fontWeight = {
  extraBold: `font-weight: 800;`,
  bold: `font-weight: 700;`,
  regular: `font-weight: 400;`,
  light: `font-weight: 300;`,
  extraLight: `font-weight: 200;`,
};

export const zIndex = {
  pulsar: "z-index: 10;",
  pulsarAffix: "z-index: 20;",
};

export const colors = {
  red: "#FF0000",
  magenta: "#FF00FF",
  blue: "#0000FF",
  green: "#00F200",
  cyan: "#00F5F5",
  black: "#000000",
  white: "#FFFFFF",
  silver: "#BEBEBE",
  alabaster: "#F8F8F8",
};

export const gradients = {
  pink: `background-image: linear-gradient(90deg, ${colors.red} 0%, ${colors.magenta} 100%);`,
  blue: `background-image: linear-gradient(92deg, ${colors.blue} 0%, ${colors.cyan} 100%);`,
  green: `background-image: linear-gradient(90deg, ${colors.green} 0%, ${colors.cyan} 100%);`,
};

export const shadows = {
  depth: `box-shadow: 0 0.5rem 2rem 0 rgba(0, 0, 0, 0.16);`,
};

export const easing = {
  expo: {
    out: `cubic-bezier(0.16, 1, 0.3, 1)`,
  },
};

export const elipsis = `
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

export const container = {
  standard: `
    padding: 1rem;
    max-width: 65rem;
    margin: 0 auto;

    ${mq.minWidth(breakpoints.phone)} {
      padding: 2.5rem 1rem;
    }
  `,
};

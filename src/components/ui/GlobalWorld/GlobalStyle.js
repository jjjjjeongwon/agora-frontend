import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow: hidden !important;
  }

  #root {
    width: 100vw;
    height: 100vh;
    overflow: hidden !important;
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`  
  * {
    box-sizing: border-box;
  };

  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    background-color: #0a0a0a;
    color: #fafafa;
  }
`;

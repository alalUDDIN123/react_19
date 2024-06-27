import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.bodyBackgroundColor};
    color: ${({ theme }) => theme.bodyColor};
  }
`;

export default GlobalStyle;

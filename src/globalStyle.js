import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

body::-webkit-scrollbar {
  display: none;
}

body {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
`;


export default GlobalStyle;
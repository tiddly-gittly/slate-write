import type {} from 'styled-components/cssprop';
import { createGlobalStyle, css } from 'styled-components';

export const bodyStyles = css`
  .tippy-box[data-theme~='tomato'] {
    background-color: tomato;
    color: yellow;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${bodyStyles}
`;

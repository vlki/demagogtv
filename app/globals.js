"use client";

import { createGlobalStyle } from "styled-components";

// Global styles previously injected via styled-components `injectGlobal`
// (removed in v6) in the old src/App.js. The `p` and `a` rules used to live
// on the wrapping AppContainer; the whole app renders inside it, so promoting
// them to global selectors keeps the same effect.
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F4F9FD;
    font-family: LatoLatinWeb, sans-serif;
    color: #3C325C;
  }

  p {
    font-family: LatoLatinWeb, sans-serif;
    font-size: 16px;
    letter-spacing: 0.025em;
    line-height: 1.5;
    color: #3c325c;
  }

  a {
    color: #f26538;
    text-decoration: none;

    &:focus {
      color: #0078a0;
      text-decoration: none;
    }

    &:hover {
      color: #0060ff;
      text-decoration: none;
    }
  }
`;

export default GlobalStyle;

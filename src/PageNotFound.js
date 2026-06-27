"use client";

import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";

class PageNotFound extends Component {
  render() {
    return (
      <Container className="container-fluid">
        <h1>Stránka neexistuje</h1>
        <Link href="/">Zpět na úvod DemagogTV</Link>
      </Container>
    );
  }
}

const Container = styled.div`
  max-width: 1000px;
  padding-top: 35px;
`;

export default PageNotFound;

// import { Router, Route } from "react-router";
import App from "./App";
import UploadOrders from "./OrdersUpload/uploadOrder";
import Profit from "./ProfitFromWalletAndOrder/Profit";
import React from "react";

import styled from "styled-components";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { version } from "../../package.json";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 12vw;
`;

const Wrapper = styled.div`
  margin: 10px;
  background-color: black;
  width: 25%;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NewLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 2.5vw;
`;

export default props => (
  <BrowserRouter {...props}>
    <div>
      <label>version {version}</label>
      <Container>
        <Wrapper>
          <NewLink to="/">Trang chính</NewLink>
        </Wrapper>
        <Wrapper>
          <NewLink to="/uploadOrders">Nhập file excel</NewLink>
        </Wrapper>
        <Wrapper>
          <NewLink to="/profit">Lợi nhuận</NewLink>
        </Wrapper>
      </Container>

      <hr />

      <Route exact path="/" component={App} />
      <Route path="/uploadOrders" component={UploadOrders} />
      <Route path="/profit" component={Profit} />
    </div>
  </BrowserRouter>
);

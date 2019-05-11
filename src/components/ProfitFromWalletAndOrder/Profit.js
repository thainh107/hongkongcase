import React from "react";
import XLSX from "xlsx";
import _ from "lodash";
import styled from "styled-components";

import DataInput from "../CommonComponent/DataInput";
import DragDropFile from "../CommonComponent/DragDropFile";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const ContainerWallet = styled.div`
  padding: 10px;
  display: block;
  margin: 15px auto;
  border: 1px solid #ccc;
`;

class Profit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataWallet: [],
      dataOrdersMonthBefore: [],
      dataOrdersThisMonth: []
    };
  }

  render() {
    
    return (
      <Container>
        Continued......
      </Container>
    );
  }
}

export default Profit;

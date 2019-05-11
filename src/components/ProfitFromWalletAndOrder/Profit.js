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

const listSP = [
  {
    "Đây là tên sản phẩm": {
      "2m đỏ": 21.5,
      "1m đỏ": 1.5,
      "1m đên": 2.5,
      "2m đen": 25,
      "code": "SP123X14"
    }
  }
];

class Profit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataWallet: [],
      dataOrdersMonthBefore: [],
      dataOrdersThisMonth: []
    };

    this.handleFileOrders = this.handleFileOrders.bind(this);
  }

  _searchInArrayOfObject = (nameKey, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].orderNo === nameKey) {
        return myArray[i];
      }
    }
  };

  _mergeDataToWallet = () => {
    const wallet = this.state.dataWallet;
    const order = this.state.dataOrdersThisMonth;
    if (!_.isEmpty(wallet)) {
      for (var i = 1; i < wallet.length; i++) {
        if (this._searchInArrayOfObject(wallet[i].orderNo, order)) {
          console.log(
            "log",
            this._searchInArrayOfObject(wallet[i].orderNo, order)
          );
        }
      }
    }
  };

  handleDataWallet = data => {
    var SP = [];
    for (var i = 7; i < data.length; i++) {
      if (data[i][3].startsWith("Doanh Thu từ Đơn Hàng #")) {
        SP.push({
          orderNo: data[i][3].replace("Doanh Thu từ Đơn Hàng #", ""),
          tt: data[i][2]
        });
      }
    }
    this.setState({ dataWallet: SP });
  };

  handleDataOrders = data => {
    var arrOrderNoAndProduct = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][1] === "Hoàn thành") {
        arrOrderNoAndProduct.push({ orderNo: data[i][0], name: data[i][9] });
      }
    }

    var arrAfterSplitProduct = [];
    _.forEach(arrOrderNoAndProduct, value => {
      const newArr = value.name.split("\n");
      if (newArr.length > 1) {
        _.forEach(newArr, value2 => {
          arrAfterSplitProduct.push({ orderNo: value.orderNo, name: value2 });
        });
      } else {
        arrAfterSplitProduct.push({ orderNo: value.orderNo, name: newArr[0] });
      }
    });

    var arrWithCookField = [];
    _.forEach(arrAfterSplitProduct, function(valsp1) {
      var arrSp1 = valsp1.name.split(";");
      var name = "";
      var sl = 0;
      var phanLoai = "";
      _.forEach(arrSp1, function(valsp2) {
        if (valsp2.includes("] Tên phân loại hàng:")) {
          name = valsp2.substring(23);
        }
        if (valsp2.startsWith(" Số lượng:")) {
          sl = parseInt(valsp2.replace(" Số lượng: ", ""), 0);
        }
        if (valsp2.startsWith(" Tên phân loại hàng:")) {
          phanLoai = valsp2.replace(" Tên phân loại hàng:", "");
        }
      });
      arrWithCookField.push({ orderNo: valsp1.orderNo, name, sl, phanLoai });
    });
    this.setState({
      dataOrdersThisMonth: arrWithCookField.concat(
        this.state.dataOrdersThisMonth
      )
    });
  };

  handleFileOrders(file /*:File*/) {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      if (data) {
        if (data[0][0] === "Bảng kê tài khoản - Shopee Vietnam") {
          this.handleDataWallet(data);
        } else {
          this.handleDataOrders(data);
        }
      }
      // Todo : so sánh danh sách sản phẩm, phân loại để lấy giá add vào data orders
      this._mergeDataToWallet();
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }

  render() {
    var txtGuide = "Chọn file từ ví .....";
    if (
      !_.isEmpty(this.state.dataWallet) &&
      _.isEmpty(this.state.dataOrdersMonthBefore)
    ) {
      txtGuide = "Chọn file đơn hàng";
    }
    return (
      <Container>
        <ContainerWallet>
          <label>{txtGuide}</label>
          <DragDropFile handleFile={this.handleFileOrders}>
            <div style={{ padding: 20, display: "flex", flexDirection: "row" }}>
              <div>
                <DataInput handleFile={this.handleFileOrders} />
              </div>
            </div>
          </DragDropFile>
        </ContainerWallet>
      </Container>
    );
  }
}

export default Profit;

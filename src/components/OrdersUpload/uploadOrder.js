import React from "react";
import XLSX from "xlsx";
import _ from "lodash";

import { addOrder, loadOders, addOriginalData } from "actions/todo";

import { connect } from "react-redux";

import DataInput from "../CommonComponent/DataInput";
import DragDropFile from "../CommonComponent/DragDropFile";
import * as Utils from "../../utils/utils";

import Tabletop from "tabletop";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const options = ["Chờ giao hàng", "Hoàn thành"];
const defaultOption = options[0];

const publicSheetPKS =
  "https://docs.google.com/spreadsheets/d/1yR5eXOPsNe9qeF-59wYBZ-Q_fSZ2YM4D4brqeVjaWy4/edit?usp=sharing";

class SheetJSApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      productData: [],
      isLoadedProductData: false,
      fileName: "",
      dataOriginal: [],
      filterStatus: "Chờ giao hàng"
    };
  }

  componentDidMount() {
    Tabletop.init({
      key: publicSheetPKS,
      callback: this.showInfo,
      simpleSheet: true
    });
  }

  showInfo = (data, tabletop) => {
    // console.log(data);
    this.setState({
      isLoadedProductData: !this.state.isLoadedProductData,
      productData: data
    });
  };

  handleQuantity = arrProductEqualQuantity => {
    var newSp = [];
    _.forEach(arrProductEqualQuantity, value => {
      newSp.push({ name: value.name, phanLoai: value.phanLoai });
    });

    newSp = _.orderBy(_.uniqWith(newSp, _.isEqual), ["name"], ["asc"]);

    var newSp1 = [];
    for (var i = 0; i < newSp.length; i++) {
      var soluong = 0;
      _.forEach(arrProductEqualQuantity, value => {
        if (
          newSp[i].name === value.name &&
          newSp[i].phanLoai === value.phanLoai
        ) {
          soluong += parseInt(value.soluong, 2);
        }
      });
      const obj = {
        name: newSp[i].name,
        phanLoai: newSp[i].phanLoai,
        soluong
      }


      newSp1.push(obj);
    }
    return newSp1;
  };

  convertToMaSP = data => {
    var SP = [];
    for (var i = 0; i < data.length; i++) {
      const objProduct = _.find(this.state.productData, {
        tensp: data[i].name
      });
      // debugger;
      if (!_.isEmpty(objProduct)) {
        const masp = !_.isEmpty(objProduct.masp)
          ? objProduct.masp
          : data[i].name;
        const masp1 = objProduct.masp1;
        const sl = objProduct.sl;

        if (sl > 1) {
          SP.push({
            ...data[i],
            masp: masp + "+" + masp1
          });
        } else {
          SP.push({
            ...data[i],
            masp
          });
        }
      } else {
        SP.push({ ...data[i], masp: data[i].name });
      }
    }

    return SP;
  };
  handleData = (data, fileName) => {
    var SP = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][2] === this.state.filterStatus) {
        SP.push({
          name: data[i][13],
          phanLoai: data[i][18],
          soluong: data[i][24]
        });
      }
    }
    // var sp1 = Utils.splitTextToArrayOfProduct(SP);
    var newSp1 = this.handleQuantity(SP);
    var newSp2 = this.convertToMaSP(newSp1);
    console.log("tlog", newSp1);
    // debugger;
    this.setState({ data: newSp2, dataOriginal: data, fileName });
    // if (!_.isEmpty(data)) {
    //   // this.props.addOriginalData({ data, fileName });
    // }
  };

  handleFile = file => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const fileName = file.name;
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
      /* Update state */
      this.handleData(data, fileName);
      // debugger;
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  _addDataOrder = () => {
    if (this.state.data) {
      this.props.addOrder(this.state.data);
      this.setState({ data: [] });
    }
  };

  renderRow = () => {
    return (
      <div style={{ paddingLeft: 10, paddingTop: 10 }}>
        {this.state.data.map(function(data) {
          const maSp = data.masp1 ? data.masp + "+" + data.masp1 : data.masp;
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: 10
              }}
              key={data.name + data.phanLoai}
            >
              <div>
                <label style={{ fontSize: 19, color: "black" }}>
                  * {maSp || name}
                </label>
                {"  "}
                <label style={{ fontSize: 22, color: "#ac4dc4" }}>
                  {data.phanLoai}
                </label>
                {"  "}
                <label style={{ fontSize: 22, color: "#b75353" }}>
                  Số lượng {data.soluong}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  _onSelect = event => {
    this.setState({ filterStatus: event.value });
  };

  render() {
    return (
      <div>
        <div>
          <label style={{ fontSize: 14, color: "#b75353", paddingLeft: 15 }}>
            {this.state.isLoadedProductData
              ? "Đã lấy thông tin sản phẩm"
              : "Chưa lấy được thông tin sản phẩm"}
          </label>
        </div>
        <Dropdown
          options={options}
          onChange={this._onSelect}
          value={defaultOption}
          placeholder="Chọn trạng thái đơn hàng"
        />
        <DragDropFile handleFile={this.handleFile}>
          <div style={{ padding: 20, display: "flex", flexDirection: "row" }}>
            <div>
              <DataInput handleFile={this.handleFile} />
            </div>
            <div>
              <button
                style={{
                  width: 150,
                  height: 50,
                  backgroundColor: "#3e2e42",
                  color: "#ffffff",
                  fontSize: 16
                }}
                onClick={this._addDataOrder}
              >
                Lưu đơn lấy hàng
              </button>
            </div>
          </div>
          {this.renderRow()}
        </DragDropFile>
      </div>
    );
  }
}

if (typeof module !== "undefined")
  module.exports = connect(
    null,
    { addOrder, loadOders, addOriginalData }
  )(SheetJSApp);
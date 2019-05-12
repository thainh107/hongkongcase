import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { connect } from "react-redux";

import { loadOriginalData } from "../../actions/todo";

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

  componentWillMount() {
    this.props.loadOriginalData();
  }

  renderItem = items => {
    return _.map(items, (val, key) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 10,
            borderColor: "#000000",
            borderWidth: 10
          }}
        >
          <div>
            <p style={{ fontSize: 19, color: "black" }}>Mã đơn hàng: {key}</p>
            {_.map(val, (v, k) => {
              return (
                <div style={{ paddingLeft: 20 }}>
                  <label style={{ fontSize: 19, color: "#5c4dc4" }}>
                    Tên: {v.name}
                  </label>{"   "}
                  <label style={{ fontSize: 23, color: "#ac4dc4" }}>
                    Phân loại: {v.phanLoai}
                  </label>
                  {"  "}
                  <label style={{ fontSize: 22, color: "#b75353" }}>
                    Số lượng: {v.soluong}
                  </label>
                </div>
              );
            })}
          </div>
          <button
            style={{
              backgroundColor: "#5a5387",
              marginLeft: 20,
              width: 150,
              height: 100,
              borderRadius: 15,
              marginTop: 20
            }}
          >
            <label style={{ fontSize: 22, color: "#ffffff" }}>Xong</label>
          </button>
        </div>
      );
    });
  };

  renderWrapper = () => {
    const data = this.props.ordersOriginal;
    return (
      <div style={{ paddingLeft: 10, paddingTop: 10 }}>
        {_.map(data, (key, val) => {
          return (
            <div key={val}>
              <h3>{val}</h3>
              {this.renderItem(key)}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    // console.log("tlog", this.props)
    return <Container>{this.renderWrapper()}</Container>;
  }
}
const mapStateToProps = state => {
  return {
    ordersOriginal: state.todo.ordersOriginal
  };
};
export default connect(
  mapStateToProps,
  { loadOriginalData }
)(Profit);

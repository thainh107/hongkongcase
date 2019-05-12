import React from "react";
import _ from "lodash";
import styled from "styled-components";
import moment from "moment";
import { connect } from "react-redux";

import { loadOriginalData } from "../../actions/todo";
import { modifyOrderNumbDate } from "../../utils/utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

class Profit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dataOrders: props.ordersOriginal,
      dataOrdersThisMonth: [],
      items: {},
      dateStart: "",
      dateStop: ""
    };
  }

  componentWillMount() {
    this.props.loadOriginalData();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: this.props.listOrderDate,
        dataOrders: this.props.ordersOriginal
      });
    }, 3000);
  }

  setStart = event => {
    this.setState({
      dateStart: moment(event.target.value.toLowerCase()).format("X")
    });
  };

  setEnd = event => {
    this.setState({
      dateStop: moment(event.target.value.toLowerCase()).format("X")
    });
  };

  filterList = () => {
    var updatedList = this.state.data;
    var dateStart = this.state.dateStart;
    var dateStop = this.state.dateStop;
    var sourceList = this.props.ordersOriginal;
    var arr = [];
    var objResult = {};
    _.map(updatedList, (key, value) => {
      if (key >= dateStart && key <= dateStop) {
        arr.push(value);
      }
    });

    _.forEach(arr, valueSearch => {
      _.map(sourceList, (keySource, valueSource) => {
        if (valueSource.includes(valueSearch)) {
          objResult[valueSource] = keySource;
        }
      });
    });
    this.setState({ items: objResult });
  };

  renderWrapper = () => {
    // const data = this.state.dataOrders;
    const data = _.isEmpty(this.state.items)
      ? this.props.ordersOriginal
      : this.state.items;
    return (
      <div style={{ paddingLeft: 10, paddingTop: 10 }}>
        {_.map(data, (val, key) => {
          const header = key.split("*");
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: 10,
                backgroundColor: "#d0cfd1",
                borderRadius: 10
              }}
            >
              <div style={{ flex: 3, padding: 10 }}>
                <div style={{ paddingBottom: 10 }}>
                  <label style={{ fontSize: 19, color: "black" }}>
                    Mã đơn hàng: {header[0]} - Ngày {header[1]}
                  </label>
                </div>
                {_.map(val, (v, k) => {
                  return (
                    <div style={{ paddingLeft: 20 }}>
                      <label style={{ fontSize: 15, color: "#5c4dc4" }}>
                        Tên: {v.name}
                      </label>
                      {"   "}
                      <label style={{ fontSize: 18, color: "#ac4dc4" }}>
                        Phân loại: {v.phanLoai}
                      </label>
                      {"  "}
                      <label style={{ fontSize: 18, color: "#b75353" }}>
                        Số lượng: {v.soluong}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div style={{ width: 1, backgroundColor: "#000000" }} />
              <div
                style={{
                  flex: 1,
                  paddingLeft: 10
                }}
              >
                <button
                  style={{
                    backgroundColor: "#5a5387",
                    width: 90,
                    height: 50,
                    borderRadius: 15,
                    marginTop: 10
                  }}
                >
                  <label style={{ fontSize: 22, color: "#ffffff" }}>Xong</label>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    // console.log("tlog state", this.state);
    return (
      <Container>
        <h3>
          nhập file excel bên kia trước. rồi ấn Lưu đơn hàng để đẩy dữ liệu lên
          xong rồi mới search theo mẫu "2019-05-11 00:21"
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <input
            style={{ width: 200, height: 40, fontSize: 16 }}
            type="text"
            placeholder="Ngày bắt đầu"
            onChange={this.setStart}
          />
          <input
            style={{ width: 200, height: 40, fontSize: 16, marginLeft: 10 }}
            type="text"
            placeholder="Ngày kết thúc"
            onChange={this.setEnd}
          />
          <button
            style={{
              backgroundColor: "#5a5387",
              minWidth: 90,
              height: 40,
              borderRadius: 10,
              marginLeft: 10
            }}
            onClick={this.filterList}
          >
            <label style={{ fontSize: 16, color: "#ffffff" }}>Tìm đơn</label>
          </button>
        </div>
        {this.renderWrapper()}
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    ordersOriginal: state.todo.ordersOriginal,
    listOrderDate: modifyOrderNumbDate(state.todo.ordersOriginal)
  };
};
export default connect(
  mapStateToProps,
  { loadOriginalData }
)(Profit);

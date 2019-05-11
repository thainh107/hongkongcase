import React, { Component } from "react";
import { connect } from "react-redux";
import { loadOders } from "../../actions/todo";
import _ from "lodash";

import firebase from "firebase";

import { CopyToClipboard } from "react-copy-to-clipboard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      images: [],
      value: "",
      copied: false
    };
    this.renderRow = this.renderRow.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.loadOders();
    setTimeout(
      function() {
        this.loadToClipboard();
      }.bind(this),
      5000
    );
  }

  loadToClipboard = () => {
    const data = this.props.ordersData.data;
    if (!_.isEmpty(data)) {
      let valueCopied = "";
      data.map(function(data) {
        const line =
          "* " +
          (data.name || data.masp) +
          " " +
          data.phanLoai +
          " số lượng: " +
          data.sl;
        valueCopied += "\n" + line;
      });
      this.setState({ value: valueCopied, copied: false });
    }
  };

  onSubmit = () => {
    this.props.createSection(this.state.content);
    this.setState({
      content: ""
    });
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("/")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        return this.setState({ avatarURL: url });
      });
  };

  uploadImage = () => {};
  _clickRefInput = () => {
    this.fileUploader.click();
  };
  _handleImageChange = e => {
    e.preventDefault();

    const newImg = _.get(this.state, "images", []);
    const newArrImages = e.target.files;
    _.forEach(newArrImages, value => {
      const reader = new FileReader();

      reader.onload = () => {
        const imageSrc = reader.result;
        newImg.push(imageSrc);

        this.setState({
          images: newImg
        });
      };

      reader.readAsDataURL(value);
    });
  };
  _onClickInputImage = event => {
    event.target.value = null;
  };

  renderImagePreview = images => {
    const type = [];
    _.map(images).map((value, index) => {
      type.push(
        <div key={value}>
          <img alt={value + index} src={value} height="150" width="150" />
        </div>
      );
    });
    return type;
  };

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  renderRow() {
    if (_.isEmpty(this.props.ordersData))
      return (
        <div style={{ padding: 20, color: "red", fontSize: 30 }}>
          Chưa nhập đơn hàng ngày hôm nay
        </div>
      );
    return (
      <div style={{ paddingLeft: 10, paddingTop: 10 }}>
        {this.props.ordersData.data.map(function(data) {
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
                  * {maSp || data.name}
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
  }

  render() {
    if (_.isEmpty(this.props.ordersData))
      return (
        <div style={{ padding: 20, color: "red", fontSize: 30 }}>
          Chưa nhập đơn hàng ngày hôm nay
        </div>
      );
    return (
      <div>
        <CopyToClipboard
          text={this.state.value}
          onCopy={() => {
            this.setState({ copied: true });
          }}
        >
          <button
            style={{
              backgroundColor: "#8c429e",
              padding: 20,
              borderRadius: 10,
              color: "#ffffff"
            }}
          >
            Copy
          </button>
        </CopyToClipboard>
        {this.state.copied ? (
          <span style={{ color: "red", paddingLeft: 20 }}>Đã copy</span>
        ) : null}
        {this.renderRow()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ordersData: state.todo.dataOrder
  };
};
export default connect(
  mapStateToProps,
  { loadOders }
)(App);

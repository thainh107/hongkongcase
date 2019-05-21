import React from "react";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  justify-content: center;
`;

const WrapperButton = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Item = styled.div`
  background-color: #fff8e6;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border-radius: 10px;
  border: solid 1px #000000;
  position: relative;
`;

const ButtonImg = styled.button`
  width: 80px;
  height: 40px;
  background-color: transparent;
  border-radius: 5px;
  z-index: 100;
`;

const LabelButton = styled.a`
  font-size: 16px;
`;

class CombineImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      img5: "",
      img6: "",
      isActive: "",
      file: null
    };
  }

  _drawImg = (position, img, ctx) => {
    switch (position) {
      case "img1": {
        ctx.drawImage(img, 18.4, 154);
        break;
      }
      case "img2": {
        ctx.drawImage(img, 993.5, 154);
        break;
      }
      case "img3": {
        ctx.drawImage(img, 2043.5, 154);
        break;
      }
      case "img4": {
        ctx.drawImage(img, 18.4, 2168.5);
        break;
      }
      case "img5": {
        ctx.drawImage(img, 993.5, 2168.5);
        break;
      }
      case "img6": {
        ctx.drawImage(img, 2043.5, 2168.5);
        break;
      }
      default:
        break;
    }
  };

  _handleImageChange = e => {
    e.preventDefault();

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    var URL = "";
    var url = "";

    var img = new Image();

    URL = window.webkitURL || window.URL;
    url = URL.createObjectURL(e.target.files[0]);
    img.src = url;

    img.onload = () => {
      this._drawImg(this.state.isActive, img, ctx);
    };
    e.target.value = "";
  };

  _clickRefInput = index => {
    this.fileUploader.click();
    this.setState({
      isActive: index
    });
  };

  _clickSaveBtn = () => {
    const canvas = document.getElementById("canvas");
    canvas.toBlob(blob => {
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "thay-ten.png");
      link.style.display = "none";
      document.body.appendChild(link);

      link.click();
    }, "image/png");
  };

  renderButton = () => {
    return (
      <WrapperButton>
        <Item key={"img1"}>
          {/* <ImgPreview alt={1} id="img1" src={this.state.img1} /> */}
          <ButtonImg
            onClick={() => {
              this._clickRefInput("img1");
            }}
          >
            <LabelButton>Chọn ảnh 1</LabelButton>
          </ButtonImg>
        </Item>
        <Item key={"img2"}>
          {/* <ImgPreview alt={1} id="img2" src={this.state.img2} /> */}
          <ButtonImg
            onClick={() => {
              this._clickRefInput("img2");
            }}
          >
            <LabelButton>Chọn ảnh 2</LabelButton>
          </ButtonImg>
        </Item>
        <Item key={"img3"}>
          {/* <ImgPreview alt={1} id="img3" src={this.state.img3} /> */}
          <ButtonImg
            onClick={() => {
              this._clickRefInput("img3");
            }}
          >
            <LabelButton>Chọn ảnh 3</LabelButton>
          </ButtonImg>
        </Item>
        <Item key={"img4"}>
          {/* <ImgPreview alt={1} id="img4" src={this.state.img4} /> */}
          <ButtonImg
            onClick={() => {
              this._clickRefInput("img4");
            }}
          >
            <LabelButton>Chọn ảnh 4</LabelButton>
          </ButtonImg>
        </Item>
        <Item key={"img5"}>
          {/* <ImgPreview alt={1} id="img5" src={this.state.img5} /> */}
          <ButtonImg
            onClick={() => {
              this._clickRefInput("img5");
            }}
          >
            <LabelButton>Chọn ảnh 5</LabelButton>
          </ButtonImg>
        </Item>
        <Item key={"img6"}>
          {/* <ImgPreview alt={1} id="img6" src={this.state.img6} /> */}
          <ButtonImg
            onClick={() => {
              this._clickRefInput("img6");
            }}
          >
            <LabelButton>Chọn ảnh 6</LabelButton>
          </ButtonImg>
        </Item>
      </WrapperButton>
    );
  };

  render() {
    return (
      <Container>
        <ButtonImg
          style={{ backgroundColor: "#c1ab70", width: 130 }}
          onClick={this._clickSaveBtn}
        >
          <label>Lưu Ảnh để in</label>
        </ButtonImg>
        {this.renderButton()}
        <input
          type="file"
          id="file"
          ref={c => {
            this.fileUploader = c;
          }}
          style={{ display: "none" }}
          onChange={this._handleImageChange}
          accept="image/*"
        />
        <WrapperButton>
          <canvas
            id="canvas"
            ref="canvas"
            width={3008}
            height={4108}
            style={{
              width: 450,
              height: 600,
              border: "solid 1px #000000",
              borderRadius: 10,
              marginBottom: 20
            }}
          />
        </WrapperButton>
      </Container>
    );
  }
}

export default CombineImage;

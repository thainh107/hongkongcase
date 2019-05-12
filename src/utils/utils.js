import _ from "lodash";
import moment from "moment";

export const splitTextToArrayOfProduct = arrListOfProduct => {
  var arrAfterSplit = [];
  _.forEach(arrListOfProduct, value => {
    const newArr = value.split("\n");
    if (newArr.length > 1) {
      _.forEach(newArr, value2 => {
        arrAfterSplit.push(value2);
      });
    } else {
      arrAfterSplit.push(newArr[0]);
    }
  });

  var arrWithCookField = [];
  _.forEach(arrAfterSplit, function(valsp1) {
    var arrSp1 = valsp1.split(";");
    var name = "";
    var sl = 0;
    var phanLoai = "";
    _.forEach(arrSp1, function(valsp2) {
      if (valsp2.includes("] Tên phân loại hàng:")) {
        name = valsp2.substring(23);
      }
      if (valsp2.startsWith(" Tên phân loại hàng:")) {
        phanLoai = valsp2.replace(" Tên phân loại hàng:", "");
      }
      if (valsp2.startsWith(" Số lượng:")) {
        sl = parseInt(valsp2.replace(" Số lượng: ", ""), 0);
      }
    });
    arrWithCookField.push({ name, phanLoai, sl });
  });
  return arrWithCookField;
};

export const modifyOrderNumbDate = listOrder => {
  const list = {};
  _.map(listOrder, (value, key) => {
    const header = key.split("*");
    list[header[0]] = moment(header[1]).format("X");
  });
  return list;
};

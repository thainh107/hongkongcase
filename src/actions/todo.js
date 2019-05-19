import * as actionsFB from "../js/firebase";
import actionType from "../constants";

export const loadOders = () => {
  return dispatch => {
    dispatch({
      type: actionType.LOAD_ORDERS_REQUEST
    });
    actionsFB.loadOrderFromDB()
      .then(data => {
        dispatch({
          type: actionType.LOAD_ORDERS_SUCCESS,
          payload: data
        });
      })
      .catch(error => {
        dispatch({
          type: actionType.LOAD_ORDERS__FAILED,
          payload: error
        });
      });
  };
};
export const addOrder = data => {
  return dispatch => {
    dispatch({
      type: actionType.UPLOAD_DATA_ORDER_REQUEST
    });
    actionsFB.addOrderToDB(data)
      .then(res => {
        dispatch({
          type: actionType.UPLOAD_DATA_ORDER_SUCCESS,
          payload: res
        });
      })
      .catch(error => {
        dispatch({
          type: actionType.UPLOAD_DATA_ORDER_FAILED,
          payload: error
        });
      });
  };
};

// export const uploadImageSections = images => {
//   return dispatch => {
//     dispatch({
//       type: actionType.UPLOAD_IMAGES_REQUEST
//     });
//     actionsFB.uploadImage(images)
//       .then(res => {
//         dispatch({
//           type: actionType.UPLOAD_IMAGES_SUCCESS,
//           payload: res
//         });
//       })
//       .catch(error => {
//         dispatch({
//           type: actionType.UPLOAD_IMAGES_FAILED,
//           payload: error
//         });
//       });
//   };
// };

export const addOriginalData = dataOrigin => {
  return dispatch => {
    dispatch({
      type: actionType.UPLOAD_FILE_ORIGIN_REQUEST
    });
    actionsFB.addDataOrigin(dataOrigin)
      .then(res => {
        dispatch({
          type: actionType.UPLOAD_FILE_ORIGIN_SUCCESS,
          payload: res
        });
      })
      .catch(error => {
        dispatch({
          type: actionType.UPLOAD_FILE_ORIGIN_FAILED,
          payload: error
        });
      });
  };
};

export const loadOriginalData = () => {
  return dispatch => {
    dispatch({
      type: actionType.LOAD_ORDERDATA_REQUEST
    });
    actionsFB.loadOrderOriginal()
      .then(data => {
        dispatch({
          type: actionType.LOAD_ORDERDATA_SUCCESS,
          payload: data
        });
      })
      .catch(error => {
        dispatch({
          type: actionType.LOAD_ORDERDATA_FAILED,
          payload: error
        });
      });
  };
};

export const deleteOriginalData = () => {
  return dispatch => {
    dispatch({
      type: actionType.DELETE_ORDERDATA_REQUEST
    });
    actionsFB.deleteDataOrigin()
      .then(data => {
        dispatch({
          type: actionType.DELETE_ORDERDATA_SUCCESS,
          payload: data
        });
      })
      .catch(error => {
        dispatch({
          type: actionType.DELETE_ORDERDATA_FAILED,
          payload: error
        });
      });
  };
};

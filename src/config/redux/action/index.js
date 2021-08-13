import firebase, { database } from "../../firebase";
import swal from "sweetalert";

export const loginUserApi = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.username, data.password)
      .then((res) => {
        console.log("success: ", res);
        const dataUser = {
          username: res.user.email,
          userId: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken,
        };
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: dataUser });
        dispatch({ type: "CHANGE_ERRSUBMIT", value: false });
        dispatch({ type: "CHANGE_ERRSUBMITMESSAGE", value: "" });
        resolve(dataUser);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: "CHANGE_ERRSUBMIT", value: true });
        dispatch({ type: "CHANGE_ERRSUBMITMESSAGE", value: errorMessage });
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        reject(errorMessage);
      });
  });
};
export const registerUserApi = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.username, data.password)
      .then((res) => {
        console.log("success: ", res);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ERRSUBMIT", value: false });
        dispatch({ type: "CHANGE_ERRSUBMITMESSAGE", value: "" });
        resolve(true);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ERRSUBMIT", value: true });
        dispatch({ type: "CHANGE_ERRSUBMITMESSAGE", value: errorMessage });
        reject(false);
      });
  });
};

export const handleModal = (data) => (dispatch) => {
  return dispatch({ type: "CHANGE_MODAL", value: data });
};

export const handleEdit = (data) => (dispatch) => {
  return dispatch({ type: "CHANGE_EDIT", value: data });
};

export const setNotes = (data) => (dispatch) => {
  return dispatch({ type: "CHANGE_NOTES", value: data });
};

export const AddDataToAPI = (data) => (dispatch) => {
  database.ref("notes/" + data.userId).push({
    heading: data.heading,
    content: data.content,
    date: data.date,
  });
  console.log(data);
};
export const getDataFromAPI = (userId) => (dispatch) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  const starCountRef = database.ref("notes/" + userId);
  return new Promise((resolve, reject) => {
    starCountRef.on("value", (snapshot) => {
      const data = [];
      Object.keys(snapshot.val()).map((key) => {
        data.push({
          id: key,
          data: snapshot.val()[key],
        });
      });
      dispatch({ type: "CHANGE_LOADING", value: false });
      console.log(data);
      dispatch({ type: "CHANGE_NOTES", value: data });
      resolve(data);
    });
  });
};

export const getDataNotesFromAPI = ({userId, id}) => (dispatch) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  const starCountRef = database.ref("notes/" + userId + "/" + id);
  return new Promise((resolve, reject)=>{
    starCountRef.on("value", (snapshot) => {
      // console.log(snapshot.val());
      // const data = [];
      // Object.keys(snapshot.val()).map((key) => {
      //   data.push({data: snapshot.val()[key]});
      // },[]);
      const data = snapshot.val();
      dispatch({ type: "CHANGE_LOADING", value: false });
      resolve(data);
      console.log(data);
    });
  })
  // return new Promise((resolve, reject) => {
  //   starCountRef.on("value", (snapshot) => {
  //     // console.log(snapshot.val());
  //     const data = [];
  //     Object.keys(snapshot.val()).map((key) => {
  //       data.push({
  //         id: key,
  //         data: snapshot.val()[key],
  //       });
  //     });
  //     dispatch({ type: "CHANGE_LOADING", value: false });
  //     // console.log(data);
  //     // dispatch({ type: "CHANGE_NOTES", value: data });
  //     resolve(data);
  //   });
  // });
};

export const setErrorSubmit = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_ERRSUBMIT", value: data });
};
export const setErrorSubmitMessage = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_ERRSUBMITMESSAGE", value: data });
};

import firebase, { database } from "../../firebase";

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
        resolve(dataUser);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        reject(false);
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
        resolve(true);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
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
  const starCountRef = database.ref('notes/' + userId);
  starCountRef.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
};
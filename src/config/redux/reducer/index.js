const initialState = {
    isModal: false,
    isEdit: false,
    isLogin: false,
    isLoading: false,
    isErrorSubmit: false,
    isErrorSubmitMessage: "",
    user: {},
    notes: []
  };
  
const reducer = (state = initialState, action) => {
    if (action.type === "CHANGE_MODAL") {
      return {
        ...state,
        isModal: action.value,
      };
    }
    if (action.type === "CHANGE_EDIT") {
      return {
        ...state,
        isEdit: action.value,
      };
    }
    if (action.type === "CHANGE_ISLOGIN") {
      return {
        ...state,
        isLogin: action.value,
      };
    }
    if (action.type === "CHANGE_LOADING") {
      return {
        ...state,
        isLoading: action.value,
      };
    }
    if (action.type === "CHANGE_ERRSUBMIT") {
      return {
        ...state,
        isErrorSubmit: action.value,
      };
    }
    if (action.type === "CHANGE_ERRSUBMITMESSAGE") {
      return {
        ...state,
        isErrorSubmitMessage: action.value,
      };
    }
    if (action.type === "CHANGE_USER") {
      return {
        ...state,
        user: action.value,
      };
    }
    if (action.type === "CHANGE_NOTES") {
      return {
        ...state,
        notes: action.value,
      };
    }
    return state;
  };
  export default reducer;
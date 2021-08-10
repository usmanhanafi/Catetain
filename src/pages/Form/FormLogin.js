import React, { Component } from "react";
import "./Form.scss";
import { Link } from "react-router-dom";
import { loginUserApi } from "../../config/redux/action";
import { connect } from "react-redux";
import swal from "sweetalert";

const gIcon = "./assets/icon/google.svg";
class FormLogin extends Component {
  state = {
    values: {
      username: "",
      password: "",
    },
  };
  handleChange = (e) => {
    let values = this.state;
    values[e.target.id] = e.target.value;
    this.setState({ values: values });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state.values;
    const res = await this.props
      .loginApi({ username, password })
      .catch((errorMessage) => {
        swal("auth/wrong-password The password is invalid or the user does not have a password.", {
          icon: "warning",
          buttons: false,
          timer: 1500,
        });
        // console.log(errorMessage)
      });
    if (res) {
      this.props.history.push('/')
      swal("Yeay Berhasil Masuk", {
        icon: "success",
        buttons: false,
        timer: 1500,
      });
      localStorage.setItem('userData', JSON.stringify(res));
      console.log("yeay berhasil masuk: ", res);
      this.setState({
        values: {
          username: "",
          password: "",
        },
      });
    }
  };
  render() {
    const { values } = this.state;
    return (
      <div className="myform">
        <div className="form-wrapper">
          <h3>Login</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-content">
              <label htmlFor="passowrd">
                Username
                <input
                  onChange={this.handleChange}
                  value={values.username}
                  type="text"
                  placeholder="Username"
                  id="username"
                />
              </label>
              <label htmlFor="passowrd">
                Password
                <input
                  onChange={this.handleChange}
                  value={values.password}
                  type="password"
                  placeholder="Username"
                  id="password"
                />
              </label>
              <input className="submit-btn" type="submit" value="Login" />
            </div>
          </form>
          <hr />
          <div className="a-google">
            <button>
              <img src={gIcon} alt="logo-google" />
              SignIn With Google
            </button>
          </div>
          <div className="link">
            <p>
              Belum Punya Akun?<Link to="/register">Daftar</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
const reduxDispatch = (dispatch) => ({
  loginApi: (data) => dispatch(loginUserApi(data)),
});
const reduxState = (state) => ({
  isLoading: state.isLoading,
});

export default connect(reduxState, reduxDispatch)(FormLogin);

// export const FormLogin = ({dataUser, loginGoogle}) => {
//   // const [dataUser, setDatauser] = useState({
//   //   isAuth: false,
//   //   isError: false,
//   //   account: null,
//   // });
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const handleChange = (e) => {
//     let data = { ...formData };
//     data[e.target.name] = e.target.value;
//     setFormData(data);
//   };
//   const handleSubmit = (e) => {
//     e.previous();
//     alert("submit");
//   };
//   return (
//     <div className="form">
//       <div className="form-wrapper">
//         <h3>Login</h3>
//         <form>
//           <div className="form-content">
//             <label htmlFor="passowrd">
//               Username
//               <input
//                 onChange={handleChange}
//                 value={formData.username}
//                 type="text"
//                 placeholder="Username"
//                 name="username"
//               />
//             </label>
//             <label htmlFor="passowrd">
//               Password
//               <input
//                 onChange={handleChange}
//                 value={formData.password}
//                 type="password"
//                 placeholder="Username"
//                 name="password"
//               />
//             </label>
//             <input className="submit-btn" type="submit" value="Submit" />
//           </div>
//         </form>
//         <hr />
//         <div className="a-google">
//           <button onClick={loginGoogle}>
//             <img src={gIcon} alt="logo-google" />
//             SignIn With Google
//           </button>
//         </div>
//         <div className="link">
//           <p>
//             Belum Punya Akun?<Link to="/register">Daftar</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

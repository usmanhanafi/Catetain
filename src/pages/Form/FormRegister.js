import React, { Component } from "react";
import "./Form.scss";
import { Link } from "react-router-dom";
import { registerUserApi } from "../../config/redux/action";
import { connect } from "react-redux";

const gIcon = "./assets/icon/google.svg";
class FormRegister extends Component {
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
    const values = this.state.values;
    const res = await this.props
      .registerApi(values)
      .catch((err) => err);
    if (res) {
      const history = this.props.history;
      history.push('/login');
      this.setState({
        values: {
          username: "",
          password: "",
        },
      });
    }
  };
  handleCloseErr = () => {
    this.props.setErrorSubmit(false);
    this.props.setErrorSubmitMessage("");
  }
  render() {
    const { values } = this.state;
    return (
      <div className="myform">
        <div className="form-wrapper">
        {this.props.isErrorSubmit ? (
            <div className="err-submit-message">
              <p>{this.props.isErrorSubmitMessage}</p>
              <div className="close-err" onClick={this.handleCloseErr}>
                <p>x</p>
              </div>
            </div>
          ): null}
          <h3>Register</h3>
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
              <input className="submit-btn" type="submit" value="Submit" />
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
              Sudah Punya Akun?<Link to="/login">Masuk</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
const reduxDispatch = (dispatch) => ({
  registerApi: (data) => dispatch(registerUserApi(data)),
});
const reduxState = (state) => ({
  isLoading: state.isLoading,
});

export default connect(reduxState, reduxDispatch)(FormRegister);

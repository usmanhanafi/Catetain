import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import "../AddModal/AddModal.scss";
import { withStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { formatDate, timestamp } from "../../utils";
import swal from "sweetalert";
import { url } from "../../utils";
import axios from "axios";
import { uid } from "uid";
import { connect } from "react-redux";
import { handleEdit, setNotes } from "../../config/redux/action";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#81DEEA",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#81DEEA",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#397981",
        borderRadius: "10px",
      },
      "&:hover fieldset": {
        borderColor: "#397981",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#81DEEA",
      },
    },
  },
})(TextField);

// const EditModal = ({ formData, id }) => {
class EditModal extends Component {
  handleModal = () => {
    this.props.setIsModal(false);
  };
  // handleChange = (e) => {
  //   const formData = this.props;
  //   let data = this.props;
  //   data[e.target.name] = e.target.value;
  //   this.setState({ formData: data });
  // };
  // handleEditSubmit = (e) => {
  //   e.preventDefault();
  //   swal({
  //     title: "Berhasil!",
  //     text: "Kamu berhasil mengedit catatan ini.",
  //     icon: "success",
  //     button: false,
  //     timer: 2000,
  //   });
  //   // let data = this.state.state;
  //   if (this.props.formData.heading === "") {
  //     return false;
  //   }
  //   if (this.props.formData.content === "") {
  //     return false;
  //   }
  //   const dataSubmit = {
  //     id: uid(),
  //     heading: this.props.formData.heading,
  //     content: this.props.formData.content,
  //     date: "Modified " + formatDate(timestamp),
  //   };
  //   // data.push(dataSubmit);
  //   // this.setState(data);
  //   // const id = this.props;
  //   const id = this.props.id;
  //   axios.put(`${url}/${id}`, dataSubmit);
  //   this.props.setIsModal(false);
  // };
  render() {
    console.log("umplog");
    return (
      <div className="add-modal">
        <Container maxWidth="sm">
          <div className="modal-wrapper">
            <form onSubmit={this.props.handleEditSubmit} className="form">
              <CssTextField
                label="Judul"
                variant="outlined"
                id="custom-css-outlined-input"
                value={this.props.formData.heading}
                onChange={this.props.handleChange}
                name="heading"
                required
              />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={4}
                placeholder="Note in here"
                className="textarea"
                value={this.props.formData.content}
                onChange={this.props.handleChange}
                name="content"
                required
              />
              <div className="btn-modal">
                <button onClick={this.handleModal} className="btn-cancle-modal">
                  Cancle
                </button>
                <button type="submit" className="btn-submit-modal">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}
// };
// const reduxState = (state) => ({
//   Notes: state.notes,
// });
const reduxDispatch = (dispatch) => ({
  setNotes: (data) => dispatch(setNotes(data)),
  setIsModal: (data) => dispatch(handleEdit(data)),
});

export default connect(null, reduxDispatch)(EditModal);

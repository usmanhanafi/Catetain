import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import "./AddModal.scss";
import { withStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { formatDate, timestamp } from "../../utils";
import swal from "sweetalert";
import { url } from "../../utils";
import axios from "axios";
import { uid } from "uid";
import {connect} from "react-redux";
import {handleModal, setNotes, AddDataToAPI} from "../../config/redux/action";

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


class AddModal extends Component {
  state = {
    formData: {
      heading: "",
    content: "",
    }
  }
   handleModal = () => {
    this.props.setIsModal(false);
  };
   handleChange = (e) => {
    let data = this.state;
    data[e.target.name] = e.target.value;
    this.setState({formData: data});
  };
  handleSubmit = (e) => {
    e.preventDefault();
    swal({
      title: "Berhasil!",
      text: "Kamu berhasil membuat catatan baru.",
      icon: "success",
      button: false,
      timer: 2000,
    });
    let data = this.props.Notes;
    const formData = this.state;
    if (formData.heading === "") {
      return false;
    }
    if (formData.content === "") {
      return false;
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    const dataSubmit = {
      userId: userData.userId,
      // id: uid(),
      heading: formData.heading,
      content: formData.content,
      date: "Created at " + formatDate(timestamp),
    };
    data.push(dataSubmit);
    // this.props.setNotes(data);
    this.props.AddDataToAPI(dataSubmit);
    // axios.post(`${url}`, dataSubmit);
    this.setState({formData: { heading: "", content: "" }});
    this.props.setIsModal(false);
  };
  render() {
    return (
      <div className="add-modal">
      <Container maxWidth="sm">
        <div className="modal-wrapper">
          <form onSubmit={this.handleSubmit} className="form">
            <CssTextField
              label="Judul"
              variant="outlined"
              id="custom-css-outlined-input"
              value={this.state.formData.heading}
              onChange={this.handleChange}
              name="heading"
              required
            />
            <TextareaAutosize
              aria-label="minimum height"
              minRows={4}
              placeholder="Note in here"
              className="textarea"
              value={this.state.formData.content}
              onChange={this.handleChange}
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
    )
  }
}
const reduxState = (state) =>({
  Notes: state.notes,
  userData: state.user
})
const reduxDispatch = (dispatch) =>({
  setNotes : (data) => dispatch(setNotes(data)),
  setIsModal: (data) => dispatch(handleModal(data)),
  AddDataToAPI: (data) => dispatch(AddDataToAPI(data))
})

export default connect(reduxState, reduxDispatch)(AddModal);

// const AddModal = () => {
//   const handleModal = () => {
//     this.props.setModal(true);
//   };
//   const handleChange = (e) => {
//     let data = { ...formData };
//     data[e.target.name] = e.target.value;
//     setFormData(data);
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     swal({
//       title: "Berhasil!",
//       text: "Kamu berhasil membuat catatan baru.",
//       icon: "success",
//       button: false,
//       timer: 2000,
//     });
//     let data = [...notes];
//     if (formData.heading === "") {
//       return false;
//     }
//     if (formData.content === "") {
//       return false;
//     }
//     const dataSubmit = {
//       id: uid(),
//       heading: formData.heading,
//       content: formData.content,
//       date: "Created at " + formatDate(timestamp),
//     };
//     data.push(dataSubmit);
//     setNotes(data);
//     axios.post(`${url}`, dataSubmit);
//     setFormData({ heading: "", content: "" });
//     setIsModal(false);
//   };
//   return (
//     <div className="add-modal">
//       <Container maxWidth="sm">
//         <div className="modal-wrapper">
//           <form onSubmit={handleSubmit} className="form">
//             <CssTextField
//               label="Judul"
//               variant="outlined"
//               id="custom-css-outlined-input"
//               value={formData.heading}
//               onChange={handleChange}
//               name="heading"
//               required
//             />
//             <TextareaAutosize
//               aria-label="minimum height"
//               minRows={4}
//               placeholder="Note in here"
//               className="textarea"
//               value={formData.content}
//               onChange={handleChange}
//               name="content"
//               required
//             />
//             <div className="btn-modal">
//               <button onClick={handleModal} className="btn-cancle-modal">
//                 Cancle
//               </button>
//               <button type="submit" className="btn-submit-modal">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default AddModal;

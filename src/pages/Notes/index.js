import React, { Component, Fragment } from "react";
import { Container } from "@material-ui/core";
import {
  BackNotes,
  EditNotes,
  DeleteNotes,
} from "../../components/ButtonNotes";
import { url } from "../../utils";
import axios from "axios";
import TodayIcon from "@material-ui/icons/Today";
import "./Notes.scss";
import swal from "sweetalert";
import EditModal from "../../components/EditModal";
import { uid } from "uid";
import { handleEdit, getDataNotesFromAPI } from "../../config/redux/action";
import { connect } from "react-redux";
import { formatDate, timestamp } from "../../utils";

class Notes extends Component {
  state = [{
    notes: {
      heading: "",
      content: "",
      date: "",
    },
    formData: {
      heading: "",
      content: "",
    },
    isUpdate: false,
  }];
  componentDidMount = async () => {
    const id = this.props.match.params.id;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData.userId;
    console.log(this.props);
    const res = await this.props.getDataNotesFromAPI({ userId, id });
    if (res) {
      const data = [
        {
          heading: res.heading,
          content: res.content,
          date: res.date,
        },
      ];
      this.setState({ notes: data });
      console.log(data);
    }
    // .then((res) => {
    //   // const data = {
    //   //   heading: res.data.heading,
    //   //   content: res.data.content,
    //   //   date: res.data.date,
    //   // };
    //   // this.setState({ notes: data });
    //   console.log("ini lho.......: ", res);
    // });
  };
  handleDelete = () => {
    const id = this.props.match.params.id;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`${url}/${id}`).then(() => {
          this.props.history.goBack();
        });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
          buttons: false,
          timer: 1500,
        });
      } else {
        swal({
          text: "Your imaginary file is safe!",
          timer: 1500,
          buttons: false,
        });
      }
    });
  };
  handleIsEdit = () => {
    this.props.setIsModal(true);
  };
  handleChange = (e) => {
    // const formData = this.state;
    let data = { ...this.state.formData };
    data[e.target.name] = e.target.value;
    this.setState({ formData: data });
  };
  handleBack = () => {
    this.props.history.goBack();
  };
  handleEditSubmit = (e) => {
    e.preventDefault();
    swal({
      title: "Berhasil!",
      text: "Kamu berhasil mengedit catatan ini.",
      icon: "success",
      button: false,
      timer: 2000,
    });
    // let data = this.state.state;
    if (this.state.formData.heading === "") {
      return false;
    }
    if (this.state.formData.content === "") {
      return false;
    }
    const id = this.props.match.params.id;
    const dataSubmit = {
      id: uid(),
      heading: this.state.formData.heading,
      content: this.state.formData.content,
      date: "Modified " + formatDate(timestamp),
    };
    // data.push(dataSubmit);
    this.setState({ notes: dataSubmit });
    axios.put(`${url}/${id}`, dataSubmit);
    this.props.setIsModal(false);
    this.setState({ isUpdate: true });
  };
  render() {
    const myId = this.props.match.params.id;
    const notes = this.state;
    return (
      <Fragment>
        {/* {notes.map((note) => { */}
        <Container maxWidth="md">
          <div className="notes">
            <nav className="nav-notes">
              <div className="back-page">
                <BackNotes onClick={this.handleBack} />
              </div>
              <div className="action-page">
                <DeleteNotes onClick={this.handleDelete} />
                <EditNotes onClick={this.handleIsEdit} />
              </div>
            </nav>
            {notes.map((note) => {
              <Fragment>
                <div className="heading">
                  <h1>{note.heading}</h1>
                  <p className="date-note">
                    <TodayIcon />
                    {note.date}
                  </p>
                </div>
                <div className="body-content">
                  <p className="content">{note.content}</p>
                </div>
              </Fragment>;
            })}
          </div>
          {this.props.isEdit ? (
            <EditModal
              formData={this.state.formData}
              id={myId}
              handleChange={this.handleChange}
              handleEditSubmit={this.handleEditSubmit}
            />
          ) : null}
        </Container>
        {/* })} */}
      </Fragment>
    );
  }
}

const reduxState = (state) => ({
  isEdit: state.isEdit,
  // notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  setIsModal: (data) => dispatch(handleEdit(data)),
  getDataNotesFromAPI: (data) => dispatch(getDataNotesFromAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Notes);

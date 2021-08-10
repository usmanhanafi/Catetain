// import React, { useState, useEffect } from "react";
import React, { Component } from "react";
// import { useHistory } from "react-router-dom";
import NavbarHome from "../../components/NavbarHome";
import { AddNotes } from "../../components/ButtonNotes";
import CardNotes from "../../components/CardNotes";
import { Container } from "@material-ui/core";
import AddModal from "../../components/AddModal";
import { url } from "../../utils";
import axios from "axios";
// import { uid } from "uid";
// import swal from "sweetalert";
import { handleModal, setNotes } from "../../config/redux/action";
import {connect} from "react-redux";

class Home extends Component {
  componentDidMount(){
    // axios.get(`${url}`).then((res) => {
    //   console.log(res.data);
    //   this.props.setNote(res?.data ?? []);
    // });
    const userData = localStorage.getItem('userData');
    this.props.getNotes(userData.userId);
    // console.log('dashboard: ', JSON.parse(userData));
  }
  handleDetail = (id) => {
    this.props.history.push(`notes/${id}`);
  };
  handleModal = () => {
    this.props.setModal(true);
  };
  render() {
    console.log(this.props.user);
    return (
      <div className="home-wrapper">
        <Container maxWidth="lg">
          <NavbarHome></NavbarHome>
          <CardNotes handleDetail={this.handleDetail} />
          <AddNotes onClick={this.handleModal} />
          {this.props.isModal ? (
            <AddModal />
          ) : null}
        </Container>
      </div>
    );
  }
}
const reduxState = (state) => ({
  isModal: state.isModal,
  user: state.user
});

const reduxDispatch = (dispatch) =>({
  setNote: (data) => dispatch(setNotes(data)),
  setModal: (data) => dispatch(handleModal(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data))
})
export default connect(reduxState, reduxDispatch)(Home);


// const Home = () => {
//   // const [notes, setNotes] = useState([]);
//   // const [isModal, setIsModal] = useState(false);

//   let history = useHistory();
//   useEffect(() => {
//     // mengambildata
//     axios.get(`${url}`).then((res) => {
//       console.log(res.data);
//       this.props.setNote(res?.data ?? []);
//     });
//   }, []);
//   // const [formData, setFormData] = useState({
//   //   heading: "",
//   //   content: "",
//   // });
//   // const handleModal = () => {
//   //   this.props.setModal(true);
//   // };
//   // const handleChange = (e) => {
//   //   let data = { ...formData };
//   //   data[e.target.name] = e.target.value;
//   //   setFormData(data);
//   // };
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   swal({
//   //     title: "Berhasil!",
//   //     text: "Kamu berhasil membuat catatan baru.",
//   //     icon: "success",
//   //     button: false,
//   //     timer: 2000,
//   //   });
//   //   let data = [...notes];
//   //   if (formData.heading === "") {
//   //     return false;
//   //   }
//   //   if (formData.content === "") {
//   //     return false;
//   //   }
//   //   const dataSubmit = {
//   //     id: uid(),
//   //     heading: formData.heading,
//   //     content: formData.content,
//   //     date: "Created at " + formatDate(timestamp),
//   //   };
//   //   data.push(dataSubmit);
//   //   setNotes(data);
//   //   axios.post(`${url}`, dataSubmit);
//   //   setFormData({ heading: "", content: "" });
//   //   setIsModal(false);
//   // };
//   const handleDetail = (id) => {
//     history.push(`notes/${id}`);
//   };
//   return (
//     <div className="home-wrapper">
//       <Container maxWidth="lg">
//         <NavbarHome>
//         </NavbarHome>
//         <CardNotes handleDetail={handleDetail} />
//         <AddNotes onClick={this.props.setModal(false)} />
//         {isModal ? (
//           <AddModal/>
//         ) : null}
//       </Container>
//     </div>
//   );
// };

// const reduxDispatch = (dispatch) =>({
//   setNote: (data) => dispatch(setNotes(data)),
//   setModal: (data) => dispatch(handleModal(data))
// })

// export default connect(null, reduxDispatch)(Home);
import React from "react";
import NavbarHome from "../../components/NavbarHome";
import { AddNotes } from "../../components/ButtonNotes";
import { CardNotes } from "../../components/CardNotes";
import { Container } from "@material-ui/core";
import AddModal from "../../components/AddModal";
import { handleModal } from "../../config/redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const isModal = useSelector((state) => state.isModal);
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const handleDetail = (id) => {
  history.push(`notes/${userData.userId}/${id}`);
  };
  const setModal = () => {
    dispatch(handleModal(true));
  };
  return (
    <div className="home-wrapper">
      <Container maxWidth="lg">
        <NavbarHome></NavbarHome>
        <CardNotes handleDetail={handleDetail} />
        <AddNotes onClick={setModal} />
        {isModal ? <AddModal /> : null}
      </Container>
    </div>
  );
};

export default Dashboard;

// class Home extends Component {
//   handleDetail = (id) => {
//     this.props.history.push(`notes/${id}`);
//   };
//   handleModal = () => {
//     this.props.setModal(true);
//   };
//   render() {
//     console.log(this.props.user);
//     return (
//       <div className="home-wrapper">
//         <Container maxWidth="lg">
//           <NavbarHome></NavbarHome>
//           <CardNotes handleDetail={this.handleDetail} />
//           <AddNotes onClick={this.handleModal} />
//           {this.props.isModal ? (
//             <AddModal />
//           ) : null}
//         </Container>
//       </div>
//     );
//   }
// }
// const reduxState = (state) => ({
//   isModal: state.isModal,
//   user: state.user
// });

// const reduxDispatch = (dispatch) =>({
//   setNote: (data) => dispatch(setNotes(data)),
//   setModal: (data) => dispatch(handleModal(data)),
//   // getNotes: (data) => dispatch(getDataFromAPI(data))
// })
// export default connect(reduxState, reduxDispatch)(Home);

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

import React, { useState } from "react";

const searchIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 21L16.514 16.506L21 21ZM19 10.5C19 12.7543 18.1045 14.9163 16.5104 16.5104C14.9163 18.1045 12.7543 19 10.5 19C8.24566 19 6.08365 18.1045 4.48959 16.5104C2.89553 14.9163 2 12.7543 2 10.5C2 8.24566 2.89553 6.08365 4.48959 4.48959C6.08365 2.89553 8.24566 2 10.5 2C12.7543 2 14.9163 2.89553 16.5104 4.48959C18.1045 6.08365 19 8.24566 19 10.5V10.5Z"
      stroke="#F5F5F5"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: "#3B3B3B",
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(1),
//       width: "auto",
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#fff",
//   },
//   inputRoot: {
//     color: "#f5f5f5",
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

// const Search = () => {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Toolbar>
//         <div className={classes.search}>
//           <div className={classes.searchIcon}>
//             <SearchIcon />
//           </div>
//           <InputBase
//             placeholder="Search…"
//             classes={{
//               root: classes.inputRoot,
//               input: classes.inputInput,
//             }}
//             inputProps={{ "aria-label": "search" }}
//           />
//         </div>
//       </Toolbar>
//     </div>
//   );
// };

const Search = ({ handleSearch }) => {
  const [btnActive, setBtn] = useState(false);
  const handleBtn = () => {
    setBtn(!btnActive);
  };
  // const active = () => {
  //   if(btnActive){

  //   }
  // }
  return (
    <div
      className={`search ${btnActive ? "active" : null}`}
      onClick={handleBtn}
    >
      {searchIcon}
      <input type="search" placeholder="Search..." onChange={handleSearch} />
    </div>
  );
};

export default Search;

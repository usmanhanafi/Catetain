import React, { useEffect } from "react";
import TodayIcon from "@material-ui/icons/Today";
import "./CardNotes.scss";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromAPI } from "../../config/redux/action";

export const CardNotes = ({handleDetail}) => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    console.log("this: ", userData);
    dispatch(getDataFromAPI(userData.userId));
  }, []);
  const notes = useSelector((state) => state.notes);
  console.log(notes);
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 800: 2, 900: 3, 1144: 4 }}>
      {notes.length > 0 ? (
        <Masonry>
          {notes.map((item) => {
            return (
              <div className="card-wrapper" key={item.id}>
                <button onClick={() => handleDetail(item.id)}>
                  <h3
                    className="judul"
                  >
                    {item.data.heading}
                  </h3>
                  <p className="date">
                    <TodayIcon />
                    {item.data.date}
                  </p>
                </button>
              </div>
            );
          })}
        </Masonry>
      ) : null}
    </ResponsiveMasonry>
  );
};
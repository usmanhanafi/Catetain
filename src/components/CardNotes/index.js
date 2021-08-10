import React, { useEffect, useState } from "react";
import TodayIcon from "@material-ui/icons/Today";
import "./CardNotes.scss";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import axios from "axios";
import { url } from "../../utils";


const CardNotes = ({ handleDetail, keyword }) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get(`${url}`).then((res) => {
      setNotes(res.data);
    });
  });
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 800: 2, 900: 3, 1144: 4 }}>
      <Masonry>
        {notes.map((item) => {
          return (
            <div className="card-wrapper">
              <button>
                <h3
                  className="judul"
                  onClick={() => {
                    handleDetail(item.id);
                  }}
                >
                  {item.heading}
                </h3>
                <p className="date">
                  <TodayIcon />
                  {item.date}
                </p>
              </button>
            </div>
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
};
export default CardNotes;

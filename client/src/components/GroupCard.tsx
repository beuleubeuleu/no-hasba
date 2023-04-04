import React        from "react";
import TrigroupType from "../types/Trigroup";
import "./GroupCard.css"

type groupCardProps = {
  data: TrigroupType
}
const groupCard = ({data}: groupCardProps) => {
  return (
      <button className="trigroup--card__container">
        <li className="trigroup--card">
          <p className="trigroup--card__name">{data.name}</p>
          <br/>
          <p className="trigroup--card__desc">{data.description}</p>
        </li>
      </button>
  );
};

export default groupCard;

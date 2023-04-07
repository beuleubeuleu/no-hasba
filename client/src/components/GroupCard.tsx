import React        from "react";
import trigroupType from "../types/trigroupType";
import "./GroupCard.css"

type groupCardProps = {
  data: trigroupType
}
const groupCard = ({data}: groupCardProps) => {
  return (
      <a href={`/group/${data.id}`} className="trigroup--card__container">
        <li className="trigroup--card">
          <p className="trigroup--card__name">{data.name}</p>
          <br/>
          <p className="trigroup--card__desc">{data.description}</p>
        </li>
      </a>
  );
};

export default groupCard;

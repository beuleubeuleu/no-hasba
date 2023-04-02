import React from "react";

type groupCardProps = {
  data: any
}
const groupCard = ({data}: groupCardProps) => {
  return (
      <div>
        {data.name}
      </div>
  );
};

export default groupCard;

import React, { useEffect, useState } from "react";
import Header                         from "./components/Header"
import GroupList                      from "./components/GroupList";
import { getGroups }                  from "./api/groups";

const App = () => {
  const [groups, setGroups] = useState([])

  const getAllGroups = async() => {
    const groups = await getGroups()
    setGroups(groups)
  }

  useEffect(() => {
    return () => {
      getAllGroups()
    };
  }, []);


  return (
      <div>
        <Header/>
        <GroupList groups={groups}/>
      </div>
  );
};

export default App;

import React, { createContext, useContext, useEffect, useState } from "react";
import trigroupType                                              from "../types/trigroupType";
import { getGroups }                                             from "../api/groups";

type contextProps = {
  children: React.ReactNode
}

type trigroupContextType = {
  trigroups: trigroupType[]
}

const createContextTrigroup = createContext<trigroupContextType>({} as trigroupContextType)
export const useTrigroupContext = () => useContext(createContextTrigroup)



const TrigroupContextProvider = ({ children }: contextProps) => {
  const [trigroups, setTrigroups] = useState<trigroupType[]>([])

  const getAllGroups = async() => {
    setTrigroups(await getGroups())
  }

  useEffect(() => {
    return () => {
      getAllGroups()
    };
  }, []);

  return (
      <createContextTrigroup.Provider value={ { trigroups } }>
        { children }
      </createContextTrigroup.Provider>
  );
};

export default TrigroupContextProvider;

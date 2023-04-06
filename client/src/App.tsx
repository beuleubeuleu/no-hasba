import React                                   from "react";
import Header                                  from "./components/Header"
import GroupList                               from "./pages/GroupList/GroupList";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import TrigroupContextProvider                 from "./context/TrigroupContext";
import GroupDetail                             from "./pages/GroupDetail/GroupDetail";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <GroupList/>
    },
    {
      path: "/group/:id",
      element: <GroupDetail/>
    }
  ]);


  return (
      <div>
        <Header/>
        <TrigroupContextProvider>
          <RouterProvider router={ router }/>
        </TrigroupContextProvider>
      </div>
  );
};

export default App;

import React                                   from "react";
import Header                                  from "./components/Header"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import TrigroupContextProvider                 from "./context/TrigroupContext";
import GroupDetail from "./pages/GroupDetail/GroupDetail";
import Home        from "./pages/Home/Home";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
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

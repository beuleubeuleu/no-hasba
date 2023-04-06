import React     from "react";
import Header    from "./components/Header"
import GroupList from "./pages/GroupList/GroupList";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <GroupList/>
    }
  ]);


  return (
      <div>
        <Header/>
        <RouterProvider router={router}/>
      </div>
  );
};

export default App;

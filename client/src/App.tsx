import React                                   from "react";
import Header                                  from "./components/Header"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GroupDetail                             from "./pages/GroupDetail/GroupDetail";
import Home                                    from "./pages/Home/Home";

const App = () => {

  return (
      <div>
        <BrowserRouter>
        <Header/>
          <Routes>
            <Route element={<Home/>} path={"/"}/>
            <Route element={<GroupDetail/>} path={"/group/:id"}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
};

export default App;

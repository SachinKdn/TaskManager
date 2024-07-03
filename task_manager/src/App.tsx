import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/homepage";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
function App() {
  return (
    // <Routes>
    //   <Route element={<Basic />}>
    //     <Route path="/" element={<Home />} />
    //   </Route>
    // </Routes>

    <RouterProvider router={router} />
  );
}

export default App;

import { useState } from "react";
import { RouterProvider } from "react-router-dom";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;

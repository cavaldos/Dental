import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Provider from "./redux/provider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <App />
      <h1 className="text-red-600 ">sdaffdsfdsfdsfsdfdsa</h1>
    </Provider>
  </React.StrictMode>
);

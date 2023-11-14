import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { DataProvider } from "./DataContext/DataContexr";
import { store } from "./app/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
const root = ReactDOM.createRoot(document.getElementById("root"));
library.add(fas, far, fab);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <DataProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </DataProvider>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

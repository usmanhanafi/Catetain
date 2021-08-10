import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.scss";
import FormLogin from "./pages/Form/FormLogin";
import FormRegister from "./pages/Form/FormRegister";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import { Provider } from "react-redux";
import { store } from "./config/redux";

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
        <Route path="/" component={Home} exact />
        <Route path="/notes/:id" component={Notes} exact />
        <Route path="/login" component={FormLogin} exact/>
        <Route path="/register" component={FormRegister} exact/>
    </BrowserRouter>
    </Provider>
  );
};

export default App;

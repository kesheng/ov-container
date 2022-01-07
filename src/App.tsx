import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import MicroFrontend from "./MicroFrontend";
import "./App.scss";

const defaultHistory = createBrowserHistory();

const { REACT_APP_HOME_HOST: homeHost, REACT_APP_BLOG_HOST: blogHost } =
  process.env;

function Home({ history }: { history: any }) {
  return <MicroFrontend history={history} host={homeHost} name="Home" />;
}

function Blog({ history }: { history: any }) {
  return <MicroFrontend history={history} host={blogHost} name="Blog" />;
}

function Container({ history }: { history: any }) {
  return (
    <div className="container">
      <Home history={history} />
    </div>
  );
}

function App({ history = defaultHistory }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container history={history} />} />
        <Route path="/blog" element={<Blog history={history} />} />
        <Route path="/blog/:blogid" element={<Blog history={history} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

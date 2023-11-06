import { Route } from "wouter";

import Top from "./pages/Top";
import Post from "./pages/Post";

const Router = () => {
  return (
    <>
      <Route path="/" component={Top} />
      <Route path="/post" component={Post} />
    </>
  );
};

export default Router;

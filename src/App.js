import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./styles.css";

const Home = () => <div className="home">Home Component</div>;
const First = () => <div className="first">First Component</div>;
const Second = () => <div className="second">Second Component</div>;

const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="slide" timeout={1000}>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/first" component={First} />
        <Route path="/second" component={Second} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AnimatedSwitch />
        <nav>
          <ul>
            <li>
              <Link to="/">Go to home</Link>
            </li>
            <li>
              <Link to="/first">Go to first</Link>
            </li>
            <li>
              <Link to="/second">Go to second</Link>
            </li>
          </ul>
        </nav>
      </BrowserRouter>
    </div>
  );
}

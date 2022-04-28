import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Transition, TransitionGroup } from "react-transition-group";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Link to="/left" style={{ padding: "1rem" }}>
            Left
          </Link>
          <Link to="/center" style={{ padding: "1rem" }}>
            center
          </Link>
          <Link to="/right" style={{ padding: "1rem" }}>
            right
          </Link>
          <Route render={MyTransition} />
        </React.Fragment>
      </Router>
    );
  }
}

function Left(props) {
  const transitions = {
    entering: { transform: "translateX(-100%)", opacity: 0 },
    entered: { transform: "translateX(0%)", opacity: 1 },
    exiting: { transform: "translateX(-100%)", opacity: 0 }
  };

  const commonStyle = {
    backgroundColor: "lightgreen",
    position: "absolute",
    transition: "3s",
    width: "50%"
  };

  return (
    <div style={{ ...commonStyle, ...transitions[props.state] }}>
      <h1>Left</h1>
      <p>Currently in "{props.state}" state</p>
    </div>
  );
}

function Center(props) {
  const transitions = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 }
  };

  const commonStyle = {
    backgroundColor: "lightblue",
    position: "absolute",
    transition: "3s",
    width: "50%"
  };

  return (
    <div style={{ ...commonStyle, ...transitions[props.state] }}>
      <h1>Center</h1>
      <p>Currently in "{props.state}" state</p>
    </div>
  );
}

function Right(props) {
  const transitions = {
    entering: { transform: "translateX(100%)", opacity: 0 },
    entered: { transform: "translateX(0%)", opacity: 1 },
    exiting: { transform: "translateX(100%)", opacity: 0 }
  };

  const commonStyle = {
    backgroundColor: "lightpink",
    position: "absolute",
    transition: "3s",
    width: "50%"
  };

  return (
    <div style={{ ...commonStyle, ...transitions[props.state] }}>
      <h1>Right</h1>
      <p>Currently in "{props.state}" state</p>
    </div>
  );
}

function MyTransition(props) {
  return (
    <div style={{ position: "relative" }}>
      <TransitionGroup appear component={null}>
        <Transition
          key={props.location.pathname}
          timeout={{ enter: 0, exit: 3000 }}
        >
          {state => {
            switch (props.location.pathname) {
              case "/left":
                return <Left state={state} />;
              case "/center":
                return <Center state={state} />;
              case "/right":
                return <Right state={state} />;
              default:
                return <Redirect to="/left" />;
            }
          }}
        </Transition>
      </TransitionGroup>
    </div>
  );
}

export default App;

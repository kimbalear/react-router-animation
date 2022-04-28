import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Transition, TransitionGroup } from "react-transition-group";
import './styles/main.css'

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Link to="/left" className="btn_back" style={{ padding: "1rem" }}>
            Back
          </Link>
          {/*
          <Link to="/center" style={{ padding: "1rem" }}>
            center
          </Link>
    */}
          <Link to="/right" className="btn_next" style={{ padding: "1rem" }}>
            Next
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
    backgroundColor: "#ECB343",
    position: "absolute",
    transition: "2s",
    width: "100%",
    height: "100%",
    padding: "16px"
  };

  return (
    <div className="cont" style={{ ...commonStyle, ...transitions[props.state] }}>
      <h1>Screen 1</h1>
      <h2>The father has one animation, while his children can have a different one</h2>
      <div className="fp">
        <div class="screen1">
          <div class="lt">1</div>
          <div class="ct">2</div>
          <div class="rt">3</div>
          <div class="lc roll-in-left">4</div>
          <div class="cc swirl-in-fwd">5</div>
          <div class="rc">6</div>
          <div class="lb">7</div>
          <div class="cb">8</div>
          <div class="rb">9</div>
        </div>
      </div>
      <div className="fp">
      <div class="screen1">
          <div class="lt">1</div>
          <div class="ct">2</div>
          <div class="rt">3</div>
          <div class="lc">4</div>
          <div class="cc swirl-in-bck">5</div>
          <div class="rc">6</div>
          <div class="lb">7</div>
          <div class="cb">8</div>
          <div class="rb">9</div>
        </div>
      </div>
      <p>Currently in "{props.state}" state</p>
    </div>
  );
}
/*
function Center(props) {
  const transitions = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 }
  };

  const commonStyle = {
    backgroundColor: "lightblue",
    position: "absolute",
    transition: "2s",
    width: "100%",
    height: "100%"
  };

  return (
    <div style={{ ...commonStyle, ...transitions[props.state] }}>
      <h1>Center</h1>
      <p>Currently in "{props.state}" state</p>
    </div>
  );
}
*/
function Right(props) {
  const transitions = {
    entering: { transform: "translateX(100%)", opacity: 0 },
    entered: { transform: "translateX(0%)", opacity: 1 },
    exiting: { transform: "translateX(100%)", opacity: 0 }
  };

  const commonStyle = {
    backgroundColor: "#E2745D",
    position: "absolute",
    transition: "2s",
    width: "100%",
    height: "100%",
    padding: "16px"
  };

  return (
    <div className="cont" style={{ ...commonStyle, ...transitions[props.state] }}>
      <h1>Screen 2</h1>
      <h2>The father has one animation, while his children can have a different one</h2>
      <div className="fp">
    
        <div class="screen1">
          <div class="lt">1</div>
          <div class="ct">2</div>
          <div class="rt">3</div>
          <div class="lc">4</div>
          <div class="cc swirl-in-fwd">5</div>
          <div class="rc">6</div>
          <div class="lb">7</div>
          <div class="cb">8</div>
          <div class="rb">9</div>
        </div>
      </div>
      <div className="fp">
      <div class="screen1">
          <div class="lt">1</div>
          <div class="ct">2</div>
          <div class="rt">3</div>
          <div class="lc">4</div>
          <div class="cc swirl-in-fwd">5</div>
          <div class="rc">6</div>
          <div class="lb">7</div>
          <div class="cb">8</div>
          <div class="rb">9</div>
        </div>
      </div>
      <p>Currently in "{props.state}" state</p>
    </div>
  );
}

function MyTransition(props) {
  return (
    <div className="wrapper">
      <TransitionGroup appear component={null}>
        <Transition
          key={props.location.pathname}
          timeout={{ enter: 0, exit: 3000 }}
        >
          {state => {
            switch (props.location.pathname) {
              case "/left":
                return <Left state={state} />;
              /*  
            case "/center":
              return <Center state={state} />;
            */
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

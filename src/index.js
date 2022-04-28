import React from "react";
import { render } from "react-dom";
import TransitionGroupPlus from "react-transition-group-plus";
import DemoSquareComponent from "./DemoSquareComponent";
import Scene from "./scenedemo/Scene";
import Metro from "react-metro";

// Metro comes with a simple, fade in / out default. This object passed
// in as the third argument in the Metro.sequence overrides the default settings.
const defaultAnimationOverride = {
  animation: {
    out: {
      time: 0.5,
      delay: 0
    },
    in: {
      time: 1,
      delay: 0
    },
    willEnter: {
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0, ease: "easeInOutQuad" }
    },
    willLeave: {
      from: {
        opacity: 1,
        y: 0
      },
      to: { opacity: 0, y: 50, ease: "easeInOutQuad" }
    }
  }
};

class Page extends React.Component {
  constructor(props) {
    super(props);

    // set the initial animationMap, will get overriden by user interaction
    // on clickCallback
    const basic_data = [
      { name: "1", emoji: "🐵" },
      { name: "2", emoji: "🐶" },
      { name: "3", emoji: "🐮" }
    ];

    const data = [
      { name: "1", emoji: "🐵" },
      { name: "2", emoji: "🐶" },
      { name: "3", emoji: "🐮" },
      { name: "4", emoji: "🐕" },
      { name: "5", emoji: "🐩" },
      { name: "6", emoji: "🐺" },
      { name: "7", emoji: "🦊" },
      { name: "8", emoji: "🐱" },
      { name: "9", emoji: "🐈" },
      { name: "10", emoji: "🦁" },
      { name: "11", emoji: "🐯" },
      { name: "12", emoji: "🐅" },
      { name: "13", emoji: "🐆" },
      { name: "14", emoji: "🐴" },
      { name: "15", emoji: "🐎" },
      { name: "16", emoji: "🦄" },
      { name: "17", emoji: "🐂" },
      { name: "18", emoji: "🐷" }
    ];

    const delayedVertical = Metro.generateFocusMap(
      null,
      6,
      data.length,
      "delayedVertical",
      1
    );

    this.state = {
      basic_show: false,
      advanced_show: false,
      container_show: false,
      basic_mountComplete: false,
      basic_unmountComplete: false,
      container_mountComplete: false,
      container_unmountComplete: false,
      basic_clicked: null,
      advanced_mountComplete: false,
      advanced_unmountComplete: false,
      clickedItem: null,
      animationMap: delayedVertical,
      preset: "",
      basic_data,
      data
    };

    this.basic_toggle = this.basic_toggle.bind(this);
    this.advanced_toggle = this.advanced_toggle.bind(this);
  }

  basic_toggle() {
    this.setState({
      basic_show: !this.state.basic_show,
      basic_mountComplete: false,
      basic_unmountComplete: false
    });
  }

  container_toggle() {
    this.setState({
      container_show: !this.state.container_show,
      container_mountComplete: false,
      container_unmountComplete: false
    });
  }

  advanced_toggle() {
    this.setState({
      advanced_show: !this.state.advanced_show,
      advanced_mountComplete: false,
      advanced_unmountComplete: false
    });
  }

  basic_mountSequenceComplete() {
    // console.log('mountSequenceComplete')
    this.setState({
      basic_mountComplete: true,
      basic_unmountComplete: false
    });
  }

  container_mountSequenceComplete() {
    // console.log('mountSequenceComplete')
    this.setState({
      container_mountComplete: true,
      container_unmountComplete: false
    });
  }

  advanced_mountSequenceComplete() {
    // console.log('mountSequenceComplete')
    this.setState({
      advanced_mountComplete: true,
      advanced_unmountComplete: false
    });
  }

  basic_unmountSequenceComplete() {
    // console.log('unmountSequenceComplete')
    this.setState({
      basic_mountComplete: false,
      basic_unmountComplete: true
    });
  }

  container_unmountSequenceComplete() {
    // console.log('unmountSequenceComplete')
    this.setState({
      container_mountComplete: false,
      container_unmountComplete: true
    });
  }

  advanced_unmountSequenceComplete() {
    // console.log('unmountSequenceComplete')
    this.setState({
      advanced_mountComplete: false,
      advanced_unmountComplete: true
    });
  }

  basic_componentClickCallback(props, index) {
    this.setState({ basic_clicked: index });
  }

  advanced_componentClickCallback(props, index, isAnimating) {
    console.log("-> click", props, index, isAnimating);
    if (this.state.preset === "") {
      // dont override our current animationMap if no preset is selected
      this.setState({ advanced_show: false });
    } else {
      // generate focus map
      const domino = Metro.generateFocusMap(
        index,
        6,
        this.state.data.length,
        this.state.preset,
        1
      );

      this.setState(
        { advanced_unmountComplete: false, animationMap: domino },
        () => {
          this.setState({ advanced_show: false });
        }
      );
    }
  }

  isActive(preset) {
    if (this.state.preset === preset && this.state.advanced_show) {
      return { background: "#000", color: "white" };
    } else if (this.state.preset === preset && !this.state.advanced_show) {
      return { background: "#453387", color: "white", opacity: 0.3 };
    } else if (this.state.preset !== preset && !this.state.advanced_show) {
      return { background: "#453387", color: "white", opacity: 0.1 };
    } else {
      return null;
    }
  }

  activatePreset(preset) {
    if (this.state.preset !== preset) {
      this.setState({ preset });
    } else {
      this.setState({ preset: "" });
    }
  }

  basic_renderButtons() {
    return (
      <div>
        <div
          className="buttonStyle"
          style={{
            background: this.state.basic_show === true ? "#ba4c4c" : "#42a56a"
          }}
          onClick={() => this.basic_toggle()}
        >
          {this.state.basic_show === true
            ? "UNMOUNT <-"
            : "-> MOUNT COMPONENTS"}
        </div>
      </div>
    );
  }

  container_renderButtons() {
    return (
      <div>
        <div
          className="buttonStyle"
          style={{
            background:
              this.state.container_show === true ? "#ba4c4c" : "#42a56a"
          }}
          onClick={() => this.container_toggle()}
        >
          {this.state.container_show === true
            ? "UNMOUNT CONTAINER <-"
            : "-> MOUNT CONTAINER"}
        </div>
      </div>
    );
  }

  advanced_renderButtons() {
    return (
      <div>
        <div
          className="buttonStyle"
          style={{
            background:
              this.state.advanced_show === true ? "#ba4c4c" : "#42a56a"
          }}
          onClick={() => this.advanced_toggle()}
        >
          {this.state.advanced_show === true
            ? "UNMOUNT <-"
            : "-> MOUNT COMPONENTS"}
        </div>
        <div className="presetWrapper">
          <div
            className="animationPreset"
            style={{
              ...this.isActive("dominoForwards")
            }}
            onClick={() =>
              this.state.advanced_show
                ? this.activatePreset("dominoForwards")
                : null
            }
          >
            Domino - forwards
          </div>
          <div
            className="animationPreset"
            style={{
              ...this.isActive("dominoBackwards")
            }}
            onClick={() =>
              this.state.advanced_show
                ? this.activatePreset("dominoBackwards")
                : null
            }
          >
            Domino - backwards
          </div>
          <div
            className="animationPreset"
            style={{
              ...this.isActive("dominoMulti")
            }}
            onClick={() =>
              this.state.advanced_show
                ? this.activatePreset("dominoMulti")
                : null
            }
          >
            Domino - multi
          </div>
        </div>
      </div>
    );
  }

  //////////////////////////////////// METRO START ////////////////////////////////////

  // Basic demo:

  renderBasicMetro() {
    if (!this.state.basic_show) {
      return null;
    }

    return Metro.sequence(
      this.state.basic_data,
      [],
      defaultAnimationOverride
    ).map(data => {
      return (
        <Metro.animation
          {...data}
          onClick={this.basic_componentClickCallback.bind(this)}
          onMount={this.basic_mountSequenceComplete.bind(this)}
          onUnmount={this.basic_unmountSequenceComplete.bind(this)}
        >
          <DemoSquareComponent {...data.content} />
        </Metro.animation>
      );
    });
  }

  // Container demo:

  renderContainerMetro() {
    if (!this.state.container_show) {
      return null;
    }

    const props = {
      onUnmount: this.container_unmountSequenceComplete.bind(this),
      onMount: this.container_mountSequenceComplete.bind(this)
    };

    return Metro.container(
      <div>
        <p>I´m a container</p>
        {<DemoSquareComponent name={""} emoji={"😊"} />}
      </div>,
      null,
      props
    );
  }

  // Advanced demo:

  renderAdvancedMetro() {
    if (!this.state.advanced_show) {
      return null;
    }

    return Metro.sequence(
      this.state.data,
      this.state.animationMap,
      defaultAnimationOverride
    ).map(data => {
      return (
        <Metro.animation
          {...data}
          wrapperType="div"
          onClick={this.advanced_componentClickCallback.bind(this)}
          onMount={this.advanced_mountSequenceComplete.bind(this)}
          onUnmount={this.advanced_unmountSequenceComplete.bind(this)}
        >
          <DemoSquareComponent {...data.content} />
        </Metro.animation>
      );
    });
  }

  //////////////////////////////////// METRO END ////////////////////////////////////

  basic_getText() {
    if (this.state.basic_unmountComplete === true) {
      return "(unmount sequence complete)";
    } else if (this.state.basic_mountComplete === true) {
      return "(mount sequence complete)";
    }
    return "...";
  }

  container_getText() {
    if (this.state.container_unmountComplete === true) {
      return "(unmount container complete)";
    } else if (this.state.container_mountComplete === true) {
      return "(mount container complete)";
    }
    return "...";
  }

  basic_getClicked() {
    return this.state.basic_clicked === null ? "..." : this.state.basic_clicked;
  }

  advanced_getText() {
    if (this.state.advanced_unmountComplete === true) {
      return "(unmount sequence complete)";
    } else if (this.state.advanced_mountComplete === true) {
      return "(mount sequence complete)";
    }
    return "...";
  }

  advanced_getSelectedAnimation() {
    return this.state.preset === "" ? "delayedVertical" : this.state.preset;
  }

  render() {
    return (
      <div className="wrapper">
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center"
          }}
        >
          <img
            src="http://nicolasdelfino.com/metro_web_text.png"
            style={{ width: 350, alignSelf: "center" }}
            alt="logo"
          />
        </div>

        <div className="aDemo" style={{ height: 600 }}>
          <h3>SCENE DEMO</h3>
          <div
            style={{
              width: 600,
              position: "relative",
              margin: "auto"
            }}
          >
            <Scene />
          </div>
        </div>
        <div className="aDemo">
          <h3>BASIC DEMO</h3>
          <div className="demoWrapper">
            <p className="demoDescription">
              Demonstrates the core concepts of Metro: mount / unmount callbacks
              & a click handler. Also the use of the defaultAnimationOverride
              that sets a generic (individual item settings are for
              animationMaps) fade-in-from-below default setting.
            </p>
          </div>
          <div className="demo">
            <div className="status">
              <p>{"Demo -> status = " + this.basic_getText()}</p>
              <p>{"Clicked item index = " + this.basic_getClicked()}</p>
            </div>
            <div style={{ width: "100%" }}>{this.basic_renderButtons()}</div>
            <div className="containers">
              <TransitionGroupPlus
                component="div"
                style={{
                  display: "flex",
                  flexGrow: 1,
                  height: "auto",
                  background: "transparent",
                  flexWrap: "wrap"
                }}
              >
                {this.renderBasicMetro()}
              </TransitionGroupPlus>
            </div>
          </div>
        </div>
        <div className="aDemo">
          <h3>CONTAINER DEMO</h3>
          <div className="demoWrapper">
            <p className="demoDescription">
              Metro.container enhances a single node and can wrap other Metro
              containers or sequences
            </p>
          </div>
          <div className="demo">
            <div className="status">
              <p>{"Demo -> status = " + this.container_getText()}</p>
            </div>
            <div style={{ width: "100%" }}>
              {this.container_renderButtons()}
            </div>
            <div className="containers">
              <TransitionGroupPlus
                component="div"
                style={{
                  display: "flex",
                  flexGrow: 1,
                  height: "auto",
                  background: "transparent",
                  flexWrap: "wrap"
                }}
              >
                {this.renderContainerMetro()}
              </TransitionGroupPlus>
            </div>
          </div>
        </div>
        <div className="aDemo">
          <h3>ADVANCED DEMO</h3>
          <div className="demoWrapper">
            <p className="demoDescription">
              This demo demonstrates the concept of dynamic sequences. This is
              achieved by altering the sequence´s animationMap on user
              interaction.
            </p>
            <p className="demoDescription">
              We define an animatonMap to achieve the delayed entrance effect we
              want. Since the active animationMap is stored in our wrapper
              component´s local state we can replace our initial map on user
              interaction.
            </p>
            <p className="demoDescription">
              Even though the developer has total control of an animation
              through the use of animationMaps, we created a helper method
              called Metro.generateFocusMap for cases where you want to
              accentuate a specific item within your sequence. Here´s a demo of
              that using the preset 'DOMINO'. More presets coming soon.
            </p>
          </div>
          <div className="demo">
            <div className="status">
              <p>{"Demo -> status = " + this.advanced_getText()}</p>
              <p>
                {"Selected animation = " + this.advanced_getSelectedAnimation()}
              </p>
            </div>
            <div style={{ width: "100%" }}>{this.advanced_renderButtons()}</div>
            <div className="containers">
              <TransitionGroupPlus
                component="div"
                style={{
                  display: "flex",
                  flexGrow: 1,
                  height: "auto",
                  background: "transparent",
                  flexWrap: "wrap"
                }}
              >
                {this.renderAdvancedMetro()}
              </TransitionGroupPlus>
            </div>
          </div>
        </div>

        <div className="links">
          <h3>
            <a
              href="https://github.com/nicolasdelfino/react-metro"
              target="_blank"
            >
              -> GITHUB (docs, issues etc)
            </a>
          </h3>
          <h3>
            <a href="https://www.npmjs.com/package/react-metro" target="_blank">
              -> NPM (react-metro)
            </a>
          </h3>
        </div>
      </div>
    );
  }
}

render(<Page />, document.getElementById("root"));

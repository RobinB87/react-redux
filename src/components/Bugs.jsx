import React, { Component } from "react";
import { connect } from "react-redux";

class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  // OLD example:
  // componentDidMount() {
  //   // to get the bugs and render on screen:
  //   //    subscribe to get notified when state of the store changes
  //   //    dispatch(loadBugs()) action
  //   const store = this.context;

  //   // if you do not unsubscribe, and navigate away from the page, the subscription will remain to exists
  //   // this causes memory leaks
  //   this.unsubscribe = store.subscribe(() => {
  //     const bugsInStore = store.getState().entities.bugs.list;
  //     if (this.state.bugs !== bugsInStore) this.setState({ bugs: bugsInStore });
  //   });

  //   store.dispatch(loadBugs());
  // }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  render() {
    return (
      <ul>
        {this.props.bugs.map((bug) => (
          <li key={bug.id}>{bug.description}</li>
        ))}
      </ul>
    );
  }
}

// react redux will subscribe to store, will get list of bugs and pass them as props to this component
// this will happen via connect
//    this func will take two arguments:
//        1) what part of the store is this component interested in? => bugs: state.entities.bugs.list
const mapStateToProps = (state) => ({ bugs: state.entities.bugs.list });

//        2) dispatch actions
const mapDispatchToProps = (dispatch) => ({ loadBugs: () => dispatch(loadBugs()) });

// connect is a HOC: it takes or returns a func or both
// in this case, when we call connect func, it creates a new func which we call and pass our Bugs component
// this will create a component under the hood that is going to wrap our component
// this will handle all the sub and unsubscribing
// the Bugs.jsx component itself knows absolutely nothing about the store, it is just dependent on props

// the returned component is called a container component, that wraps:
//    the presentation component (Bugs) => wrapped by container comp under the hood
export default connect(mapStateToProps, mapDispatchToProps)(Bugs);

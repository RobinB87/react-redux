import React, { Component } from "react";
import StoreContext from "../contexts/storeContext";
import { loadBugs } from "../store/bugs";

class Bugs extends Component {
  static contextType = StoreContext;

  state = { bugs: [] };

  componentDidMount() {
    // to get the bugs and render on screen:
    //    subscribe to get notified when state of the store changes
    //    dispatch(loadBugs()) action
    const store = this.context;

    // if you do not unsubscribe, and navigate away from the page, the subscription will remain to exists
    // this causes memory leaks
    this.unsubscribe = store.subscribe(() => {
      const bugsInStore = store.getState().entities.bugs.list;
      if (this.state.bugs !== bugsInStore) this.setState({ bugs: bugsInStore });
    });

    store.dispatch(loadBugs());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <ul>
        {this.state.bugs.map((bug) => (
          <li key={bug.id}>{bug.description}</li>
        ))}
      </ul>
    );
  }
}

export default Bugs;

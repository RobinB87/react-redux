import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs, getUnresolvedBugs } from "../store/bugs";

const BugsList = () => {
  const dispatch = useDispatch();
  //   useSelector((state) => state.entities.bugs.list);
  const bugs = useSelector(getUnresolvedBugs);

  useEffect(() => {
    dispatch(loadBugs());
  }, []);

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug.id}>{bug.description}</li>
      ))}
    </ul>
  );
};

// with hooks, you do not need the connect func anymore
export default BugsList;

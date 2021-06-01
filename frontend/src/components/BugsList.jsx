import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs, getUnresolvedBugs, resolveBug } from "../store/bugs";

const BugsList = () => {
  const dispatch = useDispatch();
  //   useSelector((state) => state.entities.bugs.list);
  const bugs = useSelector(getUnresolvedBugs);

  useEffect(() => {
    dispatch(loadBugs());
  }, []);

  const handleResolve = (bug) => {
    dispatch(resolveBug(bug.id));
  };

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug.id}>
          {bug.description}
          <button onClick={() => handleResolve(bug)}>Resolve</button>
        </li>
      ))}
    </ul>
  );
};

// with hooks, you do not need the connect func anymore
export default BugsList;

// add resolve button

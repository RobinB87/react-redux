import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug } from "../bugs";
import configureStore from "../configureStore";

describe("bugSlice", () => {
  let fakeAxios;
  let store;

  // function which takes a func as an argument and executes before each test
  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugSlice = () => store.getState().entities.bugs;

  it("should add the bug to the store if it is saved to the server", async () => {
    // dispatch addbug => store (is it inside?, do not care how it happens)

    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };
    // response code (200) and request body
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    await store.dispatch(addBug(bug));

    expect(bugSlice().list).toContainEqual(savedBug);
  });

  it("should not add the bug to the store if it is not saved to the server", async () => {
    // dispatch addbug => store (is it inside?, do not care how it happens)

    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);

    await store.dispatch(addBug(bug));

    expect(bugSlice().list).toHaveLength(0);
  });
});

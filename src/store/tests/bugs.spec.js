import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug, getUnresolvedBugs, resolveBug } from "../bugs";
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
  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  it("should add the bug to the store if it is saved to the server", async () => {
    // dispatch addbug => store (is it inside?, do not care how it happens)
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost("/bugs").reply(200, savedBug); // response code (200) and request body

    await store.dispatch(addBug(bug));

    expect(bugSlice().list).toContainEqual(savedBug);
  });

  it("should not add the bug to the store if it is not saved to the server", async () => {
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);

    await store.dispatch(addBug(bug));

    expect(bugSlice().list).toHaveLength(0);
  });

  it("should mark a bug as resolved if it is saved to the server", async () => {
    fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true });
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugSlice().list[0].resolved).toBe(true);
  });

  it("should mark a bug as resolved if it is saved to the server", async () => {
    fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true });
    fakeAxios.onPost("/bugs").reply(200, { id: 1 }); // create bug first before it can be resolved

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugSlice().list[0].resolved).toBe(true);
  });

  it("should not mark a bug as resolved if it is not saved to the server", async () => {
    fakeAxios.onPatch("/bugs/1").reply(500);
    fakeAxios.onPost("/bugs").reply(200, { id: 1 }); // create bug first before it can be resolved

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugSlice().list[0].resolved).not.toBe(true);
  });

  describe("selectors", () => {
    it("getUnresolvedBugs", () => {
      const state = createState();
      state.entities.bugs.list = [{ id: 1, resolved: true }, { id: 2 }, { id: 3 }];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });
});

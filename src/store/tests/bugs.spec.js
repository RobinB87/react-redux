import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { loadBugs, addBug, getUnresolvedBugs, resolveBug } from "../bugs";
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

  describe("loadingBugs", () => {
    // if exist in cache
    describe("if the bugs exist in cache", () => {
      it("should not be fetched from the server again", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs()); // second time to test behaviour

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    // if not, come from server
    describe("if the bugs do not exist in cache", () => {
      it("should be fetched again from the server and put in the store", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(bugSlice().list).toHaveLength(1);
      });

      // loading indicator: true while fetching, false after fetch, false when server fails
      describe("loading indictator", () => {
        it("should be true while fetching the bugs", () => {
          // reply method has two signatures, hence this time pass function instead of the two args
          // is identical, but benefit is that you can execute some code before the server responds
          fakeAxios.onGet("/bugs").reply(() => {
            expect(bugSlice().loading).toBe(true); // while we are waiting, loading should be true
            return [200, [{ id: 1 }]];
          });

          // no await, because we do not want to wait for completion
          store.dispatch(loadBugs());
        });
        it("should be false when bugs are fetched", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugSlice().loading).toBe(false);
        });
        it("should be false when the server fails", async () => {
          fakeAxios.onGet("/bugs").reply(500);

          await store.dispatch(loadBugs());

          expect(bugSlice().loading).toBe(false);
        });
      });
    });
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

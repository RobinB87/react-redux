import { addBug } from "../bugs";
import configureStore from "../configureStore";

describe("bugSlice", () => {
  it("should handle the addBug action", async () => {
    // dispatch addbug => store (is it inside?, do not care how it happens)
    const store = configureStore();
    const bug = { description: "a" };
    await store.dispatch(addBug(bug));

    expect(store.getState().entities.bugs.list).toHaveLength(1);
  });
});

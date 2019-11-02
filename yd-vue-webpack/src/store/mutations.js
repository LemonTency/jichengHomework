import { removeTodo } from "./constant";
export const mutations = {
  [removeTodo](state, flag) {
    //   state.todos.splice(state.todos.indexOf(todo), 1)
    console.log("全局状态", state.isSuccess);
    state.isSuccess = flag;
  }
};

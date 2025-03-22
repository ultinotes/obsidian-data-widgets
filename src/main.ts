// import './app.css';
import type { Todo } from "./todo/common";
import TodoList from "./todo/TodoView.svelte";
import BoardRow from "./todo/BoardRow.svelte";
import { mount } from "svelte";

declare global {
  interface Window {
    createBoard: (container: HTMLElement, data: Todo[]) => void;
    createDiv: (options: { cls: string; parent: HTMLElement }) => HTMLElement; // NOTE: provided by obsidian
  }
}

window.createBoard = (container, data) => {
  console.warn("CREATING BOARD");
  console.warn(container);
  console.warn(data);

  const boardContainer = createDiv({
    cls: "ultinotes-board",
    parent: container,
  });
  // NOTE: new svelte 5 syntax to instantiate components
  mount(TodoList, {
    target: boardContainer,
    props: {
      todos: data,
      groupBy: "status",
      segregateBy: "group",
    },
  });
};

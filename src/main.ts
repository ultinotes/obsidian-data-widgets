import "./app.css";
import type { Todo, TodoViewOptions } from "./todo/common";
import TodoList from "./todo/TodoView.svelte";
import AnnotatedImageView from "./annotatedImage/AnnotatedImageView.svelte";
import { mount } from "svelte";
import type {
  AnnotatedImageOptions,
  ImageAnnotation,
} from "./annotatedImage/common";

declare global {
  interface Window {
    createBoard: (
      container: HTMLElement,
      data: Todo[],
      options?: TodoViewOptions
    ) => void;
    createGraphic: (
      container: HTMLElement,
      src: string,
      data?: ImageAnnotation[],
      options?: AnnotatedImageOptions
    ) => void;
    createDiv: (options: { cls: string; parent: HTMLElement }) => HTMLElement; // NOTE: provided by obsidian
  }
}

// TODO: remove console log
window.createBoard = (container, data, options) => {
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
      ...(options || {}),
      todos: data,
    },
  });
};

window.createGraphic = (container, src, data, options) => {
  const imageContainer = createDiv({
    cls: "ultinotes-graphic",
    parent: container,
  });
  // NOTE: new svelte 5 syntax to instantiate components
  mount(AnnotatedImageView, {
    target: imageContainer,
    props: {
      src,
      ...(options || {}),
      todos: data ?? [],
    },
  });
};

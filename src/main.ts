import "./app.css";
import type { Todo, TodoViewOptions } from "./todo/common";
import TodoList from "./todo/TodoView.svelte";
import AnnotatedImageView from "./annotatedImage/AnnotatedImageView.svelte";
import { mount } from "svelte";
import type {
  AnnotatedImageOptions,
  ImageAnnotation,
} from "./annotatedImage/common";
import { Notice, Plugin, PluginSettingTab, Setting } from "obsidian";

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
      data: data ?? [],
    },
  });
};

export default class ObsidianVite extends Plugin {
  onload(): Promise<void> | void {
    new Notice("ObsidianVite plugin loaded");
    this.addSettingTab(new ObsidianViteSettingTab(this.app, this));
  }

  onunload(): void {
    new Notice("Ultinotes loaded");
  }
}

class ObsidianViteSettingTab extends PluginSettingTab {
  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    // new Setting(containerEl)
    //   .setName("A sample setting")
    //   .setDesc("some description.")
    //   .addText((cmp) =>
    //     cmp
    //       .setPlaceholder("placeholder text")
    //       .onChange((v) => console.log("sample setting changed: ", v))
    //   );
  }
}

import "./app.css";
import { sanitizeTodo, type Todo, type TodoViewOptions } from "./todo/common";
import TodoList from "./todo/TodoView.svelte";
import AnnotatedImageView from "./annotatedImage/AnnotatedImageView.svelte";
import { mount } from "svelte";
import {
  sanitizeAnnotation,
  type AnnotatedImageOptions,
  type ImageAnnotation,
} from "./annotatedImage/common";
import { Notice, Plugin, PluginSettingTab, Setting } from "obsidian";
import type { EntityDTO } from "./core/entities/base";
import { deconstructPath } from "./core/integrations/dataview";
import Gallery from "./gallery/Gallery.svelte";
import { sanitizeGallery, type GalleryOptions } from "./gallery/common";

declare global {
  interface Window {
    createBoard: (
      container: HTMLElement,
      data: EntityDTO[],
      options?: TodoViewOptions
    ) => void;
    createGraphic: (
      container: HTMLElement,
      src: string,
      data?: EntityDTO[],
      options?: AnnotatedImageOptions
    ) => void;
    createGallery: (
      container: HTMLElement,
      data?: EntityDTO[],
      options?: GalleryOptions
    ) => void;
    createDiv: (options: { cls: string; parent: HTMLElement }) => HTMLElement; // NOTE: provided by obsidian
  }
}

// TODO: create separate config to allow local testing of components before packing them as a plugin --> testing without obsidian dependency

// TODO: remove console log
window.createBoard = (container, data, options) => {
  // TODO: handle errors by printing them to the container element

  const boardContainer = createDiv({
    cls: "ultinotes-board",
    parent: container,
  });
  // NOTE: new svelte 5 syntax to instantiate components
  mount(TodoList, {
    target: boardContainer,
    props: {
      ...(options || {}),
      todos: data?.map(sanitizeTodo) ?? [],
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
      data: data?.map(sanitizeAnnotation) ?? [],
    },
  });
};

window.createGallery = (container, data, options) => {
  const imageContainer = createDiv({
    cls: "ultinotes-gallery",
    parent: container,
  });
  // NOTE: new svelte 5 syntax to instantiate components
  mount(Gallery, {
    target: imageContainer,
    props: {
      ...(options || {}),
      items: data?.map(sanitizeGallery) ?? [],
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

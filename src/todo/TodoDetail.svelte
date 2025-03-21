<script lang="ts">
  import {
    getComponentContext,
    type ComponentContext,
  } from "../store/componentStore";
  import { onMount } from "svelte";
  import { renderMarkdown, type Todo } from "./common";

  export let todo: Todo;

  let contextStore = getComponentContext();
  let context: ComponentContext | null;
  let noteContainer: HTMLElement;

  onMount(() => {
    context = $contextStore;
  });

  // TODO: get raw content
  // $: if (noteContainer && context && context.component && todo.rawContent) {
  //   renderMarkdown(todo.rawContent, context.component).then((container) => {
  //     noteContainer.replaceWith(container);
  //   });
  // }
</script>

<div class="px-8">
  <div bind:this={noteContainer}></div>
</div>

<style lang="scss">
</style>

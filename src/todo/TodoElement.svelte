<script lang="ts">
  import type { TFile } from "obsidian";
  import { followLink, type Todo } from "./common";
  import Frame from "../common/Frame.svelte";
  import {
    getComponentContext,
    type ComponentContext,
  } from "../store/componentStore";
  import { onMount } from "svelte";

  export let filename = "";
  export let todo: Todo;
  export let onClick: (fileHandle: TFile) => any = () => {};

  const contextStore = getComponentContext();
  let context: ComponentContext | null;

  onMount(() => {
    context = $contextStore;
  });
</script>

<button
  class="block w-full mb-2 text-left"
  on:click={() => {
    followLink(todo.path, context?.srcFilename ?? "", true, true);
  }}
>
  <Frame classNames="block w-full" title={todo.id}>
    {todo.title}
    {todo.dueDate}
  </Frame>
</button>

<!-- <a
  on:mouseenter={async (e) => {
    if (!context || !context.component) {
      console.error('null component');
      return;
    }
    // const mdContainer = await renderMarkdown(
    //   todo.rawContent,
    //   context.component
    // );
    // // console.log(component);
    // console.log('markdown: ', mdContainer);
  }}
  on:click={async () => {
    // follow link
    console.log(todo.path);
    await todoRepo.followLink(todo.path, context?.srcFilename ?? '', true, {
      active: true,
    });
    clickedTodo = todo;
  }}
  class="py-8 text-3xl">More...</a
> -->

<style lang="scss">
</style>

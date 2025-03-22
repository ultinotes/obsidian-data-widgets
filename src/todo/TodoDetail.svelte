<script lang="ts">
  import { type Todo } from "./common";

  let { todo }: { todo: Todo } = $props();

  let noteContainer: HTMLElement;

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

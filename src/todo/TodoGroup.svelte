<script lang="ts">
  import FileCreatorButton from "../common/FileCreatorButton.svelte";
  import BoardColumn from "./BoardColumn.svelte";
  import type { Todo } from "./common";
  import TodoElement from "./TodoElement.svelte";

  export let todos: Todo[] = [];
  export let addTodo: (fileName: string) => any = (name) => {};
</script>

<BoardColumn>
  {#each todos as todo}
    <TodoElement filename={""} {todo}></TodoElement>
  {/each}
  <FileCreatorButton onAdd={addTodo} />
</BoardColumn>

<style>
</style>

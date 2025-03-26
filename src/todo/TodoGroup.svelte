<script lang="ts">
  import BoardColumn from "./BoardColumn.svelte";
  import type { Todo } from "./common";
  import TodoElement from "./TodoElement.svelte";

  export let groupName: string = "";
  export let todos: Todo[] = [];
  export let addTodo: (groupName: string) => any = (name) => {};
</script>

<BoardColumn>
  {#each todos as todo}
    <TodoElement filename={""} {todo}></TodoElement>
  {/each}
  <!-- <button class="text-shade-400 text-sm" on:click={() => addTodo(groupName)}
    >+ Add Todo</button
  > -->
</BoardColumn>

<style>
</style>

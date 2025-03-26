<script lang="ts">
  import { entries } from "lodash";
  import type { GroupOptions, Todo } from "./common";
  import TodoGroup from "./TodoGroup.svelte";
  import BoardRow from "./BoardRow.svelte";

  export let title = "";
  // TODO: implement sorting
  export let sortBy = "";
  export let groupNames: string[] = [];
  export let groups: Map<string, Todo[]>;

  export let addTodo: (groupName: string, row: string) => any = (
    name,
    row,
  ) => {};

  let sortedGroups = groupNames.map((name) => {
    const groupTodos = groups.get(name) ?? ([] as Todo[]);
    return [name, groupTodos] as [string, Todo[]];
  });

  // TODO: make width configurable
</script>

<h2 class="sticky py-2 left-0 z-10 w-full text-lg font-bold opacity-60">
  {title}
</h2>
<BoardRow>
  {#each sortedGroups as [name, todos]}
    <TodoGroup
      groupName={name}
      {todos}
      addTodo={(groupName) => addTodo(groupName, title)}
    ></TodoGroup>
  {/each}
</BoardRow>

<style>
</style>

<script lang="ts">
  import { onMount } from "svelte";

  import TodoDetail from "./TodoDetail.svelte";
  import { type Todo } from "./common";
  import * as _ from "lodash";
  import TodoRow from "./TodoRow.svelte";
  import BoardRow from "./BoardRow.svelte";
  import BoardColumn from "./BoardColumn.svelte";
  import { binEntriesBy } from "./binSorter";

  // export let groupBy: string = "status"; // x-axis, second dimension
  // // order groups by listing their names: 'OPEN CLOSED'
  // // groups not named are omitted
  // export let groupFilterOrder: string = "";
  // export let segregateBy: string = "group"; // y-axis, first dimensions
  // // export let filterBy: string = "";
  // // export let filterValue: string = "";
  // export let todos: Todo[] = [];

  let {
    groupBy = "status",
    groupFilterOrder = "",
    segregateBy = "group",
    todos = [],
  } = $props();

  // TODO: add common error and log channels
  // --> callbacks to add error to doc context
  // TODO: add app bar to display context information for debugging
  // TODO: add to context flags for debugging

  let groupFilterOrderList: string[] = $state([]);

  // list todos by two dimensions, segregation | group | key
  let todoLists: Map<string, Map<string, Todo[]>> = $state(new Map());

  let clickedTodo: Todo | null = $state(null);

  let rootElement: HTMLElement;

  onMount(() => {
    // HACK: prevent the backlink and file view from scrolling into view
    // when scrolling the container
    rootElement.addEventListener(
      "touchstart",
      (e) => {
        console.info(e);
        e.stopPropagation();
      },
      {
        capture: false,
        passive: false,
      },
    );

    // TODO: give option to add a new todo when board is empty
    // TODO: hide default group if empty
    // TODO: add option to specify folder for new todos
    // sort into bins

    const unknownGroupName = "NO GROUP";

    const binnedTodos = binEntriesBy(todos, {
      segregateBy,
      groupBy,
      defaultGroupName: unknownGroupName,
      defaultRowName: "NO ROW",
    });

    todoLists = binnedTodos.map;

    groupFilterOrderList =
      groupFilterOrder === ""
        ? binnedTodos.groups.values().toArray()
        : [unknownGroupName, ...groupFilterOrder.split(" ")];
  });

  // const createTodo = (group: string, row: string) => {
  //   // TODO: extend logic to take special cases like default column names into account
  //   let newTodo = { type: "todo" } as Record<string, any>;
  //   if (segregateBy !== "") {
  //     newTodo[segregateBy] = row;
  //   }
  //   if (groupBy !== "") {
  //     newTodo[groupBy] = group;
  //   }
  //   if (filterBy !== "") {
  //     newTodo[filterBy] = filterValue;
  //   }
  //   todoRepo.createTodo("newTodo", newTodo).then(({ errors, filePath }) => {
  //     if (errors) {
  //       // TODO: display errors
  //       return;
  //     }
  //     // open file in new tab for editing
  //     followLink(filePath, context?.srcFilename ?? "", true, true);
  //   });

  //   // TODO: why is this not updating
  // };

  const mouseEnter = (e: MouseEvent, linkText: string) => {
    // TODO: add exception handling
    window.app.workspace.trigger("hover-link", { e, linkText, source: "" });
  };

  // afterUpdate(() => {
  //   window.app.workspace.trigger("layout-change");
  //   // console.warn('MANUAL UPDATE');
  // });
</script>

<div
  bind:this={rootElement}
  class="min-w-full py-4 flex flex-col overflow-x-auto snap-x snap-mandatory"
>
  <BoardRow>
    {#each groupFilterOrderList as groupName}
      <BoardColumn>
        <h3 class="w-full min-h-[1em] block text-lg font-bold">{groupName}</h3>
      </BoardColumn>
    {/each}
  </BoardRow>
  <!-- <pre>{JSON.stringify([...todos.entries()])}</pre> -->
  {#each todoLists.entries() as [blockName, groups]}
    <TodoRow
      sortBy={""}
      title={blockName}
      groupNames={groupFilterOrderList}
      {groups}
      addTodo={() => {}}
    ></TodoRow>
  {/each}

  {#if clickedTodo}
    <TodoDetail todo={clickedTodo}></TodoDetail>
  {/if}
  <!-- File Content: {fileContent} -->
</div>

<style global lang="postcss">
  /* NOTE: tailwind must be included once per web-component in a GLOBAL script tag of type postcss
  */
  @import "tailwindcss";
  @config "../../tailwind.config.js";
/*   
  @tailwind base;
  @tailwind components;
  @tailwind utilities; */

  .markdown-preview-view {
    overscroll-behavior-x: contain;
  }
</style>

<script lang="ts">
  import { onMount } from "svelte";

  import TodoDetail from "./TodoDetail.svelte";
  import {
    createFileWithFrontmatter,
    followLink,
    type Todo,
    type TodoViewOptions,
  } from "./common";
  import * as _ from "lodash";
  import TodoRow from "./TodoRow.svelte";
  import BoardRow from "./BoardRow.svelte";
  import BoardColumn from "./BoardColumn.svelte";
  import { binEntriesBy } from "./binSorter";

  let {
    groupBy = "status",
    groupFilterOrder = "OPEN PROGRESS DOING DONE REJECTED",
    segregateBy = "group",
    unknownGroupName = "NO GROUP",
    todos = [],
    creationPath = "/newTodos",
    frontmatterTemplate = {},
  }: TodoViewOptions & {
    todos: Todo[];
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

    const binnedTodos = binEntriesBy(todos, {
      segregateBy,
      groupBy,
      defaultGroupName: unknownGroupName,
      defaultRowName: "NO ROW",
    });

    todoLists = binnedTodos.map;

    let columnNames = groupFilterOrder.split(" ");
    // avoid duplicate columns, check if unknown group name is already in column names
    if (!columnNames.contains(unknownGroupName)) {
      columnNames = [unknownGroupName, ...columnNames];
    }
    groupFilterOrderList =
      groupFilterOrder === ""
        ? binnedTodos.groups.values().toArray()
        : columnNames;
  });

  const mouseEnter = (e: MouseEvent, linkText: string) => {
    // TODO: add exception handling
    window.app.workspace.trigger("hover-link", { e, linkText, source: "" });
  };
</script>

<div
  bind:this={rootElement}
  class="dark min-w-full py-4 flex flex-col overflow-x-auto snap-x snap-mandatory"
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
      addTodo={async (name, lane, row) => {
        const newFileName = creationPath + "/" + name + ".md";
        await createFileWithFrontmatter(newFileName, "...", {
          [groupBy]: lane,
          [segregateBy]: row,
          ...frontmatterTemplate,
        });
        await followLink(newFileName, "/", true, true);
      }}
    ></TodoRow>
  {/each}
</div>

<style global lang="postcss">
  .markdown-preview-view {
    overscroll-behavior-x: contain;
  }

  /* resets */
  button {
    @apply bg-transparent border-none appearance-none block h-full;
    font-size: var(--font-ui-medium);
    white-space: normal;
  }

  /* button:hover {
    cursor: pointer;
    color: #fff;
    font-weight: bold;
  } */

  button:not(.clickable-icon) {
    background-color: transparent;
    box-shadow: none;
  }
</style>

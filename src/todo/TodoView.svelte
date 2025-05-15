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
  import { binEntriesBy, getColumnNames } from "./processor";

  let {
    groupBy = "status",
    columnNames = "",
    splitRowsBy = "group",
    unknownColumnName = "NO GROUP",
    todos = [],
    creationPath = "/newTodos",
    frontmatterTemplate = {},
  }: TodoViewOptions & {
    todos: Todo[];
  } = $props();

  // TODO: add common error and log channels
  // TODO: add to context flags for debugging

  let columnNamesList: string[] = $state([]);

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

    // TODO: hide default group if empty
    // sort into bins

    const binnedTodos = binEntriesBy(todos, {
      splitRowsBy,
      groupBy,
      defaultGroupName: unknownColumnName,
      defaultRowName: "NO ROW",
    });

    todoLists = binnedTodos.map;
    columnNamesList = getColumnNames(
      columnNames,
      unknownColumnName,
      binnedTodos,
    );
  });

  // TODO: add tests
  const mouseEnter = (e: MouseEvent, linkText: string) => {
    // TODO: add exception handling
    window.app.workspace.trigger("hover-link", { e, linkText, source: "" });
  };
</script>

<div
  bind:this={rootElement}
  class="dark min-w-full py-4 flex flex-col overflow-x-auto snap-x snap-mandatory"
>
  <div class="block w-full text-sm text-gray-500">
    {todos.length}
    {todos.length === 1 ? "card" : "cards"}
  </div>
  <BoardRow>
    {#each columnNamesList as groupName}
      <BoardColumn>
        <h3 class="w-full min-h-[1em] block text-lg font-bold">{groupName}</h3>
      </BoardColumn>
    {/each}
  </BoardRow>

  <!-- IF NO GROUPS EXIST -->
  <!-- NOTE: columnNamesList length condition is ABSOLUTELY ESSENTIAL in order to make the block react to changes in it. Somehow it doesn't react otherwise -->
  {#if todoLists.size === 0 && columnNamesList.length !== 0}
    <TodoRow
      sortBy={""}
      title={"Add your first task"}
      groupNames={columnNamesList}
      groups={(() => {
        const emptySet = new Map<string, Todo[]>();
        columnNamesList.forEach((item) => {
          emptySet.set(item, []);
        });
        return emptySet;
      })()}
      addTodo={async (name, lane, row) => {
        const newFileName = creationPath + "/" + name + ".md";
        await createFileWithFrontmatter(newFileName, "...", {
          [groupBy]: lane,
          // row is "Add your first task" --> set to something else
          [splitRowsBy]: "First topic",
          ...frontmatterTemplate,
        });
        await followLink(newFileName, "/", true, true);
      }}
    ></TodoRow>
  {/if}
  <!-- IF GROUPS EXIST -->
  {#each todoLists.entries() as [blockName, groups]}
    <TodoRow
      sortBy={""}
      title={blockName}
      groupNames={columnNamesList}
      {groups}
      addTodo={async (name, lane, row) => {
        const newFileName = creationPath + "/" + name + ".md";
        await createFileWithFrontmatter(newFileName, "...", {
          [groupBy]: lane,
          [splitRowsBy]: row,
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

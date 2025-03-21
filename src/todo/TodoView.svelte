<svelte:options customElement="todo-board" />

<script lang="ts">
  import { TodoFileRepo } from "./todoFileRepo";
  import type { TFile } from "obsidian";
  import { afterUpdate, onMount, setContext } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import {
    getRootHost,
    passthroughComponentStore,
    setComponentContext,
    type ComponentContext,
  } from "../../../common/store/componentStore";
  import TodoDetail from "./TodoDetail.svelte";
  import TodoElement from "./TodoElement.svelte";
  import {
    followLink,
    type FilterOptions,
    type GroupOptions,
    type MarkdownEntity,
    type Todo,
  } from "./common";
  import * as _ from "lodash";
  import TodoRow from "./TodoRow.svelte";
  import BoardRow from "./BoardRow.svelte";
  import BoardColumn from "./BoardColumn.svelte";
  import { binEntriesBy, filterEntries } from "./binSorter";

  export let groupBy: string = ""; // x-axis, second dimension
  // order groups by listing their names: 'OPEN CLOSED'
  // groups not named are omitted
  export let groupFilterOrder: string = "";
  export let segregateBy: string = ""; // y-axis, first dimensions
  export let filterBy: string = "";
  export let filterValue: string = "";

  // TODO: add common error and log channels
  // --> callbacks to add error to doc context
  // TODO: add app bar to display context information for debugging
  // TODO: add to context flags for debugging

  let groupFilterOrderList: string[] = [];

  let todoRepo: TodoFileRepo;
  let todoMap: Map<MarkdownEntity, Todo> = new Map();

  // list todos by two dimensions, segregation | group | key
  let todoLists: Map<string, Map<string, Todo[]>> = new Map();

  let rootElement: HTMLElement;
  let context: ComponentContext | null;
  let contextStore: Writable<ComponentContext | null> = writable(null);
  setComponentContext(contextStore);

  onMount(() => {
    const hostElement = getRootHost(rootElement);
    const componentStore = passthroughComponentStore(hostElement);
    if (!componentStore) {
      console.error("ERROR: component store undefined or null", contextStore);
      return;
    }
    componentStore.subscribe((value) => {
      contextStore.set(value);
    });
    // React to mounting of componentStore
    context = $contextStore;

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

    TodoFileRepo.listenForTodos((todos) => (todoMap = todos)).then((repo) => {
      todoRepo = repo;
    });
  });

  let clickedTodo: Todo | null = null;

  $: if (todoMap) {
    // TODO: give option to add a new todo when board is empty
    // TODO: hide default group if empty
    // TODO: add option to specify folder for new todos
    // sort into bins
    console.log("new Todo Map", todoMap);
    const mapEntries = filterEntries(
      todoMap.values().toArray(),
      filterBy,
      filterValue,
    );

    const unknownGroupName = "NO GROUP";

    console.warn(mapEntries, todoMap.values().toArray());

    const binnedTodos = binEntriesBy(mapEntries, {
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
  }

  // FIXME: why is this not consistently triggering a modify event
  // let toggleClicked = async (file: TFile) => {
  //   const errors = await todoRepo.changeFrontmatter(file, (frontmatter) => {
  //     console.info("old clicked: ", frontmatter.clicked);
  //     if (frontmatter.clicked === true) {
  //       frontmatter.clicked = false;
  //     } else {
  //       frontmatter.clicked = true;
  //     }
  //     console.info("new clicked: ", frontmatter.clicked);
  //   });
  //   await todoRepo.changeBodyContent(file, (content, meta) => content);
  //   if (errors) {
  //     console.log(errors);
  //   }
  // };

  const createTodo = (group: string, row: string) => {
    // TODO: extend logic to take special cases like default column names into account
    let newTodo = { type: "todo" } as Record<string, any>;
    if (segregateBy !== "") {
      newTodo[segregateBy] = row;
    }
    if (groupBy !== "") {
      newTodo[groupBy] = group;
    }
    if (filterBy !== "") {
      newTodo[filterBy] = filterValue;
    }
    todoRepo.createTodo("newTodo", newTodo).then(({ errors, filePath }) => {
      if (errors) {
        // TODO: display errors
        return;
      }
      // open file in new tab for editing
      followLink(filePath, context?.srcFilename ?? "", true, true);
    });

    // TODO: why is this not updating
  };

  const mouseEnter = (e: MouseEvent, linkText: string) => {
    window.app.workspace.trigger("hover-link", { e, linkText, source: "" });
  };

  afterUpdate(() => {
    window.app.workspace.trigger("layout-change");
    // console.warn('MANUAL UPDATE');
  });
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
  {#key todoMap}
    {#each todoLists.entries() as [blockName, groups]}
      <TodoRow
        sortBy={""}
        title={blockName}
        groupNames={groupFilterOrderList}
        {groups}
        addTodo={createTodo}
      ></TodoRow>
    {/each}
  {/key}

  {#if clickedTodo}
    <TodoDetail todo={clickedTodo}></TodoDetail>
  {/if}
  <!-- File Content: {fileContent} -->
</div>

<style global lang="postcss">
  /* NOTE: tailwind must be included once per web-component in a GLOBAL script tag of type postcss
  */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .markdown-preview-view {
    overscroll-behavior-x: contain;
  }
</style>

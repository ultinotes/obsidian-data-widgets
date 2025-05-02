<script lang="ts">
  import type { TFile } from "obsidian";
  import { dateFromString, followLink, type Todo } from "./common";
  import Frame from "../common/Frame.svelte";
  import { onMount } from "svelte";

  export let filename = "";
  export let todo: Todo;
  export let onClick: (fileHandle: TFile) => any = () => {};

  // TODO: create common button element with style overrides to counter the styling of Obsidian --> see the !important classes below

  // NOTE: date to string conversion should be done outside this widget
  // let dueDate: string;
  // $: if (todo && todo.dueDate) {
  //   try {
  //     dueDate = new Intl.DateTimeFormat("de-DE", {
  //       year: "numeric",
  //       month: "2-digit",
  //       day: "2-digit",
  //     }).format(dateFromString(todo.dueDate));
  //   } catch (e) {
  //     console.warn(e);
  //     console.warn(
  //       "Date parsing failed for: " + todo.path + " with date: " + todo.dueDate,
  //     );
  //     dueDate = todo.dueDate;
  //   }
  // }
</script>

<Frame classNames="block w-full mb-2" title="">
  <button
    on:click={async () => {
      // follow link
      // TODO: add correct src path
      await followLink(todo.path, todo.path ?? "", true, true);
    }}
    class="py-2 whitespace-normal block text-left hover:text-white group cursor-pointer w-full"
  >
    <div class="block w-full group-hover:font-bold">
      {todo.title}
    </div>
    <div class="block w-1/2 text-sm text-gray-500">
      {todo.dueDate}
    </div>
    <div class="block w-full text-sm text-gray-500">
      {todo.description}
    </div>
  </button>
</Frame>

<style lang="scss">
</style>

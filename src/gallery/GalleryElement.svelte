<script lang="ts">
  import type { TFile } from "obsidian";
  import { dateFromString, followLink, type GalleryItem } from "./common";
  import Frame from "../common/Frame.svelte";
  import { onMount } from "svelte";
  import BoardColumn from "@/todo/BoardColumn.svelte";

  const {
    item,
    width = "slide",
  }: {
    item: GalleryItem;
    width?: "grow" | "full" | "slide";
  } = $props();

  // TODO: dedup this component with todo element

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

<!-- TODO: dedup with BoardColumn -->
<!-- TODO: dedup with Frame -->
<!-- svelte-ignore event_directive_deprecated -->
<button
  class={`gallery-element frame border border-solid border-gray-400 border-1 relative snap-x snap-mandatory flex-1 block py-2 hover:text-white group cursor-pointer h-auto ${
    width === "grow"
      ? "gallery-grow basis-[240px] flex-shrink-0 flex-grow-1"
      : ""
  } ${
    width === "full"
      ? "gallery-full w-full flex-shrink-0 flex-grow-1 basis-[60%]"
      : ""
  } ${
    width === "slide"
      ? "gallery-slide flex-shrink-0 flex-grow-0 w-[240px] basis-[240px]"
      : ""
  }`}
  on:click={async () => {
    // follow link
    // TODO: add correct src path
    await followLink(item.path, item.path ?? "", true, true);
  }}
>
  <div class="py-3 px-1 whitespace-normal block text-left w-full">
    <div class="block w-full group-hover:font-bold">
      <h3 class="w-full min-h-[1em] block text-lg font-bold mb-0 mt-0">
        {item.title}
      </h3>
    </div>
    <div class="block w-1/2 text-sm text-gray-500">
      {item.dueDate}
    </div>
    <div class="block w-full text-sm text-gray-500">
      {item.description}
    </div>
  </div>
</button>

<style lang="scss">
  .gallery-element {
    border-radius: 0 !important;
  }

  .gallery-grow {
    flex-grow: 1 !important;
  }

  .gallery-full {
    width: 100% !important;
  }
</style>

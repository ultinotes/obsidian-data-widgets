<script lang="ts">
  import { onMount } from "svelte";
  import { followLink, type GalleryItem, type GalleryOptions } from "./common";
  import BoardColumn from "@/todo/BoardColumn.svelte";
  import TodoElement from "@/todo/TodoElement.svelte";
  import BoardRow from "@/todo/BoardRow.svelte";
  import GalleryElement from "./GalleryElement.svelte";

  let {
    items = [],
    style = "slide",
  }: GalleryOptions & {
    items: GalleryItem[];
  } = $props();

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
  });

  // TODO: implement hover
  // // TODO: add tests
  // const mouseEnter = (e: MouseEvent, linkText: string) => {
  //   // TODO: add exception handling
  //   window.app.workspace.trigger("hover-link", { e, linkText, source: "" });
  // };

  // TODO: add element to add new entries
</script>

{#if style === "grid"}
  <div
    bind:this={rootElement}
    class="dark min-w-full py-4 flex flex-row flex-wrap gap-4"
  >
    {#each items as item}
      <GalleryElement {item} width="grow"></GalleryElement>
    {/each}
  </div>
{/if}

{#if style === "list"}
  <div
    bind:this={rootElement}
    class="dark min-w-full py-4 flex flex-row flex-wrap gap-4"
  >
    {#each items as item}
      <GalleryElement {item} width="full"></GalleryElement>
    {/each}
  </div>
{/if}
{#if style === "slide"}
  <div
    bind:this={rootElement}
    class="dark min-w-full py-4 flex flex-row overflow-x-auto snap-x snap-mandatory gap-4"
  >
    {#each items as item}
      <GalleryElement {item}></GalleryElement>
    {/each}
  </div>
{/if}

<style global lang="postcss">
  /* TODO: dedup with Todo View */
  /* NOTE: global postcss can contain tailwind apply rules */
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

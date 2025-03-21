<svelte:options customElement="un-doc-context" />

<script lang="ts">
  import type { Component } from "obsidian";
  import { onMount } from "svelte";
  import { type Writable } from "svelte/store";
  import {
    deleteComponentStore,
    getRootHost,
    registerComponentStore,
    type ComponentContext,
  } from "../store/componentStore";
  import DocUi from "./DocUI.svelte";

  let rootElement: HTMLElement;

  export let component: Component;
  export let srcFilename: string;
  export let srcLineStart: number;
  export let srcLineEnd: number;

  let store: Writable<ComponentContext | null>;

  onMount(() => {
    // host element can be further passed down the tree as context
    const hostElement = getRootHost(rootElement);
    // Attach the store to this component’s DOM element
    store = registerComponentStore(hostElement);

    // Return a cleanup function to remove the store if needed
    return () => {
      deleteComponentStore(hostElement);
    };
  });

  // TODO: scope store to component tree
  $: if (component && store) {
    console.debug("COMPONENT PASSED", component);
    store.set({
      component,
      srcFilename,
      srcLineStart,
      srcLineEnd,
    });
  }
  $: if (!component) {
    console.error("NO COMPONENT PASSED");
  }
</script>

<div bind:this={rootElement} class="pt-4">
  <DocUi></DocUi>
  <slot />
</div>

<style global lang="postcss">
  /* TODO: find a better way to include tailwind 
           --> maybe with tree-shaking?
           --> manual tree-shaking through class-apply pattern
              --> apply works throughout the project
              --> apply classes to classes of the same name
              --> define only the classes needed for each component
  */
  /* NOTE: tailwind must be included once per web-component in a GLOBAL script tag of type postcss
  */
  /* TODO: remove tailwind because it's probably not needed here */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

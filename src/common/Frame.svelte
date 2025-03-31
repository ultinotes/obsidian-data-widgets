<script lang="ts">
  import FrameTopBar from "./FrameTopBar.svelte";

  export let title = "";
  export let classNames = "";

  // TODO: create clickable buttons?
</script>

<div
  class={`frame border border-solid border-gray-400 border-1 relative ${classNames}`}
  style=""
>
  {#if title}
  <FrameTopBar classNames="bg-gray-400">
    {title}
    <slot name="title"></slot>
  </FrameTopBar>
  {/if}
  <div class="p-1">
    <slot />
  </div>
</div>

<style>
</style>

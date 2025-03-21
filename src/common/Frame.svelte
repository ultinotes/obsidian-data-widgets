<script lang="ts">
  import FrameTopBar from "./FrameTopBar.svelte";

  export let title = "";
  export let classNames = "";

  // TODO: create clickable buttons?
</script>

<div
  class={`frame border border-solid border-shade-400 border-1 relative ${classNames}`}
  style=""
>
  <FrameTopBar classNames="bg-shade-400">
    {title}
    <slot name="title"></slot>
  </FrameTopBar>
  <div class="p-1">
    <slot />
  </div>
</div>

<style>
</style>

<script lang="ts">
  import FrameTopBar from "./FrameTopBar.svelte";

  export let title = "";
  export let classNames = "";
  export let onClick: () => any = () => {};
</script>

<div
  class={`frame border border-solid border-shade-800 border-1 relative ${classNames} fixed inset-0`}
  style=""
>
  <FrameTopBar classNames="">
    {title}
    <button
      class="absolute top-0 right-0 m-2 p-1 text-shade-800 hover:text-shade-600"
      aria-label="Close"
      on:click={onClick}
    >
      &times;
    </button>
  </FrameTopBar>
  <div class="p-1">
    <slot />
  </div>
</div>

<style lang="scss">
</style>

<script lang="ts">
  import FrameTopBar from "./FrameTopBar.svelte";

  let title = $state("");
  let activated = $state(false);

  let {
    classNames = "",
    onAdd = (name) => {},
  }: {
    classNames?: string;
    onAdd?: (fileName: string) => any;
  } = $props();
</script>

<div class={`frame relative flex justify-start ${classNames}`} style="">
  {#if !activated}
    <button
      class="p-1 text-gray-800 hover:text-gray-600"
      aria-label="Close"
      onclick={() => {
        title = "";
        activated = true;
      }}
    >
      + Add Todo
    </button>
  {:else}
    <div class="p-4 flex flex-row items-center justify-center gap-2">
      <button
        class="px-2 border border-solid border-gray-500 text-white rounded hover:border-gray-200"
        onclick={() => {
          title = ""; // Clear the input field
          activated = false; // Close the input screen
        }}
      >
        x
      </button>
      <input
        type="text"
        bind:value={title}
        placeholder="Enter title"
        class="border border-solid border-gray-800 p-2 rounded w-full h-full"
      />
      <button
        class="px-2 border border-solid border-gray-500 text-white rounded hover:border-gray-200 disabled:opacity-[0.5]"
        onclick={() => {
          onAdd(title);
          title = ""; // Clear the input field after adding
          activated = false;
        }}
        disabled={title.length === 0}
      >
        Add
      </button>
    </div>
  {/if}
</div>

<style lang="scss">
</style>

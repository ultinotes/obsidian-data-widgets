<script lang="ts">
  import Frame from "./Frame.svelte";
  import FrameTopBar from "./FrameTopBar.svelte";

  // TODO: add view for changed component settings and manual changes that need to be made
</script>

<FrameTopBar classNames="bg-gray-300">
  <div class="flex justify-end space-x-2">
    <button class="text-red-500 bg-black p-1">
      &#9888; <!-- Unicode icon for error -->
    </button>
    <button class="text-blue-500 bg-black p-1">
      &#128712; <!-- Unicode icon for debug -->
    </button>
    <button class="text-green-500 bg-black p-1">
      &#128736; <!-- Unicode icon for another action -->
    </button>
  </div>
</FrameTopBar>

<style lang="scss">
</style>

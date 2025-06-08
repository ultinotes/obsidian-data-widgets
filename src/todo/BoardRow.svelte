<script lang="ts">
  let { children } = $props();
</script>

<div class="todo-row flex px-2">
  {@render children?.()}
</div>

<style>
</style>

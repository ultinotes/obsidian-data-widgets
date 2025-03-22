<script lang="ts">
  let { children } = $props();
</script>

<div class="todo-row flex">
  {@render children?.()}
</div>

<style>
</style>

<script lang="ts">
  import type { AnnotatedImageOptions, ImageAnnotation } from "./common";

  let {
    src,
    data,
    cssFilter = "",
    caption = "",
    annotationStyle = "hotspot",
  }: AnnotatedImageOptions & {
    src: string;
    data: ImageAnnotation[];
  } = $props();
</script>

<main>
  <img {src} alt={caption} style={`filter: ${cssFilter}`} />
</main>

<style>
</style>

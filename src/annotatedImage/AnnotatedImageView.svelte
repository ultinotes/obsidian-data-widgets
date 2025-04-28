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

  let mouseX = $state<number>(0);
  let mouseY = $state<number>(0);

  function mousemove(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    if (!target) {
      return;
    }

    const rect = target.getBoundingClientRect();
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

    // console.log(
    //   `Mouse position: ${xPercent.toFixed(2)}% x, ${yPercent.toFixed(2)}% y`,
    // );

    requestAnimationFrame(() => {
      mouseX = Math.round(xPercent * 100) / 100;
      mouseY = Math.round(yPercent * 100) / 100;
    });
  }

  // TODO: adding annotation workflow:
  // 1. click on image
  // 2. coordinates are saved
  // 3. show annotaiton form
  // 4. save annotation

  // FIXME: why is the image vanishing sometimes

  // TODO: decide on symbol
  // ▣ ⛶
</script>

<div class="w-full font-mono">
  {mouseX} x {mouseY}
</div>
<main class="flex">
  <div class="stage min-w-[310px] flex-1 relative" onmousemove={mousemove}>
    <img {src} class="w-full" alt={caption} style={`filter: ${cssFilter}`} />
    {#each data as annotation}
      <div
        class="highlight absolute text-red-500"
        style={`left: ${annotation.positionX}%; top: ${annotation.positionY}%;`}
      >
        ⛶
      </div>
    {/each}
  </div>
  <div class="side w-[310px]">
    <h2>Annotations</h2>

    {#each data as annotation}
      <div
        class="block"
        style={`left: ${annotation.positionX}%; top: ${annotation.positionY}%;`}
      >
        {annotation.title}
      </div>
    {/each}
  </div>
</main>

<style>
  .highlight {
    font-size: 30px;
    transform: translate(-50%, -50%);
    line-height: 1;
  }
</style>

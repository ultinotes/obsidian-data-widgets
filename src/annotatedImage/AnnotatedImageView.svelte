<script lang="ts">
  import { followLink } from "./common";
  import type { AnnotatedImageOptions, ImageAnnotation } from "./common";

  const sameAnnotation = (a?: ImageAnnotation, b?: ImageAnnotation) => {
    if (!a || !b) {
      return false;
    }
    return (
      a.positionX === b.positionX &&
      a.positionY === b.positionY &&
      a.title === b.title &&
      a.id === b.id
    );
  };

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

  let hoveredAnnotation = $state<ImageAnnotation | null>(null);

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

  // TODO: initialize the img src properly
  // const imgSrc = '...';
  // const imgFile = app.metadataCache.getFirstLinkpathDest(imgSrc, "/");
  // const absolutePath = app.vault.getResourcePath(imgFile);

  // NOTE: notes on styling
  // - !h-auto counters the default styling of obsidian buttons
  //
</script>

<div class="w-full font-mono">
  {mouseX} x {mouseY}
</div>
<!-- svelte-ignore a11y_no_static_element_interactions -->
<main class="flex flex-wrap">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="stage min-w-[310px] flex-1 relative" onmousemove={mousemove}>
    <img
      {src}
      class="w-full"
      alt={caption}
      style={`filter: ${cssFilter}`}
      style:opacity={!!hoveredAnnotation ? "0.7" : "1"}
    />
    {#each data as annotation}
      <button
        class={`highlight absolute text-red-500 hover:cursor-pointer hover:scale-120 !h-auto ${sameAnnotation(annotation, hoveredAnnotation ?? undefined) ? "scale-120" : ""}`}
        style={`left: ${annotation.positionX}%; top: ${annotation.positionY}%; filter: ${!!hoveredAnnotation && !sameAnnotation(annotation, hoveredAnnotation) ? "grayscale(1)" : "none"};`}
        onmouseenter={() => {
          console.log("hovered", annotation);
          hoveredAnnotation = annotation;
        }}
        onmouseleave={() => {
          console.log("unhovered", annotation);
          hoveredAnnotation = null;
        }}
        onclick={async () => {
          // TODO: add correct src path
          await followLink(annotation.path, annotation.path, true, true);
        }}
      >
        ⛶
      </button>
    {/each}
  </div>
  <div class="side w-[310px] overflow-scroll">
    <h2>Annotations</h2>
    {#each data as annotation}
      <button
        onmouseenter={() => {
          console.log("hovered", annotation);
          hoveredAnnotation = annotation;
        }}
        onmouseleave={() => {
          console.log("unhovered", annotation);
          hoveredAnnotation = null;
        }}
        onclick={async () => {
          // TODO: add correct src path
          await followLink(annotation.path, annotation.path ?? "", true, true);
        }}
        class={`block !h-auto text-left ${sameAnnotation(annotation, hoveredAnnotation ?? undefined) ? "font-bold" : ""}`}
        style={`left: ${annotation.positionX}%; top: ${annotation.positionY}%;`}
      >
        {annotation.title}
      </button>
    {/each}
  </div>
</main>

<style global lang="postcss">
  .highlight {
    font-size: 30px;
    transform: translate(-50%, -50%);
    /* NOTE: Because of the translation the center now sits where the top-left was */
    transform-origin: top left;
    line-height: 1;
  }

  /* TODO: dedup with Todo View */
  /* NOTE: global postcss can contain tailwind apply rules */
  button {
    @apply bg-transparent border-none appearance-none block h-full;
    font-size: var(--font-ui-medium);
    white-space: normal;
  }

  /* button:hover {
    cursor: pointer;
    color: #fff;
    font-weight: bold;
  } */

  button:not(.clickable-icon) {
    background-color: transparent;
    box-shadow: none;
  }
</style>

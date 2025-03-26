import type { CachedMetadata, Component, OpenViewState, TFile } from "obsidian";

// DOCS: use this function to navigate. NEVER use data-href and href because it will crash on mobile.
export async function followLink(
  target: string,
  source: string,
  newLeaf: boolean,
  focusNewLeaf: boolean
) {
  return await window.app.workspace.openLinkText(
    target,
    source,
    newLeaf,
    {
      active: focusNewLeaf,
    } as OpenViewState
  );
}

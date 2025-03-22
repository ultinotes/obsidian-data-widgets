import type { CachedMetadata, Component, OpenViewState, TFile } from "obsidian";

// NOTE: process must be sync
// returns errors
export async function processMarkdownBody(
  file: TFile,
  cb: (linesOfContent: string[], metadata: CachedMetadata) => string[]
): Promise<Error[] | undefined> {
  try {
    const metadata = window.ultinotes.app.metadataCache.getFileCache(file);
    if (!metadata) {
      return [new Error("Metadata is missing")];
    }
    const frontmatterPosition = metadata.frontmatterPosition;
    if (!frontmatterPosition) {
      return [new Error("Frontmatter Position is missing")];
    }
    await window.ultinotes.app.vault.process(file, (rawContent: string) => {
      // function must be sync inside
      const endOfFrontmatter = frontmatterPosition.end.line + 1;
      const content = rawContent.split("\n").slice(endOfFrontmatter);
      const newDoc = cb(content, metadata);
      return [
        ...rawContent.split("\n").slice(0, endOfFrontmatter),
        ...newDoc,
      ].join("\n");
    });

    triggerCacheUpdate(file);

    return undefined; // no errors
  } catch (e) {
    return [e as Error];
  }
}

export async function processMarkdownFrontmatter(
  file: TFile,
  cb: (frontmatter: any) => void
): Promise<Error[] | undefined> {
  try {
    const metadata = window.ultinotes.app.metadataCache.getFileCache(file);
    if (!metadata) {
      return [new Error("Metadata is missing")];
    }
    const frontmatter = metadata.frontmatter;
    const frontmatterPosition = metadata.frontmatterPosition;
    if (!frontmatter) {
      return [new Error("Frontmatter is missing")];
    }
    if (!frontmatterPosition) {
      return [new Error("Frontmatter Position is missing")];
    }
    // TODO: handle errors thrown
    await window.ultinotes.app.fileManager.processFrontMatter(
      file,
      (frontmatter: string) => {
        // frontmatter is edited in-place
        cb(frontmatter);
      }
    );

    triggerCacheUpdate(file);

    return undefined; // no errors
  } catch (e) {
    return [e as Error];
  }
}

/**
 * ! REVIEW: This function might not work as expected, please review
 */
export function triggerCacheUpdate(file: TFile) {
  // REVIEW: why does that work?
  // HACK: triggering reload after change
  window.ultinotes.app.metadataCache.trigger("changed", file);
  window.ultinotes.app.vault.trigger("modify", file);

  setTimeout(() => {
    window.ultinotes.app.metadataCache.trigger("changed", file);
    window.ultinotes.app.vault.trigger("modify", file);
  }, 32);

  setTimeout(() => {
    window.ultinotes.app.metadataCache.trigger("changed", file);
    window.ultinotes.app.vault.trigger("modify", file);
  }, 64);

  setTimeout(() => {
    window.ultinotes.app.metadataCache.trigger("changed", file);
    window.ultinotes.app.vault.trigger("modify", file);
  }, 256);

  setTimeout(() => {
    window.ultinotes.app.metadataCache.trigger("changed", file);
    window.ultinotes.app.vault.trigger("modify", file);
  }, 1024);
}

export async function renderMarkdown(
  markdown: string,
  parentComponent: Component
) {
  const container = document.createElement("div");
  await window.ultinotes.markdown.render(
    window.ultinotes.app,
    markdown,
    container,
    "",
    parentComponent
  );
  return container;
}

// TODO: functions for getting, writing, moving files
// TODO: functions for popup notes, opening notes, writing notes
// TODO: functions for altering current component in current file

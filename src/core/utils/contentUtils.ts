import type { TFile } from "obsidian";

// import type { CachedMetadata, Component, OpenViewState, TFile } from "obsidian";

// export async function renderMarkdown(
//   markdown: string,
//   parentComponent: Component
// ) {
//   const container = document.createElement("div");
//   await window.ultinotes.markdown.render(
//     window.ultinotes.app,
//     markdown,
//     container,
//     "",
//     parentComponent
//   );
//   return container;
// }

// // TODO: functions for getting, writing, moving files
// // TODO: functions for popup notes, opening notes, writing notes
// // TODO: functions for altering current component in current file

/**
 * Creates a new file in the vault with the specified path, content, and frontmatter.
 * @param filePath - The path where the file should be created (including extension)
 * @param content - The content to write into the file.
 * @param frontmatter - An object representing the frontmatter to include in the file.
 * @returns The created TFile object.
 */
export async function createFileWithFrontmatter(
  filePath: string,
  content: string,
  frontmatter: Record<string, string>
): Promise<TFile> {
  // Convert frontmatter object to YAML string
  const frontmatterString = `---\n${Object.entries(frontmatter)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n")}\n---\n`;

  // Combine frontmatter and content
  const fileContent = `${frontmatterString}\n${content}`;

  await ensureDirectoryExists(filePath);
  // Create the file in the vault
  const createdFile = await window.app.vault.create(filePath, fileContent);

  return createdFile;
}

async function ensureDirectoryExists(filePath: string) {
  const parts = filePath.split("/");
  parts.pop(); // Remove the file name
  let currentPath = "";
  for (const part of parts) {
    currentPath += part + "/";
    if (!(await window.app.vault.adapter.exists(currentPath))) {
      await window.app.vault.createFolder(currentPath);
    }
  }
}

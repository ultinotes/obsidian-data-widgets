import type { TAbstractFile, TFile, TFolder } from "obsidian";

export const isFile = (af: TAbstractFile) => "stat" in af;

export const filterFiles = (abstractFiles: TAbstractFile[]): TFile[] => {
  return abstractFiles.filter(isFile).map((af) => af as TFile);
};

export const filterFolders = (abstractFiles: TAbstractFile[]): TFolder[] => {
  return abstractFiles.filter((af) => !isFile(af)).map((af) => af as TFolder);
};

export const getMarkdownLinkToFile = (file: TFile) => {
  return window.ultinotes.app.fileManager.generateMarkdownLink(
    file,
    "",
    "",
    ""
  );
};

export function getLinkToFile(file: TFile) {
  // REVIEW: what about source path
  return window.ultinotes.app.metadataCache.fileToLinktext(file, "");
}

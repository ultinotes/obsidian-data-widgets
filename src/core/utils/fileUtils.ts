import { TAbstractFile, TFile, TFolder } from "obsidian";

export const isFile = (af: TAbstractFile) => af instanceof TFile;
export const isFolder = (af: TAbstractFile) => af instanceof TFolder;

export const filterFiles = (abstractFiles: TAbstractFile[]): TFile[] => {
  return abstractFiles.filter(isFile);
};

export const filterFolders = (abstractFiles: TAbstractFile[]): TFolder[] => {
  return abstractFiles.filter(isFolder);
};

export const getMarkdownLinkToFile = (file: TFile) => {
  return window.app.fileManager.generateMarkdownLink(file, "", "", "");
};

export function getLinkToFile(file: TFile) {
  // REVIEW: what about source path
  return window.app.metadataCache.fileToLinktext(file, "");
}

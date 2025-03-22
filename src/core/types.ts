import type { CachedMetadata, TFile } from "obsidian";

export type MarkdownEntity = Record<string, unknown> & {
  fileName: string;
  path: string;
  type: string;
  title: string;
  note: CachedMetadata; // note body
  //   rawContent: string;
  fileHandle: TFile;
  id: string;
  tags: string[];
};

// reference is used as key but also points to the entity containing the data
export type EntityReferenceListener = {
  onCreate: (keyEntity: MarkdownEntity) => any;
  onModify: (keyEntity: MarkdownEntity) => any;
  onDelete: (keyEntity: MarkdownEntity) => any;
};

export type CreationResult = {
  errors: Error[] | undefined;
  filePath: string;
};

export interface EntityNotifier {
  registerListener(cb: EntityReferenceListener): void;
}

export interface EntityCreator {
  create(
    path: string,
    frontmatter: Record<string, any>,
    content: string
  ): Promise<CreationResult>;
}

export interface Repo<T> {
  onChange(callback: (key: Map<MarkdownEntity, T>) => any): any;
  createEntityFile(
    name: string,
    entity: Record<string, any>
  ): Promise<CreationResult>;
}

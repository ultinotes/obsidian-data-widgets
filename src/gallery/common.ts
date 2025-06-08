import type { Entity, EntityDTO } from "@/core/entities/base";
import { deconstructPath } from "@/core/integrations/dataview";

export * from "../core/types";
export * from "../core/utils";

export type GalleryItem = Entity & {};

// TODO: add option to specify element width
export type GalleryOptions = {
  style?: "grid" | "list" | "slide";
};

export const sanitizeGallery = (e: EntityDTO) => {
  const { path, filename } = deconstructPath(e);
  return {
    ...e,
    path,
    title: filename,
  } as GalleryItem;
};

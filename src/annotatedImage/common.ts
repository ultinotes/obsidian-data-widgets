import type { Entity, EntityDTO } from "@/core/entities/base";
import { deconstructPath } from "@/core/integrations/dataview";

export * from "../core/types";
export * from "../core/utils";

export type ImageAnnotation = Entity & {
  positionX: string;
  positionY: string;
};

export type AnnotatedImageOptions = {
  cssFilter?: string;
  caption?: string;
  annotationStyle?: "hotspot" | "line";
};

// TODO: enable user to specify other properties to use for x and y coordinates
// TODO: be more specific in readme about the expected properties
export const sanitizeAnnotation = (e: EntityDTO) => {
  const { path, filename } = deconstructPath(e);
  return {
    ...e,
    positionX: e.positionX || "0",
    positionY: e.positionY || "0",
    path,
    title: filename,
  } as ImageAnnotation;
};

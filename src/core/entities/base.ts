import type { DataviewEntity } from "../integrations/dataview";

export type Entity = EntityDTO & {
  path: string;
  title: string;
};

export type EntityDTO = DataviewEntity & {
  [key: string]: string;
};

export type DataviewEntity = {
  file: {
    path: string;
  };
};

export const deconstructPath = (entity: DataviewEntity) => {
  const path = entity.file.path;
  const filename = path.substring(
    path.lastIndexOf("/") + 1,
    path.lastIndexOf(".")
  );
  return { path, filename };
};

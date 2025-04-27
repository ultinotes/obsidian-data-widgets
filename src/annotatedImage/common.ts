


export type ImageAnnotation = {
  path: string;
  id: string;
  title: string;
  description: string;
  positionX: string;
  positionY: string;
};


export type AnnotatedImageOptions = {
  cssFilter: string;
  caption: string;
  annotationStyle: 'hotspot' | 'line';
};
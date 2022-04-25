import { Project, ProjectSchema } from "./project.schema";
import { Image, ImageSchema } from "./image.schema";
import { Annotation, AnnotationSchema } from "./annotation.schema";

export default [
  { name: Project.name, schema: ProjectSchema },
  { name: Image.name, schema: ImageSchema },
  { name: Annotation.name, schema: AnnotationSchema },
];

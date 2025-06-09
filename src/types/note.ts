export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

export interface NewPostCreate {
  title: string;
  content: string;
  tag: string;
}

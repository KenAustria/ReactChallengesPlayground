// Post defines the shape of a single object
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// PostsState defines the shape of the entire state object for the posts slice
export interface PostsState {
  data: Post[];
  isLoading: boolean;
  error: string | null;
}

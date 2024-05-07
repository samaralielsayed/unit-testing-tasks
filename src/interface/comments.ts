
import axios from "axios";
export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

export const fetchComments = () =>
  axios
    .get<Comment[]>('https://jsonplaceholder.typicode.com/comments')
    .then(res => res.data);

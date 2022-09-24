import { Movie } from "./movies";

export interface ApiResponse {
  Search:       Movie[];
  totalResults: string;
  Response:     string;
}

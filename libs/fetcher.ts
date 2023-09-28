import axios from "axios";

export default async function fetcher(url: string) {
  return axios.get(url).then((response) => response.data);
}
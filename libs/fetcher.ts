import axios from "axios";

export default function fetcher(endpoint: string) {
  return (
    axios.get(endpoint)
      .then((response) => response.data)
      .catch((err) => console.error(err))
  );
}
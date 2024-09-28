import { Size } from "@/lib/types";

const URL = `http://localhost:3001/api/sizes/63a9a0c3-e243-4c55-ae00-6d649ae8b313/all`;

const getSizes = async (): Promise<Size[]> => {
  const res = await fetch(URL);
  console.log(res.url);
  return res.json();
};

export default getSizes;

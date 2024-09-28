import { Category } from "@/lib/types";

const URL = `http://localhost:3001/api/categories/63a9a0c3-e243-4c55-ae00-6d649ae8b313/all`;

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL);
  console.log(res.url);
  return res.json();
};

export default getCategories;

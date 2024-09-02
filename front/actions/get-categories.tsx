import { Category } from "@/lib/types";

const URL = `http://localhost:3001/api/categories/3e5719de-acfb-4c6c-95a9-95472501087c/all`;

const getCategories = async (): Promise<Category[]> => {
	const res = await fetch(URL);
	console.log(res.url);
	return res.json();
};

export default getCategories;

import { Size } from "@/lib/types";

const URL = `http://localhost:3001/api/sizes/3e5719de-acfb-4c6c-95a9-95472501087c/all`;

const getSizes = async (): Promise<Size[]> => {
	const res = await fetch(URL);
	console.log(res.url);
	return res.json();
};

export default getSizes;

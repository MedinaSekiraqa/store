import { Product } from "@/lib/types";

import qs from "query-string";

const URL = `http://localhost:3001/api/products/3e5719de-acfb-4c6c-95a9-95472501087c/allStock?stock=true`;

interface Query {
	categoryId?: string;
	sizeId?: string;
	stock?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
	const url = qs.stringifyUrl({
		url: URL,
		query: {
			categoryId: query.categoryId,
			sizeId: query.sizeId,
			stock: query.stock,
		},
	});
	const res = await fetch(url);

	return res.json();
};

export default getProducts;

import { Product } from "@/lib/types";

import qs from "query-string";

const URL = `http://localhost:3001/api/products/63a9a0c3-e243-4c55-ae00-6d649ae8b313/allStock?stock=true`;

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

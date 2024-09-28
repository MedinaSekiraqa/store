import Container from "../../components/ui/container";
import getBillboard from "@/actions/get-billboard";
import Billboard from "../../components/billboard";
import getProducts from "@/actions/get-products";
import ProductList from "../../components/product-list";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ stock: true });
  const billboard = await getBillboard("fc6fad13-8d78-4ad7-9b67-24d689f09e04"); //billboardId per me dal n home page
  return (
    <Container>
      <div className="sapce-y-10 pb-10">
        <Billboard data={billboard} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;

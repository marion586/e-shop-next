import { products } from "@/utils/products";
import Container from "./component/Container";
import HomeBanner from "./component/HomeBanner";
import { truncateText } from "@/utils/truncateText";
import ProductCard from "./component/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./component/NullData";
interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title='Opps! No products found.Click "ALl" to clear filters' />
    );
  }
  //fisher-Yates Shuffle algorithm

  function shuffleAray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledProducts = shuffleAray(products);
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProducts.map((product: any) => {
            return <ProductCard key={product.id} data={product} />;
          })}
        </div>
      </Container>
    </div>
  );
}

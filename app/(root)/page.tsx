import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
//import { getProducts } from "@/services/products";
//import { useGoods } from "@/hooks";
import { Category, Ingredient, Product, ProductVariation } from "@prisma/client";

/* type TProducts = {
    productVariations: ProductVariation[];
    ingredients: Ingredient[];
} & Product

type TGoods = {
    products: TProducts[];
} & Category; */

export default async function Home() {
  
  const categories = await prisma.category.findMany({
                                include: {
                                    products: {
                                        include: {
                                            ingredients: true,
                                            productVariations: true,
                                        }
                                    }
                                }
                              });
  //console.log(categories[0].products);     
                      
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold"/>
      </Container>
      <TopBar categories={categories.filter( category => category.products.length > 0 )}/>
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация товаров */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {
                categories.map( category => (
                  category.products.length > 0 && (
                    <ProductsGroupList 
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      products={category.products}
                    />
                  )
                ) )
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
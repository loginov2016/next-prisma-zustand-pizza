import { Container, Filters, ProductsGroupList, Stories, Title, TopBar } from "@/components/shared";
import { findPizzasByFilteringOptions, IGetSearchParams } from "@/lib/find-pizzas-by-filtering-options";
import { Suspense } from "react";


export default async function Home({ searchParams }: { searchParams: Promise<IGetSearchParams> }) {
  const params = await searchParams;
  //console.log('params: ', params);
  const categories = await findPizzasByFilteringOptions(params);
  
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold"/>
      </Container>

      <TopBar categories={categories.filter( category => category.products.length > 0 )}/>
      <Stories />
    
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация товаров */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
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
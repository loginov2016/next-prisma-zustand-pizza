import { Container, Filters, ProductCard, ProductsGroupList, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold"/>
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация товаров */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title="Пиццы" products={[
                {
                  id: 1,
                  name: 'Чизбургер',
                  imageUrl: 'https://media.dodostatic.net/image/r:366x366/11ee7d61698827ee9b8db6d0aec53410.avif',
                  items: [{price: 550}]
                },
                {
                  id: 2,
                  name: 'Чизбургер',
                  imageUrl: 'https://media.dodostatic.net/image/r:366x366/11ee7d61698827ee9b8db6d0aec53410.avif',
                  items: [{price: 550}]
                },
                {
                  id: 3,
                  name: 'Чизбургер',
                  imageUrl: 'https://media.dodostatic.net/image/r:366x366/11ee7d61698827ee9b8db6d0aec53410.avif',
                  items: [{price: 550}]
                },
                {
                  id: 4,
                  name: 'Чизбургер',
                  imageUrl: 'https://media.dodostatic.net/image/r:366x366/11ee7d61698827ee9b8db6d0aec53410.avif',
                  items: [{price: 550}]
                },
                {
                  id: 5,
                  name: 'Чизбургер',
                  imageUrl: 'https://media.dodostatic.net/image/r:366x366/11ee7d61698827ee9b8db6d0aec53410.avif',
                  items: [{price: 550}]
                },
                {
                  id: 6,
                  name: 'Чизбургер',
                  imageUrl: 'https://media.dodostatic.net/image/r:366x366/11ee7d61698827ee9b8db6d0aec53410.avif',
                  items: [{price: 550}]
                }
              ]} categoryId={1} />
              <ProductsGroupList title="Комбо" products={[
                {
                  id: 1,
                  name: 'Чизбургер',
                  imageUrl: 'https://media.dodostatic.net/image/r:366x366/11ee7d61698827ee9b8db6d0aec53410.avif',
                  items: [{price: 550}]
                },
                {
                  id: 2,
                  name: 'Чизбургер',
                  imageUrl: 'https://media.dodostatic.net/image/r:366x366/11ee7d61698827ee9b8db6d0aec53410.avif',
                  items: [{price: 550}]
                },
                {
                  id: 3,
                  name: 'Чизбургер',
                  imageUrl: 'https://media.dodostatic.net/image/r:366x366/11ee7d61698827ee9b8db6d0aec53410.avif',
                  items: [{price: 550}]
                },
                {
                  id: 4,
                  name: 'Чизбургер',
                  imageUrl: 'https://media.dodostatic.net/image/r:366x366/11ee7d61698827ee9b8db6d0aec53410.avif',
                  items: [{price: 550}]
                },
                {
                  id: 5,
                  name: 'Чизбургер',
                  imageUrl: 'https://media.dodostatic.net/image/r:366x366/11ee7d61698827ee9b8db6d0aec53410.avif',
                  items: [{price: 550}]
                },
                {
                  id: 6,
                  name: 'Чизбургер',
                  imageUrl: 'https://media.dodostatic.net/image/r:366x366/11ee7d61698827ee9b8db6d0aec53410.avif',
                  items: [{price: 550}]
                }
              ]} categoryId={2} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
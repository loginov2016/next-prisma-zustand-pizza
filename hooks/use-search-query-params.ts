import { useSearchParams } from "next/navigation";
import { IFilterPriceProps } from "./use-query-string";


export interface IFilterSearchParams extends IFilterPriceProps {
  pizzaTypes: string;
  pizzaSizes: string;
  ingredients: string;
}

export const useSearchQueryParams = () => {
  //console.log('Сработал хук useSearchQueryParams');
  const searchParams = useSearchParams() as unknown as Map<keyof IFilterSearchParams, string>;

  return (value: keyof IFilterSearchParams) => {
      switch(value) {
        case 'ingredients': {
          return searchParams.has('ingredients') ? searchParams.get('ingredients')?.split(',') : [];
        };
        case 'pizzaSizes' :  {
          return searchParams.has("pizzaSizes") ? searchParams.get('pizzaSizes')?.split(',') : [];
        };
        case 'pizzaTypes' :  {
          return searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [];
        };
        case 'priceFrom' : return searchParams.get('priceFrom');
        case 'priceTo' :   return searchParams.get('priceTo');
      }
  }
  
}
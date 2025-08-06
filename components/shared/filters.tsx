'use client';

import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { FilterCheckboxGroup } from './filter-checkbox-group';
import { useFilterIngredients } from '@/hooks/use-filter-ingredients';
import { useSet } from 'react-use';
import qs from 'qs';
import { useRouter, useSearchParams } from 'next/navigation';

interface IFiltersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  
}

interface IFilterPriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface IFilterQueryString extends IFilterPriceProps {
  pizzaTypes: string;
  pizzaSizes: string;
  ingredients: string;
}

export const Filters: React.FC<IFiltersProps> = ({ className }) => {
  //console.log('Сработал компонент Filters');
  const searchParams = useSearchParams() as unknown as Map<keyof IFilterQueryString, string>
  const filterRouter = useRouter();
  const { ingredients, loading, selectedIngredients, onAddFilterCheckboxID, onClearSelectedFilterIngredients } = useFilterIngredients(searchParams.has('ingredients') ? searchParams.get('ingredients')?.split(',') : []);
  const [filterCheckboxBySizes, { toggle: toggleFilterCheckboxBySizes, clear: onClearSelectedFilterBySizes }] = useSet(new Set<string>( searchParams.has('pizzaSizes') ? searchParams.get('pizzaSizes')?.split(',') : [] ));
  const [filterCheckboxByPizzaTypes, { toggle: toggleFilterCheckboxByPizzaTypes, clear: onClearSelectedFilterByPizzaTypes }] = useSet(new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []));

  const [filterPrices, setFilterPrice] = useState<IFilterPriceProps>({
    priceFrom: Number( searchParams.get('priceFrom') ) || undefined,
    priceTo:   Number( searchParams.get('priceTo') )   || undefined,
  });

  const arrCheckboxes = ingredients.map( item => ({ text: item.name, value: String(item.id), }) );

  const onChangeFilterPrice = (prices: keyof IFilterPriceProps, value: number): void => {
    setFilterPrice({
      ...filterPrices,
      [prices]: value,
    })
  };

  const onClearSelectedFilterByPrice = () => {
    setFilterPrice({priceFrom: 0, priceTo: 1000})
  }

  //console.log( searchParams.get('priceFrom') );

  useEffect(() => {
    console.log('Сработал копонент Filter');
    const filters = {
      ...filterPrices,
      pizzaTypes: Array.from(filterCheckboxByPizzaTypes),
      pizzaSizes: Array.from(filterCheckboxBySizes),
      ingredients: Array.from(selectedIngredients),
    };
    /* Строка запроса в GET запросе. */
    const filterQueryString = qs.stringify(filters, {
      arrayFormat: 'comma'
    });
    //console.log(filterQueryString);
    /* 
      Обязательно нужно передавать в push второй аргумент: { scroll: false },
      чобы при клике на чекбокс, скролл не прыгал на верх.   
    */
    filterRouter.push(`?${filterQueryString}`, { scroll: false });
    

  }, [filterPrices, filterCheckboxByPizzaTypes, filterCheckboxBySizes, selectedIngredients, filterRouter] );

  return (
    <div className={cn('', className)}>

      {/* Верхняя группа чекбоксов */}
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <FilterCheckboxGroup 
        title='Тип теста'
        name='pizzaTypes'
        className="mb-5"
        selectedFilterCheckbox={filterCheckboxByPizzaTypes}
        FilterCheckboxGroup={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
         
        ]}
        onClickCheckbox={toggleFilterCheckboxByPizzaTypes} 
      />

      <FilterCheckboxGroup 
        title='Размеры'
        name='sizes'
        className="mb-5"
        selectedFilterCheckbox={filterCheckboxBySizes}
        FilterCheckboxGroup={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
        onClickCheckbox={toggleFilterCheckboxBySizes}
      />

      {/* Фильтры цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={1000} value={String(filterPrices.priceFrom)} onChange={(e) => onChangeFilterPrice('priceFrom', +e.target.value)} />
          <Input type="number" placeholder="1000" min={100} max={1000} value={String(filterPrices.priceTo)} onChange={(e) => onChangeFilterPrice('priceTo', +e.target.value)} />
        </div>
        <RangeSlider 
          min={0} 
          max={1000} 
          step={10} 
          value={[filterPrices.priceFrom || 0, filterPrices.priceTo || 1000]} 
          onValueChange={([from, to]) => setFilterPrice({priceFrom: from, priceTo: to}) }
        />
      </div>

      {/* Фильтры группы чекбоксов ингридиентов */}
      <FilterCheckboxGroup 
        title='Ингридиенты'
        name='ingredients'
        className="mt-5"
        limit={6}
        defaultFilterCheckboxGroup={arrCheckboxes.slice(0, 6)}
        FilterCheckboxGroup={arrCheckboxes}
        loading={loading}
        onClickCheckbox={onAddFilterCheckboxID}
        onClearFilterCheckboxGroup={() => {
          onClearSelectedFilterByPizzaTypes();
          onClearSelectedFilterBySizes();
          onClearSelectedFilterByPrice();
          onClearSelectedFilterIngredients();
          }
        }
        selectedFilterCheckbox={selectedIngredients}
      />
    </div>
  );
}


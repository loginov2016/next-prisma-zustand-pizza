'use client';

import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { FilterCheckboxGroup } from './filter-checkbox-group';
import { useFilterIngredients } from '@/hooks/use-filter-ingredients';
import { useSet } from 'react-use';

interface IFiltersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  
}

interface IFilterPriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<IFiltersProps> = ({ className }) => {
  console.log('Сработал компонент Filters');
  const { ingredients, loading, selectedFilterCheckbox, onAddFilterCheckboxID } = useFilterIngredients();
  const [filterCheckboxBySizes, { toggle: toggleFilterCheckboxBySizes }] = useSet(new Set<string>([]));
  const [filterCheckboxByPizzaTypes, { toggle: toggleFilterCheckboxByPizzaTypes }] = useSet(new Set<string>([]));

  const [filterPrices, setFilterPrice] = useState<IFilterPriceProps>({
    priceFrom: 0,
    priceTo: 1000
  });

  const arrCheckboxes = ingredients.map( item => ({ text: item.name, value: String(item.id), }) );

  const onChangeFilterPrice = (prices: keyof IFilterPriceProps, value: number): void => {
    setFilterPrice({
      ...filterPrices,
      [prices]: value,
    })
  };

  return (
    <div className={cn('', className)}>

      {/* Верхние чекбоксы */}
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

      {/* Фильтр цен */}
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
          value={[filterPrices.priceFrom, filterPrices.priceTo]} 
          onValueChange={([from, to]) => setFilterPrice({priceFrom: from, priceTo: to}) }
        />
      </div>

      {/* Фильтры Ингридиентов */}
      <FilterCheckboxGroup 
        title='Ингридиенты'
        name='ingredients'
        className="mt-5"
        limit={6}
        defaultFilterCheckboxGroup={arrCheckboxes.slice(0, 6)}
        FilterCheckboxGroup={arrCheckboxes}
        loading={loading}
        onClickCheckbox={onAddFilterCheckboxID}
        selectedFilterCheckbox={selectedFilterCheckbox}
      />
    </div>
  );
}


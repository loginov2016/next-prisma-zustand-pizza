'use client';

import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { FilterCheckboxGroup } from './filter-checkbox-group';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';

interface IFiltersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  
}

export const Filters: React.FC<IFiltersProps> = ({ className }) => {
  console.log('Сработал компонент Filters');
  const { ingredients, loading, selectedFilterCheckboxID, onAddFilterCheckboxID } = useFilterIngredients();

  const arrCheckboxes = ingredients.map( item => ({ text: item.name, value: String(item.id), }) );

  return (
    <div className={cn('', className)}>
      {/* Верхние чекбоксы */}
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value='1' />
        <FilterCheckbox text="Новинки" value='2' />
      </div>
      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={1000} defaultValue={0} />
          <Input type="number" placeholder="1000" min={100} max={1000} />
        </div>
        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>
      {/* Ингридиенты */}
      <FilterCheckboxGroup 
        title='Ингридиенты'
        name='ingredients'
        className="mt-5"
        limit={6}
        defaultFilterCheckboxGroup={arrCheckboxes.slice(0, 6)}
        FilterCheckboxGroup={arrCheckboxes}
        loading={loading}
        onClickCheckbox={onAddFilterCheckboxID}
        selectedFilterCheckboxID={selectedFilterCheckboxID}
      />
    </div>
  );
}


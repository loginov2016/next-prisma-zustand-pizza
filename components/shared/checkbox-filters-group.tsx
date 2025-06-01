import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { log } from 'console';

type TItem = FilterChecboxProps;

interface ICheckboxFilterGroupProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  items: TItem[];
  defaultItems: TItem[];
  limit?: number;
  searchInputPlaceholder?: string;
  defaultValues?: string[];
  onChangeFilter?: (values: string[]) => void;
}

export const CheckboxFiltersGroup: React.FC<ICheckboxFilterGroupProps> = ({ 
    className, 
    title, 
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Поиск...',
    onChangeFilter,
    defaultValue, 
}) => {
  const [showAllCheckbox, setShowAllCheckbox] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState<string>('');

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const list = showAllCheckbox ? items.filter( item => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase()) ) : defaultItems.slice(0, limit);

  return (
    <div className={cn('', className)}>
      <p className="font-bold mb-3">{title}</p>
  
      {showAllCheckbox && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput} 
            placeholder={searchInputPlaceholder} 
            className='bg-gray-50 border-none' />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map( (item, index) => (
            <FilterCheckbox 
              key={index}
              text={item.text}
              value={item.value}
              endAdornment={item.endAdornment}
              checked={false}
              onCheckedChange={ ids => console.log(ids) }
            />
          )
        )}
      </div>
      {items.length > limit && (
        <div className={cn('', {['border-t border-t-neutral-100 mt-4']: showAllCheckbox})}>
          <button 
            onClick={() => setShowAllCheckbox(!showAllCheckbox)} 
            className='text-primary mt-3'
            >
            {showAllCheckbox ? 'Скрыть' : '+ Показать всё'}
          </button>
        </div>
      )}
    </div>
  );
}


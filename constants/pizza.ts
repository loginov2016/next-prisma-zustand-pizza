
export const mapPizzaSize = {
    20: 'Маленькая',
    30: 'Средняя',
    40: 'Большая',
} as const;

export const mapPizzaType = {
    1: 'традиционное',
    2: 'тонкое',
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map( ([value, name]) => ({
    name,
    value,
}) ); // pizzaSizes === [{name: 'Маленькая', value: '20'}, {name: 'Средняя', value: '30'}, {name: 'Большая', value: '40'} ];
export const pizzaTypes = Object.entries(mapPizzaType).map( ([value, name]) => ({
    name,
    value,
}) ); // pizzaTypes === [{name: 'традиционное', value: '1'}, {name: 'тонкое', value: '2'}];


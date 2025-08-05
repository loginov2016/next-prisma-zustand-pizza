import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSet } from "react-use";

interface IIngredients {
    ingredients: Ingredient[];
    loading: boolean;
    selectedIngredients: Set<string>;
    onAddFilterCheckboxID: (id: string) => void;
    onClearAllFilterCheckboxID: () => void;
    //setLoading: Dispatch<SetStateAction<boolean>>;
}

export const useFilterIngredients = (initialValue: string[] = []): IIngredients => {
    //console.log('Сработал хук useFilterIngredients');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [selectedIngredients, { toggle, clear }] = useSet(new Set<string>(initialValue));

    useEffect( () => {
        //console.log('Сработал callback useEffect хука useFilterIngredients');
        async function fetchIngredients() {
            try {
                setLoading(true);
                const ingredients = await Api.ingredients.getAll();
                setIngredients(ingredients);
                //console.log('Сработала ф-ия fetchIngredients!');
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
       fetchIngredients(); 
    }, []);

    return {ingredients, loading, selectedIngredients, onAddFilterCheckboxID: toggle, onClearAllFilterCheckboxID: clear }
}
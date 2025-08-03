import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSet } from "react-use";

interface IIngredients {
    ingredients: Ingredient[];
    loading: boolean;
    selectedFilterCheckbox: Set<string>;
    onAddFilterCheckboxID: (id: string) => void;
    //setLoading: Dispatch<SetStateAction<boolean>>;
}

export const useFilterIngredients = (): IIngredients => {
    console.log('Сработал хук useFilterIngredients');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [selectedFilterCheckbox, { toggle }] = useSet(new Set<string>([]));

    useEffect( () => {
        //console.log('Сработал callback useEffect хука useFilterIngredients');
        async function fetchIngredients() {
            try {
                setLoading(true);
                const ingredients = await Api.ingredients.getAll();
                setIngredients(ingredients);
                console.log('Сработала ф-ия fetchIngredients!');
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
       fetchIngredients(); 
    }, []);

    return {ingredients, loading, selectedFilterCheckbox, onAddFilterCheckboxID: toggle }
}
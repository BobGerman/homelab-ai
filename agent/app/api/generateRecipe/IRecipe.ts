export interface GeneratedRecipe {
    output: Recipe;
}

export interface Recipe {
  name: string
  description: string
  ingredients: Ingredient[]
  steps: string[]
}

export interface Ingredient {
  name: string
  amount: string
}
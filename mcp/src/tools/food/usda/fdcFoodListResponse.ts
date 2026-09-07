export type Root = Food[]

export interface Food {
    fdcId: number
    description: string
    dataType: string
    publicationDate: string
    brandOwner?: string
    gtinUpc?: string
    foodNutrients: FoodNutrient[]
    foodCode?: string
}

export interface FoodNutrient {
    number: string
    name: string
    amount: number
    unitName: string
    derivationCode?: string
    derivationDescription?: string
}

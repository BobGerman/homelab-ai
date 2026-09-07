export interface Root {
    discontinuedDate: string
    foodComponents: any[]
    foodAttributes: FoodAttribute[]
    foodPortions: any[]
    fdcId: number
    description: string
    publicationDate: string
    foodNutrients: FoodNutrient[]
    dataType: string
    foodClass: string
    modifiedDate: string
    availableDate: string
    brandOwner: string
    brandName: string
    dataSource: string
    brandedFoodCategory: string
    gtinUpc: string
    householdServingFullText: string
    ingredients: string
    marketCountry: string
    servingSize: number
    servingSizeUnit: string
    foodUpdateLog: FoodUpdateLog[]
    labelNutrients: LabelNutrients
}

export interface FoodAttribute {
    id: number
    value: number
    name: string
}

export interface FoodNutrient {
    type: string
    nutrient: Nutrient
    foodNutrientDerivation: FoodNutrientDerivation
    id: number
    amount: number
}

export interface Nutrient {
    id: number
    number: string
    name: string
    rank: number
    unitName: string
}

export interface FoodNutrientDerivation {
    id: number
    code: string
    description: string
}

export interface FoodUpdateLog {
    discontinuedDate: string
    foodAttributes: any[]
    fdcId: number
    description: string
    publicationDate: string
    dataType: string
    foodClass: string
    modifiedDate: string
    availableDate: string
    brandOwner: string
    brandName: string
    dataSource: string
    brandedFoodCategory: string
    gtinUpc: string
    householdServingFullText: string
    ingredients: string
    marketCountry: string
    servingSize: number
    servingSizeUnit: string
    subbrandName?: string
    packageWeight?: string
    notaSignificantSourceOf?: string
}

export interface LabelNutrients {
    fat: Fat
    saturatedFat: SaturatedFat
    transFat: TransFat
    cholesterol: Cholesterol
    sodium: Sodium
    carbohydrates: Carbohydrates
    fiber: Fiber
    sugars: Sugars
    protein: Protein
    calcium: Calcium
    iron: Iron
    calories: Calories
}

export interface Fat {
    value: number
}

export interface SaturatedFat {
    value: number
}

export interface TransFat {
    value: number
}

export interface Cholesterol {
    value: number
}

export interface Sodium {
    value: number
}

export interface Carbohydrates {
    value: number
}

export interface Fiber {
    value: number
}

export interface Sugars {
    value: number
}

export interface Protein {
    value: number
}

export interface Calcium {
    value: number
}

export interface Iron {
    value: number
}

export interface Calories {
    value: number
}

export interface Root {
  totalHits: number
  currentPage: number
  totalPages: number
  pageList: number[]
  foodSearchCriteria: FoodSearchCriteria
  foods: Food[]
  aggregations: Aggregations
}

export interface FoodSearchCriteria {
  query: string
  generalSearchInput: string
  pageNumber: number
  numberOfResultsPerPage: number
  pageSize: number
  requireAllWords: boolean
}

export interface Food {
  fdcId: number
  description: string
  dataType: string
  gtinUpc?: string
  publishedDate: string
  brandOwner?: string
  brandName?: string
  ingredients?: string
  marketCountry?: string
  foodCategory: string
  modifiedDate?: string
  dataSource?: string
  servingSizeUnit?: string
  servingSize?: number
  householdServingFullText?: string
  tradeChannels?: string[]
  allHighlightFields: string
  score: number
  microbes: any[]
  foodNutrients: FoodNutrient[]
  finalFoodInputFoods: FinalFoodInputFood[]
  foodMeasures: FoodMeasure[]
  foodAttributes: FoodAttribute[]
  foodAttributeTypes: FoodAttributeType[]
  foodVersionIds: any[]
  commonNames?: string
  additionalDescriptions?: string
  foodCode?: number
  foodCategoryId?: number
  subbrandName?: string
  packageWeight?: string
  shortDescription?: string
}

export interface FoodNutrient {
  nutrientId: number
  nutrientName: string
  nutrientNumber: string
  unitName: string
  derivationCode?: string
  derivationDescription?: string
  derivationId?: number
  value: number
  foodNutrientSourceId?: number
  foodNutrientSourceCode?: string
  foodNutrientSourceDescription?: string
  rank: number
  indentLevel: number
  foodNutrientId: number
  percentDailyValue?: number
}

export interface FinalFoodInputFood {
  foodDescription: string
  gramWeight: number
  id: number
  portionCode: string
  portionDescription: string
  unit: string
  rank: number
  retentionCode: number
  srCode: number
  value: number
}

export interface FoodMeasure {
  disseminationText: string
  gramWeight: number
  id: number
  modifier: string
  rank: number
  measureUnitAbbreviation: string
  measureUnitName: string
  measureUnitId: number
}

export interface FoodAttribute {
  value: string
  name?: string
  id: number
  sequenceNumber?: number
}

export interface FoodAttributeType {
  name: string
  description: string
  id: number
  foodAttributes: FoodAttribute2[]
}

export interface FoodAttribute2 {
  value: string
  name?: string
  id: number
  sequenceNumber?: number
}

export interface Aggregations {
  dataType: DataType
  nutrients: Nutrients
}

export interface DataType {
  Branded: number
  "Survey (FNDDS)": number
}

export interface Nutrients { }
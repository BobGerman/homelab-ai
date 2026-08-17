export interface Root {
    "@context": [string, Context]
    id: string
    type: string
    geometry: Geometry2
    properties: Properties
}

export interface Context {
    "@version": string
    wx: string
    s: string
    geo: string
    unit: string
    "@vocab": string
    geometry: Geometry
    city: string
    state: string
    distance: Distance
    bearing: Bearing
    value: Value
    unitCode: UnitCode
    forecastOffice: ForecastOffice
    forecastGridData: ForecastGridData
    publicZone: PublicZone
    county: County
}

export interface Geometry {
    "@id": string
    "@type": string
}

export interface Distance {
    "@id": string
    "@type": string
}

export interface Bearing {
    "@type": string
}

export interface Value {
    "@id": string
}

export interface UnitCode {
    "@id": string
    "@type": string
}

export interface ForecastOffice {
    "@type": string
}

export interface ForecastGridData {
    "@type": string
}

export interface PublicZone {
    "@type": string
}

export interface County {
    "@type": string
}

export interface Geometry2 {
    type: string
    coordinates: number[]
}

export interface Properties {
    "@id": string
    "@type": string
    cwa: string
    type: string
    forecastOffice: string
    gridId: string
    gridX: number
    gridY: number
    forecast: string
    forecastHourly: string
    forecastGridData: string
    observationStations: string
    relativeLocation: RelativeLocation
    forecastZone: string
    county: string
    fireWeatherZone: string
    timeZone: string
    radarStation: string
    astronomicalData: AstronomicalData
    nwr: Nwr
}

export interface RelativeLocation {
    type: string
    geometry: Geometry3
    properties: Properties2
}

export interface Geometry3 {
    type: string
    coordinates: number[]
}

export interface Properties2 {
    city: string
    state: string
    distance: Distance2
    bearing: Bearing2
}

export interface Distance2 {
    unitCode: string
    value: number
}

export interface Bearing2 {
    unitCode: string
    value: number
}

export interface AstronomicalData {
    sunrise: string
    sunset: string
    transit: string
    civilTwilightBegin: string
    civilTwilightEnd: string
    nauticalTwilightBegin: string
    nauticalTwilightEnd: string
    astronomicalTwilightBegin: string
    astronomicalTwilightEnd: string
}

export interface Nwr {
    transmitter: string
    sameCode: string
    areaBroadcast: string
    pointBroadcast: string
}
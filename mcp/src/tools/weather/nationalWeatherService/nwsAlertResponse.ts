export interface Root {
    "@context": [string, Context]
    type: string
    features: Feature[]
    title: string
    updated: string
    pagination: Pagination
}

export interface Context {
    "@version": string
    wx: string
    "@vocab": string
}

export interface Feature {
    id: string
    type: string
    geometry?: Geometry
    properties: Properties
}

export interface Geometry {
    type: string
    coordinates: number[][][]
}

export interface Properties {
    "@id": string
    "@type": string
    id: string
    areaDesc: string
    geocode: Geocode
    affectedZones: string[]
    references: Reference[]
    sent: string
    effective: string
    onset: string
    expires: string
    ends?: string
    status: string
    messageType: string
    category: string
    severity: string
    certainty: string
    urgency: string
    event: string
    sender: string
    senderName: string
    headline: string
    description: string
    instruction?: string
    response: string
    note?: string
    parameters: Parameters
    scope: string
    code: string
    language: string
    web: string
    eventCode: EventCode
    replacedBy?: string
    replacedAt?: string
}

export interface Geocode {
    SAME: string[]
    UGC: string[]
}

export interface Reference {
    "@id": string
    identifier: string
    sender: string
    sent: string
}

export interface Parameters {
    AWIPSidentifier: string[]
    WMOidentifier: string[]
    NWSheadline?: string[]
    BLOCKCHANNEL: string[]
    "EAS-ORG": string[]
    eventMotionDescription?: string[]
    maxWindGust?: string[]
    maxHailSize?: string[]
    VTEC?: string[]
    eventEndingTime?: string[]
    windThreat?: string[]
    hailThreat?: string[]
}

export interface EventCode {
    SAME: string[]
    NationalWeatherService: string[]
}

export interface Pagination {
    next: string
}

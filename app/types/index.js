// @flow 

export type Color = "W" | "R" | "U" | "B" | "G" | "C"
export type Rarity = "common" | "uncommon" | "rare" | "mythic"
export type CardKey = "arena_id" | "oracle_id" | "id" | "all_parts" | "card_faces" | "cmc" | "colors" | "color_identity" | "color_indicator" | "rarity" | "loyalty" | "mana_cost" | "name" | "oracle_text" | "power" | "toughness" | "type_line" | "types" | "flavor_text" | "set"
export type CardFaceKey = "color_indicator" | "colors" | "flavor_text" | "loyalty" | "mana_cost" | "name" | "oracle_text" | "power" | "toughness" | "type_line" | "types"

export type Card = {
    +id: string,
    +arena_id: number,
    +oracle_id: string,
    all_parts: [string],
    card_faces: [CardFace],
    cmc: number,
    colors: [Color],
    color_identity: [Color],
    color_indicator: [Color],
    +rarity: Rarity,
    mana_cost: string,
    +name: string,
    +type_line: string,
    +types: [string],
    oracle_text: string,
    +set_code: string,
    +set_name: string,
    flavor_text: string,
    power: number,
    toughness: number,
    loyalty: string
}

export type CardFace = {
    colors: [Color],
    color_indicator: [Color],
    mana_cost: string,
    +name: string,
    +type_line: string,
    +types: [string],
    oracle_text: string,
    flavor_text: string,
    power: number,
    toughness: number,
    loyalty: string
}

export type Filter = {[CardKey]: [AtomicFilter]}
export type AtomicFilter = {values: [any], comp: (any, any)=>boolean, key: CardKey}
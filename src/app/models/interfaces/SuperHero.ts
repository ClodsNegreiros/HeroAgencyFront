import { Superpower } from "./superpower";

export interface SuperHero {
    id?: number;
    name: string;
    heroName: string;
    birthDate: Date;
    height: number;
    weight: number;
    superpowers?: Superpower[];
    SuperHeroPowersIds?: number[];
}
import { Position as Pos } from './position';
import { Review } from './review';

// Restaurant entity
export class Restaurant {
    name: string;
    position: Pos;
    rate: number;
    type: string[];
    reviews: Review[];
}
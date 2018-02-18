import Bullet from '../abstract/bullet';
import { colours } from '../constants/constants';

export default class NineMM extends Bullet {
    constructor(drone, x, y, angle, velocity) {
        super(drone, x, y, 45, 1, angle, velocity, 3);
        this._colour = colours.orange;
    }
}
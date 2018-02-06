import { context, grid } from '../constants';

import Vector from '../service/vector';
import { deltaTime } from '../service/delta-time';

export default class Particle {
    constructor(id, x, y, speed, radius, angle) {
        this._id = id;
        this.radius = radius;
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.velocity.setLength(speed);
        this.velocity.setAngle(angle);
        this._remove = false;
        this.color = '#000';
    }

    get remove() {
        return this._remove;
    }

    get id() {
        return this._id;
    }

    update() {
        this.move();
    }

    move() {
        let distanceByDeltaTime = this.velocity.multiply(deltaTime.getTime());
        const gridX = Math.floor(this.position.x / grid.gridBlockSize);
        const gridY = Math.floor(this.position.y / grid.gridBlockSize);
        grid.removeParticle(this, gridX, gridY);
        this.position.addTo(distanceByDeltaTime);
        grid.addParticle(this, gridX, gridY);
    }

    removeParticle() {
        this._remove = true;
        grid.removeParticle(this);
    }

    draw() {
        context.beginPath();
        context.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            2 * Math.PI);
        context.strokeStyle = this.color;
        context.stroke();
    }
}
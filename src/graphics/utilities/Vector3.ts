
export class Vector3 {

    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    crossProduct(v3: Vector3) {
        return new Vector3(
            this.y * v3.z - v3.y * this.z,
            this.z * v3.x - v3.z * this.x,
            this.x * v3.y - v3.x * this.y
        );
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalize() {
        const m = this.magnitude();
        return new Vector3(this.x / m, this.y / m, this.z / m);
    }

    add(v3: Vector3) {
        return new Vector3(this.x + v3.x, this.y + v3.y, this.z + v3.z);
    }

    subtract(v3: Vector3) {
        return new Vector3(this.x - v3.x, this.y - v3.y, this.z - v3.z);
    }

    multiply(v3: Vector3) {
        return new Vector3(this.x * v3.x, this.y * v3.y, this.z * v3.z);
    }

    multiplyScalar(s: number) {
        return new Vector3(this.x * s, this.y * s, this.z * s);
    }
};

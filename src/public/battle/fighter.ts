export interface IFighter {
    name: string;
    power: number;
    health: number;
    setDamage: (damage: number) => string;
    hit: (enemy: IFighter, point: number) => string;
}

export class Fighter implements IFighter {
    name: string;
    power: number;
    health: number;

    constructor(name, power, health) {
        this.name = name;
        this.power = power;
        this.health = health;
    }

    setDamage(damage) {
        this.health = this.health - damage;
        return `hit!! ${this.name}'s health is ${this.health}`
    }

    hit(enemy, point) {
        let damage = point * this.power;
        return enemy.setDamage(damage);
    }
}

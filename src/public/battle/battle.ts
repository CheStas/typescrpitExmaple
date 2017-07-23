import {Fighter} from './fighter';
import {ImprovedFighter} from './improvedFighter';

export interface IBattle {
    initializeBattle: () => void;
}

export class Battle implements IBattle {
    constructor() {
        this.initializeBattle();
    }

    private _fight(fighter: Fighter, improvedFighter: ImprovedFighter, ...point): string {
        let damage;
        if (point.length === 1) {
            damage = point[0].split(' ');
        } else {
            damage = point;
        }

        damage.every( (item, i) => {
            if (improvedFighter.health > 0 && fighter.health > 0) {
                if (i%2 === 0) {

                    this._insertInfo(fighter.hit(improvedFighter, item))

                    if (improvedFighter.health <= 0) {
                        improvedFighter.health = 0;
                        this._insertInfo(`${improvedFighter.name} has died, ${fighter.name} has won!`)
                        return false;
                    }

                } else {
                    this._insertInfo(improvedFighter.doubleHit(fighter, item))


                    if (fighter.health <= 0) {
                        fighter.health = 0;
                        this._insertInfo(`${fighter.name} has died, ${improvedFighter.name} has won!`)
                        return false;
                    }

                }
            }
            return true;
        })
        return `result:
            ${fighter.name} has ${fighter.health}, ${improvedFighter.name} has ${improvedFighter.health}.
            ${fighter.health === improvedFighter.health ? `it's a draw!` : fighter.health > improvedFighter.health ?    fighter.name + ` has won` : improvedFighter.name + ` has won`}`;
    }

    initializeBattle() {
        const startButton = document.getElementById('start') as HTMLButtonElement;
        const fighterName = document.getElementById('fighter1-name') as HTMLButtonElement;
        const fighterPower = document.getElementById('fighter1-power') as HTMLButtonElement;
        const fighterHealth = document.getElementById('fighter1-health') as HTMLButtonElement;
        const fighterImprovedName = document.getElementById('fighter2-name') as HTMLButtonElement;
        const fighterImprovedPower = document.getElementById('fighter2-power') as HTMLButtonElement;
        const fighterImprovedHealth = document.getElementById('fighter2-health') as HTMLButtonElement;
        const damage = document.getElementById('damage') as HTMLButtonElement;

        startButton.addEventListener('click', () => {
            let fighter = new Fighter(fighterName.value, fighterPower.value, fighterHealth.value)
            let improvedFighter = new ImprovedFighter(fighterImprovedName.value,  fighterImprovedPower.value,  fighterImprovedHealth.value)
            this._insertInfo(this._fight(fighter, improvedFighter, damage.value))
        });
    }

    private _insertInfo(text:string): void {
        const result = document.getElementById('result') as HTMLButtonElement;
        let li = document.createElement('li')
        li.innerHTML = text;
        result.appendChild(li);
    }
}

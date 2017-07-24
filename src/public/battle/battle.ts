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
        const fighterName = document.getElementById('fighter1-name') as HTMLInputElement;
        const fighterPower = document.getElementById('fighter1-power') as HTMLInputElement;
        const fighterHealth = document.getElementById('fighter1-health') as HTMLInputElement;
        const fighterImprovedName = document.getElementById('fighter2-name') as HTMLInputElement;
        const fighterImprovedPower = document.getElementById('fighter2-power') as HTMLInputElement;
        const fighterImprovedHealth = document.getElementById('fighter2-health') as HTMLInputElement;
        const damage = document.getElementById('damage') as HTMLInputElement;

        startButton.addEventListener('click', () => {

            if (fighterName.value.length !== 0 && fighterPower.value.length !== 0 && fighterHealth.value.length !== 0 && fighterImprovedName.value.length !== 0 && fighterImprovedPower.value.length !== 0 && fighterImprovedHealth.value.length !== 0 && damage.value.length !== 0) {

                let fighter = new Fighter(fighterName.value, fighterPower.value, fighterHealth.value)
                let improvedFighter = new ImprovedFighter(fighterImprovedName.value,  fighterImprovedPower.value,  fighterImprovedHealth.value)

                this._insertInfo(this._fight(fighter, improvedFighter, damage.value))
            } else {
                alert('fill in all the filed')
            }
        });
    }

    private _insertInfo(text:string): void {
        const result = document.getElementById('result') as HTMLElement;
        let li = document.createElement('li')
        li.innerHTML = text;
        result.appendChild(li);
    }
}

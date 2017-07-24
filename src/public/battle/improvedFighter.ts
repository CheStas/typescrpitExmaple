import {Fighter, IFighter} from './fighter'

export class ImprovedFighter extends Fighter {
    doubleHit(enemy: IFighter, point: number) {
        return super.hit(enemy, point*2)
    }
}

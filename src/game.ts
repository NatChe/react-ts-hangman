/**
 * Credit goes to Axel Cateland https://github.com/cateland for this game setup
 *
 * @module Game
 */
import { Monad2 } from 'fp-ts/lib/Monad';
import { pipeable } from 'fp-ts/lib/pipeable';

declare module 'fp-ts/lib/HKT' {
    interface URItoKind2<E, A> {
        GameState: GameState<E, A>;
    }
}

/**
 * @hidden
 */
export const URI = 'GameState';

/**
 * @hidden
 */
export type URI = typeof URI;

export interface NotStarted {
    readonly _tag: 'NotStarted';
}

export interface Ongoing<GameData> {
    readonly _tag: 'Ongoing';
    readonly gameData: GameData;
}

export interface Win<Score> {
    readonly _tag: 'Win';
    readonly score: Score;
}

export interface Lose<Score> {
    readonly _tag: 'Lose';
    readonly score: Score;
}

export type GameState<Score, GameData> =
    | NotStarted
    | Ongoing<GameData>
    | Win<Score>
    | Lose<Score>;

export const notStarted: GameState<never, never> = { _tag: 'NotStarted' };

export function ongoing<E = never, A = never>(gameData: A): GameState<E, A> {
    return { _tag: 'Ongoing', gameData };
}

export function win<E = never, A = never>(score: E): GameState<E, A> {
    return { _tag: 'Win', score };
}

export function lose<E = never, A = never>(score: E): GameState<E, A> {
    return { _tag: 'Lose', score };
}

export function isNotStarted<E, A>(
    monadA: GameState<E, A>
): monadA is NotStarted {
    return monadA._tag === 'NotStarted';
}
export function isOngoing<E, A>(monadA: GameState<E, A>): monadA is Ongoing<A> {
    return monadA._tag === 'Ongoing';
}
export function isWin<E, A>(monadA: GameState<E, A>): monadA is Win<E> {
    return monadA._tag === 'Win';
}
export function isLose<E, A>(monadA: GameState<E, A>): monadA is Lose<E> {
    return monadA._tag === 'Lose';
}

export const fold = <E, A, B>(
    onNotStarted: () => B,
    onOngoing: (gameData: A) => B,
    onWin: (score: E) => B,
    onLose: (score: E) => B
) => (monadA: GameState<E, A>): B => {
    switch (monadA._tag) {
        case 'NotStarted':
            return onNotStarted();

        case 'Ongoing':
            return onOngoing(monadA.gameData);

        case 'Win':
            return onWin(monadA.score);

        case 'Lose':
            return onLose(monadA.score);
    }
};

export function start<GameData>(gameData: GameData) {
    return ongoing(gameData);
}

export const gameState: Monad2<URI> = {
    URI,
    of: ongoing,
    /**
     * apply MonadA value to MonadAtoB function if both are Success
     * to procude a MonadB
     *
     * following table illustrate the ap combinations
     *
     * | Monad(a -> b)      | Monad(a)      | Result            |
     * | ------------------ | ------------- | ----------------- |
     * | notStarted         | notStarted    | notStarted        |
     * | onGoing            | onGoing       | onGoing           |
     * | onGoing            | lose          | lose              |
     * | onGoing            | win           | win               |
     * | lose               | lose          | lose              |
     * | win                | win           | win               |
     */
    ap: (monadAtoB, monadA) => {
        switch (monadA._tag) {
            case 'NotStarted':
                return isNotStarted(monadAtoB) ? monadAtoB : monadA;

            case 'Ongoing':
                if (isOngoing(monadAtoB)) {
                    return ongoing(monadAtoB.gameData(monadA.gameData));
                }
                return monadAtoB;

            case 'Win':
                return isWin(monadAtoB) ? monadAtoB : monadA;

            case 'Lose':
                return isLose(monadAtoB) ? monadAtoB : monadA;
        }
    },
    map: (monadA, func) => {
        return isOngoing(monadA) ? ongoing(func(monadA.gameData)) : monadA;
    },
    chain: (monadA, func) =>
        isOngoing(monadA) ? func(monadA.gameData) : monadA,
};

const { ap, map, chain } = pipeable(gameState);

export { ap, map, chain };

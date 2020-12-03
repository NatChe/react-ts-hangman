import { Letter } from './Letter';

export const HIDDEN_VALUE = '_';

export type Word = {
    value: string;
    hiddenValue: string;
};

export function isGuessed(word: Word): boolean {
    return word.hiddenValue.indexOf(HIDDEN_VALUE) < 0;
}

export function createWord(word: string): Word {
    return {
        value: word,
        hiddenValue: new Array(word.length).fill('_').join(''),
    };
}

export function hasLetter(word: Word, letter: Letter): boolean {
    return word.value.indexOf(letter.value) >= 0;
}

export function updateGuessedLetterInWord(word: Word, letter: Letter): Word {
    const newHiddenValue = word.hiddenValue
        .split('')
        .map((char: string, index: number) =>
            word.value[index] === letter.value ? letter.value : char
        )
        .join('');

    return { ...word, hiddenValue: newHiddenValue };
}

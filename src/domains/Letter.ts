export type Letter = {
    value: string;
    isDisabled: boolean;
};

export function generateAlphabet(): Array<Letter> {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => ({
        value: letter,
        isDisabled: false,
    }));
}

export function disableLetterInAlphabet(
    alphabet: Array<Letter>,
    index: number,
    letter: Letter
): Array<Letter> {
    return alphabet.map(el => {
        return el.value === letter.value ? { ...el, isDisabled: true } : el;
    });
}

import React from 'react';
import { Word } from '../domains/Word';

type WordProps = {
    word: Word;
};

export const WordToGuess: React.FunctionComponent<WordProps> = ({ word }) => {
    return (
        <div>
            {word.hiddenValue.split('').map((letter: string, idx: number) => (
                <p key={`guess-${letter}-${idx}`} className="hangman__char">
                    {letter}
                </p>
            ))}
        </div>
    );
};

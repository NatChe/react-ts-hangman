import React from 'react';
import { Letter } from '../domains/Letter';

type AlphabetListProps = {
    alphabet: Array<Letter>;
    onClick: Function;
};

export const Alphabet: React.FunctionComponent<AlphabetListProps> = ({
    alphabet,
    onClick,
}) => {
    return (
        <div className="c-alphabet">
            {alphabet.map((letter, index) => (
                <button
                    className={`${
                        letter.isDisabled ? 'nes-btn is-disabled' : 'nes-btn'
                    }`}
                    key={letter.value}
                    onClick={onClick('letterSent', { index, letter })}
                    disabled={letter.isDisabled}
                >
                    {letter.value}
                </button>
            ))}
        </div>
    );
};

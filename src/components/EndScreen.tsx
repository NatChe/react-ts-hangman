import React from 'react';
import {Image} from "./Image";

type StartScreenProps = {
    scoreData: { score: number, word: string };
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const EndScreen: React.FunctionComponent<StartScreenProps> = ({
                                                                           scoreData, onClick,
                                                                       }) => {
    const { score, word } = scoreData;

    const hasWon = score > 0;

    return (
        <div className="container hangman__background">
            <div className="nes-badge">
                <span className="is-dark"> {hasWon ? `Congrats!` : `Lost :(`} </span>
            </div>
            <div className="layout__row">
                {hasWon
                    ? <i className="nes-icon trophy is-large hangman__trophy"/>
                    : <Image count={7}/>
                }
            </div>
            {!hasWon && <span>The word was <strong>{`${word}`}</strong></span>}
            <span>{`score: ${score}`}</span>
            <button
                type="button"
                className="nes-btn is-primary-hangman"
                onClick={onClick}
            >
                Replay !
            </button>
        </div>
    );
};
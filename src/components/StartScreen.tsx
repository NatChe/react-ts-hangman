import React from 'react';

type StartScreenProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const StartScreen: React.FunctionComponent<StartScreenProps> = ({
    onClick,
}) => {
    return (
        <div className="container hangman__background">
            <div className="nes-badge">
                <span className="is-dark">Hangman</span>
            </div>
            <i className="nes-octocat animate hangman__octocat" />
            <button
                type="button"
                className="nes-btn is-primary-hangman"
                onClick={onClick}
            >
                Start !
            </button>
        </div>
    );
};

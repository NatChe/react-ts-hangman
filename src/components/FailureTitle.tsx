import React from 'react';

type FailureTitleProps = {
    count: number;
};

export const FailureTitle: React.FunctionComponent<FailureTitleProps> = ({
    count,
}) => {
    return (
        <p className="hangman__title nes-badge">
            <span className="is-dark">
                {count > 1 ? 'Failures ' : 'Failure '}: {count}
            </span>
        </p>
    );
};

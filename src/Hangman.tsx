import React, { useState } from 'react';
import { flow, pipe } from 'fp-ts/lib/function';
import {
    notStarted,
    fold,
    start,
    GameState,
    map,
    chain,
    ongoing,
    win,
    lose,
} from './game';
import {
    disableLetterInAlphabet,
    generateAlphabet,
    Letter,
} from './domains/Letter';
import {
    hasLetter,
    isGuessed,
    updateGuessedLetterInWord,
    Word,
} from './domains/Word';
import { Image } from './components/Image';
import { WordToGuess } from './components/WordToGuess';
import { FailureTitle } from './components/FailureTitle';
import { Alphabet } from './components/Alphabet';
import { StartScreen } from './components/StartScreen';
import { pickWord } from './domains/Hangman';
import {EndScreen} from "./components/EndScreen";

type GameData = {
    alphabet: Array<Letter>;
    failuresCount: number;
    currentWord: Word;
    playedWords: Array<string>;
};

type Score = number;

type Message = 'letterSent';

function updateGameData(msg: Message, payload: any) {
    return (gameData: GameData) => {
        switch (msg) {
            case 'letterSent':
                if (payload.letter.isDisabled) {
                    return gameData;
                }

                return {
                    ...gameData,
                    alphabet: disableLetterInAlphabet(
                        gameData.alphabet,
                        payload.index,
                        payload.letter
                    ),
                    currentWord: updateGuessedLetterInWord(
                        gameData.currentWord,
                        payload.letter
                    ),
                    failuresCount: !hasLetter(
                        gameData.currentWord,
                        payload.letter
                    )
                        ? gameData.failuresCount + 1
                        : gameData.failuresCount,
                };
            default:
                return gameData;
        }
    };
}

function checkGameState(gameData: GameData) {
    if (gameData.failuresCount >= 7 && !isGuessed(gameData.currentWord)) {
        return lose(0);
    } else if (isGuessed(gameData.currentWord)) {
        return win(10);
    }

    return ongoing(gameData);
}

export default function Hangman() {
    const [gameState, updateGameState] = useState<GameState<Score, GameData>>(
        notStarted
    );

    function startGame() {
        updateGameState(
            start({
                alphabet: generateAlphabet(),
                failuresCount: 0,
                currentWord: pickWord(),
                playedWords: [],
            })
        );
    }

    function updateGame(msg: Message, payload: any) {
        return function() {
            updateGameState(
                flow(
                    map(updateGameData(msg, payload)),
                    chain(checkGameState)
                )
            );
        };
    }

    return pipe(
        gameState,
        fold(
            () => <StartScreen onClick={startGame} />,
            gameData => (
                <div className="hangman__container hangman__background">
                    <Image count={gameData.failuresCount} />
                    <div className="hangman__guess">
                        <WordToGuess word={gameData.currentWord} />
                        <FailureTitle count={gameData.failuresCount} />
                    </div>
                    <Alphabet
                        alphabet={gameData.alphabet}
                        onClick={updateGame}
                    />
                </div>
            ),
            score => (
                <EndScreen score={score} onClick={startGame} />
            ),
            score => (
                <EndScreen score={score} onClick={startGame} />
            )
        )
    );
}

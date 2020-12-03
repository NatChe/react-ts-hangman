import { createWord, Word } from './Word';
import wordlist from '../wordlist';

export function pickWord(): Word {
    const randomIndex = Math.floor(Math.random() * wordlist.length);

    return createWord(wordlist[randomIndex]);
}

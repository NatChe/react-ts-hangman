import React from 'react';
import ReactDom from 'react-dom';

import Hangman from './Hangman';
import 'nes.css/css/nes.min.css';
import './styles.css';

function App(): JSX.Element {
    return <Hangman />;
}

ReactDom.render(<App />, document.getElementById('root'));

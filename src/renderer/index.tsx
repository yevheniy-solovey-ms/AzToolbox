import React from 'react';
import { render } from 'react-dom';
import { mergeStyles } from '@fluentui/react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import App from './App';

mergeStyles({
  ':global(body,html,#root)': {
    margin: 0,
    padding: 0,
    height: '100vh',
  },
});

initializeIcons();

render(<App />, document.getElementById('root'));

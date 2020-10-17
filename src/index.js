import React from 'react';
import ReactDOM from 'react-dom';

import Checkout from './Checkout';

document.documentElement.style = `height: ${window.innerHeight}px`;

ReactDOM.render(<Checkout />, document.getElementById('root'));

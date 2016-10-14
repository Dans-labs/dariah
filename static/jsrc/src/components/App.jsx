import React, { PropTypes } from 'react';
import ContribsContainer from './ContribsContainer.jsx';

const subtract = 100;

const App = () => (
  <ContribsContainer winHeight={window.innerHeight - subtract}/>
);

export default App;

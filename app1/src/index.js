import React from 'react';
import SharedComponent from 'app2/App';
import SharedComponent1 from 'app3/App';

const App = () => (
  <div>
    <h1>app1</h1>
    <SharedComponent />
    <SharedComponent1 />
  </div>
);

export default App;
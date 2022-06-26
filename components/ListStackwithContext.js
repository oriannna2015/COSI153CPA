import React from "react";
import ValueProvider from './ValueContext';
import ListStack from './ListStack'

const App = () => {
  const data = {name:"none", email:"none@none.com",secret:""}

  return (
    <ValueProvider value={data}>
        <ListStack />
    </ValueProvider>
  )
}

export default App;

import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import '../css/media-queries.css';
import Body from './Body';
import Footer from './Footer';
export const AppContext = React.createContext();

const App = () => {
  const [state, setState] = useState({
    navigationVisible: true
  })
  const toggleLeftNavigationVisibility = () => {
    setState({
      navigationVisible: !state.navigationVisible
    })
  }
  return (
    <AppContext.Provider value={{
      toggleLeftNavigationVisibility: toggleLeftNavigationVisibility,
      navigationVisible: state.navigationVisible
    }}>
      <div className='App flex flex-column pos-relative' id='App'>
        <Header />
        <Body/>
        <Footer/>
      </div>
    </AppContext.Provider>
  );
}
export default App;
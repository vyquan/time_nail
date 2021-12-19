import React, { Suspense } from 'react';
import ProgressLoading from './components/ProgressLoading';
import './App.less';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RootRouter } from './Routes';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<ProgressLoading />}>
          <RootRouter />
      </Suspense>
    </div>
  );
}

export default App;

import React from "react";
import Header from './components/Header';
import './styles/styles.css';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <h1>test</h1>
      </div>
      <div className="logo"></div>
      <hr />
      <pre />
      <div className="box">
        <h2>Less</h2>
      </div>

      <div className="card">
        <h2>Sass</h2>
      </div>
    </React.Fragment>
  );
};

export default App;

import React from 'react';
import './styles/style.css';
import { Table } from './components/Table';
import { ControlButtons } from './components/ControlButtons';

function App() {
  return (
    <div className="container">
      <ControlButtons />
      <Table />
    </div>
  );
}

export default App;

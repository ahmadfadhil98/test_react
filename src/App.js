import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import Todo from './component/Todo';

function App() {
  const storageKey = 'TODO_KEY';
  let activityList;
  return (
    <Todo storageKey={storageKey}
      activityList={activityList}
    />
  );
}

export default App;

import './App.css';
import TodoList from './TodoList';
import DoneList from './DoneList';
import { useState } from 'react';

function App() {
  let todoCnt = 3;
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, text: '밥먹기', done: false },
    { id: 2, text: '물마시기', done: false },
  ]);
  const [dones, setDones] = useState([{ id: 3, text: '숨쉬기', done: true }]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setInputValue(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    todoCnt++;
    setTodos([...todos, { id: todoCnt, text: inputValue, done: false }]);
    setInputValue('');
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="할 일 추가하기"
          maxlength={20}
          onChange={onChange}
        />
        <input type="submit" value="➕" />
      </form>
      <TodoList todos={todos} />
      <DoneList dones={dones} />
    </div>
  );
}

export default App;

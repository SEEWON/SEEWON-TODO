import './App.css';
import TodoList from './TodoList';
import { useState } from 'react';

function App() {
  let todoCnt = 3;
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, text: '밥먹기', isDone: false },
    { id: 3, text: '물마시기', isDone: false },
  ]);
  const [dones, setDones] = useState([
    { id: 2, text: '숨쉬기', isDone: true },
    { id: 4, text: '잠자기', isDone: true },
  ]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setInputValue(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    todoCnt++;
    setTodos([...todos, { id: todoCnt, text: inputValue, isDone: false }]);
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
      <TodoList todos={dones} />
    </div>
  );
}

export default App;

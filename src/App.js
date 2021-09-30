import './App.css';
import TodoList from './TodoList';
import { React, useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [dones, setDones] = useState([]);
  const [todoCnt, setTodoCnt] = useState(0);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setInputValue(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setTodoCnt(todoCnt + 1);
    setTodos([...todos, { id: todoCnt, text: inputValue, isDone: false }]);
    setInputValue('');
  };

  //Todo에서 Done으로 해당 Item 옮기기
  const onToggleDone = (id) => {
    const obj = todos.filter((todo) => todo.id === id)[0];
    setDones([...dones, { ...obj, isDone: !obj.isDone }]); //isDone값 toggle 후 Done에 추가
    setTodos(todos.filter((todo) => todo.id !== id)); //Todo에서 삭제
  };

  //Done에서 Todo로 해당 Item 옮기기
  const onToggleUnDo = (id) => {
    const obj = dones.filter((done) => done.id === id)[0];
    setTodos([...todos, { ...obj, isDone: !obj.isDone }]); //isDone값 toggle 후 Todo에 추가
    setDones(dones.filter((done) => done.id !== id)); //Done에서 삭제
  };

  //Item 삭제하기
  const onRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const onRemoveDone = (id) => {
    setDones(dones.filter((done) => done.id !== id));
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={inputValue}
          placeholder="할 일 추가하기"
          maxlength={20}
          onChange={onChange}
        />
        <input type="submit" value="➕" />
      </form>
      <TodoList todos={todos} onToggle={onToggleDone} onRemove={onRemoveTodo} />
      <TodoList todos={dones} onToggle={onToggleUnDo} onRemove={onRemoveDone} />
    </div>
  );
}

export default App;

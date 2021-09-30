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

  //Todo에서 Done으로 해당 Item 옮기기
  const onToggleDone = (id) => {
    let obj = todos.filter((todo) => todo.id === id)[0];
    setDones([...dones, { ...obj, isDone: !obj.isDone }]); //isDone값 toggle 후 Done에 추가
    setTodos(todos.filter((todo) => todo.id !== id)); //Todo에서 삭제
  };

  //Done에서 Todo로 해당 Item 옮기기
  const onToggleUnDo = (id) => {
    let obj = dones.filter((done) => done.id === id)[0];
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

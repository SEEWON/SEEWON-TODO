import './App.css';
import TodoList from './TodoList';
import { React, useEffect, useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
  padding-left: 40px;
  padding-right: 40px;
  border: 1px solid gray;
  border-radius: 1rem;
  width: 300px;
  height: 500px;
  background-color: #ffffff;
  position: absolute;
`;

//제목, input 부분
const TodoHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InputForm = styled.div`
  width: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
  .submit {
    border: none;
    background-color: transparent;
    &:hover {
      cursor: pointer;
      transform: scale(1.7);
    }
  }
`;

const Title = styled.div`
  border-top: 1px solid gray;
  width: 380px;
  height: 30px;
  font-size: large;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fefbf3;
`;

//Todo List 부분
const TodoListContainer = styled.div`
  border-top: 1px dashed gray;
  width: 380px;
  height: 150px;
  overflow: auto;
  display: flex;
  justify-content: center;
`;

//Done List 부분
const DoneListContainer = styled.div`
  border-top: 1px dashed gray;
  width: 380px;
  height: 150px;
  overflow: auto;
  display: flex;
  justify-content: center;
`;

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(
    () => JSON.parse(window.localStorage.getItem('todos')) || []
  );
  const [dones, setDones] = useState(
    () => JSON.parse(window.localStorage.getItem('dones')) || []
  );
  const [todoCnt, setTodoCnt] = useState(
    () => JSON.parse(window.localStorage.getItem('count')) || 0
  );

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    window.localStorage.setItem('dones', JSON.stringify(dones));
  }, [dones]);
  useEffect(() => {
    window.localStorage.setItem('count', JSON.stringify(todoCnt));
  }, [todoCnt]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setInputValue(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (inputValue === '') {
      alert('아무것도 입력하지 않았습니다.');
      return false;
    }
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
      <Box>
        <TodoHeader>
          <h1>오늘 할 일</h1>
          <InputForm>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={inputValue}
                placeholder="할 일 추가하기"
                maxlength={20}
                onChange={onChange}
              />
              <input className="submit" type="submit" value="➕" />
            </form>
          </InputForm>
        </TodoHeader>
        <Title>📝To Do🤔 ({todos.length})</Title>
        <TodoListContainer>
          <TodoList
            todos={todos}
            onToggle={onToggleDone}
            onRemove={onRemoveTodo}
          />
        </TodoListContainer>
        <Title>✨Done🥳 ({dones.length})</Title>
        <DoneListContainer>
          <TodoList
            todos={dones}
            onToggle={onToggleUnDo}
            onRemove={onRemoveDone}
          />
        </DoneListContainer>
      </Box>
    </div>
  );
};

export default App;

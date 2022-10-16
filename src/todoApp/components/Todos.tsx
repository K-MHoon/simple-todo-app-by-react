import { useState, useRef } from 'react';
import TodoFooter from './TodoFooter';
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { Todo } from '../App';

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const nextId = useRef(1);
  const onInsert = (text: string) => {
    const todo = {
      id: nextId.current,
      text,
      done: false,
    };

    setTodos((todos) => todos.concat(todo));
    nextId.current += 1;
  };
  const onRemove = (id: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };
  const onClearAll = () => {
    setTodos(() => []);
  };
  const onToggle = (id: number) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  return (
    <div>
      <TodoHeader />
      <TodoInput onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      <TodoFooter onClearAll={onClearAll} />
    </div>
  );
};

export default Todos;

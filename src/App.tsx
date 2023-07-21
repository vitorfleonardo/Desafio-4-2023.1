import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import PlusButton from "./assets/plus.png";
import Task from "./components/Task";
import { TodoType } from "./utils/models";

const columns = {
  incomplete: "incomplete",
  completed: "completed",
  progress: "progress",
};

type Column = typeof columns;
type ColumnType = keyof Column;

function App() {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const localData = localStorage.getItem("todos");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const draggedTodoItem = useRef<any>(null);

  const handleAddTodoIncomplete = () => {
    const todoPayload: TodoType = {
      id: uuidv4(),
      title: "",
      description: "",
      assigned: "",
      deadline: "",
      column: "incomplete",
      sortIndex: todos[todos.length + 1]?.sortIndex || todos.length + 1,
    };

    setTodos([...todos, todoPayload]);
  };

  const handleAddTodoProgress = () => {
    const todoPayload: TodoType = {
      id: uuidv4(),
      title: "",
      description: "",
      assigned: "",
      deadline: "",
      column: "progress",
      sortIndex: todos[todos.length + 1]?.sortIndex || todos.length + 1,
    };

    setTodos([...todos, todoPayload]);
  };

  const handleAddTodoCompleted = () => {
    const todoPayload: TodoType = {
      id: uuidv4(),
      title: "",
      description: "",
      assigned: "",
      deadline: "",
      column: "completed",
      sortIndex: todos[todos.length + 1]?.sortIndex || todos.length + 1,
    };

    setTodos([...todos, todoPayload]);
  };

  const handleColumnDrop = (column: ColumnType) => {
    const index = todos.findIndex(
      (todo) => todo.id === draggedTodoItem.current
    );
    const tempTodos = [...todos];
    tempTodos[index].column = column;
    setTodos(tempTodos);
  };

  const handleDelete = (index) => {
    const newList = [...todos];
    newList.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(todos));
    setTodos(newList);
  };

  return (
    <>
      <div id="container">
        <div className="column">
          <h1>A Fazer</h1>
          <div
            className="content"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleColumnDrop("incomplete")}
          >
            {todos
              .filter((todo) => todo.column === "incomplete")
              .map((todo, index) => {
                return (
                  <div
                    key={todo.id}
                    draggable
                    onDragStart={() => (draggedTodoItem.current = todo.id)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <Task handleDelete={handleDelete} todo={todo} />
                  </div>
                );
              })}
            <button onClick={handleAddTodoIncomplete}>
              <img src={PlusButton} />
            </button>
          </div>
        </div>
        <div className="column">
          <h1>Em andamento</h1>
          <div
            className="content"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleColumnDrop("progress")}
          >
            {todos
              .filter((todo) => todo.column === "progress")
              .map((todo) => {
                return (
                  <div
                    key={todo.id}
                    draggable
                    onDragStart={() => (draggedTodoItem.current = todo.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleColumnDrop("progress")}
                  >
                    <Task handleDelete={handleDelete} />
                  </div>
                );
              })}
            <button onClick={handleAddTodoProgress}>
              <img src={PlusButton} />
            </button>
          </div>
        </div>
        <div className="column3">
          <h1>Concluído</h1>
          <div
            className="content"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleColumnDrop("completed")}
          >
            {todos
              .filter((todo) => todo.column === "completed")
              .map((todo) => {
                return (
                  <div
                    key={todo.id}
                    draggable
                    onDragStart={() => (draggedTodoItem.current = todo.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleColumnDrop("completed")}
                  >
                    <Task handleDelete={handleDelete} />
                  </div>
                );
              })}
            <button onClick={handleAddTodoCompleted}>
              <img src={PlusButton} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

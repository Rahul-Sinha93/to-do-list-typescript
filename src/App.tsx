import React, {FC, useState, ChangeEvent } from 'react';
import './App.css';
import ITask from './Interfaces'
import TodoTask from './components/TodoTask';


const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event : ChangeEvent<HTMLInputElement>): void => {
      if(event.target.name === "task"){
        setTask(event.target.value)
      }else{
        setDeadline(Number(event.target.value))
      }
  }

  const addTask = (): void => {
    if(task.length !== 0 && deadline > 0){

      const newTask = { taskName: task, deadline: deadline };
      setTodoList([...todoList, newTask]);
      setTask("");
      setDeadline(0);
    }
  };

  const completeTask = (taskNameToDelete: string): void => {
      setTodoList( todoList.filter((task)=> task.taskName !== taskNameToDelete));
  }

  window.addEventListener('keypress' , (event)=>{
    if(event.key === 'Enter'){
      addTask();
    }
  })


  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Start adding your tasks..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number)=> {
          return <TodoTask key={key} task={task} completeTask={completeTask} />
        })}
      </div>
    </div>
  );
}

export default App;

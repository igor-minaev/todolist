import React from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';



function App() {
    const todoListTitle_1 = 'What to learn'
    const todoListTitle_2 = 'What to buy'

    const tasks_1: TaskType[] = [
        {id: crypto.randomUUID(), title: 'HTML', isDone: true},
        {id: crypto.randomUUID(), title: 'CSS', isDone: true},
        {id: crypto.randomUUID(), title: 'REACT', isDone: false},
        {id: crypto.randomUUID(), title: 'JS', isDone: true},
        {id: crypto.randomUUID(), title: 'REDUX', isDone: false}
    ]
    const tasks_2: TaskType[] = [
        {id: crypto.randomUUID(), title: 'Bread', isDone: true},
        {id: crypto.randomUUID(), title: 'Milk', isDone: true},
        {id: crypto.randomUUID(), title: 'Potato', isDone: false},
        {id: crypto.randomUUID(), title: 'Cheese', isDone: true},
        {id: crypto.randomUUID(), title: 'Meat', isDone: false}
    ]

    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks_1}/>
            <TodoList title={todoListTitle_2} tasks={tasks_2}/>
        </div>
    );
}

export default App;

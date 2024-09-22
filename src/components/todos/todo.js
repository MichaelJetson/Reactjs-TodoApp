import React, { useEffect, useState } from "react";
import { ToDoAppContainer } from "./index.styles";
import sampleData from './todolist.json';
import { addTask, deleteTask, getFilteredTasks, markTaskAsCompleted } from "./todoFunctions";

// Main ToDoApp component
export const ToDoApp = () => {
    // State variables for the input value, the todo data, the filtered todo list, and the current tab
    const [inputValue, setInputValue] = useState('');
    const [todoData, setToDoData] = useState(sampleData);
    const [todoList, setToDoList] = useState(todoData);
    const [tab, setTab] = useState('all');

    // Handler for the input change event
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Effect hook to update the todo list when the tab or the todo data changes
    useEffect(() => {
        getFilteredTasks(todoData, setToDoList, tab);
    }, [tab, todoData]);

    return (
        <ToDoAppContainer className="max-w-[500px] bg-white rounded-lg py-7">
            <h1 className="text-center text-2xl font-bold mb-4">To Do App</h1>
            <div className="task-input flex justify-between px-6 h-7">
                {/* Input field for adding a new task */}
                <input onChange={handleInputChange} type="text" placeholder="Add a new task" className="w-[280px] border border-gray-400 rounded mr-4 pl-2 focus:outline-none" />
                {/* Button for adding the new task */}
                <button
                    onClick={() => addTask(todoData, setToDoData, inputValue)}
                    className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded ${!inputValue.trim() ? 'cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    disabled={!inputValue.trim()}>
                    Add
                </button>
            </div>
            {/* Filter buttons for switching between tabs */}
            <div className="filters flex justify-center p-2 mt-3 w-full border-b border-solid border-black">
                <button 
                    id="all" 
                    onClick={()=>setTab('all')} 
                    className={`mr-6 cursor-pointer ${tab === 'all' ? 'text-blue-500' : ''}`}>All</button>
                <button 
                    id="pending" 
                    onClick={()=>setTab('pending')} 
                    className={`mr-6 cursor-pointer ${tab === 'pending' ? 'text-blue-500' : ''}`}>Pending</button>
                <button 
                    id="completed" 
                    onClick={()=>setTab('completed')} 
                    className={`cursor-pointer ${tab === 'completed' ? 'text-blue-500' : ''}`}>Completed</button>
            </div>

            {/* List of tasks */}
            <ul className="task-box h-[280px] overflow-y-auto">
                {todoList.map((todo, index) => {
                    return (
                        <li className="task">
                            {/* Label and button for each task */}
                            <label htmlFor={todo.id} className="flex p-2 items-center justify-between border-b border-gray-300">
                                <div onClick={()=>{markTaskAsCompleted(todoData, setToDoData, todo.id)}} className="flex px-4 cursor-pointer">
                                    {/* <input type="checkbox" id={todo.id} className="mr-2 flex items-center"/> */}
                                    <p className={`ml-2 flex items-center ${todo.completed ? 'line-through' : ''}`}>{todo.item}</p>
                                </div>
                                {/* Button for deleting the task */}
                                <button 
                                    title="Remove Task" 
                                    className="opacity-80"
                                    onClick={()=>deleteTask(todoData, setToDoData, todo.id)}>
                                        x
                                </button>
                            </label>
                        </li>
                    )
                })}


            </ul>
            {/* Button for clearing all tasks */}
            <div className="flex w-full justify-end pr-5">
                <button onClick={()=>setToDoData([])} className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded mt-2`}>Clear All Task</button>
            </div>
            
        </ToDoAppContainer>
    );
}
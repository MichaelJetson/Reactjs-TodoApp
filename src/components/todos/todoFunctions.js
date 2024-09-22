// Function to add a new task to the todo list
export const addTask = (todoList, setToDoList, task) => {
    const newTask = {
        id: todoList.length + 1, // Assign a new id to the task
        item: task, // The task item
        completed: false // The task is not completed initially
    }
    setToDoList([...todoList, newTask]); // Add the new task to the todo list
}

// Function to delete a task from the todo list
export const deleteTask = (todoList, setToDoList, id) => {
    const updatedList = todoList.filter((task) => task.id !== id); // Filter out the task with the given id
    setToDoList(updatedList); // Update the todo list
}

// Function to get the pending tasks
export const getPendingTasks = (todoList, setToDoList) => {
    setToDoList(todoList.filter((task) => !task.completed)); // Filter out the completed tasks
}

// Function to get the completed tasks
export const getCompletedTasks = (todoList, setToDoList) => {
    setToDoList(todoList.filter((task) => task.completed)); // Filter out the pending tasks
}

// Function to mark a task as completed
export const markTaskAsCompleted = (todoList, setToDoList, id) => {
    const updatedList = todoList.map((task) => {
        if(task.id === id){
            return {
                ...task,
                completed: true // Mark the task as completed
            }
        }
        return task;
    });
    setToDoList(updatedList); // Update the todo list
}

// Function to get the tasks based on the current tab
export const getFilteredTasks = (todoList, setToDoList, tab) => {
    if(tab==='pending'){
        getPendingTasks(todoList, setToDoList); // Get the pending tasks
    }
    else if(tab==='completed'){
        getCompletedTasks(todoList, setToDoList); // Get the completed tasks
    }
    else{
        setToDoList(todoList); // If the tab is 'all', show all tasks
    }
}
const addTodoButton = document.querySelector('.add-todo');
const addProject = document.querySelector('.add-project');
const todoModal = document.getElementById('todo-modal');
const todoForm = document.getElementById('form-todo');
const buttonCloseModal = document.getElementById('button-close-modal');
const todoTitle = document.getElementById('todo-title');
const todoDesc = document.getElementById('todo-desc');
const todoProject = document.getElementById('todo-project');
const todoDatetime = document.getElementById('todo-datetime');
const todoPriority = document.getElementById('todo-priority');
const todoProjectContainer = document.querySelector('.container-todo-project');

let projects = ["Work", "Home"];
let todos = [];

class Todo {
    constructor(title, desc, project, dueDate, priority) {
        this.title = title;
        this.desc = desc;
        this.project = project;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.id = crypto.randomUUID();
    }
}

function addProjectsFormOptions() {
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project;
        option.textContent = project;
        todoProject.append(option);
    })
}

function updateProjectDisplay(todo) {
    // 1. Setup the main elements and properties
    const li = document.createElement('li');
    li.className = 'container-todo-item'; // Fix: Use .className
    li.dataset.id = todo.id; // Store the unique ID for easy access/deletion
    
    // Create Main Container (Top Row)
    const containerTodoItemMain = document.createElement('div');
    containerTodoItemMain.className = 'container-todo-item-main'; // Fix: Use .className
    
    // Create Content Container (Checkbox and Title)
    const containerTodoContent = document.createElement('div');
    containerTodoContent.className = 'container-todo-content';

    // --- A. Content (Checkbox and Title) ---
    
    // Use the unique ID for the checkbox and label association
    const uniqueId = `todo-${todo.id}`;
    
    // Checkbox Input
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'checkbox-todo';
    input.className = 'checkbox-todo';
    input.id = uniqueId; 
    input.checked = todo.completed || false; // Set initial state
    
    // Title Label
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', uniqueId);
    titleLabel.className = 'title-todo';
    titleLabel.textContent = todo.title;
    
    containerTodoContent.append(input, titleLabel);

    // --- B. Actions Container ---
    
    const containerTodoActions = document.createElement('div');
    containerTodoActions.className = 'container-todo-actions';

    // Helper to create buttons with SVG (using innerHTML for the SVG is easiest here)
    const createButton = (className, content) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = className;
        button.innerHTML = content;
        return button;
    };

    // Buttons
    const expandBtn = createButton('expand-todo', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu-down</title><path d="M7,10L12,15L17,10H7Z" /></svg>');
    const editBtn = createButton('edit-todo', 'Edit');
    const deleteBtn = createButton('delete-todo', 'Del');

    containerTodoActions.append(expandBtn, editBtn, deleteBtn);
    
    // Append content and actions to the main container
    containerTodoItemMain.append(containerTodoContent, containerTodoActions);

    // --- C. Description and Supplementary Info ---

    const todoDesc = document.createElement('div');
    todoDesc.className = 'todo-desc';
    todoDesc.textContent = todo.desc || '';

    const containerTodoItemSupplementary = document.createElement('div');
    containerTodoItemSupplementary.className = 'container-todo-item-supplementary';

    // Due Date Label
    const dueLabel = document.createElement('label');
    dueLabel.className = 'due-todo';
    dueLabel.textContent = `Due: ${todo.dueDate || ""}`; 

    // Priority Label
    const priorityLabel = document.createElement('label');
    priorityLabel.className = 'Priority-todo';
    priorityLabel.textContent = `Priority: ${todo.priority}`; 

    containerTodoItemSupplementary.append(dueLabel, priorityLabel);

    // 2. Assemble the final <li> element
    li.append(
        containerTodoItemMain,
        todoDesc,
        containerTodoItemSupplementary
    );
    
    // NOTE: You would attach event listeners (deleteBtn.addEventListener, input.addEventListener) here!
    deleteBtn.addEventListener('click', () => {
        deleteTodo(todo);
        document.querySelector(`[data-id="${todo.id}"]`).remove();
    })

    expandBtn.addEventListener('click', e => toggleDesc(e));

    return li;
}

function toggleDesc(e) {
    e.target.hidden = !e.target.hidden
}

function deleteTodo(todo) {
    const todoIndex = todos.findIndex(item => item.id === todo.id);
    todos.splice(todoIndex, 1);
}

addTodoButton.addEventListener('click', () => todoModal.showModal());
buttonCloseModal.addEventListener('click', () => todoModal.close());
addProjectsFormOptions();

todoForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const newTodo = new Todo(
        todoTitle.value, 
        todoDesc.value, 
        todoProject.value, 
        todoDatetime.value, 
        todoPriority.value
    );
    
    // Create the list item and append
    const li = updateProjectDisplay(newTodo);
    todoProjectContainer.append(li);

    todoForm.reset();
    todoModal.close(); 
});
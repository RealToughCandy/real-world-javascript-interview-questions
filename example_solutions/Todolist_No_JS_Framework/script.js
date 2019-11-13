/* 
	todo list is stored in a JS object literal, with random ID, e.g.
		{
			"fk37yh": "Todo Example 1",
			"xi52sv": "Todo Example 2",
			"vkwnb4": "Todo Example 3",
			"ckbt8r": "Todo Example 4"
		}
*/


// use local storage for saving todo list locally
let todo_list = {};
if(localStorage.todo_list_app_no_js_framework) {
	todo_list = JSON.parse(localStorage.todo_list_app_no_js_framework);
}

const updateLocalStorageDB = () => {
	localStorage.todo_list_app_no_js_framework = JSON.stringify(todo_list);
}

// func to generate random todo ID
// some code for this function was taken from user Joe from https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
const generateRandomTodoID = () => {
	const S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    const id = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    
    if(!todo_list[id]){
    	return id;
    }else {
    	return generateRandomTodoID();
    }
}

// onload, add all todos to app div
window.addEventListener("load", () => {
	Object.keys(todo_list).forEach((todo_id) => {
		addTodoEl(todo_id);
	});
});

// add todo element
const addTodoEl = (todo_id) => {
	todo_content = todo_list[todo_id];

	document.querySelector("body > div.container > div.app").innerHTML += `
	<div class="row todo" id="${todo_id}">
		<p class="todo_content">
			${todo_content}
		</p>
		<button class="remove_btn" onclick="removeTodo(this.parentElement);">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 11.522l1.578-1.626 7.734 4.619 13.335-12.526 1.353 1.354-14 18.646z"/></svg>
		</button>
	</div>
	`;
}

// remove todo btn onclick
const removeTodo = (todoElement) => {
	delete todo_list[todoElement.getAttribute("id")];
	updateLocalStorageDB();

	todoElement.outerHTML = "";
}

// add todo btn onlick
const addTodo = () => {
	addTodoInputEl = document.querySelector("body > div.container > div.app > div.new_todo_box > input");
	
	// add todo if has content (not just whitespace)
	if(addTodoInputEl.value.split(" ").join("") != "") {
		addTodoContent = addTodoInputEl.value;

		newTodoID = generateRandomTodoID();
		todo_list[newTodoID] = addTodoContent;
		updateLocalStorageDB();
		addTodoEl(newTodoID);

		addTodoInputEl.value = "";
	}
};
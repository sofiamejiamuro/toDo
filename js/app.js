// Objectivos generales:
// 1. Que las tareas se puedan agregar y pintar
// 2. Que al refrescar el navegador , las tareas sigan ahí, local storage
// 3. Que se puedan eliminar

// Objetivos particulares
// 1. Save
// save to localStorage

// 2. Retrieve the data from LocalStorage to print them a t the begining of the app
// a. getItem
// b Print Item

// 3. Delete Data
// a. delete the imtem fromthe DOM
// delete the item from the local storage


// Variables
const btnInput = document.querySelector('#btnInput');
const addInput = document.querySelector('#formulario');
const textInput = document.querySelector('#topic');
const listContainer = document.querySelector('#topic-list');
const btnClearItemsLocalStorage = document.querySelector('#clearTopicsLocalStorage');
let topics = [];

// Listeners
const Listeners = () => {
    document.addEventListener('DOMContentLoaded', startApp);
    textInput.addEventListener('keyup', checkInput);
    addInput.addEventListener('submit', addItem);
    btnClearItemsLocalStorage.addEventListener('click', deleteItemsLocalStorage)
};

// Functions
const startApp = () => {
    checkLocalStorge()
    btnInput.disabled = true;
    btnInput.style.cursor = "not-allowed";
    btnInput.classList.add("notAllowed");
    btnInput.classList.remove("button-primary");
    textInput.value = '';
};

// Check if there are items in the local storage and print them
const checkLocalStorge = () => {
    topics = JSON.parse(localStorage.getItem('topics')) || [];
    createHtml()
}

// check that the input is not empty
const checkInput = ({ target }) => {
    const string = target.value;
    if (string.length > 0) {
        btnInput.disabled = false;
        btnInput.style.cursor = "pointer";
        btnInput.classList.remove("notAllowed");
        btnInput.classList.add("button-primary");
    } else {
        btnInput.disabled = true;
        btnInput.style.cursor = "not-allowed";
        btnInput.classList.add("notAllowed");
        btnInput.classList.remove("button-primary");
    };

};

const addItem = (e) => {
    e.preventDefault();

    const topicObj = {
        id: Date.now(),
        text: textInput.value
    }

    topics = [...topics, topicObj]
    createHtml();
};

const deleteItem = ({ target }) => {
    const elementToDelete = target.parentElement.dataset.topicId;
    console.log(elementToDelete);

    // corrections insted of using a big forEach use a filter

    topics = topics.filter(topic => topic.id != elementToDelete);

    createHtml();
};

// correction -->  The best approach is to create an li due too their style behaviour 
const createHtml = () => {
    // html must be cleaned beacuse the whole array is reprinted, each time this function is called
    cleanHtml();

    if (topics.length > 0) {

        topics.forEach(topic => {
            const btnDelete = document.createElement('a');
            const li = document.createElement('li');

            btnDelete.classList = 'delete';
            btnDelete.innerText = 'X';
            btnDelete.addEventListener('click', deleteItem)
            li.innerText = topic.text;
            li.appendChild(btnDelete);
            li.style.listStyle = 'none'
                // Adding the property dataset
            li.dataset.topicId = topic.id;
            listContainer.appendChild(li);
            textInput.value = '';
            btnInput.disabled = true;
            btnInput.style.cursor = "not-allowed";
            btnInput.classList.add("notAllowed");
            btnInput.classList.remove("button-primary");

        });
    };

    updateStorage();
};

// correction --> It is resolved by adding the whle array to the local storage , not one by one as i was doung
const updateStorage = () => {
    localStorage.setItem('topics', JSON.stringify(topics));
    // console.log(JSON.stringify(topics));
};

const cleanHtml = () => {
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    };
};

const deleteItemsLocalStorage = () => {
    topics = JSON.parse(localStorage.getItem('topics')) || [];
    console.log(topics);
    topics.length = 0;
    console.log(topics);
    alert('Se han borrado todos los elementos de la lista Topics del localStorage')
    createHtml();
};

Listeners();
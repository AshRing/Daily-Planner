class UI {
    constructor(task) {
        this.currentDate = new Date().toDateString();
        this.titleContainer = document.querySelector('.day__title');
        this.dayTitle();
        this.loadEventListeners();
    }

    loadEventListeners() {
        document.getElementById('taskText').addEventListener('keyup', e => {
            if (e.keyCode === 13) { this.addTask('taskText', 'taskList'); }
        });
        document.getElementById('addTask').addEventListener('click', e => {
            ui.addTask('taskText', 'taskList');
        });
        
        document.getElementById('gratText').addEventListener('keyup', e => {
            if (e.keyCode === 13) { ui.addTask('gratText', 'gratList'); }
        });
        document.getElementById('addGrat').addEventListener('click', e => {
            ui.addTask('gratText', 'gratList');
        });

        document.getElementById('addNote').addEventListener('click', function(e) {
            addToList('noteText', 'noteList');
            e.preventDefault();
        });
    }

    dayTitle() {
        const title = document.createElement('h2');
        title.innerHTML = `<h2>${this.currentDate}</h2>`;
        this.titleContainer.appendChild(title);

    }

    addTask(input, list) {
        const _input = document.getElementById(input);
        const _list = document.getElementById(list);
        //add li to specified ul
        const li = document.createElement('li');
        li.className = 'list-group-item py-2';
        li.textContent = _input.value;
        _list.appendChild(li);
        //add link option to delete task, append to li
        const link = document.createElement('a');
        link.className = 'list__delete float-right';
        link.innerHTML = '&times;';
        li.appendChild(link);

        //also save input in session storage
        //this.saveInSessionStorage(_input.value, _list.id);

        //revert input to default text and select
        _input.value = _input.getAttribute('value');
        _input.select();
    }

    removeTask(target) {
        if(target.classList.contains('list__delete')) {
            let itemValue = target.previousSibling.textContent;
            let currentList = target.parentElement.parentElement.id;
            target.parentElement.remove();
            //this.removeFromSessionStorage(currentList, itemValue);
        }
    }

    crossOutTask(target) {
        if(target.className === 'list__item') {
            target.classList.add('list__item--crossout');
        } else {
            target.classList.remove('list__item--crossout');
        }
    }
}

const ui = new UI;

// //
// //Event listeners to add items
// document.getElementById('taskText').addEventListener('keyup', e => {
//     if (e.keyCode === 13) { ui.addTask('taskText', 'taskList'); }
// });
// document.getElementById('addTask').addEventListener('click', e => {
//     ui.addTask('taskText', 'taskList');
// });

// document.getElementById('addGrat').addEventListener('click', function(e) {
//     addToList('gratText', 'gratList');
//     e.preventDefault();
// });
// document.getElementById('addNote').addEventListener('click', function(e) {
//     addToList('noteText', 'noteList');
//     e.preventDefault();
// });
// //


// //
// //Save current day to LS
// document.querySelector('.saveday').addEventListener('click', function(e) {
//     if(confirm('Are you sure you are ready to save?')){
//         ui.saveDayToLocalStorage();
//     }
//     e.preventDefault();
// });
// //


//
//Event listeners for item deletion
document.getElementById('taskList').addEventListener('click', function(e) {
    removeFromList(e.target);
    crossOut(e.target);
});
document.getElementById('gratList').addEventListener('click', function(e) {
    removeFromList(e.target);
});
document.getElementById('noteList').addEventListener('click', function(e) {
    removeFromList(e.target);
    crossOut(e.target);
});
//



// function addToList(input, list) {
//     const _input = document.getElementById(input);
//     const _list = document.getElementById(list);
//     ui.addTask(_input, _list);
// }

// function removeFromList(target) {
//     ui.removeTask(target);
// }

// function crossOut(target) {
//     ui.crossOutTask(target);
// }
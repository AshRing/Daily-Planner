class UI {
    constructor() {
        this.currentDate = new Date().toDateString();
        this.titleContainer = document.querySelector('.day__title');
        this.displayDate();
    }

    displayDate() {
        const title = document.createElement('h2');
        title.innerText = this.currentDate;
        this.titleContainer.appendChild(title);
    }

    addTask(input, list) {
        const _input = document.getElementById(input);
        const _list = document.getElementById(list);

        //add li to specified ul
        const li = document.createElement('li');
        li.className = 'list-group-item py-2';
        li.innerHTML = `<span>${_input.value}</span>`;
        _list.appendChild(li);

        //add link option to delete task, append to li
        const link = document.createElement('a');
        link.className = 'list__delete float-right';
        link.innerHTML = '&times;';
        li.appendChild(link);

        //revert input to default text and select
        _input.value = _input.getAttribute('value');
        _input.select();
    }

    removeFromList(target) {
        if(target.classList.contains('list__delete')) {
            let itemValue = target.previousSibling.textContent;
            let currentList = target.parentElement.parentElement.id;
            target.parentElement.remove();
            //this.removeFromSessionStorage(currentList, itemValue);
        }
    }
}

export const ui = new UI();
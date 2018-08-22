class UI {
    constructor() {
        this.currentDate = new Date().toDateString();
        this.titleContainer = document.querySelector('.day__title');
        this.newDayContainer = document.querySelector('.new-day');
        this.titleMenu = document.querySelector('.title-menu');
        this.dummySpan = document.querySelector('.dummySpan');
        this.backBtn = document.querySelector('.backBtn');
        this.displayDate();
    }

    openDiv(divToOpen, divToClose) {
        document.querySelector(divToClose).style.display = 'none';
        document.querySelector(divToOpen).style.display = 'block';
    }

    displayBackButton() {
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
        link.className = 'list-item-delete float-right';
        link.innerHTML = '<i class="fas fa-times"></i>';
        li.appendChild(link);

        //revert input to default text and select
        _input.value = _input.getAttribute('value');
        _input.select();
    }

    removeFromList(target) {
        if(target.parentElement.classList.contains('list-item-delete')) {
            target.parentElement.parentElement.remove();
            //this.removeFromSessionStorage(currentList, itemValue);
        }
    }
}

export const ui = new UI();
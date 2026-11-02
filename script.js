// Exercise 2 - Task Board
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test


// Step 1: add a task on submit (no reload, clear + focus the input, "Please type a task" error)

// Step 2: click a task to toggle the "done" class

// Step 3: delete with the x button (one listener on the ul - event delegation)

// Step 4: "tasks left" counter

// Step 5: filters (All / Active / Done)

// Step 6: Clear completed

// Step 7: show the empty message only when there are no tasks

// Bonus: block duplicate tasks ("This task already exists")


const listtask = document.getElementById('task-list')
const submit = document.getElementById('btadd')
const selectLevel = document.getElementById('priority-select')
const inputtext = document.getElementById('task-input')
const errortext = document.getElementById('error')
const leftTask = document.getElementById('left')
let level = selectLevel.value

const btAll = document.querySelector('[data-filter="all"]')
const btActive = document.querySelector('[data-filter="active"]')
const btDone = document.querySelector('[data-filter="done"]')
btAll.addEventListener('click', (event) => {
    btAll.classList.add('active')
    btActive.classList.remove('active')
    btDone.classList.remove('active')


})
btActive.addEventListener('click', (event) => {
    btActive.classList.add('active')
    btAll.classList.remove('active')
    btDone.classList.remove('active')
})
btDone.addEventListener('click', (event) => {
    btActive.classList.remove('active')
    btAll.classList.remove('active')
    btDone.classList.add('active')
    const items = document.querySelectorAll('li')
    items.forEach(task => task.classList.contains('done') ? task.classList.remove('hidden') : task.classList.add('hidden'))

})


submit.addEventListener('click', (event) => {
    event.preventDefault()
    errortext.hidden = true
    selectLevel.addEventListener('change', (event) => {
        level = event.target.value;
    })

    if (inputtext.value !== '' && inputtext.value.trim() !== '') {
        const item = document.createElement('li')
        const text = document.createElement('span')
        text.classList.add('text')
        text.textContent = inputtext.value
        item.appendChild(text)
        const btDelete = document.createElement('button')
        btDelete.classList.add('delete')
        btDelete.textContent = 'x'
        item.appendChild(btDelete)
        if (level === 'low')
            item.classList.add('priority-low')
        else if (level === 'medium')
            item.classList.add('priority-medium')
        else if (level === 'high')
            item.classList.add('priority-high')
        listtask.appendChild(item)

        item.addEventListener('click', (event) => {
            const clicked = event.target.closest('li');
            if (!clicked) return;
            if (clicked.classList.contains('done')) {
                clicked.classList.remove('done')
                leftTask.textContent = Number(leftTask.textContent) + 1
            } else {
                clicked.classList.add('done');
                leftTask.textContent = Number(leftTask.textContent) - 1
            }

        })


        btDelete.addEventListener('click', (event) => {
            item.classList.remove('done')
            item.remove()
            leftTask.textContent = Number(leftTask.textContent) - 1
        })


        inputtext.value = ''
        inputtext.focus()
        const empty = document.getElementById('empty')
        empty.textContent = ''
        leftTask.textContent = Number(leftTask.textContent) + 1

    }
    else if (inputtext.value === '') {
        errortext.textContent = 'Please type a task'
        errortext.hidden = false
        inputtext.focus()
    }
    else {
        errortext.textContent = 'Cannot add an empty task'
        errortext.hidden = false
        inputtext.focus()
    }


})


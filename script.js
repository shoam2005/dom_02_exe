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
const empty = document.getElementById('empty')

let level = selectLevel.value;
selectLevel.addEventListener('change', (event) => {
    level = event.target.value;
})

function finishTask(){
    const items=document.querySelectorAll('li')
    if(items.length===0){
        empty.hidden=false
    }
    else
        empty.hidden=true
}

const btClaer = document.getElementById('clear-done')
btClaer.addEventListener('click', (event) => {
    event.preventDefault()

    const items = document.querySelectorAll('li')
    items.forEach(task => {
        const isDone = task.classList.contains('done')
        if (isDone)
            task.remove()
    })
    finishTask()
})

const btAll = document.querySelector('[data-filter="all"]')
const btActive = document.querySelector('[data-filter="active"]')
const btDone = document.querySelector('[data-filter="done"]')

function applyFilter() {
    const items = document.querySelectorAll('li')
    items.forEach(task => {
        const isDone = task.classList.contains('done')

        if (btDone.classList.contains('active')) {
            if (isDone) task.removeAttribute('hidden')
            else task.setAttribute('hidden', true)
        } else if (btActive.classList.contains('active')) {
            if (!isDone) task.removeAttribute('hidden')
            else task.setAttribute('hidden', true)
        } else {
            task.removeAttribute('hidden')
        }
    })
}

btAll.addEventListener('click', () => {
    btAll.classList.add('active')
    btActive.classList.remove('active')
    btDone.classList.remove('active')
    applyFilter()
})

btActive.addEventListener('click', () => {
    btActive.classList.add('active')
    btAll.classList.remove('active')
    btDone.classList.remove('active')
    applyFilter()
})

btDone.addEventListener('click', () => {
    btActive.classList.remove('active')
    btAll.classList.remove('active')
    btDone.classList.add('active')
    applyFilter()
})


submit.addEventListener('click', (event) => {
    event.preventDefault()
    errortext.hidden = true

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

        const currentLevel = selectLevel.value || level;

        if (currentLevel === 'low')
            item.classList.add('priority-low')
        else if (currentLevel === 'medium')
            item.classList.add('priority-medium')
        else if (currentLevel === 'high')
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
                leftTask.textContent = Number(leftTask.textContent - 1)
            }
            applyFilter()
        })

        btDelete.addEventListener('click', (event) => {
            event.stopPropagation()
            if (item.classList.contains('done')) {
                item.remove()
            } else {
                leftTask.textContent = Number(leftTask.textContent) - 1
                item.remove()
            }
            applyFilter()
            finishTask()
        })

        inputtext.value = ''
        inputtext.focus()
        
        
        leftTask.textContent = Number(leftTask.textContent) + 1

        applyFilter()
        finishTask()

    } else if (inputtext.value === '') {
        errortext.textContent = 'Please type a task'
        errortext.hidden = false
        inputtext.focus()
    } else {
        errortext.textContent = 'Cannot add an empty task'
        errortext.hidden = false
        inputtext.focus()
    }
    
})


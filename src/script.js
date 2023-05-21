let tasks = localStorage.getItem('tasks')
if (tasks) tasks = JSON.parse(tasks)
else tasks = []

const template = (i) => {
    const example = $('#example')
    example.find('h2').text(i)
    return $('#example').html()
}
for (const i of tasks) {
    $('#task').append(template(i))
}

function task_remove(root) {
    tasks.splice(root.index() - 1, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    root.fadeOut(1000, () => root.remove())
}

function edit_done(event) {
    if (event.which === 13) {
        const root = $(event.target).parents('.col')
        tasks[root.index() - 1] = event.target.value
        localStorage.setItem('tasks', JSON.stringify(tasks))
        root.find('#task_edit').replaceWith(`<h2>${event.target.value}</h2>`)
    }
}

function task_edit(root) {
    root.find('h2').replaceWith($('#task_input').clone().prop({
        id: 'task_edit',
        placeholder: '',
        value: tasks[root.index() - 1]
    }))
    $('#task_edit').on('keypress', edit_done)
}

$('#task_input').on('keypress', function (event) {
    if (event.which === 13) {
        tasks.push(event.target.value)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        $('#task').append($(template(event.target.value)).hide().fadeIn(1000))
        $('#task_input').val('')
    }
})
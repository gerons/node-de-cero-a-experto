const inquirer = require('inquirer')
const { validate } = require('uuid')
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas hacer?',
        choices: [
            {
                name: `${'1.'.red} Crear tarea`,
                value: '1'
            },
            {
                name: `${'2.'.red} Listar tareas`,
                value: '2'
            },
            {
                name: `${'3.'.red} Listar tareas completadas`,
                value: '3'
            },
            {
                name: `${'4.'.red} Listar tareas pendientes`,
                value: '4'
            },
            {
                name: `${'5.'.red} Completar tareas(s)`,
                value: '5'
            },
            {
                name: `${'6.'.red} Borrar tarea`,
                value: '6'
            },
            {
                name: `${'0.'.red} Salir`,
                value: '0'
            }
        ]
    }
]

const inquirerMenu = async() => {
    console.clear()
    console.log('=================================='.green)
    console.log('    Seleccione una opción')
    console.log('==================================\n'.green)

    const { opcion } = await inquirer.prompt(preguntas)

    return opcion
}

const pausa = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]

    console.log('\n')
    await inquirer.prompt(question)
}

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }

                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)

    return desc
}

listadoTareasBorrar = async(tareas = []) => {
    const choices = tareas.map((tarea, idx) => {
        const index = `${idx +1}`.green

        return {
            value: tarea.id,
            name: `${index}. ${tarea.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas)

    return id
}

const confirmar = async(message) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(pregunta) 
    return ok
}

mostrarListadoCheckList = async(tareas = []) => {
    const choices = tareas.map((tarea, idx) => {
        const index = `${idx +1}`.green

        return {
            value: tarea.id,
            name: `${index}. ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(preguntas)

    return ids
}

module.exports = {
    inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar,
    mostrarListadoCheckList
}
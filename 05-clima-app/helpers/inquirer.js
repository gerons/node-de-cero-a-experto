const inquirer = require('inquirer')
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas hacer?',
        choices: [
            {
                name: `${'1.'.red} Buscar ciudad`,
                value: 1
            },
            {
                name: `${'2.'.red} Historial`,
                value: 2
            },
            {
                name: `${'0.'.red} Salir`,
                value: 0
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

listarLugares = async(lugares = []) => {
    const choices = lugares.map((lugar, idx) => {
        const index = `${idx +1}`.green

        return {
            value: lugar.id,
            name: `${index}. ${lugar.nombre}`
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
            message: 'Seleccionar',
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
    inquirerMenu, pausa, leerInput, listarLugares, confirmar,
    mostrarListadoCheckList
}
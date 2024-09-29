
const empleados = [
    {
        id: 1,
        nombre: 'Gero'
    },
    {
        id: 2,
        nombre: 'Linda'
    },
    {
        id: 3,
        nombre: 'Karen'
    },
]

const salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    },
]

const getEmpleado = (id, callback) => {
    const empleado = empleados.find(emp => emp.id === id)

    if (empleado) {
        callback(null, empleado.nombre)?.nombre
    } else {
       callback(`Empleado con id ${id} no existe...`)
    }
}

const getSalario = (id, callback) => {
    const salario = salarios.find(s => s.id === id)?.salario

    if (salario) {
        callback(null, salario)
    } else {
       callback(`No existe salario para empleado con id ${id}...`)
    }
}


/* cuerpo principal */

const id = 4

getEmpleado(id, (err, empleado) => {
    if (err) {
        return console.log('ERROR -', err)
    }

    getSalario(id, (err, salario) => {
        if (err) {
            return console.log(`Error - ${err}`)
        }
    
        console.log('El empleado', empleado, 'tiene un saliro de:', salario)
    })
})

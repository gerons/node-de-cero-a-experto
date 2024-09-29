
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

const getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        const empleado = empleados.find(emp => emp.id === id)?.nombre
    
        if (empleado) {
            resolve(empleado)
        } else {
            reject(`Empleado con id ${id} no existe...`)
        }
    })
}

const getSalario = (id) => {
    return new Promise((resolve, reject) => {
        const salario = salarios.find(s => s.id === id)?.salario
    
        if (salario) {
            resolve(salario)
        } else {
            reject(`No existe salario para empleado con id ${id}...`)
        }
    })
}

const id = 3

// getEmpleado(id)
//     .then(empleado => console.log(empleado))
//     .catch(err => console.log(err))

// getSalario(id)
//     .then(salario => console.log(salario))
//     .catch(err => console.log(err))


// getEmpleado(id)
//     .then(empleado => {
//         getSalario(id)
//             .then(salario => {
//                 console.log('El empleado', empleado, 'tiene un saliro de:', salario)
//             })
//             .catch(err => console.log(`Error - ${err}`))
//     })
//     .catch(err => console.log(`Error - ${err}`))

let nombre

getEmpleado(id)
    .then(empleado => {
        nombre = empleado
        return getSalario(id)
    })
    .then(salario => console.log('El empleado', nombre, 'tiene un saliro de:', salario))
    .catch(err => console.log(`Error - ${err}`))
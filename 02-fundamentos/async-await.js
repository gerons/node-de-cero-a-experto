
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

const getInfoUsuario = async(id) => {
    try {
        const empleado = await getEmpleado(id)
        const salario = await getSalario(id)
    
        return `El empleado ${empleado} tiene un salario de ${salario}`
    } catch (error) {
        throw error
    }

}

const id = 3

getInfoUsuario(id)
    .then(msg => console.log(msg))
    .catch(error => console.error(error))

// setTimeout(function() {
//     console.log('hola mundo')
// }, 1000)

const getUsuarioById = (id, callback) => {
    const usuario = {
        id,
        nombre: 'Gero',
        edad: 30,
    }

    setTimeout(() => {
        callback(usuario)
    }, 1500)
}

getUsuarioById(20, (usr) => {
    console.log(usr)
})
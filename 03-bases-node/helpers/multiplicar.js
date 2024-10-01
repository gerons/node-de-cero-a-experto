const fs = require('fs')
const colors = require('colors')

const crearArchivo = async(base, listar, hasta) => {
    try {
        let salida, consola = ''
        
        for (let i = 1; i <= hasta; i++) {
            salida += `${base} x ${i} x ${base * i} \n`
        }

        fs.writeFileSync(`./salida/tabla_${base}.txt`, salida)

        if (listar) {
            for (let i = 1; i <= hasta; i++) {
                consola += `${base} ${ 'x'.yellow } ${i} ${'='.yellow} ${base * i} \n`
            }

            console.log('=====================')
            console.log('    tabla del:'.green, colors.cyan(base) )
            console.log('====================='.green)
            console.log(consola)
        }
        
        return `tabla_${base}.txt`
    } catch (error) {
        throw error
    }
}

module.exports = {
    crearArchivo
}
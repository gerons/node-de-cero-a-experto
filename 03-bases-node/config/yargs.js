const argv = require('yargs')
    .options({
        'b': {
            alias: 'base',
            type: 'number',
            demandOption: true,
            describe: 'Es la base de la tabla de multiplicar.'
        },
        'l': {
            alias: 'listar',
            type: 'boolean',
            default: false,
            describe: 'Muestra la tabla en consola.'
        },
        'h': {
            alias: 'hasta',
            type: 'number',
            default: 10,
            describe: 'Hasta qué número se muestra la tabla.'
        }
    })
    .check((argv, options) => {
        if (isNaN(argv.b)) {
            // throw new Error('La base debe ser un número');
            throw 'La base debe ser un número'
        }

        return true
    })
    .argv

module.exports = argv
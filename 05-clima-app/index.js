require('dotenv').config()

const { inquirerMenu, leerInput, pausa } = require('./helpers/inquirer')
const Busquedas = require('./models/busquedas')

const main = async() => {
    let opt = ''

    do {
        const busquedas = new Busquedas
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                // mostrar mensaje
                const lugar = await leerInput('Ciudad:')
                console.log(lugar)

                //buscar lugares
                const lugares = await busquedas.ciudad(lugar)

                // seleccionar lugar
                const id = await listarLugares(lugares)
                if (id === '0') continue
                
                const lugarSeleccionado = lugares.find(l => l.id === id)

                busquedas.agregarHistorial(lugarSeleccionado.nombre)

                // buscar datos del clima
                const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lon)

                // mostrar resultados del clima
                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad: ', lugarSeleccionado.nombre.green )
                console.log('Lat: ', lugarSeleccionado.lat)
                console.log('Lon: ', lugarSeleccionado.lon)
                console.log('Temperatura: ', clima.temp)
                console.log('Mínima: ', clima.min)
                console.log('Máxima: ', clima.max)
                console.log('Descripción del clima: ', clima.desc.green)
                
                break;
        
            case 2:
                const hist = busquedas.historialCapitalizado
                
                hist.forEach((lugar, index) => {
                    const idx = `${index +1}`.green
                    console.log(`${idx} ${lugar}`)
                })

                break
            default:
                break;
        }

        if (opt !== 0) await pausa()
    } while (opt !== 0)
}

main()
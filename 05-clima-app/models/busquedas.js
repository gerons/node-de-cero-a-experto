const fs = require('fs')
const axios = require('axios')

class Busquedas {
    historial = []
    dbPath = './db/database.json'

    constructor() {
        this.leerDB()
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeater() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    get historialCapitalizado() {
        return this.historial.map( lugar => this.capitalizar(lugar))
    }

    capitalizar(nombre) {
        const palabras = nombre.split(" ");

        for (let i = 0; i < palabras.length; i++) {
            palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substr(1);
        }

        return palabras.join(" ");
    }

    async ciudad(lugar = '') {
        // peticion http
        const api = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.paramsMapbox
        })

        const resp = await api.get()

        return resp.data.features.map(lugar => ({
            id: lugar.id,
            nombre: lugar.place_name,
            lat: lugar.center[1],
            lon: lugar.center[0]
        }))
    }

    async climaLugar(lat, lon) {
        try {
            // peticion http
            const api = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeater, lat, lon }
            })

            const resp = await api.get()
            const { weather, main } = resp.data

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial(lugar = '') {
        // prevenir duplicados
        if (this.historial.includes(lugar.toLowerCase())) return

        const histLen = this.historial.unshift(lugar.toLowerCase())

        // si ya son mas de 5 elementos eliminamos
        if (histLen > 5) {
            this.historial.splice(5, 1)
        }

        this.guardarDB()
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) { return null }
    
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'})
        const data = JSON.parse(info)

        this.historial = data.historial
    }
}

module.exports = Busquedas
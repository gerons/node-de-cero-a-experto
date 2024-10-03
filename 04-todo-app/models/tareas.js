const Tarea = require('./tarea')
require('colors')

/* ===========================
* _Listado :
*   {'uuid-1232344334-234234-2': id:1, desc: asd, completadoEn: null},
*   {'uuid-1232344334-234234-2': id:2, desc: asd, completadoEn: 912323},
*   {'uuid-1232344334-234234-2': id:3, desc: asd, completadoEn: 912323},
*   {'uuid-1232344334-234234-2': id:4, desc: asd, completadoEn: null},
* ========================= */


class Tareas {
    _listado = {}

    constructor() {
        this._listado = {}
    }

    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })

        return listado
    }

    cargarTareasFromArray(tareas=[]) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    listadoCompleto() {
        console.log()

        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index +1}`.green
            const estado = (tarea.completadoEn !== null) ? 'Terminada'.green : 'Pendiente'.red
    
            console.log(`${idx}. ${tarea.desc} :: ${estado}`)
        })
    }

    listarPendientesCompletadas(completadas=true) {
        console.log()
        let listadoTmp = []

        if (completadas) {
            listadoTmp = this.listadoArr.filter(tarea => tarea.completadoEn !== null)
        } else {
            listadoTmp = this.listadoArr.filter(tarea => tarea.completadoEn === null)
        }

        listadoTmp.forEach((tarea, index) => {
            const idx = `${index +1}`.green
            const estado = (tarea.completadoEn !== null) ? tarea.completadoEn.green : 'Pendiente'.red
    
            console.log(`${idx}. ${tarea.desc} :: ${estado}`)
        })
    }    

    crearTarea( desc = '' ) {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id]

            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null
            }
        })
    }
}

module.exports = Tareas
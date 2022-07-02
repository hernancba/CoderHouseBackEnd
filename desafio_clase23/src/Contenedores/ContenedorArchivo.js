import { promises as fs } from 'fs'

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async listar(id) {
        const elems = await this.listarTodos()
        const buscado = elems.find(e => e.id == id)
        return buscado
    }

    async listarTodos() {
        try {
            const elems = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(elems)
        } catch (error) {
            return []
        }
    }

    async guardar(elem) {
        const elems = await this.listarTodos()

        let newId
        if (elems.length == 0) {
            newId = 1
        } else {
            newId = elems[elems.length - 1].id + 1
        }

        const newElem = { ...elem, id: newId }
        elems.push(newElem)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async update(elem) {
        const elems = await this.listarTodos()
        const index = elems.findIndex(e => e.id == elem.id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${elem.id}`)
        } else {
            elems[index] = elem
            try {
                await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2))
            } catch (error) {
                throw new Error(`Error al borrar: ${error}`)
            }
        }
    }

    async borrar(id) {
        const elems = await this.listarTodos()
        const index = elems.findIndex(e => e.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }

        elems.splice(index, 1)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async borrarTodo() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
    }
}

export default ContenedorArchivo
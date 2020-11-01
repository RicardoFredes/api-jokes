const { constants } = require('buffer')
const fs = require('fs')

class CacheService {

    async use(name, callback) {
        const exist = fs.existsSync(this.getPathName(name))
        if (exist) return this.get(name)
        if (!callback) return null
        const data = await callback()
        this.set(name, data)
        return data
    }

    get(name) {
        const content = fs.readFileSync(this.getPathName(name), { encoding: 'utf-8' })
        return JSON.parse(content)
    }

    set(name, data) {
        const content = typeof data === 'string' ? data : JSON.stringify(data)
        fs.writeFileSync(this.getPathName(name), content)
    }

    clear() {
        fs.rmdirSync('tmp', { recursive: true })
        fs.mkdirSync('tmp')
    }

    getPathName(name) {
        return `tmp/${name}.json`
    }
}

module.exports = CacheService

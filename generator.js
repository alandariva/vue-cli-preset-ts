const fs = require('fs')

module.exports = api => {
    function changeJsonFile(path, modifyFnc) {
        const filePath = api.resolve(path)
        const json = require(filePath)

        modifyFnc(json)

        fs.writeFileSync(filePath, JSON.stringify(json, null, 4))
    }

    // api.render('./template')
    //
    // api.extendPackage({
    //     devDependencies: {
    //         '@mdi/js': '*',
    //         'axios': '*',
    //         'webfontloader': '*',
    //         'vue-analytics': '*',
    //         'vue-meta': '*',
    //         'vuex-pathify': '*',
    //         'eslint-config-vuetify': '*',
    //         'vuex-router-sync': '*'
    //     },
    //     eslintConfig: {
    //         extends: 'vuetify'
    //     },
    //     jest: {
    //         setupFiles: [
    //             '<rootDir>/tests/index.js'
    //         ]
    //     }
    // })
    //
    // api.injectImports(api.entryFile, `import './plugins'`)

    api.onCreateComplete(() => {

        changeJsonFile('tslint.json', (json) => {
            json.rules.indent = [true, "spaces", 4]
            json.rules.quotemark = [true, "single"]
            json.rules.semicolon = [true, "never"]
        })

        changeJsonFile('tsconfig.json', (json) => {
            json.compilerOptions.plugins = [{"name": "typescript-tslint-plugin"}]
        })

        //
        // try {
        //     fs.unlinkSync(api.resolve('src/views/About.vue'))
        // } catch (e) {
        // }
        //
        // try {
        //     fs.unlinkSync(api.resolve('src/views/Home.vue'))
        // } catch (e) {
        // }
        //
        // const indexPath = api.resolve('public/index.html')
        // let index = fs.readFileSync(indexPath, 'utf8')
        //
        // index = index.replace('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">', '')
        // index = index.replace('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css">', '')
        // index = index.replace(/^\s*\n/gm, '')
        //
        // fs.writeFileSync(indexPath, index)
    })
}

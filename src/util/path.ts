import path from 'path';
let rootDir = path.dirname(__dirname)
if (require && require.main){
    rootDir = path.dirname(require.main.filename)
}
export default rootDir
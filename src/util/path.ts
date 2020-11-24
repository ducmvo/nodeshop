import path from 'path';
let rootDir = path.dirname(__dirname);
if (require && require.main) {
	rootDir = path.dirname(require.main.filename);
}
export const dataPath = path.join(
	path.dirname(rootDir),
	'data',
	'products.json'
);

export default rootDir;

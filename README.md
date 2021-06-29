# crud-optimized-db

**Steps to create project**

**_First dependencies_**
1. npm init -y
2. npm i express mongodb mongoose dotenv nodemon


**Config TypeScript**
1. npm i -g typescript -D
2. tsc --init
3. "target": "es6"
4. "outDir":"./build"   -> para decirle donde va  poner todo los de typescrpt
5. "tsc" se genera la carapeta build
6. "moduleResolution" : "node"
7. "compilaterOptions", "include" : [ "./src/**/*" ], "exclude": [ "node_modules"]
8. npm i @types/express -D
9. "ts:node" : "ts-node src/index.ts" -> installar "npm i ts-node -D"
10. "clean": "del build" -> para borrar la carpeta build
11. "build": "tsc" -> para crear la carpeta
12. "dev": "nodemon"
13. npm i nodemon -D

**Create nodemon.json**
{
	"watch": [
		"src"	
	],
	"ext": "ts",
	"ignore": [
		"src/**/*.spec.ts"
	],
	"exec": "ts-node ./src/index.ts"
}

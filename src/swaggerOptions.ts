export  const option = {
	definition: {
	openapi: "3.0.0",
	info: {
		title: 'calister API',
		version: '1.0.0',
		description: 'this is app where you can register an create your post, and see post of other users'
	},
	servers: [{
		url: "http://localhost:4000"	
	}]	
	},
	apis: ["./src/routes/*.ts"]
}

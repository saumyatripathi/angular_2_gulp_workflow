module.exports = function(){
	var config = {
		allTs:'./client/**/*.ts',
		typings: './client/typings/**/*.d.ts',
		distDir:'dist',
		nodeHost:'app.js',
		'indexFile':'client/index.html',
		'angularLibraries':[
			'node_modules/es6-shim/es6-shim.min.js',
			'node_modules/es6-shim/es6-shim.map',
			'node_modules/systemjs/dist/system-polyfills.js',
			'node_modules/systemjs/dist/system-polyfills.js.map',
			'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
			'node_modules/angular2/bundles/angular2-polyfills.js',
			'node_modules/systemjs/dist/system.src.js',
			'node_modules/rxjs/bundles/Rx.js',
			'node_modules/angular2/bundles/angular2.dev.js',
			'node_modules/angular2/bundles/router.dev.js',
			'node_modules/angular2/bundles/http.dev.js'
		]
	}

	return config;
}
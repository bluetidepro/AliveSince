import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const config = {
	input: 'src/index.js',
	output: [
		{
			file: 'public/build/index.bundle.js',
			format: 'esm',
		},
	],
	plugins: [
		babel(),
	    nodePolyfills(),
	    nodeResolve(),
	    commonjs()
		// commonjs({
		// 	// non-CommonJS modules will be ignored, but you can also
		// 	// specifically include/exclude files
		// 	include: 'node_modules/**',  // Default: undefined
		// 	// exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
		// 	// these values can also be regular expressions
		// 	// include: /node_modules/

		// 	// search for files other than .js files (must already
		// 	// be transpiled by a previous plugin!)
		// 	extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

		// 	// if true then uses of `global` won't be dealt with by this plugin
		// 	ignoreGlobal: false,  // Default: false

		// 	// if false then skip sourceMap generation for CommonJS modules
		// 	sourceMap: true,  // Default: true

		// 	// explicitly specify unresolvable named exports
		// 	// (see below for more details)
		// 	namedExports: { 'moment': ['moment'] },  // Default: undefined

		// 	// sometimes you have to leave require statements
		// 	// unconverted. Pass an array containing the IDs
		// 	// or a `id => boolean` function. Only use this
		// 	// option if you know what you're doing!
		// 	ignore: [ 'conditional-runtime-dependency' ]
		// })
    ],
};

export default config;
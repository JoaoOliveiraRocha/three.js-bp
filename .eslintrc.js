module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': ['eslint:recommended', '.stylelintrc.js'],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'rules': {
		'eqeqeq': [
			'error',
			'always'
		],
		'no-unneeded-ternary': 'error',
		'no-use-before-define': ['error', {
			'allowNamedExports': false,
			'classes': true,
			'functions': true,
			'variables': true
		}],
		'prefer-arrow-callback': 'warn',
		'prefer-const': 'error',
		'require-await': 'error',
		'sort-keys': [
			'error',
			'asc',
			{
				'caseSensitive': true,
				'minKeys': 2,
				'natural': false
			}]
	}
};

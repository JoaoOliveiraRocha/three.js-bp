module.exports = {
	'rules': {
		'arrow-spacing': 'error',
		'comma-dangle': 'warn',
		'eol-last': 'error',
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'key-spacing': [
			'error',
			{
				'beforeColon': false
			}
		],
		'max-len': [
			'error',
			{
				'code': 88,
				'comments': 96,
				'ignoreStrings': true,
				'ignoreUrls': true,
				'tabWidth': 2
			}
		],
		'no-multiple-empty-lines': [
			'error', {
				'max': 1,
				'maxEOF': 1
			}
		],
		'no-trailing-spaces': "error",
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'semi-spacing': "error",
		'space-in-parens': [
			"error",
			"never"
		]
	}
}

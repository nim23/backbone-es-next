var entry = './src/app/main.js',
	output = {
		path: __dirname,
		filename: 'main.js'
	};

module.exports.development = {
		debug : true,
		devtool : 'eval',
		entry: entry,
		output: output,
		module: {
			loaders: [
				{
					test: /\.html$/,
					loader: 'raw',
					exclude: /node_modules/
				},
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					loader: 'babel?optional[]=runtime&stage=1'
				}
			]
		}
};

module.exports.production = {
		debug: false,
		entry: entry,
		output: output,
		module: {
			loaders: [
				{
					test: /\.html$/,
					loader: 'raw',
					exclude: /node_modules/
				},
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					loader: 'babel?optional[]=runtime&stage=1'
				}
			]
		}
};

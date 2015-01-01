var assert   = require('assert');
var gutil    = require('gulp-util');
var img64 = require('../index');
var fs       = require('fs');
var path     = require('path');
var mime	= require('mime');

describe('gulp-img64', function() {
	describe('in buffer mode', function() {

		function getInput(file) {
			var filename = path.join(__dirname, file);

			return new gutil.File({
				base: path.dirname(filename),
				path: filename,
				contents: new Buffer(fs.readFileSync(filename, 'utf8'))
			});
		}

		function getOutput() {
			return fs.readFileSync(path.join(__dirname, '/fixtures/output.html'), 'utf8')
		}

		it('should replace images in DOM with base64 data', function(done) {
			var input = getInput('/fixtures/default_dir/input.html');
			var stream = img64();

			stream.on('data', function(newFile) {
				assert.equal(String(newFile.contents), getOutput());
				done();
			});

			stream.write(input);

		});

		context('when baseDir option is given', function() {
			it('should replace images in DOM with base64 data', function(done) {
				var input = getInput('/fixtures/custom_dir/input.html');
				var stream = img64({baseDir: path.join(__dirname, '/fixtures/custom_dir/elsewhere')});

				stream.on('data', function(newFile) {
					assert.equal(String(newFile.contents), getOutput());
					done();
				});

				stream.write(input);

			})
		})

	});
});

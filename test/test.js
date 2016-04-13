var assert   = require('assert');
var gutil    = require('gulp-util');
var img64 = require('../index');
var fs       = require('fs');
var path     = require('path');
var mime	= require('mime');

describe('gulp-img64', function() {
	describe('in buffer mode', function() {

		it('should replace images in DOM with base64 data', function(done) {

			var filename = path.join(__dirname, '/fixtures/input.html');

			var input = new gutil.File({
				base: path.dirname(filename),
				path: filename,
				contents: new Buffer(fs.readFileSync(filename, 'utf8'))
			});

			var stream = img64();

			stream.on('data', function(newFile) {
				assert.equal(String(newFile.contents), fs.readFileSync(path.join(__dirname, '/fixtures/output.html'), 'utf8'));
				done();
			});

			stream.write(input);

		});

    it('subdir', function(done) {

      var filename = path.join(__dirname, '/fixtures/subdir/input.html');

      var input = new gutil.File({
        base: path.dirname(filename),
        path: filename,
        contents: new Buffer(fs.readFileSync(filename, 'utf8'))
      });

      var stream = img64();

      stream.on('data', function(newFile) {
        assert.equal(String(newFile.contents), fs.readFileSync(path.join(__dirname, '/fixtures/output.html'), 'utf8'));
        done();
      });

      stream.write(input);

    });

	});
});

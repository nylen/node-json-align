var cp     = require('child_process'),
    fs     = require('fs-extra'),
    mocha  = require('mocha'),
    should = require('should'),
    path   = require('path');

JSON.stringifyAligned = require('../index');

process.chdir(__dirname);

var bin = '../bin/json-align.js';

function runScript(args, cb) {
    args = [bin].concat(args);

    var proc   = cp.spawn(process.argv[0], args),
        stdout = '',
        stderr = '';

    proc.stdout.on('data', function(data) {
        stdout += data.toString();
    });

    proc.stderr.on('data', function(data) {
        stderr += data.toString();
    });

    var done = false;
    function onExit(code) {
        if (!done) {
            cb(code, stdout, stderr);
            done = true;
        }
    }

    proc.on('close', onExit).on('exit', onExit);
}

function testScriptStdout() {
    var args = [].slice.call(arguments),
        fn   = args[0];
    return function(done) {
        runScript(args, function(code, stdout, stderr) {
            code.should.equal(0);
            stdout.should.equal(fs.readFileSync(fn).toString());
            stderr.should.equal('');
            done();
        });
    };
}


describe('Command-line script', function() {
    it('should serialize package.json with defaults', testScriptStdout('json/4s-package.json'));
    it('should serialize package.json with 4 spaces', testScriptStdout('json/4s-package.json', '-s', 4));
    it('should serialize package.json with 2 spaces', testScriptStdout('json/2s-package.json', '--spaces', 2));

    it('should serialize package.json with all keys (short option)', testScriptStdout('json/4s-all-package.json', '-a'));
    it('should serialize package.json with all keys (long option)' , testScriptStdout('json/4s-all-package.json', '--all-values'));

    it('should serialize package.json with 2 spaces, all keys (short option)', testScriptStdout('json/2s-all-package.json', '-s', 2, '-a'));
    it('should serialize package.json with 2 spaces, all keys (long option)' , testScriptStdout('json/2s-all-package.json', '-a', '--spaces', 2));

    it('should serialize package.json with tabs'          , testScriptStdout('json/t-package.json', '-t'));
    it('should serialize package.json with tabs, all keys', testScriptStdout('json/t-all-package.json', '--all-values', '-t'));

    it('should fail for multiple files', function(done) {
        runScript(['json/4s-package.json', 'json/2s-package.json'], function(code, stdout, stderr) {
            code.should.not.equal(0);
            stdout.should.equal('');
            stderr.should.match(/Error: When aligning more than one JSON file,/);
            done();
        });
    });

    it('should modify files in-place', function(done) {
        fs.copy('json/min-package.json', 'json/tmp1.json', function(err) {
            if (err) throw err;
            fs.copy('json/min-package.json', 'json/tmp2.json', function(err) {
                if (err) throw err;
                runScript(['json/tmp1.json', 'json/tmp2.json', '-i', '-s', '2'], function(code, stdout, stderr) {
                    code.should.equal(0);
                    stdout.should.equal('');

                    // We don't know which of the two files will complete first
                    try {
                        stderr.should.equal('Aligned JSON file: json/tmp1.json\nAligned JSON file: json/tmp2.json\n');
                    } catch (err) {
                        stderr.should.equal('Aligned JSON file: json/tmp2.json\nAligned JSON file: json/tmp1.json\n');
                    }

                    var contents = fs.readFileSync('json/2s-package.json').toString();
                    fs.readFileSync('json/tmp1.json').toString().should.equal(contents);
                    fs.readFileSync('json/tmp2.json').toString().should.equal(contents);

                    fs.unlinkSync('json/tmp1.json');
                    fs.unlinkSync('json/tmp2.json');
                    done();
                });
            });
        });
    });

    it('should fail when told to use both tabs and spaces', function(done) {
        runScript(['json/4s-package.json', '-s', '2', '-t'], function(code, stdout, stderr) {
            code.should.not.equal(0);
            stdout.should.equal('');
            stderr.should.match(/Error: Indent with either tabs or spaces, not both\.\n/);
            done();
        });
    });
});

#!/usr/bin/env node

var crypto  = require('crypto'),
    fs      = require('fs'),
    program = require('commander');

program
    .version(require('../package.json').version)
    .option('-i, --in-place'    , 'replace file(s) in place')
    .option('-s, --spaces [num]', 'number of spaces to indent by', parseInt)
    .option('-t, --tabs'        , 'use tabs to indent')
    .option('-a, --all-values'  , 'align all values together')
    .parse(process.argv);

JSON.stringifyAligned = require('../index');

if (program.tabs && program.spaces) {
    throw new Error('Indent with either tabs or spaces, not both.');
}

var indent    = (program.tabs ? '\t' : program.spaces || 4),
    allValues = program.allValues;

function align(input) {
    return JSON.stringifyAligned(JSON.parse(input), null, indent, allValues) + '\n';
}

if (program.args.length) {

    if (program.inPlace) {
        program.args.forEach(function(fn) {
            fs.stat(fn, function(err, stats) {
                if (err) throw err;
                fs.readFile(fn, function(err, data) {
                    if (err) throw err;
                    var tmpFile = fn + '_ja' + crypto.randomBytes(4).readUInt32LE(0);
                    fs.writeFile(tmpFile, align(data), { mode: stats.mode }, function(err) {
                        if (err) throw err;
                        fs.rename(tmpFile, fn, function(err) {
                            if (err) throw err;
                            console.error('Aligned JSON file: ' + fn);
                        });
                    })
                });
            });
        });

    } else {
        if (program.args.length > 1) {
            throw new Error(
                "When aligning more than one JSON file, use the '-i'/'--in-place' option.");
        }
        fs.readFile(program.args[0], function(err, data) {
            if (err) throw err;
            process.stdout.write(align(data));
        });
    }

} else {

    var stdin = '';

    process.stdin.on('data', function(buf) {
        stdin += buf.toString();
    }).on('end', function() {
        process.stdout.write(align(stdin));
    }).resume();

}

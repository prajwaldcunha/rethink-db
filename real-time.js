r = require('rethinkdb');

var connection = null;
r.connect({ host: '52.34.77.248', port: 28015, password: 'test@123' }, function (err, conn) {
    if (err) throw err;
    connection = conn;
    console.log('connected');

    r.table('authors').changes().run(connection, function (err, cursor) {
        if (err) throw err;
        cursor.each(function (err, row) {
            if (err) throw err;
            console.log(JSON.stringify(row, null, 2));
        });
    });

});

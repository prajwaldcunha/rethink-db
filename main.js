const Rethinkdb = require('rethinkdb');

var connection = null;

// connect
Rethinkdb.connect({ host: '52.34.77.248', port: 28015, password: 'fyp2019' }, function (err, conn) {
    if (err) {
        console.log("error");
        throw err;
    }
    if (!conn) {
        console.log("unable to connect");
        return;
    }
    connection = conn;
    console.log('connected');

    Rethinkdb.table("data_real_time")
        .filter({ const_id: 12 })
        .update({
            vbs: Rethinkdb.row('vbs').map(function (newStatus) {
                return Rethinkdb.branch(
                    newStatus('vb_name').eq('Node1'),
                    newStatus.merge({ vb_id: 'new 112121' }), newStatus)
            })
        }).
        run(connection, function (err, result) {
            if (err) {
                console.log("error");
                throw err;
            }
            console.log(JSON.stringify(result, null, 2));
        });
});
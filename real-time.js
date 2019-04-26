r = require('rethinkdb');

var connection = null;
r.connect({ host: '52.34.77.248', port: 28015, password: 'fyp2019' }, function (err, conn) {
    if (err) throw err;
    connection = conn;
    console.log('connected');

    r.table('data_real_time').run(connection, function (err, cursor) {    /// select 
        if (err) throw err;
        cursor.toArray(function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
            r.table('data_real_time').changes().run(connection, function (err, cursor) {
                if (err) throw err;
                cursor.each(function (err, row) {
                    if (err) throw err;
                    console.log(JSON.stringify(row, null, 2));
                });
            });
        });
    });



})




// r.connect({ host: '52.34.77.248', port: 28015, password: 'test@123' }, function (err, connection) {
//     if (err) throw err;
//     console.log('connected');

//     r.db('rethinkdb').table('users').filter(r.row("id").eq("admin")).
//         update({ password: "fyp2019" }).
//         run(conn, function (err, result) {
//             if (err) {
//                 throw err;
//                 console.log("error");
//             }
//             console.log(JSON.stringify(result, null, 2));
//         });
// });






       // r.table("data_real_time")
    //     .filter({ id: '63fd64ad-3da7-41c6-88ac-2ca9db9e7946' })
    //     .update({
    //         nodeList: r.row('nodeList').map(function (newStatus) {
    //             return r.branch(
    //                 newStatus('nodeName').eq('Node1'),
    //                 newStatus.merge({ status: 'new value' }), newStatus)
    //         })
    //     }).
    //     run(connection, function (err, result) {
    //         if (err) {
    //             throw err;
    //             console.log("error");
    //         }
    //         console.log(JSON.stringify(result, null, 2));
    //     });
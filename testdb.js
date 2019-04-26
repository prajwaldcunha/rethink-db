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

});

  // select
Rethinkdb.table('data_real_time').run(connection, function (err, cursor) {   
    if (err) {
        console.log("error");
        throw err;
    }
    cursor.toArray(function (err, result) {
        if (err) {
            console.log("error");
            throw err;
        }
        console.log(JSON.stringify(result, null, 2));
    });
});


//create table
Rethinkdb.db('test').tableCreate('data_real_time').run(connection, function(err, result) {
    if (err) {
        console.log("error");
        throw err;
    }
    console.log(JSON.stringify(result, null, 2));
})


//insert table
Rethinkdb.table('data_real_time').insert({"nodeList": [
    {
      "nodeName": "Node1",
      "status": "Not Ready"
    },
    {
      "nodeName": "Node2",
      "status": "Ready"
    },
    {
      "nodeName": "Node3",
      "status": "Ready"
    }
  ]}

).run(connection, function (err, result) {
    if (err) {
        console.log("error");
        throw err;
    }
    console.log(JSON.stringify(result, null, 2));
})



Rethinkdb.table("data_real_time")
    .filter({ id: '63fd64ad-3da7-41c6-88ac-2ca9db9e7946' })
    .update({
        nodeList: Rethinkdb.row('nodeList').map(function (newStatus) {
            return Rethinkdb.branch(
                newStatus('nodeName').eq('Node1'),
                newStatus.merge({ status: 'new value' }), newStatus)
        })
    }).
    run(connection, function (err, result) {
        if (err) {
            console.log("error");
            throw err;
        }
        console.log(JSON.stringify(result, null, 2));
    });


Rethinkdb.table('data_real_time').filter(Rethinkdb.row("id").eq("70589f08-284c-495a-b089-005812ec589f")).
    update({ vb_id: "vb1000" }).
    run(connection, function (err, result) {
        if (err) {
            throw err;
            console.log("error");
        }
        console.log(JSON.stringify(result, null, 2));
    });





//           add to array
var newNote = {
    date: r.now(),
    from: "Inigo Montoya",
    subject: "You killed my father"
};
r.table("users").get(10001).update(
    {notes: r.row("notes").append(newNote)}
).run(conn, callback)



// r.table("data_real_time")                                 //new   adnskdnks
// .filter({ 'const_id': "c1" })
// .update({    
//           vbs: r.row('vbs').map(function (newStatus) {
//           return r.branch(
//           newStatus('vb_id').eq('vb1'),                                          
//           newStatus.merge({vb_name: 'new value'}),newStatus)
//         })
//     });






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

// r.table('data_real_time').filter(r.row("id").eq("70589f08-284c-495a-b089-005812ec589f"))

//   return {
//     // Get all the clients, expect the one we want to update
//     clients: row('clients').filter(function (client) {
//       return client('name').ne('jorge')
//     }
//     // Append a new client, with the update information
//     .delete()
//   };



// r.table('data_real_time').filter(r.row("id").eq("70589f08-284c-495a-b089-005812ec589f")).update({
//     errors: r.row('clients').append('appended error')
// })



// r.table('data_real_time').filter(r.row("id").eq("70589f08-284c-495a-b089-005812ec589f")).
//     update({ vb_id: "vb1000" }).
//     run(connection, function (err, result) {
//         if (err) {
//             throw err;
//             console.log("error");
//         }
//         console.log(JSON.stringify(result, null, 2));
//     });



// r.table('data_real_time').filter({ 'const_id': "c1" })
//     .update(function (row) {
//         return {
//             // Get all the clients, expect the one we want to update
//             vbs: row('vbs').filter(function (vb) {
//                 return vb('vb_name').eq('derebail')
//             })
//                 // Append a new client, with the update information
//                 .append({ vb_id: '1111' })
//         };
//     });


// r.table('data_real_time').filter({ 'const_id': "c1" })
//     .update({
//         EVENT_CODE: r.row('EVENT_CODE')
//             .changeAt(1, r.row('EVENT_CODE').nth(1)
//                 .merge({ "CODE_NAME": "MESSAGE_DELIVERED_TO_APP2" }))
//     })













    // r.table('authors').update({type: "fictional"}).
    // run(connection, function(err, result) {
    //     if (err) throw err;
    //     console.log(JSON.stringify(result, null, 2));
    // });

    // r.table('authors').
    // filter(r.row("name").eq("William Adama")).
    // update({rank: "Admiral"}).
    // run(connection, function(err, result) {
    //     if (err) throw err;
    //     console.log(JSON.stringify(result, null, 2));
    // });

    // r.table('authors').
    // filter(r.row('posts').count().lt(3)).
    // delete().
    // run(connection, function(err, result) {
    //     if (err) throw err;
    //     console.log(JSON.stringify(result, null, 2));
    // });





// });

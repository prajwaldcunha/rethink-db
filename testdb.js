r = require('rethinkdb');

var connection = null;
r.connect({ host: '52.34.77.248', port: 28015, password: 'test@123' }, function (err, conn) {
    if (err) throw err;
    connection = conn;
    console.log('connected');

    // r.db('test').tableCreate('authors').run(connection, function(err, result) {
    //     if (err) throw err;
    //     console.log(JSON.stringify(result, null, 2));
    // })

    r.table('authors').insert([
        { name: "William Adama", tv_show: "Battlestar Galactica",
          posts: [
            {title: "Decommissioning speech", content: "The Cylon War is long over..."},
            {title: "We are at war", content: "Moments ago, this ship received word..."},
            {title: "The new Earth", content: "The discoveries of the past few days..."}
          ]
        },
        { name: "Laura Roslin", tv_show: "Battlestar Galactica",
          posts: [
            {title: "The oath of office", content: "I, Laura Roslin, ..."},
            {title: "They look like us", content: "The Cylons have the ability..."}
          ]
        },
        { name: "Jean-Luc Picard", tv_show: "Star Trek TNG",
          posts: [
            {title: "Civil rights", content: "There are some words I've known since..."}
          ]
        }
    ]).run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    })
    
    






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





});








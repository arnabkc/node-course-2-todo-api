const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/MyTodoApp', (err, client) => {
    if (err) {
        console.log(err);
        return // console.log(err.message);
    }

    console.log('Successfully logged in to MongoDB');

    let db = client.db('MyTodoApp');

    // console.log(db);

    db.collection('TodoList').insertOne({
        text: 'More test text - 4',
        completed: false
    }, (err, result) => {
        if (err) {
            console.log('Unable to insert document', err);
            return
        }

        // console.log(JSON.stringify(result, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());
    });

    client.close();
});

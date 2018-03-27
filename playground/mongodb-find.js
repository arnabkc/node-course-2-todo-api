const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/MyTodoApp', (err, client) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Successfully logged in to MongoDB');

    let db = client.db('MyTodoApp');

    db.collection('TodoList').find({completed: true}).toArray().then((docs) => {
        console.log('Todo list: ');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to find todo list', err);
    });

    // client.close();
});

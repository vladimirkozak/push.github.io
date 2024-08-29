const admin = require("firebase-admin");
const webpush = require('web-push');

var serviceAccount = require("./sotbit-b2c-firebase-adminsdk-vwa79-65c0443850.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sotbit-b2c-default-rtdb.firebaseio.com/"
});


var db = admin.database();
var ref = db.ref("subscriptions");

webpush.setVapidDetails(
    'mailto:uladzimirkoza@gmail.com',
    'BBTEbxoHqW7fW7UL4n62xA5OKp0g1vuJJVZrZH73sCwlhj6e4xyOY00cLxGVvqYeJokG3CdOZcDkQBnGvZ9QHcw',
    'krsxO4L1TzcKMqvMlBPucB-Q_ZCihxWUq4ZmjIAx1k0'
);

ref.once("value", function (snapshot) {
    const subscriptions = snapshot.val();
    const promises = [];

    Object.values(subscriptions).forEach((sub) => {
        const pushConfig = {
            endpoint: sub.endpoint,
            keys: {
                auth: sub.keys.auth,
                p256dh: sub.keys.p256dh,
            }
        };

        const promise = webpush.sendNotification(pushConfig, JSON.stringify({ title: 'New Post', content: 'New Post added' }))
            .catch((err) => console.log("error: ",err)
        );

        promises.push(promise);
    });

    Promise.all(promises).then(() => {
        console.log('all notifications have been sent');
        process.exit(0);
    }).catch((err) => {
        console.log('sending error', err);
        process.exit(1);
    })
});
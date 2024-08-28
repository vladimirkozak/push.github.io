const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:uladzimirkoza@gmail.com',
    'BBTEbxoHqW7fW7UL4n62xA5OKp0g1vuJJVZrZH73sCwlhj6e4xyOY00cLxGVvqYeJokG3CdOZcDkQBnGvZ9QHcw',
    'krsxO4L1TzcKMqvMlBPucB-Q_ZCihxWUq4ZmjIAx1k0'
);

const pushConfig = {
    endpoint: 'https://web.sandbox.push.apple.com/gLdA2y_k3F9DgiNhZBkMNU-8x2hnLaGCBYyrmRQNCi4vZjLYKUVPhtcVzF5XYLY9pcebB1nm5d-KbJ5HVxN2gFTbrHL27lrsbSscsD4HtP61iSxi5qxORyN3ZKVDgP-fI5uXHDVN_OQzZnoUQVwS0ETXI_9TTWyqSVMQTF9d6ZU',
    keys: {
        auth: 'IaWGJsPEGVmd1LcSKObfRQ',
        p256dh: 'BNmTJAE9gEO1uCmL5z67OsR1u3S5BUmfbgbrljZSXOKgINkeSo7nESJpu7H8i3MqHgk9w-MKeO1SLko-AU-jDfM',
    }
};

webpush.sendNotification(pushConfig, JSON.stringify({title: 'New Post', content: 'New Post added'}))
    .catch((err) => console.log(err)
)
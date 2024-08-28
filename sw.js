self.addEventListener('notificationclick', (event) => {
    const notification = event.notification;
    const action = event.action;

    console.log(notification);

    if (action === 'confirm') {
        notification.close();
    } else {
        console.log(action);
        notification.close();
    }
});

self.addEventListener('notificationclose', (event) => {
    console.log('notification was close', event);
});

self.addEventListener('push', (event) => {
    console.log("Push notification received", event);

    const data = {title: 'New!', content: 'Something new happened!'};

    if (event.data) {
        console.log(123);
        
        // data = JSON.parse(event.data.text());
    }

    const options = {
        body: data.content,
        icon: '/icons/icon-512.png',
        badge: '/icons/icon-512.png',
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
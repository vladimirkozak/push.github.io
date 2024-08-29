self.addEventListener('notificationclick', (event) => {
    const notification = event.notification;
    const action = event.action;

    console.log(notification);

    if (action === 'confirm') {
        notification.close();
    } else {
        console.log(action);
        event.waitUntil(
            clients.matchAll()
                .then((clis) => {
                    const client = clis.find((c) => {
                        return c.visibilityState === 'visible';
                    });

                    if (client !== undefined) {
                        client.navigate(notification.data.url);
                        client.focus();
                    } else {
                        clients.openWindow(notification.data.url);
                    }
                    notification.close();
                })
        )
        notification.close();
    }
});

self.addEventListener('notificationclose', (event) => {
    console.log('notification was close', event);
});

self.addEventListener('push', (event) => {
    console.log("Push notification received", event);

    const data = {title: 'New!', content: 'Something new happened!', openUrl: '/'};

    if (event.data) {
        
        // data = JSON.parse(event.data.text());
    }

    const options = {
        body: data.content,
        icon: '/icons/icon-512.png',
        badge: '/icons/icon-512.png',
        data: {
            url: data.openUrl
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
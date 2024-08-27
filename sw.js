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
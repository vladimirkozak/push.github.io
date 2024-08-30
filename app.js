if ("Notification" in window && 'serviceWorker' in navigator) {
    askForNotificationPermission();
}

function askForNotificationPermission() {
    Promise.resolve(Notification.requestPermission()).then((res) => {
        console.log(res);

        if (res !== 'granted') {
            console.log('No notification permission granted!');
        } else {
            configurePushSub();
            //displayConfirmNotification();
        }
    });
}

function configurePushSub() {
    if (!('serviceWorker' in navigator)) {
        return;
    }

    let reg;
    navigator.serviceWorker.ready
        .then((swreg) => {
            reg = swreg;
            return swreg.pushManager.getSubscription();
        }).then((sub) => {
            if (sub === null) {
                // Create a new subscription
                const vapidPublicKey = 'BBTEbxoHqW7fW7UL4n62xA5OKp0g1vuJJVZrZH73sCwlhj6e4xyOY00cLxGVvqYeJokG3CdOZcDkQBnGvZ9QHcw';
                const convertedVapidPublicKey = urlB64ToUint8Array(vapidPublicKey);
                
                return reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidPublicKey
                });
            } else {
                // We have a subscription
            }
        }).then((newSub) => {            
            return fetch('https://sotbit-b2c-default-rtdb.firebaseio.com/subscriptions.json', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(newSub)
            })
        }).then((res) => {
            if (res.ok) {
                // displayConfirmNotification();
            }
        }).catch((error) => {
            console.warn(error);
        })
};

// function displayConfirmNotification() {
//     if ('serviceWorker' in navigator) {
//         const options = {
//             body: 'You successfully subscribed',
//             icon: '/icons/icon-512.png',
//             badge: '/icons/icon-512.png',
//             tag: 'confirm-notification',
//             renotify: true,
//             actions: [
//                 { action: 'confirm', title: 'Okay', icon: '/icons/icon-512.png' },
//                 { action: 'cancel', title: 'Cancel', icon: '/icons/icon-512.png' },
//             ]
//         };
//         navigator.serviceWorker.ready.then((swreg) => {
//             swreg.showNotification('Successfully subscribed from SW', options);
//         })
//     }
// }

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray;
}
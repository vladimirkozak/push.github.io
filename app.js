document.addEventListener('DOMContentLoaded', () => {
    const pushButton = document.querySelector('#pushButton');
    const vapidPublicKey = 'BBTEbxoHqW7fW7UL4n62xA5OKp0g1vuJJVZrZH73sCwlhj6e4xyOY00cLxGVvqYeJokG3CdOZcDkQBnGvZ9QHcw';

    if (!pushButton) {
        return;
    }

    pushButton.addEventListener('click', () => {
        if ("Notification" in window && 'serviceWorker' in navigator) {
            askForNotificationPermission();
        }
    });

    function askForNotificationPermission() {
        Notification.requestPermission((res) => {
            if (res !== 'granted') {
                console.log('No notification permission granted!');
            } else {
                configurePushSub();
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

});

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

const download = document.querySelector('#file');

download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.setAttribute('href', './files/example.xlsx');
    link.setAttribute('download', 'example.xlsx');
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(event);
});
'use client'

import Image from "next/image";
import { isNotifySupported, isGeoSupported, isStorageSupported } from "@/app/swSupport";
import { use, useEffect, useState } from "react";

export default function ProfilePage() {
    const [count, setCount] = useState(0);
    const [isAppInstalled, setIsAppInstalled] = useState(false);
    const [isPwaSupported, setIsPwaSupported] = useState(false);
    const [isPushGranted, setIsPushGranted] = useState(false);
    const [currentGeo, setCurrentGeo] = useState<GeolocationPosition | null>(null);
    const [secretText, setSecretText] = useState<string>();
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

    useEffect(() => {
        const hasRequisite = isNotifySupported() && isGeoSupported() && isStorageSupported();
        setIsPwaSupported(hasRequisite);

        if (window.serwist !== undefined && hasRequisite) {
            try {
                setIsPushGranted(Notification.permission === "granted")
            } catch (err) {
                console.info(err)
            }

            const beforeinstallprompt = (event: any) => {
                console.log("Before install prompt: ", event);
            }

            const appinstalled = (event: any) => {
                console.log("App installed: ", event);
            }

            window.serwist.register()
                .then((result: any) => setRegistration(result))
                .catch((err: any) => alert(err)).catch((err: Error) => console.warn(err))

            window.addEventListener("beforeinstallprompt", beforeinstallprompt);
            window.addEventListener("appinstalled", appinstalled);

            return () => {
                window.removeEventListener("beforeinstallprompt", beforeinstallprompt);
                window.removeEventListener("appinstalled", appinstalled);
            }
        } else {
            console.warn("Serwist is not available or the requisite features are not available")
        }
    }, []);

    useEffect(() => {
        console.info("Service worker registration state: ", registration?.active?.state)
        setIsAppInstalled(registration?.active?.state === "activated")
        setServiceStorage()
    }, [registration?.active?.state])

    useEffect(() => {
        navigator.setAppBadge && navigator.setAppBadge(count)
    }, [count])

    const requestPermission = async () => {
        try {
            if (isPwaSupported)
                Notification.requestPermission().then(async (result) => {
                    if (result === "granted") {
                        setIsPushGranted(true);
                        location.reload();
                        const pm = await registration?.pushManager?.permissionState()
                        if (pm === "granted")
                            registration?.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: "HELLOWORLD",
                            }).then((subscription) => {
                                console.log(subscription.endpoint);
                            }, (err) => console.warn(err))
                    } else {
                        alert("We weren't allowed to send you notifications. Permission state is: " + result);
                    }
                })
            else {
                alert('You need to install this web page to use notifications');
            }
        } catch (err) {
            console.log(err)
        }
    }

    const randomNotification = async () => {
        if (!registration) return

        try {
            const result = await fetch("https://randomuser.me/api/?nat=us,fr,gb,mx,in")
                .then((response) => response.json())
                .then((data) => data.results[0]);

            const options = {
                body: `New message from ${result.name.first} ${result.name.last}`,
                title: `PWA Safari - ${count + 1}`,
                icon: result.picture.thumbnail,
                actions: [
                    {
                        action: "open",
                        title: "Open the app",
                    }
                ]
            };

            await registration.showNotification("Message", options);
            setCount(count + 1)
        } catch (err: any) {
            console.log("Encountered a problem: " + err.message)
            console.log(err)
            alert(err)
        }
    }

    const clearNotifications = async () => {
        navigator.clearAppBadge();
        setCount(0);
        await registration?.getNotifications().then((notifications) => { notifications.forEach((notification) => notification.close()) });
    }

    const requestCurrentPosition = async () => {
        if (isGeoSupported()) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords.latitude, position.coords.longitude);
                setCurrentGeo(position);
            })
        } else {
            console.warn("Geolocation is not supported")
        }
    }

    const setServiceStorage = async () => {
        if (isStorageSupported()) {
            navigator.storage.persist().then((persistent) => {
                if (persistent) {
                    console.log("Storage will not be cleared except by explicit user action");
                } else {
                    console.log("Storage may be cleared by the UA under storage pressure.");
                }
            })
            localStorage.setItem("Test", "it's a secret to everybody")
        } else {
            console.warn("Storage is not supported")
        }
    }

    const getServiceStorage = async () => {
        const saved = localStorage.getItem('Test');
        if (saved) setSecretText(saved)
    }

    return (
        <div className="p-6 space-y-6 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold">
                    👤
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Profile</h1>
                    <p className="text-white/80">Manage your app settings</p>
                </div>
            </div>

            {/* App Status */}
            <div className="card p-6 space-y-4">
                <h2 className="text-lg font-semibold text-slate-800">App Status</h2>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-600">PWA Supported</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            isPwaSupported ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            {isPwaSupported ? 'Yes' : 'No'}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-600">App Installed</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            isAppInstalled ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                            {isAppInstalled ? 'Yes' : 'No'}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-600">Notifications</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            isPushGranted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            {isPushGranted ? 'Granted' : 'Denied'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className="card p-6 space-y-4">
                <h2 className="text-lg font-semibold text-slate-800">Location</h2>
                {currentGeo ? (
                    <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm text-slate-600 mb-2">Current Position:</div>
                        <div className="font-mono text-slate-800">
                            {currentGeo.coords.latitude.toFixed(6)}, {currentGeo.coords.longitude.toFixed(6)}
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={requestCurrentPosition}
                        className="btn-secondary w-full"
                    >
                        📍 Get Current Location
                    </button>
                )}
            </div>

            {/* Notifications */}
            <div className="card p-6 space-y-4">
                <h2 className="text-lg font-semibold text-slate-800">Notifications</h2>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-600">Badge Count: {count}</span>
                        <button 
                            onClick={clearNotifications}
                            className="btn-secondary text-sm px-4 py-2"
                        >
                            Clear
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={requestPermission}
                            className="btn-primary text-sm"
                        >
                            Request Permission
                        </button>
                        <button 
                            onClick={randomNotification}
                            className="btn-secondary text-sm"
                        >
                            Test Notification
                        </button>
                    </div>
                </div>
            </div>

            {/* Storage */}
            <div className="card p-6 space-y-4">
                <h2 className="text-lg font-semibold text-slate-800">Storage</h2>
                <div className="space-y-3">
                    <button 
                        onClick={getServiceStorage}
                        className="btn-secondary w-full"
                    >
                        📦 Get Stored Data
                    </button>
                    {secretText && (
                        <div className="bg-slate-50 p-4 rounded-xl">
                            <div className="text-sm text-slate-600 mb-2">Stored Data:</div>
                            <div className="font-mono text-slate-800">{secretText}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

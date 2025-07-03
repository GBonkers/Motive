# TheMotive - Friend Group Calendar PWA

A Progressive Web App for coordinating friend group events and schedules with iOS push notification support.

**Based on**: This project is built upon the [serviceworker-safari](https://github.com/JoeM-RP/serviceworker-safari) template by [JoeM-RP](https://github.com/JoeM-RP), which demonstrates iOS PWA capabilities and push notification implementation.

**Portfolio Project Notice**: This project is developed for portfolio demonstration purposes only. It is not licensed for distribution, modification, or commercial use.

## 🚀 Features

- **iOS Push Notifications** - Real push notifications on iOS 16.4+ when installed as PWA
- **Friend Group Calendar** - Coordinate events and schedules with your friend group
- **Cross-Platform Support** - Works on iOS, Android, and desktop
- **Offline Functionality** - Access your calendar even without internet
- **Add to Home Screen** - Install like a native app

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Serwist** - Service Worker library for PWA functionality
- **iOS PWA Support** - Push notifications, geolocation, storage

## 📱 Getting Started

This project uses the same setup as the original [serviceworker-safari](https://github.com/JoeM-RP/serviceworker-safari) template.

Install dependencies and start the development server:

```bash
npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### iOS Testing

To test push notifications on iOS devices:

```bash
# Install ngrok globally if you haven't already
npm install -g ngrok

# Expose your local server to the internet
npx ngrok http 3000
```

1. Visit the ngrok URL on your iOS device using Safari
2. Use "Add to Home Screen" to install the PWA
3. Open the app from your home screen (not Safari) to test push notifications

## 🏗️ Architecture

This PWA implements modern service worker features available in iOS Safari (>=16.4):

- **Push Notifications** - Cross-platform notification system
- **Service Worker Caching** - Offline functionality and fast loading
- **PWA Manifest** - Installable web app configuration
- **Background Sync** - Data synchronization when online

### Key Files

The following files are inherited from the [serviceworker-safari](https://github.com/JoeM-RP/serviceworker-safari) template:

- `app/sw.ts` - Service worker configuration with Serwist
- `app/layout.tsx` - PWA metadata and app shell
- `app/page.tsx` - Main application with push notification demo
- `public/manifest.json` - PWA manifest for installation
- `next.config.mjs` - Next.js configuration with service worker setup

## 📋 Development Features

The app includes helper functions for feature detection:

- Push notification support checking
- Geolocation API availability
- Storage persistence capabilities
- Service worker registration handling

## 🎯 Project Goals

This project demonstrates:

- Modern PWA development with Next.js
- iOS push notification implementation
- Service worker best practices
- TypeScript development patterns
- Mobile-first responsive design

## 📄 Attribution & License

**Original Template**: This project is built upon the [serviceworker-safari](https://github.com/JoeM-RP/serviceworker-safari) repository by [JoeM-RP](https://github.com/JoeM-RP). The original template provides a complete demonstration of iOS PWA capabilities including push notifications, service worker implementation, and PWA installation features.

**Modifications**: This version adapts the original template for a friend group calendar application while maintaining the core iOS PWA functionality.

**Portfolio Use Only**: This project is developed for portfolio demonstration purposes. It showcases PWA development skills and is not intended for distribution, modification, or commercial use.

## 🔗 Learn More

Technical resources used in this project:

- [Progressive Web Apps](https://web.dev/explore/progressive-web-apps) - PWA fundamentals
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) - Service worker documentation
- [Web Push for iOS](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/) - iOS PWA push notifications
- [Safari Push Notifications](https://developer.apple.com/notifications/safari-push-notifications/) - Apple's notification overview
- [Serwist](https://github.com/serwist/serwist) - Service worker library

---

*Developed by Guillaume for portfolio demonstration - showcasing modern PWA development with iOS push notifications*

**Original Template Credit**: [serviceworker-safari](https://github.com/JoeM-RP/serviceworker-safari) by [JoeM-RP](https://github.com/JoeM-RP)
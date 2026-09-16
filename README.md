# Aura

React Native shopping app. Splash → Login → Home → Product Detail / Cart flow, Redux-backed, no navigation library (screen switching done in `RootNavigator`).

## Tech stack

- React Native 0.87 / React 19
- TypeScript
- Redux Toolkit + react-redux (state)
- Axios (API client)
- AsyncStorage (persisted auth session)
- react-native-svg / custom icons

## Project structure

```
App.tsx                  Entry point, Redux Provider + SafeAreaProvider
src/
  app/
    RootNavigator.tsx    Auth-state-driven screen switch (splash/login/home/detail/cart)
  api/                   Axios client + endpoint modules (auth, products, carts)
  store/                 Redux store + typed hooks
  features/
    auth/                Login screen, auth slice, view models, session storage
    splash/              Splash screen + bootstrap/session-restore view model
    home/                Home screen, categories + products slices/view models
    product/             Product detail screen, slice, view model
    cart/                Cart screen, slice, view model
  components/            Shared UI (Snackbar, icons)
```

Each feature follows a slice + view-model pattern: a Redux slice for state, a `use<Feature>ViewModel` hook wiring slice/API together, and the screen component consuming the hook.

## Getting started

Install dependencies:

```sh
npm install
```

Start Metro:

```sh
npm start
```

Run on a platform (in a separate terminal, with Metro running):

```sh
npm run android
npm run ios
```

## Scripts

| Script | Description |
| --- | --- |
| `npm start` | Start Metro bundler |
| `npm run android` | Build and run on Android |
| `npm run ios` | Build and run on iOS |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |

## Requirements

- Node >= 22.11.0
- React Native environment set up per the [official RN setup guide](https://reactnative.dev/docs/environment-setup)

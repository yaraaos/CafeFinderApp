// App.js at root level
import React from 'react';
import { ExpoRoot } from 'expo-router';

if (__DEV__) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

export default function App() {
  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}

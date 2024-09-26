import posthog from 'posthog-js';

const postHogClient = posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  // person_profiles: 'identified_only',
  capture_pageview: false,
  capture_pageleave: false,
});

export default postHogClient;

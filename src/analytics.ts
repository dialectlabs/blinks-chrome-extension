import posthog from 'posthog-js';

const postHogClient = posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  person_profiles: 'identified_only',
});

export default postHogClient;

// Dev-only test credentials. Prefer environment variables over committing secrets.
export const TEST_USER = {
  email: import.meta.env.VITE_TEST_USER_EMAIL ?? "tankstackinfo@gmail.com",
  password: import.meta.env.VITE_TEST_USER_PASSWORD ?? "WebRedesign@2o25",
};

export const isTestCredsConfigured = () => {
  return !!import.meta.env.VITE_TEST_USER_EMAIL && !!import.meta.env.VITE_TEST_USER_PASSWORD;
};

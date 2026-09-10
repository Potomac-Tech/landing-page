// Server-side helper for the Sites dispatch-owned sign-in route.
export function chatGPTSignInPath(returnTo: string): string {
  const path =
    returnTo.startsWith('/') &&
    !returnTo.startsWith('//') &&
    !returnTo.includes('\\')
      ? returnTo
      : '/';
  return `/signin-with-chatgpt?return_to=${encodeURIComponent(path)}`;
}

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') return 'https://soldev.app/';
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview')
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  return process.env.NEXT_PUBLIC_SITE_URL;
};

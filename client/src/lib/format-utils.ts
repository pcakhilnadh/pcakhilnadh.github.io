/**
 * Formats a platform name for display
 * Converts snake_case to Title Case with spaces
 */
export function formatPlatformName(platform: string): string {
  // Handle special cases
  if (platform === 'personal_blog') return 'Personal Blog';
  
  // Convert snake_case to Title Case with spaces
  return platform
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
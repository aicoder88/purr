export function normalizePathnameForRedirect(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }

  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const collapsed = withLeadingSlash.replace(/\/+/g, '/');
  const trimmed = collapsed.replace(/\/+$/, '');
  return trimmed.length === 0 ? '/' : trimmed;
}

export function shouldRedirectToLocalizedPath(pathname: string, localizedPath: string): boolean {
  return normalizePathnameForRedirect(pathname) !== normalizePathnameForRedirect(localizedPath);
}

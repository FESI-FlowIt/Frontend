export function routeByStatus(status?: number) {
  if (!status) return;
  if (status >= 500) {
    window.location.replace('/error/500error');
  } else if (status >= 400) {
    window.location.replace('/error/400error');
  }
}

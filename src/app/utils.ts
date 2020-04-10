export function makeUrl(path: string, queryParams?: { [key: string]: string | number }): string{
  return path + (!queryParams || Object.keys(queryParams).length === 0 ? '' : '?' + Object.keys(queryParams).map(v => v + '=' + queryParams[v]).join('&'));
}
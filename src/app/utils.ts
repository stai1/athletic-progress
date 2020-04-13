export function makeUrl(path: string, queryParams?: { [key: string]: string | number }): string{
  return path + (!queryParams || Object.keys(queryParams).length === 0 ? '' : '?' + Object.keys(queryParams).map(v => v + '=' + queryParams[v]).join('&'));
}

export function pathjoin(...args: string[]): string {
  return args.map((part, i) => {
    if (i === 0) {
      return part.toString().trim().replace(/[\/]*$/g, '')
    } else {
      return part.toString().trim().replace(/(^[\/]*|[\/]*$)/g, '')
    }
  }).filter(x=>x.length).join('/')
}
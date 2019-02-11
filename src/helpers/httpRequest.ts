export function httpRequest(method: httpMethod, url: string, payload?: {}) {
  const headers = {
    Accept: 'application/json',
  };
  let body;
  if (method !== httpMethod.get && method !== httpMethod.delete) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(payload);
  }
  return fetch(`http://localhost:1111/${url}`, {headers, method, body});
}

export enum httpMethod {
  get = 'GET',
  post = 'POST',
  delete = 'DELETE',
  patch = 'PATCH',
}

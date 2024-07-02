type Callback = (error: any, data: any) => void;

async function makeHttpRequest(method: string, endpoint: string, userToken: string, bodyObject: object | null, callback: Callback): Promise<void> {
  try {
    if (!userToken) {
      throw new Error("Brak dostępu do wykonania requesta");
    }

    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
      },
      body: bodyObject ? JSON.stringify(bodyObject) : null
    };

    const response = await fetch(process.env.REACT_APP_API_URL + endpoint, requestOptions);

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Unauthorized ' + response.status);
      }

      if (response.status === 400) {
        throw new Error(await response.text());
      }

      throw new Error('Network response was not ok: ' + response.status);
    }
    if (method === 'DELETE') {
      const data = await response.text();
      callback(false, data);
    } else {
      const data = await response.json();
      callback(false, data);
    }
  } catch (error: any) {
    console.error(error);
    callback(error, null);
  }
}

export function makeRequestGet(endpoint: string, token: string, callback: Callback): void {
  makeHttpRequest('GET', endpoint, token, null, callback);
}

export function makeRequestDelete(endpoint: string, token: string, callback: Callback): void {
  makeHttpRequest('DELETE', endpoint, token, null, callback);
}

export function makeRequestPut(endpoint: string, token: string, bodyObject: object, callback: Callback): void {
  makeHttpRequest('PUT', endpoint, token, bodyObject, callback);
}

export function makeRequestPatch(endpoint: string, token: string, bodyObject: object, callback: Callback): void {
  makeHttpRequest('PATCH', endpoint, token, bodyObject, callback);
}
export function makeRequestPost(endpoint: string, token: string, bodyObject: object, callback: Callback): void {
  makeHttpRequest('POST', endpoint, token, bodyObject, callback);
}
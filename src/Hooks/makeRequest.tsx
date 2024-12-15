type Callback = (error: any, data: any) => void;

async function makeHttpRequest(
  method: string,
  endpoint: string,
  userToken: string,
  bodyObject: object | null,
  callback: Callback
): Promise<void> {
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

    const contentType = response.headers.get("Content-Type") || "";
    let responseData: any;

    // Pobieranie danych odpowiedzi w zależności od typu odpowiedzi
    if (contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      // Bezpośrednie przekazanie statusu i odpowiedzi błędu do callbacka
      callback({ status: response.status, message: responseData }, null);
      return;
    }

    // Jeśli żądanie zakończyło się powodzeniem, przekaż dane do callbacka
    callback(null, responseData);
  } catch (error: any) {
    console.error(error);
    callback({ message: error.message }, null);
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

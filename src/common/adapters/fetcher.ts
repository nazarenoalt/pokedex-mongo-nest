export class Fetcher {
  constructor() {}

  async get<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, { ...options, method: 'GET' });
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    return response.json();
  }
}

// @ts-ignore

import ConfigService from "./ConfigService";

class HttpClient {
  backendUrl: string;
  constructor() {
    this.backendUrl = ConfigService.getEnvironmentConfigurations().baseUrl
  }
  async extractJson<T>(response: Response): Promise<T> {
    return await response.json();
  }

  private getHttpHeaders() {
    let requestHeaders: HeadersInit = new Headers();

    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Accept', 'application/json');

    return requestHeaders;

  }
  async get<T>(endpoint: string): Promise<T> {
    console.log(`${this.backendUrl + endpoint}`);
    const response = await fetch(this.backendUrl + endpoint, {
      method: "GET",
      headers: this.getHttpHeaders(),
    });
    const data = await this.extractJson<T>(response);
    return data;
  }

  async post<T>(endpoint: string, bodyPayload: object): Promise<T> {
    const response = await fetch(this.backendUrl + endpoint, {
      method: "POST",
      headers: this.getHttpHeaders(),
      body: JSON.stringify(bodyPayload),
    });
    const data = await this.extractJson<T>(response);
    return data;
  }

}

export default new HttpClient();
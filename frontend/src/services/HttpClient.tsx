// @ts-ignore

import ConfigService from "./ConfigService";

class HttpClient {
  backendUrl: string;
  urlBonita: string;

  constructor() {
    this.backendUrl = ConfigService.getEnvironmentConfigurations().baseUrl;
    this.urlBonita = ConfigService.getEnvironmentConfigurations().bonitaUrl;
  }

  determinateBackend(urlBonita?: boolean): string {
    return urlBonita ? this.urlBonita : this.backendUrl;
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
  async get<T>(endpoint: string, bonitaUrl?: boolean): Promise<T> {
    const backend: string = this.determinateBackend(bonitaUrl);

    const response = await fetch(backend + endpoint, {
      method: "GET",
      headers: this.getHttpHeaders(),
    });
    const data = await this.extractJson<T>(response);
    return data;
  }

  async post<T>(endpoint: string, bodyPayload: object, bonitaUrl?: boolean): Promise<T> {
    const backend: string = this.determinateBackend(bonitaUrl);

    const response = await fetch(backend + endpoint, {
      method: "POST",
      headers: this.getHttpHeaders(),
      body: JSON.stringify(bodyPayload),
    });
    const data = await this.extractJson<T>(response);
    return data;
  }

}

export default new HttpClient();
import { ApiClass } from './generalApi';

class ChatsServices extends ApiClass {
  constructor(baseURL?: string, config?: Record<string, any>) {
    super(baseURL, config);
  }
}

export const ChatsAPI = new ChatsServices();

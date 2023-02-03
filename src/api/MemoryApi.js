import http from '../utils/http';

export default class MemoryApi {
  static createMemory(body) {
    return http(true).post('/memory', body);
  }

  static getUserMemories() {
    return http(true).get('/memory');
  }

  static searchMemories(searchTerm) {
    return http(true).get(
      `/memory/search?searchTerm=${searchTerm.replace(' ', '+')}`
    );
  }

  static editMemory(id, body) {
    return http(true).patch(`/memory/${id}`, body);
  }

  static deleteMemory(id) {
    return http(true).delete(`/memory/${id}`);
  }
}

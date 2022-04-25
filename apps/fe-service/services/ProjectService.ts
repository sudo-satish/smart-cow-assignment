import RestApiClient from "./RestApiClient";

const AUTH_SERVICE_URL =
  process.env.NEXT_PUBLIC_BE_SERVICE_URL ||
  "http://localhost:3001";

interface CreateProjectDto {
  name: string
}

class ProjectService {
  async create(body: CreateProjectDto) {
    return RestApiClient.axios.post('/projects', body);
  }

  async list() {
    return RestApiClient.axios.get('/projects').then((response: any) => response.data);
  }

  async delete(id: string) {
    return RestApiClient.axios.delete(`/projects/${id}`).then((response: any) => response.data);
  }

  async deleteImage(id: string) {
    return RestApiClient.axios.delete(`/images/${id}`).then((response: any) => response.data);
  }

  async find(id: string) {
    return RestApiClient.axios.get(`/projects/${id}`).then((response: any) => response.data);
  }

  async uploadImages(id: string, files: any) {
    var formdata = new FormData();
    console.log(files);
    
    formdata.append("files", files[0], files[0].name);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(AUTH_SERVICE_URL+`/projects/${id}/upload`, requestOptions as any)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  async fetchImages(id: string) {
    return RestApiClient.axios.get(`/projects/${id}/images`).then((response: any) => response.data);
  }

  async fetchAnnotations(imageId: string) {
    return RestApiClient.axios.get(`/images/${imageId}/annotations`).then((response: any) => response.data);
  }

  async createAnnotation(imageId: string, annotation: any) {
    return RestApiClient.axios.post(`/images/${imageId}/annotations`, annotation).then((response: any) => response.data);
  }
}

export default new ProjectService();

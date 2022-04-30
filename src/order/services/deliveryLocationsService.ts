const API_URL = 'https://api.facts.ng/v1/';

const deliveryLocationsService = {
  apiURl(path?: string) {
    return `${API_URL}states/${path}`;
  },

  read() {
    return fetch(this.apiURl());
  },

  readOne(id: string) {
    return fetch(this.apiURl(id));
  },
};

export default deliveryLocationsService;

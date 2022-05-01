const API_URL = 'http://locationsng-api.herokuapp.com/api/v1/lgas/';

const deliveryLocationsService = {
  read() {
    return fetch(API_URL);
  },
};

export default deliveryLocationsService;

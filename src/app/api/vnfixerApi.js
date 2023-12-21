import instance, { provinces } from "./apiConfig";
import queryString from "query-string";

const vnfixerAPI = {
  // Province
  getAllProvince: () => {
    return provinces.get();
  },
  getAllDistrict: (province) => {
    const url = `${province}?depth=2`;
    return provinces.get(url);
  },
  //Request
  sendRequest: (params) => {
    const url = `/requests`;
    return instance.post(url, { ...params });
  },
  getRequests: (limit = "10", page = "1") => {
    const query = {
      ...limit,
      ...page,
    };
    const url = `/requests?${queryString.stringify({
      ...query,
    })}`;
    return instance.get(url);
  },
  getRequest: (id) => {
    const url = `/requests?${id}`;
    return instance.get(url);
  },
  //Categories
  getCategories: () => {
    const url = `/categories`;
    return instance.get(url);
  },
  getCategory: (id) => {
    const url = `/category?${id}`;
    return instance.get(url);
  },
  //Agency
  getAgencies: (limit = "10", page = "1") => {
    const query = {
      ...{ limit },
      ...{ page },
    };
    const url = `/agencies?${queryString.stringify({
      ...query,
    })}`;
    return instance.get(url);
  },
  getAgency: (id) => {
    const url = `/agency?${id}`;
    return instance.get(url);
  },

  //   getProvinces: (id, name, idUser) => {
  //     const query = {
  //       ...(id && { bookId: id }),
  //       ...(name && { bookName: name }),
  //       ...(idUser && { userProfileId: idUser }),
  //     };
  //     const url = `books/find?${queryString.stringify({
  //       ...query,
  //     })}`;
  //     return instance.get(url);
  //   },
};
export default vnfixerAPI;

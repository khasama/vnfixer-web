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
  // categories
  getCategories: () => {
    const url = `/categories`;
    return instance.get(url);
  },
  //request
  sendRequest: (params) => {
    console.log(params);
    const url = `/requests`;
    return instance.post(url, { ...params });
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

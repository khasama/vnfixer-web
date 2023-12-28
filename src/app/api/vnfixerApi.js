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
  sendRequestById: (params) => {
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
  getMyRequests: () => {
    const url = `/requests/me`;
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
  getAgenciesBy: (
    city = "Tiền Giang",
    categoryId = "7",
    limit = "10",
    page = "1"
  ) => {
    const query = {
      ...{ city },
      ...{ categoryId },
      ...{ limit },
      ...{ page },
    };
    const url = `/agencies?${queryString.stringify({
      ...query,
    })}`;
    return instance.get(url);
  },
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
    const url = `/agencies/${id}`;
    return instance.get(url);
  },
  // Manage
  getRequestManager: ({ limit = "10", page = "1", category, city, status }) => {
    const query = {
      ...{ limit },
      ...{ page },
      ...(category && { category }),
      ...(city && { city }),
      ...(status && { status }),
    };
    const url = `/requests?${queryString.stringify({
      ...query,
    })}`;
    return instance.get(url);
  },
  pickRequestManager: (id) => {
    const url = `/requests/pick/${id}`;
    return instance.put(url);
  },
  getBranches: (id) => {
    const url = `/agencies/${id}`;
    return instance.get(url);
  },
  getStaffs: () => {
    const url = `/branches/staffs`;
    return instance.get(url);
  },
  removeStaff: (id) => {
    const url = `branches/remove-staff/${id}`;
    return instance.delete(url);
  },
};
export default vnfixerAPI;

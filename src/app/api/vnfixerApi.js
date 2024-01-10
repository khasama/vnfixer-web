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
  //ChatBot
  chatBot: (data) => {
    const url = `/chatbot/ask`;
    return instance.post(url, data);
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
  //Invite
  getMyInvite: () => {
    const url = `/users/staff-request`;
    return instance.get(url);
  },
  replyInvite: (action, data) => {
    const url = `/users/staff-request?action=${action}`;
    return instance.put(url, data);
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
  createAgency: (data) => {
    const url = `/agencies`;
    return instance.post(url, data);
  },
  updateAgency: (id, data) => {
    const url = `/agencies/${id}`;
    return instance.put(url, data);
  },
  getAgencyPayment: (id) => {
    const url = `/agencies/payment/${id}`;
    return instance.get(url);
  },
  postAgencyPayment: (id, data) => {
    const url = `/agencies/payment/${id}`;
    return instance.post(url, data);
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
  getRequestManagerForBranch: ({
    limit = "10",
    page = "1",
    category,
    city,
    status,
    branchId,
  }) => {
    const query = {
      ...{ limit },
      ...{ page },
      ...(category && { category }),
      ...(city && { city }),
      ...(status && { status }),
      ...(branchId && { branchId }),
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
  createBranch: (data) => {
    const url = `/branches`;
    return instance.post(url, data);
  },
  updateBranch: (id, data) => {
    const url = `/branches/${id}`;
    return instance.put(url, data);
  },
  getStaffs: () => {
    const url = `/branches/staffs`;
    return instance.get(url);
  },
  getCustomer: (mail) => {
    const url = `/users?email=${mail}`;
    return instance.get(url);
  },
  inviteCustomer: (data) => {
    const url = `/branches/add-staff`;
    return instance.post(url, data);
  },
  removeStaff: (id) => {
    const url = `branches/remove-staff/${id}`;
    return instance.delete(url);
  },
  //staff
  getTakeRequest: () => {
    const url = `/requests/requests-take`;
    return instance.get(url);
  },
  pickRequestStaff: (id) => {
    const url = `/requests/take/${id}`;
    return instance.put(url);
  },
  getTakedRequest: () => {
    const url = `/requests/request-taked`;
    return instance.get(url);
  },
  changeStatusRequest: (id, status) => {
    const url = `/requests/change-status/${id}?status=${status}`;
    return instance.patch(url);
  },
};
export default vnfixerAPI;

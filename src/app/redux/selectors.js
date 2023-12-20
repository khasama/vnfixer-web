export const currentUserSelector = (state) => state.auth.currentUser;
export const isLoggedInSelector = (state) => state.auth.isLoggedIn;
export const messageErrorSelector = (state) => state.auth.messageError;
export const roleSelector = (state) => state.auth.role;
export const provincesSelector = (state) => state.location.provinces;
export const districtsSelector = (state) => state.location.districts;
export const categoriesSelector = (state) => state.category.categories;

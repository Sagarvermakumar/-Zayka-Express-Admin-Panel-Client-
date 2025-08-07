import axios from "axios";

const API = axios.create({
  baseURL: `${"http://localhost:4000"}/api/v1`, // Your actual API base URL
  withCredentials: true, // for cookies/session
});

// login as admin 
export const loginAdminApi = (data) => API.post("/admin/login", data);

// common user APIs for Admin & User
// get profile
export const getProfileApi = () =>  API.get("/user/me");

// change password
export const changePasswordApi = (data) => API.put("/user/change-password", data);

// update profile
export const updateProfileApi = (data) => API.patch("/user/update-profile", data);  


// update avatar
export const updateAvatarApi = (avatar) => {
  return API.patch("/user/profile/update/avatar", avatar, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


// logout user
export const logoutUserApi = () => API.get("/user/logout");
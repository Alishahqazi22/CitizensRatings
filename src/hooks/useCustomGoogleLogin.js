import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { axiosInstance } from "../Config/axiosInstance";

export function useCustomGoogleLogin() {
  const logInWithGoogle = async (userInfo) => {
    const formData = new FormData();
    formData.append("role", "user");
    formData.append("email", userInfo?.email);
    formData.append("family_name", userInfo?.family_name);
    formData.append("given_name", userInfo?.given_name);
    formData.append("id", userInfo?.id);
    formData.append("name", userInfo?.name);
    formData.append("picture", userInfo?.picture);
    formData.append("verified_email", userInfo?.verified_email);
    try {
      const response = await axiosInstance.post("google/login", formData);
      if (response?.data?.data?.status) {
        localStorage.setItem("accessToken", response?.data?.data?.accessToken);
        localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.data?.user)
        );
        toast.success(response?.data?.data?.message);
        window.location.href = "/";
      } else {
        toast.error(response?.data?.data?.message);
      }
    } catch (error) {
      console.error("Signup API error:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse?.access_token;
      try {
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const userInfo = await userInfoResponse.json();
        if (userInfoResponse.ok) {
          logInWithGoogle(userInfo);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  return [login];
}

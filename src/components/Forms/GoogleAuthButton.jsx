import { FcGoogle } from "react-icons/fc";
import { useCustomGoogleLogin } from "../../hooks/useCustomGoogleLogin";

function GoogleAuthButton() {
  const [signWithGoogle] = useCustomGoogleLogin();
  return (
    <button
      onClick={signWithGoogle}
      className="w-full flex items-center justify-center gap-2 border rounded-md py-2 mb-4 hover:bg-gray-100"
    >
      <FcGoogle size={28} />
      Login with Google
    </button>
  );
}

export default GoogleAuthButton;

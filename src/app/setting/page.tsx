import SettingComponent from "@/components/Setting/SettingComponent";
import { server } from "@/lib/fetch/server";
import { UserInfo } from "@/stores/useAuthStore";
import { APIErrorResponse } from "@/types/api";

const SettingPage = async () => {
  let user: UserInfo;

  try {
    user = await server<UserInfo>("/users/my", {
      needAuth: true,
    });
  } catch (err) {
    const statusCode = err instanceof APIErrorResponse ? err.statusCode : 500;
    console.log(statusCode);
    throw err; // error.tsx로 넘어감
  }

  return (
    <div className="max-w-3xl mx-auto">
      <SettingComponent user={user} />
    </div>
  );
};

export default SettingPage;

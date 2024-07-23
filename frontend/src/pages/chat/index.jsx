import { Button } from "@/components/ui/button";
import { useAllUserQuery } from "@/store/services/userServiceApi";
import { useSelector } from "react-redux";
const Chat = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <>
      <h1>This is the chat profile</h1>
      {userInfo?.email ? <h2>{userInfo?.email}</h2> : null}
    </>
  );
};

export default Chat;

import Lottie from "lottie-react";
import waveHandAnimation from "@/assets/wave-hand.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useSignupMutation,
} from "@/store/services/userServiceApi";
import { useDispatch } from "react-redux";
import { userLogin } from "@/store/slice/userSlice";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const loginHandler = async (data) => {
    try {
      const { data: sendData } = await login(data).unwrap();
      dispatch(userLogin(sendData));
      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  const signupHandler = (data) => {};
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] w-[80vw] border-2 bg-white border-white rounded-md shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center ">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-2xl">Welcome</h1>
              <Lottie
                className="w-12"
                animationData={waveHandAnimation}
                loop={true}
              />
            </div>
            <p className="font-medium text-center">
              Fill the details to get started with best chat app!
            </p>
          </div>
          <div className="w-full flex items-center justify-center flex-col">
            <Tabs defaultValue="login" className="w-3/4">
              <TabsList className="bg-transparent border-none w-full">
                <TabsTrigger
                  value="login"
                  className="text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              {/* login the form */}
              <TabsContent value="login" className="flex flex-col gap-5 mb-10">
                <Input
                  type="email"
                  placeholder="Email"
                  className="rounded-full p-4"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />

                <Input
                  type="password"
                  placeholder="Password"
                  className="rounded-full p-4"
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <Button
                  type="submit"
                  onClick={() => loginHandler({ email, password })}
                  className="rounded-full p-6"
                >
                  Login
                </Button>
              </TabsContent>

              {/* signup form */}
              <TabsContent value="signup" className="flex flex-col gap-5 mb-10">
                <Input
                  type="email"
                  placeholder="Email"
                  className="rounded-full p-4"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  className="rounded-full p-4"
                  onChange={(e) => setEmail(e.target.value)}
                  value={password}
                />

                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="rounded-full p-4"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />

                <Button
                  onClick={() =>
                    signupHandler({ email, confirmPassword, password })
                  }
                  className="rounded-full p-6"
                >
                  Sign up
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img
            src="https://i.pinimg.com/originals/65/0f/e5/650fe5d33972981df14eaea76b87a4ce.jpg"
            alt="background login"
            className="h-[700px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;

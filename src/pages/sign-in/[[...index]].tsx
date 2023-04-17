import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  <div>
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>;
};

export default SignInPage;

const styles = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

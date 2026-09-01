import "./App.css";
import { authClient } from "./lib/auth";

function App() {
  const signInGoogle = async () => {
    authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "http://localhost:5174/dashboard",
      },
      {
        onError: (ctx) => {
          console.log("success", ctx);
        },
        onSuccess: (ctx) => {},
      },
    );
  };

  const signIn = async () => {
    authClient.signIn.email(
      {
        email: "nestjs@yopmail.com",
        password: "Test@321",
      },
      {
        onSuccess: (ctx) => {
          console.log("success", ctx);
        },
        onError: (ctx) => {
          console.error("failed", ctx.error.message);
          alert(ctx.error.message);
        },
      },
    );
  };

  const signUp = async () => {
    authClient.signUp.email(
      {
        email: "nestjs@yopmail.com",
        password: "Test@321",
        name: "John Doe",
        callbackURL: "/dashboard",
        image:
          "https://images.unsplash.com/photo-1580128637411-80206ae868e5?q=80&w=752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        onError: (ctx) => {
          console.error("failed", ctx.error.message);
          alert(ctx.error.message);
        },
        onSuccess: (ctx) => {
          console.log(ctx.data);
        },
      },
    );
  };

  return (
    <>
      <section id="center">
        <button onClick={signIn}>Sign In</button>
        <button onClick={signInGoogle}>Sign In with Google</button>
        <button onClick={signUp}>Sign Up</button>
      </section>
    </>
  );
}

export default App;

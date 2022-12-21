import AuthForm from "components/Auth/AuthForm/index";

function Signin() {
  const user = {
    pseudo: "Malou",
    email: "test@test.fr",
    pwd: "toto",
    pwdConfirm: "toto",
  };

  return (
    <>
      <h3 className="text-center">Connexion</h3>
      <AuthForm existingUser={user} />
    </>
  );
}

export default Signin;

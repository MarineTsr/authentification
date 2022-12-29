import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "api";

function Signin() {
  // REDIRECTION INIT ---

  // FORM SCHEMA ---
  const userSchema = yup.object({
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .email("Le format de l'email est invalide"),
    pwd: yup
      .string()
      .required("Le champ est obligatoire")
      .min(8, "Le champ doit faire au moins 8 caractères"),
  });

  // FORM DEFAULT VALUES ---
  const defaultValues = {
    email: "",
    pwd: "",
  };

  // REACT HOOK FORM INIT ---
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(userSchema),
  });

  // FORM HANDLERS ---
  const formSubmit = async (data, event) => {
    try {
      clearErrors();
      const user = await signIn(data);

      if (user) {
        reset(defaultValues);
      }
    } catch (err) {
      setError("globalErr", {
        type: "globalErr",
        message: err.message,
      });
    }
  };

  return (
    <>
      <h3 className="text-center">Connexion</h3>
      <form onSubmit={handleSubmit(formSubmit)}>
        {errors?.globalErr && (
          <div className="message is-danger">
            <span className="message-body">{errors.globalErr.message}</span>
          </div>
        )}

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            className={`${errors?.email ? "is-danger " : ""}form-control`}
            {...register("email")}
          />
          {errors?.email && (
            <p className="form-help is-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            className={`${errors?.pwd ? "is-danger " : ""}form-control`}
            {...register("pwd")}
          />
          {errors?.pwd && (
            <p className="form-help is-danger">{errors.pwd.message}</p>
          )}
        </div>

        <div className="d-flex flex-column align-items-center mt-5">
          <Link to="../inscription" className="back-link">
            Créer un compte
          </Link>

          <button
            type="submit"
            className="btn btn--filled btn--secondary mt-5"
            disabled={isSubmitting}
          >
            Connexion
          </button>
        </div>
      </form>
    </>
  );
}

export default Signin;

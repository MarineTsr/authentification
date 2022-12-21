import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUser } from "api";

function AuthForm({ existingUser }) {
  // REDIRECTION INIT ---
  const navigate = useNavigate();

  // FORM SCHEMA ---
  const userSchema = yup.object({
    pseudo: yup.string().required("Le champ est obligatoire"),
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .email("Le format de l'email est invalide"),
    pwd: yup
      .string()
      .required("Le champ est obligatoire")
      .min(8, "Le champ doit faire au moins 8 caractères"),
    pwdConfirm: yup
      .string()
      .required("Le champ est obligatoire")
      .oneOf([yup.ref("pwd"), ""], "Les mots de passes sont différents"),
  });

  // FORM DEFAULT VALUES ---
  const defaultValues = {
    pseudo: existingUser ? existingUser.pseudo : "",
    email: existingUser ? existingUser.email : "",
    pwd: existingUser ? existingUser.pwd : "",
    pwdConfirm: existingUser ? existingUser.pwd : "",
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

      console.log(data);
      const user = await createUser(data);

      if (user) {
        reset(defaultValues);
        navigate("/auth/connexion");
      }
    } catch (err) {
      setError("globalErr", {
        type: "globalErr",
        message: err.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      {errors?.globalErr && (
        <div className="message is-danger">
          <span className="message-body">{errors.globalErr.message}</span>
        </div>
      )}

      {!existingUser && (
        <div className="form-group">
          <input
            type="text"
            placeholder="Pseudo"
            className={`${errors?.pseudo ? "is-danger " : ""}form-control`}
            {...register("pseudo")}
          />
          {errors?.pseudo && (
            <p className="form-help is-danger">{errors.pseudo.message}</p>
          )}
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

      {!existingUser && (
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirmation du mot de passe"
            className={`${errors?.pwdConfirm ? "is-danger " : ""}form-control`}
            {...register("pwdConfirm")}
          />
          {errors?.pwdConfirm && (
            <p className="form-help is-danger">{errors.pwdConfirm.message}</p>
          )}
        </div>
      )}

      <div className="d-flex flex-column align-items-center mt-5">
        {existingUser ? (
          <Link to="../inscription" className="back-link">
            Créer un compte
          </Link>
        ) : (
          <Link to="../connexion" className="back-link">
            Retour à la page de connexion
          </Link>
        )}

        <button
          type="submit"
          className="btn btn--filled btn--secondary mt-5"
          disabled={isSubmitting}
        >
          {existingUser ? "Connexion" : "Valider"}
        </button>
      </div>
    </form>
  );
}

export default AuthForm;

import { useRouteError } from "react-router-dom";
import styles from "./Alert.module.scss";

function Alert() {
  const errorInfos = useRouteError();

  return (
    <div className={`${styles.alertWrapper}`}>
      <h2 className="mb-2">
        {errorInfos.status ? errorInfos.status + " " : ""}Error
      </h2>
      <p className="my-0">{errorInfos.message || errorInfos.statusText} </p>
    </div>
  );
}

export default Alert;

const USERS_API = "/api/users";

export const createUser = async (user) => {
  const response = await fetch(USERS_API, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const createdUser = await response.json();

  if (response.ok) {
    return createdUser;
  } else {
    if (createUser) {
      throw createdUser;
    } else {
      throw new Error("Impossible de créer le compte utilisateur");
    }
  }
};

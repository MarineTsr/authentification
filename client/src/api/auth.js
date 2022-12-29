const AUTH_API = "/api/auth";

export const signIn = async (user) => {
  const response = await fetch(AUTH_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Connexion impossible");
    }
  }
};

export const signOut = async () => {
  await fetch(AUTH_API, {
    method: "DELETE",
  });
};

export const getCurrentUser = async () => {
  const response = await fetch(`${AUTH_API}/current`);
  return response.json();
};

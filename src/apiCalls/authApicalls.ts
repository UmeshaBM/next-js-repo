const userLogin = async (loginObj: {}) => {
  try {
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginObj),
    });
    if (!response.ok) {
      throw new Error(`Failed to login`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error while login`, error);
    return [];
  }
};

const createUserAccount = async (userObj: {}) => {
  try {
    const response = await fetch(`/api/auth/createAccount`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userObj),
    });
    if (!response.ok) {
      throw new Error(`Failed to create user account`);
    }
    const data = response.json();
    console.log("before returning ", data);
    return data;
  } catch (error) {
    console.error(`Error while creating account`, error);
    return [];
  }
};

export { userLogin, createUserAccount };

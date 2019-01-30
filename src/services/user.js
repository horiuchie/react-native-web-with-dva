import Promise from "bluebird";

export const login = async ({ userId, password }) => {
  return Promise.resolve({ result: true }).delay(100);
};

import bcrypt from "bcryptjs";
// const bcrypt = dcodeIO.bcrypt;

// export const hashCode = async (code) => {
//   return await bcrypt.hash(code, 8);
// };
//
// https://stackoverflow.com/a/59913241
export const hashCode = async (code) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);

  return window.crypto.subtle.digest("SHA-256", data);
};

export const encodeURL = (item) => {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(item)).replace(/\+/g, "-").replace(/\//g, "-").replace(/=+$/, ""));
};

export const authenticateCode = async (hashedPassword) => {
  try {
    const result = await bcrypt.compare("rawPass", hashedPassword);

    if (result) return { code: hashedPassword, success: true };
    return { success: false, message: "Passwords do not match" };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const generateString = () => {
  let finalString = "";

  const length = Math.floor(Math.random() * (Math.floor(128) - Math.floor(43)) + Math.floor(43));

  let finalCharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < length; i++) {
    let randomInt = Math.floor(Math.random() * finalCharSet.length);
    finalString += finalCharSet[randomInt];
  }

  return finalString;
};

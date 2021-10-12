import hashCode from "../services/crypt";

const useAuth = () => {

  const hashCode = async (code) => {
    try {
      const hashedPass = await bcrypt.hash(code, 8);
      return await authenticateCode(hashedPass)
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const authenticateCode = async (hashedPassword) => {
    try {
      const result = await bcrypt.compare("rawPass", hashedPassword);

      if (result) return { code: hashedPassword, success: true };
      return { success: false, message: "Passwords do not match" };
    } catch (err) {
      return { success: false, message: err.message }
    }
  }


}

export default useAuth;

import bcrypt from "bcrypt";

async function hash(passwordImputValues) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passwordImputValues, salt);
  return hashedPassword;
}

async function compare(passwordImputValues, hashedPasswordImputValues) {
  const isMatch = await bcrypt.compare(
    passwordImputValues,
    hashedPasswordImputValues
  );

  if (!isMatch) {
    throw new Error("Login inválido.");
  }
}

const password = {
  hash,
  compare,
};

export default password;

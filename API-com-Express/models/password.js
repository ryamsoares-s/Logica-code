import bcrypt from "bcrypt";

async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function compare(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}

const password = {
  hash,
  compare,
};

export default password;

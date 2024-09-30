import bcrypt from 'bcrypt'
const saltRounds = 10;

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
}

async function comparePassword(password: string, hashPassword: string) {
  return await bcrypt.compare(password, hashPassword);
}

export {
  hashPassword,
  comparePassword
};

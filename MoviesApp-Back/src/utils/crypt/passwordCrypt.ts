import bcypt from 'bcrypt'

const Rounds = 10

const hashPassword = async (password: string) => {
    const salt = await bcypt.genSalt(Rounds)
    return bcypt.hash(password, salt)
}

const comparePassword = (password: string, hashed: string) => {
    return bcypt.compareSync(password, hashed)
}

export {hashPassword, comparePassword}
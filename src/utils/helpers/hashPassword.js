import bcrypt from "bcryptjs";

function hashPassword(password, rounds = 10) {
    const salt = bcrypt.genSaltSync(rounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}

export default hashPassword;

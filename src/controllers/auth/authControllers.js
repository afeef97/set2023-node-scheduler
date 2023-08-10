import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import User from "../../database/model/User";
import hashPassword from "../../utils/helpers/hashPassword";

export function registerUser(req, res) {
    const { username, email, password } = req.body;
    const hashedPassword = hashPassword(password);

    User.create({ username, email, password: hashedPassword })
        .then((user) => {
            return res.status(200).json({
                message: "Registration successful",
            });
        })
        .catch((err) => {
            return res
                .status(500)
                .json({ message: "An error occured", data: err });
        });
}

export async function loginUser(req, res) {
    const { identifier, password } = req.body;
    const user = await User.findAll({
        where: { [Op.or]: [{ email: identifier }, { username: identifier }] },
    });
    const userData = user[0].dataValues;

    if (!userData) {
        res.status(400).json({ message: "Login failed" });
        return;
    }

    bcrypt.compare(password, userData.password, (error, bcryptRes) => {
        if (bcryptRes) {
            req.session.auth = userData.id;
            const serverRes = {
                message: "Login successful",
                data: userData,
                session: req.session,
            };
            res.status(200).json(serverRes);
        } else {
            const serverRes = {
                message: "Login failed",
                error: "Invalid credential",
                data: error,
            };
            res.status(401).json(serverRes);
        }
    });
}

export function logoutUser(req, res) {
    req.session.destroy();
    console.log(req.session);
    res.status(200).json({ message: "Logout successful" });
}

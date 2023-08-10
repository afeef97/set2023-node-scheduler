import { Op } from "sequelize";
import Message from "../../database/model/Message";
import { CronJob } from "cron";

export async function sendAnnualMessage() {
    const today = new Date();
    const lastYearToday = new Date(today);

    lastYearToday.setFullYear(today.getFullYear() - 1);

    const startOfLastYear = new Date(lastYearToday);
    startOfLastYear.setHours(0, 0, 0, 0);

    const message = await Message.findAll({
        where: {
            created_at: {
                [Op.gte]: startOfLastYear,
                [Op.lt]: lastYearToday,
            },
        },
    })
        .then((value) => {
            return value.map((item) => item.dataValues);
        })
        .catch((error) => {
            console.log(error);
        });

    for (let i = 0; i < message.length; i++) {
        // Send email function maybe
        // console.log(message[i].message);
    }
}

export async function getUserMessages(req, res) {
    const message = await Message.findAll({
        where: {
            owner_id: req.session.auth,
        },
    })
        .then((message) => {
            return res.status(200).json({ message });
        })
        .catch((err) => {
            return res
                .status(500)
                .json({ message: "An error had occured", err });
        });
}

const sendAnnualMessageJob = new CronJob(
    "*/30 * * * * *",
    () => {
        try {
            sendAnnualMessage();
        } catch (error) {
            console.log(error);
        }
    },
    null,
    false,
    "Asia/Kuala_Lumpur"
);

export default sendAnnualMessageJob;

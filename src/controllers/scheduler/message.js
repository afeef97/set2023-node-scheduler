import { Op } from "sequelize";
import Message from "../../database/model/Message";
import { CronJob } from "cron";

export async function sendAnnualMessage() {
    const today = new Date();
    const lastYearToday = new Date(today);

    lastYearToday.setFullYear(today.getFullYear() - 1);
    console.log(lastYearToday);

    const startOfLastYear = new Date(lastYearToday);
    startOfLastYear.setHours(0, 0, 0, 0);
    console.log(startOfLastYear);

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

const sendAnnualMessageJob = new CronJob(
    "*/3 * * * * *",
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

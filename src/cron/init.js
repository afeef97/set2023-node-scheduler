import sendAnnualMessageJob from "../controllers/scheduler/messageControllers";

function cronInit() {
    sendAnnualMessageJob.start();
    // add more scheduler below this
}

export default cronInit;

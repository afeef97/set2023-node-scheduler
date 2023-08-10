import sendAnnualMessageJob from "../controllers/scheduler/message";

function cronInit() {
    sendAnnualMessageJob.start();
    // add more scheduler below this
}

export default cronInit;

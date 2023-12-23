import { CronJob } from "cron";
import jobs from "./jobs.js";

export function cronjob() {
  for(const job of jobs){
    new CronJob(
      job.time,
      ()=>{
      job.task()
      },
      null,
      true,
      "America/Los_Angeles"
    );
  }
}

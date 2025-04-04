import * as core from "@actions/core";
import * as github from "@actions/github";

import { answer_workflow } from "./answer-workflow";

async function entry() {
  const event_name = github.context.eventName;

  switch (event_name) {
    case "pull_request_review_comment":
      core.info("Triggered by a PR review comment");
      answer_workflow();
      break;
    default:
      core.warning(`Unknown or unhandled event: ${event_name}`);
      break;
  }
}

entry();

import { Chunk, File } from "parse-diff";
import { PRDetails } from "../interfaces";

export function review_prompt(
  file: File,
  chunk: Chunk,
  pr_details: PRDetails
): string {
  return `Your task is to review pull requests. Instructions:
  - Respond with a valid JSON object.
  - The JSON format must be: {"reviews": [{"lineNumber": <line_number>, "reviewComment": "<review comment>"}]}
  - Do not wrap the response in markdown code blocks (e.g., \`\`\`json ... \`\`\`).
  - Provide comments and suggestions ONLY if there is something to improve, otherwise "reviews" should be an empty array.
  - Write the comment in GitHub Markdown format.
  - Use the given description only for the overall context and only comment the code.
  - IMPORTANT: NEVER suggest adding comments to the code.
  
  Review the following code diff in the file "${
    file.to
  }" and take the pull request title and description into account when writing the response.
    
  Pull request title: ${pr_details.title}
  Pull request description:
  
  ---
  ${pr_details.description}
  ---
  
  Git diff to review:
  
  \`\`\`diff
  ${chunk.content}
  ${chunk.changes
    // @ts-expect-error - ln and ln2 exists where needed
    .map((c) => `${c.ln ? c.ln : c.ln2} ${c.content}`)
    .join("\n")}
  \`\`\`
  `;
}

export interface PRDetails {
  pull_number: number;
  description: string;
  title: string;
  owner: string;
  repo: string;
}

export interface Message {
  user: string;
  body: string;
}

export interface Discussion {
  thread: Array<Message>;
  remark: Message;
  context: string;
  line: number;
  file: string;
}

export interface DiscussionAnswer {
  remark_is_solved: boolean;
  answer: string;
}

export interface AI {
  answer(ai: AI, prompt: string): Promise<DiscussionAnswer | null>;
  model: string;
  priv: Object;
}

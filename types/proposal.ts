export interface ProposalInput {
  industry?: string;
  clientName: string;
  scope: string;
  budget: string;
}

export interface ProposalOutput {
  text: string;
  generatedAt: string;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: string; // ISO string — next month 1st 00:00 UTC
}

export type GenerateApiRequest = ProposalInput;

export interface GenerateApiResponse {
  proposal?: ProposalOutput;
  error?: string;
  rateLimitRemaining?: number;
}

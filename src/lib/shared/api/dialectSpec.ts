import {
  SolanaPaySpecTransactionServicePostRequest,
  SolanaPaySpecTransactionServicePostResponse,
} from './solanaPaySpec';

// DTOs
// DTOs
export interface BlinkLayout {
  title: string;
  description: string;
  image?: string;
  buttons?: BlinkButton[][];
  input?: BlinkInput | null;
  error?: string | null; // blink server may decide to return error message
}

export interface BlinkInput {
  hint?: string;
  name: string;
  // Do we need validation in MVP?
  button: BlinkButton; // when button is clicked, input value is sent to the server, see BlinkPrepareTxActionParams.input
}

export interface BlinkButton {
  text: string | null;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'success' | 'error';
  onClick?: BlinkAction;
}

// GET REQUEST TO GET BLINK LAYOUT
export interface BlinkGetRequest {
  // user's public key, inspired by Solana Pay, may be absent at moment when first render happens - wallet may be disconnected
  account?: string;
  error?: string; // if present, client should show error message
}

export interface BlinkGetResponse {
  layout: BlinkLayout;
}

// POST REQUEST TO GENERATE TX
export interface BlinkPrepareTxActionParams
  extends SolanaPaySpecTransactionServicePostRequest {}

export interface BlinkPrepareTxActionResponse
  extends SolanaPaySpecTransactionServicePostResponse {}

// ACTIONS
export type BlinkAction =
  | ExecuteTxClientSideAction
  | GetBlinkAction
  | MutateLayoutAction;

export interface BaseAction {
  action: string;
}

// This is base action, that is implemented for MVP, it allows client-side tx execution
export interface ExecuteTxClientSideAction extends BaseAction {
  action: 'execute-tx-client-side';
  prepareTx?: { url?: string }; // optional - if not present, base url is requested but with post, this is solana pay url
  onTxExecuting: MutateLayoutAction;
  onTxSuccess: MutateLayoutAction;
  onTxError: GetBlinkAction | MutateLayoutAction;
}

export interface GetBlinkAction extends BaseAction {
  action: 'get-blink';
  url: string;
}

export interface MutateLayoutAction extends BaseAction {
  action: 'mutate-layout';
  slice: Partial<BlinkLayout>;
}

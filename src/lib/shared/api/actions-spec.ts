import {
  SolanaPaySpecGetResponse,
  SolanaPaySpecPostRequestBody,
  SolanaPaySpecPostResponse,
} from './solana-pay-spec'; // DTOs

export interface ActionsSpecGetResponse extends SolanaPaySpecGetResponse {
  icon: string; // image
  label: string; // button text
  title: string;
  description: string;
  disabled?: boolean; // allows to model invalid state of the action e.g. nft sold out
  _links?: {
    // linked actions inspired by HAL https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-11
    actions: LinkedAction[];
  };
}

// Linked action inspired by HAL https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-11
export interface LinkedAction {
  href: string; // solana pay/actions get/post url
  label: string; // button text
  // optional parameters for the action, e.g. input fields, inspired by OpenAPI
  // enforcing single parameter for now for simplicity and determenistic client UIs
  // can be extended to multiple inputs w/o breaking change by switching to Parameter[]
  // note: there are no use-cases for multiple parameters atm, e.g. farcaster frames also have just single input
  parameters?: [Parameter];
}

export interface Parameter {
  name: string; // parameter name in url
  label?: string; // input placeholder
}

// No changes
export interface ActionsSpecPostRequestBody
  extends SolanaPaySpecPostRequestBody {}

// No changes
export interface ActionsSpecPostResponse extends SolanaPaySpecPostResponse {}

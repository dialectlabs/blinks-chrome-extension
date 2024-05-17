//GET
export interface SolanaPaySpecTransactionServiceGetResponse {
  label: string;
  icon: string;
}

// POST
export interface SolanaPaySpecTransactionServicePostRequest {
  account: string; // transaction signer public key
}

export interface SolanaPaySpecTransactionServicePostResponse {
  transaction: string; // base64-encoded serialized transaction
  message?: string; // the nature of the transaction response e.g. the name of an item being purchased
}

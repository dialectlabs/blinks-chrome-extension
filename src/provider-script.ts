class ClickCrateProvider {
  private isConnected: boolean = false;
  private publicKey: string | null = null;

  async connect(): Promise<{ publicKey: string }> {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'connect' }, (response) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          this.isConnected = true;
          this.publicKey = response.publicKey;
          resolve({ publicKey: this.publicKey! });
        }
      });
    });
  }

  async signAndSendTransaction(
    transaction: string,
  ): Promise<{ signature: string }> {
    if (!this.isConnected) {
      throw new Error('Wallet not connected');
    }
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { type: 'signAndSendTransaction', transaction },
        (response) => {
          if (response.error) {
            reject(new Error(response.error));
          } else {
            resolve({ signature: response.signature });
          }
        },
      );
    });
  }

  // Implement other necessary methods...
}

(window as any).clickcrate = new ClickCrateProvider();

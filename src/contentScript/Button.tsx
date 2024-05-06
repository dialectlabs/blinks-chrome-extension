export const Button = () => {
  return (
    <button
      className="bg-red-400 text-black rounded-full px-2"
      onClick={async () => {
        const res = await chrome.runtime.sendMessage({ type: 'connect' });
        console.log('button on click', res);
        const signedMsg = await chrome.runtime.sendMessage({
          type: 'sign_message',
          payload: { message: 'hello' },
        });
        console.log('signed message', signedMsg);
      }}
    >
      TEST BUTTON FROM DIALECT
    </button>
  );
};

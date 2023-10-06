// const ws = require("ws");
// // const transcribeService = require("./transcribeService"); // AWS Transcribeと通信するためのサービス
// const wss = new ws.Server({ port: 3001 });

// export function startWs() {
//     wss.on("connection", (webSocket: any) => {
//       webSocket.on("message", (audioData: any) => {
//         // AWS Transcribeに音声データを送信
//         // transcribeService.sendAudio(audioData);
//         console.log(audioData);
//       });
//     });
// }

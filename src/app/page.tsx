"use client"

import { useEffect, useState } from "react";

let stream: MediaStream | null = null;
let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];
let webSocket: WebSocket | null = null;

const startRecording = async () => {
  // ユーザーのマイクにアクセス
  stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  // MediaRecorderの初期化
  mediaRecorder = new MediaRecorder(stream);
  
  // AWS TranscribeへのWebSocket接続を開く（URLは適宜変更してください）
  const url = process.env.WS_URL;
  // webSocket = new WebSocket("ws://localhost:3001/ws");
  webSocket = new WebSocket(url ? url : "ws://localhost:3001/ws");
  webSocket.onopen = () => {
    alert("WebSocket open.");
  }

  webSocket.onmessage = (e) => {
    alert(e.data);
  }

  webSocket.onerror = (error) => {
    console.error("WebSocket Error: ", error);
  };  

  // 録音開始
  mediaRecorder.start();
  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
    if (webSocket?.readyState === WebSocket.OPEN) {
      webSocket.send(event.data);
      alert("send audio data");
    } else {
      alert("Failed to send audio data.");
    }
  };
};

const stopRecording = () => {
  mediaRecorder?.stop();  
  stream?.getTracks().forEach(track => track.stop());
};

const closeWebSocket = () => {
    webSocket?.close();
}

// TODO 検証用 あとでけす
const sendMessage = () => {
  webSocket?.send("こんにちは by mulata");
}

const Page = () => {
  return (
    <main>
      <h1>Hello mulata</h1>
      <button onClick={startRecording}>Start Recording</button>
      <br/>
      <button onClick={stopRecording}>Stop Recording</button>
      <br/>
      <button onClick={closeWebSocket}>Close WebSocket</button>
      <br/>
      <button onClick={sendMessage}>Send message</button>
    </main>
  );
};

export default Page;

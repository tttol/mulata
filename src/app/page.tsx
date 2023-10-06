"use client"

import { useEffect, useState } from "react";

let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];
let webSocket: WebSocket | null = null;

const startRecording = async () => {
  // ユーザーのマイクにアクセス
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  // MediaRecorderの初期化
  mediaRecorder = new MediaRecorder(stream);
  
  // AWS TranscribeへのWebSocket接続を開く（URLは適宜変更してください）
  webSocket = new WebSocket("ws://localhost:3001/ws");

  // 音声データが利用可能になったら
  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
    // AWS Transcribeに音声データを送信
    if (webSocket?.readyState === WebSocket.OPEN) {
      webSocket.send(event.data);
    }
  };

  // 録音開始
  mediaRecorder.start();
};

const stopRecording = () => {
  // 録音停止
  mediaRecorder?.stop();
  
  // WebSocket接続を閉じる
  webSocket?.close();
};

const Page = () => {
  return (
    <main>
      <h1>Hello mulata</h1>
      <button onClick={startRecording}>Start Recording</button>
      <br/>
      <button onClick={stopRecording}>Stop Recording</button>
    </main>
  );
};

export default Page;

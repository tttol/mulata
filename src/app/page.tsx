// 例：録音開始と停止の処理
const startRecording = () => {
  // 録音処理
};

const stopRecording = async () => {
  // 録音停止とデータの送信
  const audioData = /* 音声データ */;
  const response = await fetch("/api/transcribe", {
    method: "POST",
    body: JSON.stringify({ audioData }),
  });
  const result = await response.json();
  // 結果を表示
};

export default function Home() {
  return (
    <main className="">
      <p>Hello Mulata</p>
      <p>MUlti LAnguage TrAnslator</p>
    </main>
  )
}

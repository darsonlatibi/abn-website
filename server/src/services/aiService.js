const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";

const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen3:8b";

/**
 * ABN AI Service
 * Ollama + Qwen 3 8B
 */

/**
 * Basic AI Chat
 *
 * Digunakan untuk pertanyaan umum tentang ABN.
 */
export const chatWithAI = async (message) => {
  if (!message || typeof message !== "string") {
    throw new Error("Message is required.");
  }

  const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      stream: false,
      messages: [
        {
          role: "system",
          content: `
Kamu adalah ABN AI Assistant.

ABN adalah PT Agro Berkah Nusantara.
Website: abn.web.id.

Tugas kamu membantu pengguna memahami:
- produk
- layanan
- teknologi
- automation
- industrial technology
- software
- agriculture
- logistics
- bisnis ABN

Jawab dalam Bahasa Indonesia kecuali pengguna meminta
bahasa lain.

Jangan mengarang data perusahaan, transaksi,
penjualan, keuangan, pelanggan, atau angka bisnis.

Jika informasi tidak tersedia, katakan dengan jelas
bahwa data tersebut belum tersedia.

Berikan jawaban yang praktis, jelas, dan profesional.
          `.trim(),
        },
        {
          role: "user",
          content: message.trim(),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(`Ollama request failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();

  return {
    model: data.model || OLLAMA_MODEL,
    message: data.message?.content || "",
    done: data.done ?? true,
  };
};

/**
 * Business AI Chat
 *
 * Qwen mendapatkan businessData yang sudah
 * disiapkan oleh aiDataService.js.
 *
 * Qwen TIDAK memiliki akses langsung ke database.
 */
export const chatWithBusinessData = async (message, businessData) => {
  if (!message || typeof message !== "string") {
    throw new Error("Message is required.");
  }

  if (!businessData || typeof businessData !== "object") {
    throw new Error("Business data is required.");
  }

  const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      stream: false,
      messages: [
        {
          role: "system",
          content: `
Kamu adalah ABN AI Business Assistant.

ABN adalah PT Agro Berkah Nusantara.
Website: abn.web.id.

Kamu membantu menganalisis informasi bisnis
yang diberikan oleh sistem.

ATURAN DATA:

1. Gunakan DATA BISNIS yang diberikan sistem sebagai
   sumber fakta utama.

2. Jangan mengarang angka.

3. Jangan mengubah angka.

4. Jangan membuat transaksi, pelanggan, produk,
   pembayaran, atau revenue yang tidak ada dalam data.

5. Jika informasi yang ditanyakan tidak tersedia
   dalam DATA BISNIS, katakan:
   "Data tersebut belum tersedia."

6. Jangan mengaku memiliki akses langsung ke database.

7. Jangan memberikan SQL kepada pengguna.

8. Jawab dalam Bahasa Indonesia kecuali pengguna
   meminta bahasa lain.

9. Jawaban harus jelas, singkat, profesional,
   dan mudah dipahami.

10. Jika terdapat angka keuangan, gunakan format
    Rupiah yang mudah dibaca jika mata uangnya IDR.

DATA BISNIS ABN:

${JSON.stringify(businessData, null, 2)}
          `.trim(),
        },
        {
          role: "user",
          content: message.trim(),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Ollama business request failed (${response.status}): ${errorText}`,
    );
  }

  const data = await response.json();

  return {
    model: data.model || OLLAMA_MODEL,
    message: data.message?.content || "",
    done: data.done ?? true,
  };
};

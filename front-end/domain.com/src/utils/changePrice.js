import axios from "axios";

export async function getPrice({ from, to, value }) {
  const options = {
    method: "GET",
    url: "https://currency-converter-pro1.p.rapidapi.com/convert",
    params: {
      from: from,
      to: to,
      amount: value,
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_X_KEY,
      "X-RapidAPI-Host": "currency-converter-pro1.p.rapidapi.com",
    },
  };

  if (from === to) {
    return value;
  } else {
    const req = await axios.request(options);

    return req.data.result;
  }
}


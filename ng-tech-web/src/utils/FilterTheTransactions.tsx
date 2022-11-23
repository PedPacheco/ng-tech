import axios from "axios";

export async function filterTheTransactions(
  token: string,
  userCookies: string,
  filter: string,
  date: string | null
) {
  const user = JSON.parse(userCookies);
  const headers = { authorization: token };

  if (filter === "transacoes-data") {
    const response = await axios
      .get(
        `http://localhost:3333/filtro-transferencia/${user?.accountId}/?filter=${filter}&date=${date}`,
        {
          headers,
        }
      )
      .then((response) => {
        const data = response.data;
        return data;
      });
    return response;
  }

  if (filter === "todas") {
    const response = await axios
      .get(`http://localhost:3333/transferencia/${user?.accountId}`, {
        headers,
      })
      .then((response) => {
        const data = response.data;
        return data;
      });

    return response;
  }

  if (filter === "transacoes-cash-in") {
    const response = await axios
      .get(
        `http://localhost:3333/filtro-transferencia/${user?.accountId}/?filter=${filter}`,
        {
          headers,
        }
      )
      .then((response) => {
        const data = response.data;
        return data;
      });

    return response;
  }

  if (filter === "transacoes-cash-out") {
    const response = await axios
      .get(
        `http://localhost:3333/filtro-transferencia/${user?.accountId}/?filter=${filter}`,
        {
          headers,
        }
      )
      .then((response) => {
        const data = response.data;
        return data;
      });

    return response;
  }
}

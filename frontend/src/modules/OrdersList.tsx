import useSWR from "swr";

const fetcher = (url) =>
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));

export const OrdersList = () => {
  console.log(`haha read_all`);
  const endpoint = `http://${process.env.JS_SERVICE_SERVICE_HOST}:${process.env.JS_SERVICE_SERVICE_PORT}/orders`;
  const { data, error, isLoading } = useSWR(endpoint, fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log(data);

  if (Array.isArray(data)) {
    return (
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <p>{item.firstname}</p>
            <span>{item.surname}</span>
          </div>
        ))}
      </div>
    );
  }
};

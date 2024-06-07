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

export const ProductsList = () => {
  const endpoint = `http://${process.env.PYTHON_SERVICE_SERVICE_HOST}:${process.env.PYTHON_SERVICE_SERVICE_PORT}/read_all`;
  const { data, error, isLoading } = useSWR(endpoint, fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log(data);

  if (Array.isArray(data)) {
    return (
      <div>
        {data.map((item) => (
          <div key={item.id || item._id}>
            <p>{item.name}</p>
            <span>{item.price}</span>
          </div>
        ))}
      </div>
    );
  }
};

import * as React from "react";

function orderSandwich(id: number) {
  console.log("ORdering " + id);
}

function OrderForm() {
  const [sandwiches, setSandwiches] = React.useState<
    {
      id: number;
      name: string;
      breadType: string;
      toppings: [];
    }[]
  >([]);

  const [error, setError] = React.useState<string>();
  const [selectedSandwich, setSelectedBread] = React.useState<number>(1);

  React.useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_GATEWAY_URL + "sandwich")
      .then(async (response) => {
        if (response.status != 200) {
          setError("Status: " + response.status);
          return;
        }

        let data = await response.json();
        setSandwiches(data);
      })
      .catch((ex) => {
        console.log(ex);
        setError("Failed to fetch sandwich listings.");
      });
  }, []);

  if (error) {
    return <p className="text-red-500 italic text-xl">{error}</p>;
  }
  if (sandwiches.length == 0) {
    return <p>Loading...</p>;
  }
  console.log(
    sandwiches.find((sandwich) => sandwich.id === selectedSandwich)?.toppings
  );

  return (
    <div>
      <form>
        <div className="flex flex-col">
          <label>Select a bread</label>
          <select
            id="bread-id"
            value={selectedSandwich}
            defaultValue={1}
            onChange={(e) => {
              console.log(e.target.value);
              setSelectedBread(Number.parseInt(e.target.value));
            }}
            name="cars"
            className=""
          >
            {sandwiches.length > 0 &&
              sandwiches.map((sandwich) => {
                return <option value={sandwich.id}>{sandwich.name}</option>;
              })}
          </select>
        </div>
      </form>

      <div>
        <h2>What's inside?</h2>

        <ul>
          {sandwiches
            .find((sandwich) => sandwich.id === selectedSandwich)
            ?.toppings.map((topping) => (
              <li>{topping}</li>
            ))}
        </ul>
      </div>
      <button
        className="mt-5"
        onClick={() => {
          orderSandwich(selectedSandwich);
        }}
      >
        Order
      </button>
    </div>
  );
}

export default OrderForm;

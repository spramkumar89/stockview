async function getData() {
  const res = await fetch("http://localhost:8080/zerodha/holdings/basic/all");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function DashBoard() {
  const data = await getData();
  return (
    <div className="overflow-auto">
      <table className="table border-2 border-slate-400">
        {/* head */}
        <thead>
          <tr className="text-base border-b-2 border-slate-400">
            <th>Symbol</th>
            <th>Quantity</th>
            <th>AvgPrice</th>
            <th>InvestedAmount</th>
            <th>CurrentAmount</th>
            <th>ProfitLoss</th>
            <th>PL%</th>
          </tr>
        </thead>
        <tbody>
          <RowData />
        </tbody>
      </table>
    </div>
  );
}

export async function RowData() {
  const data = await getData();
  return (
    <>
      {data.map((stock: any) => {
        var investedAmount =
          parseInt(stock.quantity_available) * parseFloat(stock.average_price);
        return (
          <tr key={stock.holding_id} className="hover">
            <td>{stock.symbol}</td>
            <td>{stock.quantity_available}</td>
            <td>{stock.average_price}</td>
            <td>{investedAmount.toFixed(2)}</td>
            <td>Loading...</td>
            <td
              className={
                parseInt(stock.unrealized_pl) > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stock.unrealized_pl}
            </td>
            <td
              className={
                parseInt(stock.unrealize_pl_percentage) > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {parseFloat(stock.unrealize_pl_percentage).toFixed(0)}%
            </td>
          </tr>
        );
      })}
    </>
  );
}

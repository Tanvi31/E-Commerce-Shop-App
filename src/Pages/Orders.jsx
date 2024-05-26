import { ordersTableColumnNames } from "../utils/constants";
import { useSelector } from "react-redux";
import { getTotalCartValue } from "../utils/helper";
import { ordersPlaced } from "../store/slices/ordersSlice";

function Orders() {
  const ordersList = useSelector(ordersPlaced);
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold">My Orders</h2>
      <div className="flex justify-end">
        <div className=" border border-solid border-black px-3 py-1">
          <label className="text-gray-500 text-xs " htmlFor="orders">
            Filter
          </label>
          <select name="orders" id="orders" className=" font-bold">
            <option value="all">All</option>
            <option value="days">Last 7 Days</option>
            <option value="week">This Month</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-md">
                <table className="min-w-full bg-slate-100">
                  <thead className=" border-b">
                    <tr>
                      {ordersTableColumnNames.map((e, i) => {
                        return (
                          <th
                            key={e.columnName + i}
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            {e.columnName}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-slate-100">
                    {ordersList.map((order) => {
                      return (
                        <tr
                          key={order.id}
                          className="border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {order.firstName + " " + order.lastName}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {order.paymentStatus ? "Paid" : "Unpaid"}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {getTotalCartValue(order.items)}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {order.city}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {order.orderDate}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            Completed
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Orders;

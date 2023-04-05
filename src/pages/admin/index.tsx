import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Navbar } from "~/components/Navbar";
import { api } from "~/utils/api";
import { allDates, dates, dishes } from "../../data/index";

const Admin: NextPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>(dates[0] || "");
  const { data: session, status } = useSession();
  const orders = api.example.getAllOrders.useQuery(
    { date: selectedDate },
    {
      enabled: status === "authenticated",
    }
  );

  return (
    <>
      <Navbar />
      {session && (
        <>
          <div className="form-control mx-auto my-2 w-full max-w-xs">
            <label className="label">
              <span className="label-text">Select Date</span>
            </label>
            <select
              className="select-bordered select"
              onChange={(e) => {
                setSelectedDate(e.target.value);
              }}
            >
              <option disabled selected>
                Select Date
              </option>
              {allDates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toDateString()}
                </option>
              ))}
            </select>
          </div>
          {orders.data && (
            <div className="overflow-x-auto">
              <table className="table-compact mx-auto table w-3/4">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    {/* <th>Email</th> */}
                    <th>Dish</th>
                    <th>Protein</th>
                    {/* <th>Payment ID</th> */}
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.data.map((order, index) => (
                    <tr key={order.id}>
                      <th>{index + 1}</th>
                      <td>{order.payment_ref.name}</td>
                      {/* <td>{order.payment_ref.email}</td> */}
                      <td>
                        {order.dish}{" "}
                        <span className="font-semibold">
                          {dishes.filter((e) => e.name === order.dish)[0]?.type}
                        </span>
                      </td>
                      <td>{order.protein}</td>
                      {/* <td>{order.payment_id}</td> */}
                      <td>{order.date.toDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Admin;

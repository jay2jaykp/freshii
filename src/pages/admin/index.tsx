import { type NextPage } from "next";
import { api } from "~/utils/api";

const Admin: NextPage = () => {
  const allOrders = api.example.getAllOrders.useQuery(undefined, {
    enabled: true,
  });
  return (
    <>
      <div>Admin Page</div>
    </>
  );
};

export default Admin;

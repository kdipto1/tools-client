import { useEffect, useState } from "react";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    const email = user?.email;
    if (email) {
      fetch(
        `https://tools-server-production.up.railway.app/users?email=${email}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setAdmin(data?.role === "admin");
          setAdminLoading(false);
        });
    }
  }, [admin, user?.email]);
  return [admin, adminLoading];
};
export default useAdmin;

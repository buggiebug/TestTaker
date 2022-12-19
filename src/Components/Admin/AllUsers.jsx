import React, { useEffect, useContext } from "react";
import {useNavigate} from "react-router-dom";

import adminContext from "../Context/Admin/createAdminContext";
import Loading from "../Loading";

function AllUsers() {
  const adminToken = "ad1to2ken3";
  const navigate = useNavigate();

  const adminContextData = useContext(adminContext);
  const { loadingState, usersDataState, allUsers, deleteUserProfile } =
    adminContextData;

  useEffect(() => {
    if (!localStorage.getItem(adminToken)) navigate("/");

    allUsers();
    // eslint-disable-next-line
  }, []);

  const deleteUser = async (id, email) => {
    await deleteUserProfile(id, email);
    await allUsers();
  };

  return (
    <>
      <div>
        <div className="">
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Account Created At
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Delete <i className="ml-1 fa-solid fa-trash text-red-400" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersDataState.length > 0 ? (
                  usersDataState.map((e) => {
                    return (
                      <tr key={e._id} className="bg-white text-black">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {e.name}
                        </th>
                        <td className="py-4 px-6">{e.email}</td>
                        <td className="py-4 px-6">
                          {String(e.accountCreatedAt).slice(0, 10)}
                        </td>
                        <td className="py-4 px-6">
                          <i
                            onClick={() => {
                              deleteUser(e._id, e.email);
                            }}
                            className="ml-1 fa-solid fa-trash text-red-400 hover:text-red-700 cursor-pointer"
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="text-center text-yellow-700">
                    <td>No data found.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Loading state={loadingState} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUsers;

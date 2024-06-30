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
    if (!localStorage.getItem(adminToken)) navigate("/",{replace:true});

    allUsers();
    // eslint-disable-next-line
  }, []);

  const deleteUser = async (id, email) => {
    const res = window.confirm("You want to delete the selected user.");
    if(res){
      await deleteUserProfile(id, email);
      await allUsers();
    }
  };

  return (
    <>
      <div className="pt-[220px] md:pt-24">
        <div className="mx-2 md:mx-10">
          <h1 className="text-2xl text-white text-center font-bold my-10">Users</h1>
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-black">
              <thead className="text-xs text-black uppercase bg-gray-100">
                <tr className="text-sm">
                  <th scope="col" className="py-3 px-6">
                    No.
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Phone
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Account Created At
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <i className="ml-1 fa-solid fa-trash text-red-400" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersDataState.length > 0 ? (
                  usersDataState.map((e,i) => {
                    return (
                      <tr key={e._id} className="bg-white text-black">
                        <td className="py-4 px-6">{i+1}</td>
                        <th className="py-4 px-6 font-medium text-black whitespace-nowrap">
                          {e.name}
                        </th>
                        <td className="py-4 px-6">{e.email}</td>
                        <td className="py-4 px-6">{e.phone}</td>
                        <td className="py-4 px-6">
                          {new Date(e.accountCreatedAt).toLocaleString()}
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
                  <tr className="text-center text-yellow-200">
                    {loadingState?<td className=""><Loading state={loadingState} /></td>:<td>No data found.</td>}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUsers;

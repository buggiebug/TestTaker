import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import adminContext from "../Context/Admin/createAdminContext";
import Loading from "../Loading";

function SubAdmins() {
  const adminToken = "ad1to2ken3";
  const navigate = useNavigate();

  const adminContextData = useContext(adminContext);
  const {
    loadingState,
    subAdminState,
    allSubAdmins,
    createSubAdmin,
    updateAdminRole,
    deleteSubAdmin,
  } = adminContextData;

  useEffect(() => {
    if (!localStorage.getItem(adminToken)) navigate("/");

    allSubAdmins();
    // eslint-disable-next-line
  }, []);

  const [updateFormState, setUpdateFormState] = useState("hidden");
  const [adminData, setAdminData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  //  //! Update Button Wake-Up...
  const updateButtonWake = (e) => {
    setUpdateFormState("visible");
    setAdminData({ id: e._id, name: e.name, email: e.email, role: e.role });
  };
  //  //! Update Button Close-Up...
  const updateButtonClose = (e) => {
    e.preventDefault();
    setUpdateFormState("hidden");
  };

  const [updateRole, setUpdateRole] = useState({ role: "" });
  const onChange = (e) => {
    setUpdateRole({ ...updateRole, [e.target.name]: e.target.value });
  };
  //  //! Update Form...
  const updateAdminForm = async (e) => {
    e.preventDefault();
    await updateAdminRole(adminData.id, updateRole.role);
    await setUpdateFormState("hidden");
    await allSubAdmins();
  };

  //  //! Delete Sub-Admin...
  const deleteAdmin = async (id) => {
    const res = window.confirm("You want to delete the selected admin.");
    if(res){
      await deleteSubAdmin(id);
      await allSubAdmins();
    }
  };

  const [viewSubAdminsState, setViewSubAdminsState] = useState("visible");
  const [createSubAdminState, setCreateSubAdminState] = useState("hidden");

  const createSubAdmins = () => {
    if (createSubAdminState === "hidden") {
      setCreateSubAdminState("visible");
      setViewSubAdminsState("hidden");
    }
  };
  const viewSubAdmins = () => {
    if (viewSubAdminsState === "hidden") {
      setViewSubAdminsState("visible");
      setCreateSubAdminState("hidden");
      allSubAdmins();
    }
  };

  //  //! New Sub-Admin...
  const [newDataState, setNewDataState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const newDataChange = (e) => {
    setNewDataState({ ...newDataState, [e.target.name]: e.target.value });
  };
  const newSubAdmin = async (e) => {
    e.preventDefault();
    await createSubAdmin(newDataState);
    await setNewDataState({ name: "", email: "", password: "" });
  };

  return (
    <>
      <div className="pt-[250px] md:pt-24">
        <div className={`mx-2`}>
          <div className="flex flex-wrap justify-around items-center">
            <button
              onClick={createSubAdmins}
              className={`${
                createSubAdminState === "visible"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              } px-2 py-1 hover:opacity-90 rounded-md`}
            >
              Create Sub-Admin
            </button>
            <button
              onClick={viewSubAdmins}
              className={`${
                viewSubAdminsState === "visible"
                ? "bg-black text-white"
                : "bg-white text-black"
            } px-2 py-1 hover:opacity-90 rounded-md`}
            >
              View All
            </button>
          </div>
        </div>
        <hr className="mt-5 mb-10" />

        {/* //! Create New Sub-Admin... */}
        <div className={`${createSubAdminState} flex justify-center items-center mx-5`}>
          <Loading state={loadingState} />
          <div className="flex flex-col justify-center items-center bg-white p-5 rounded-lg shadow-2xl">
            <form onSubmit={newSubAdmin}>
              <label htmlFor="name">Name</label>
              <input
                className="px-3 py-2 outline-none ring-1 focus:ring-black rounded-md my-1"
                type="text"
                name="name"
                value={newDataState.name}
                onChange={newDataChange}
                required
              />
              <label htmlFor="email">Email</label>
              <input
                className="px-3 py-2 outline-none ring-1 focus:ring-black rounded-md my-1"
                type="email"
                name="email"
                value={newDataState.email}
                onChange={newDataChange}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                className="px-3 py-2 outline-none ring-1 focus:ring-black rounded-md my-1"
                type="text"
                name="password"
                value={newDataState.password}
                onChange={newDataChange}
                required
              />
              <br />
              <button
                className="mt-1 px-3 py-2 bg-green-500 hover:bg-green-700 rounded-md text-white float-right"
                type="submit"
              >
                Create
              </button>
            </form>
          </div>
        </div>

        {/*//! View All Sub-Admins...  */}
        <div className={`${viewSubAdminsState} mb-10`}>
          <div
            className={`${updateFormState} flex justify-center items-center`}
          >
            <div className="mx-2 my-10 bg-slate-300 p-5 rounded-md">
              <h3 className="my-3 text-center text-2xl text-teal-600">
                Update Role
              </h3>
              <form onSubmit={updateAdminForm} className="">
                <div className="flex flex-col my-2">
                  <label htmlFor="name" className="text-gray-700 text-sm">Name</label>
                  <input
                    className="px-3 py-2 rounded-md outline-none"
                    type="text"
                    value={adminData.name}
                    readOnly
                  />
                </div>
                <div className="flex flex-col my-2">
                  <label htmlFor="email" className="text-gray-700 text-sm">Email</label>
                  <input
                    className="px-3 py-2 rounded-md outline-none"
                    type="email"
                    value={adminData.email}
                    readOnly
                  />
                </div>
                <div className="flex flex-col my-2">
                  <label htmlFor="role" className="text-gray-700 text-sm">Role</label>
                  <select
                    name="role"
                    onChange={onChange}
                    className="px-3 py-2 rounded-md outline-none cursor-pointer focus:ring-1"
                  >
                    <option value={adminData.role}>
                      {String(adminData.role).charAt(0).toUpperCase() +
                        String(adminData.role).slice(1)}
                    </option>
                    <option value="writer">Writter</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <button
                    onClick={updateButtonClose}
                    className="mt-2 bg-yellow-300 hover:bg-yellow-500 text-black rounded-md px-3 py-2"
                  >
                    Cancle
                  </button>
                  <button
                    className="mt-2 float-right px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="overflow-x-auto mx-2 md:mx-10">
           <table className="w-full text-sm text-left text-black">
              <thead className="text-xs text-black uppercase bg-gray-100">
                <tr className="">
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
                    Role
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Created At
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <i className="ml-1 fa-solid fa-trash text-red-600" />
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <i className="ml-1 fa-solid fa-pen-to-square text-green-600" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {subAdminState.length > 0 ? (
                  subAdminState.map((e,i) => {
                    return (
                      <tr
                        key={e._id}
                        className={`${
                          e.role === "admin"
                            ? "bg-slate-300 text-black"
                            : "bg-white text-black"
                        }`}
                      >
                        <td className="py-4 px-6 font-medium whitespace-nowrap">
                          {i+1}
                        </td>
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium whitespace-nowrap"
                        >
                          {e.name}
                        </th>
                        <td className="py-4 px-6">{e.email}</td>
                        <td className="py-4 px-6">
                          {String(e.role).slice(0, 10)}
                        </td>
                        <td className="py-4 px-6">
                          {new Date(e.accountCreatedAt).toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-start">
                          <i
                            onClick={() => {
                              deleteAdmin(e._id);
                            }}
                            className="ml-1 fa-solid fa-trash text-red-600 hover:text-red-700 cursor-pointer"
                          />
                        </td>
                        <td className="py-4 px-6 text-start">
                          <i
                            onClick={() => {
                              updateButtonWake(e);
                            }}
                            className="ml-1 fa-solid fa-pen-to-square text-green-600 hover:text-green-700 cursor-pointer"
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="text-center text-yellow-300">
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

export default SubAdmins;

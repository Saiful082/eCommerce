import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h3>Admin Panel</h3>
            
            <NavLink to='/dashboard/admin/create/category' className="list-group-item list-group-item-action">
              A second link item
            </NavLink>
            <NavLink to='dashboard/admin/create/product'  className="list-group-item list-group-item-action">
              A third link item
            </NavLink>
            <NavLink to='dashboard/admin/user' className="list-group-item list-group-item-action">
              A fourth link item
            </NavLink>
           
          </div>
        </div>
      
    </>
  );
};

export default AdminMenu;

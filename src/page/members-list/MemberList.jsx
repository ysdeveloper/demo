import React from "react";
import AdminMemberList from "./AdminMembersList";
import UserMembersList from "./UserMembersList";
import NotFound from "../Error/NoteFound";

const userRoles = {
  ADMIN: "admin",
  USER: "user",
};

const MemberList = () => {
  const userRole = userRoles.ADMIN;

  return (
    <div>
      {userRole === userRoles.ADMIN ? (
        <AdminMemberList />
      ) : userRole === userRoles.USER ? (
        <UserMembersList />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default MemberList;

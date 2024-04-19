import React from "react";

function UserHome(props) {
  return (
    <div>
      <div className="container-main">
        <div className="title">
          <h1>{props.el.electionTitle}</h1>
          <br />
          <center>{props.el.electionDescription}</center>
          <table style={{ marginTop: "21px"}}>
            <tr>
              <th>Admin: </th>
              <td>
                {props.el.adminName}
              </td>
            </tr>
            <tr>
              <th>Email: </th>
              <td style={{ textTransform: "none" }}>{props.el.adminEmail}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserHome;

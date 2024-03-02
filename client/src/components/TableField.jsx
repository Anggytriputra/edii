import BootstrapTable from "react-bootstrap/Table";

export default function TableField({ tbody, userRole }) {
  return (
    <BootstrapTable
      striped
      bordered
      hover
      // className="px-4"
    >
      <thead>
        <tr>
          {/* <th>#</th> */}
          <th>Name</th>
          <th>Place and Date of Birth</th>
          <th>Position</th>
          <th>Last Education</th>
          <th>Action</th>
        </tr>
      </thead>
      {tbody}
    </BootstrapTable>
  );
}

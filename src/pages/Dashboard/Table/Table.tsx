import Table, { type Column } from "src/components/Table/Table";

interface User {
  name: string;
  email: string;
  role: string;
}

const columns: Column<User>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  {
    key: "role",
    header: "Role",
    render: (value) => <span className="ds-badge">{value}</span>,
  },
];

const data: User[] = [
  { name: "John Doe", email: "john@example.com", role: "Admin" },
  { name: "Jane Smith", email: "jane@example.com", role: "User" },
];

export default function TableCard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Table</h1>
      <Table columns={columns} data={data} loading={false} />
    </div>
  );
}

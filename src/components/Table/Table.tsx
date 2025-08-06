export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  striped?: boolean;
}

export default function Table<T>({
  columns,
  data,
  loading = false,
  striped = true,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table
        className={`ds-table ds-table-zebra w-full ${
          striped ? "ds-table-zebra" : ""
        }`}
      >
        {/* ✅ Table Head */}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="ds-bg-base-200 ds-text-base">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* ✅ Table Body */}
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 ds-text-neutral"
              >
                Loading...
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 ds-text-neutral"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

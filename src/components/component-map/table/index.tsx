import type { Table as TableType } from "@/types/generics.types";

const Table = ({ header, subheader, columns, body }: TableType) => {
  return (
    <div data-testid="table">
      {header ? (
        <div>
          <h2>{header}</h2>
          {subheader ? <span>{subheader}</span> : null}
        </div>
      ) : null}
      <table>
        <thead>
          <tr>
            {columns.map((text) => {
              return <th key={`TableColumnHeader-${text}`}>{text}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {body.map((row) => {
            return (
              <tr key={`TableRow-${row.name}`}>
                {row.body.map((cell, index) => {
                  return <td key={`TableCell-${cell}-${index}`}>{cell}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

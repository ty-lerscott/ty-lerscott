import dynamic from "next/dynamic";
import type { Table as TableType } from "@/types/generics.types";

import styles from "./styles.module.css";

const Header = dynamic(() => import("@/components/component-map/header"));

const Table = ({ header, subheader, columns, body }: TableType) => {
  const headerProps = { header, subheader, wrapperClassName: "mb-2" };

  return (
    <div data-testid="Table">
      {header ? <Header {...headerProps} /> : null}
      <table className={styles.Table}>
        <thead className={styles.Head}>
          <tr>
            {columns.map((text) => {
              return (
                <th
                  key={`TableColumnHeader-${text}`}
                  scope="col"
                  className={styles.Column}
                >
                  {text}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {body.map((row) => {
            return (
              <tr key={`TableRow-${row.name}`} className={styles.Row}>
                {row.body.map((cell, index) => {
                  return (
                    <td
                      key={`TableCell-${cell}-${index}`}
                      className={styles.Cell}
                    >
                      {cell}
                    </td>
                  );
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

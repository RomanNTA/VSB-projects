import React from "react";
import "./Table.css";

const dataSize = (id) => {
  let tmp = ["není uvedeno", "Junior", "Senior"];
  return tmp[id];
};

/**
 * tabulka s výpisem hodnot
 */
function Table({ data, handleDelete }) {
  return (
    <table className="table table-hover mt-3 mb-0">
      <thead className="table-info">
        <tr className="table-info border border-0 lh-5 text-center">
          <th scope="col">Jméno</th>
          <th scope="col">Příjmení</th>
          <th scope="col">Úroveň</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody className="table-height">
        {data.length === 0 ? (
          <tr className="table-light">
            <td colSpan={4}>Seznam neobsahuje žádného programátora.</td>
          </tr>
        ) : (
          data.map((m) => {
            return (
              <tr className="table-light" key={m.id}>
                <td scope="row" className="fw-bold">
                  {m.name}
                </td>
                <td>{m.surname}</td>
                <td>{dataSize(m.level)}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="btn btn-outline-info py-0"
                  >
                    Smaž
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default Table;

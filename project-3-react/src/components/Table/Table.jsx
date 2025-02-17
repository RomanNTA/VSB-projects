import React from "react";
import "./Table.css";

const dataSize = (id) => {
  let tmp = ["není uvedeno", "malá rybička", "velká ryba"];
  return tmp[id];
};

/**
 * tabulka se výpisem hodnot
 */
function Table({ data, handleDelete }) {
  return (
    <table className='table table-hover p-3'>
      <thead className='table-info'>
        <tr className='table-info border border-0 lh-5 text-center'>
          <th scope='col'>Jméno</th>
          <th scope='col'>Druh</th>
          <th scope='col'>velikost</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody className='table-height'>
        {data.length === 0 ? (
          <tr className='table-light'>
            <td colSpan={4}>Seznam neobsahuje žádnou rybičku.</td>
          </tr>
        ) : (
          data.map((m) => {
            return (
              <tr className='table-light' key={m.id}>
                <th scope='row'>{m.name}</th>
                <td>{m.species}</td>
                <td>{dataSize(m.size)}</td>
                <td>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className='btn btn-outline-info '>
                    Odebrat rybičku
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

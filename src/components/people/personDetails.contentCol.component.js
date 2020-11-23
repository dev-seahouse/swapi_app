import React from "react";
export const ContentCol = ({ title, objArr, objKey, emptyMsg }) => {
  const mapObjArrToList = (arr, objKey, emptyMsg) =>
    Array.isArray(arr) && arr.length
      ? arr.map((a) => <li key={a[objKey]}>{a[objKey]}</li>)
      : emptyMsg;

  return (
    <div className="doc-box-content-col">
      <h3 className="doc-box-content-title">{title}</h3>
      <ul className="doc-box-content-row">
        {mapObjArrToList(objArr, objKey, emptyMsg)}
      </ul>
    </div>
  );
};

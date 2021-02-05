import React from 'react';
import { useSelector } from 'react-redux';
import { getValid, getDublicateId } from '../functions/validate';

// some classes for styles
function getTableItemClass(index) {
  return index === 1 || index === 2
    ? 'w-12'
    : index === 6 || index === 9 || index === 10
    ? 'w-9'
    : index === 3
    ? 'w-20'
    : '';
}

export const Table = () => {
  const data = useSelector((state) => state.data);
  const correctData = useSelector((state) => state.correctData);

  return correctData ? (
    data.length ? (
      <div className="lawyers-table">
        <ul className="table-title">
          {Object.values(data['columns']).map((title, index) => (
            <li key={title} className={getTableItemClass(index)}>
              {title}
            </li>
          ))}
          <li>Duplicate with</li>
        </ul>

        {data.map((obj) => (
          <ul key={obj.id} className="table-data">
            {Object.values(data['columns']).map((key, index) => {
              // getValid returns an array with values isCorrectData(bool) and curent data
              // which converts(validates) by differents cases
              const [isCorrectData, validData] = getValid(obj, key);
              return (
                <li
                  key={key + index}
                  className={
                    !isCorrectData
                      ? 'invalid ' + getTableItemClass(index)
                      : getTableItemClass(index)
                  }>
                  {validData}
                </li>
              );
            })}
            <li>
              <span className={!getDublicateId(obj, data) ? 'v-h' : ''}>
                {getDublicateId(obj, data)}
              </span>
            </li>
          </ul>
        ))}
      </div>
    ) : (
      <strong>Press any button above</strong>
    )
  ) : (
    <div className="incorrect-data">File format is not correct</div>
  );
};

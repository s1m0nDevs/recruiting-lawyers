import React from 'react';
import * as d3 from 'd3-dsv';
import { useDispatch, useSelector } from 'react-redux';
import { loadCustomData, loadDefaultData, changeCorrect } from '../redux/actions';

export const ControlButtons = ({ data }) => {
  const inputFile = React.useRef(null);
  const isCorrectData = useSelector((state) => state.correctData);
  const dispatch = useDispatch();

  const getDefaultDataHandler = () => {
    dispatch(loadDefaultData());
  };

  const getCustomDataHandler = (e) => {
    const fileInput = e.target;
    const reader = new FileReader();

    if (fileInput.files[0]) reader.readAsBinaryString(fileInput.files[0]);

    reader.onload = () => {
      const fileName = e.target.files[0].name;
      let isCorrectCurData = true;

      if (/.csv$/.test(fileName)) {
        // d3-dsv library to parse csv data
        const data = d3.csvParse(reader.result);
        data.forEach((obj, index) => {
          Object.values(data['columns']).forEach((key) => {
            // check for empty data
            if ((key === 'Full Name' || key === 'Phone' || key === 'Email') && !obj[key])
              isCorrectCurData = false;
          });
          // store id
          obj['id'] = (index + 1).toString();
        });
        data['columns'].unshift('id');
        // needed when we use main buttons few times to add/hide error block (same for all changeCorrect actions)
        if (isCorrectData !== isCorrectCurData) dispatch(changeCorrect());
        dispatch(loadCustomData(data));
        // so we can open same file few times (because of onChange event)
        fileInput.value = '';
      } else if (isCorrectData) dispatch(changeCorrect());
    };
  };

  const importCustomDataHandler = () => {
    inputFile.current.click();
  };

  return (
    <div className="control-buttons">
      <button className="import-data-button" onClick={getDefaultDataHandler}>
        Import Default Data
      </button>
      <button className="import-data-button" onClick={importCustomDataHandler}>
        Import Custom Data
      </button>
      <input type="file" ref={inputFile} onChange={getCustomDataHandler} />
    </div>
  );
};

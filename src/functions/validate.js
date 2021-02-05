function validatePhone(phone) {
  phone = phone.replace(/\s+/g, ''); // remove all spaces
  phone = phone.replace(/^\+1|^1/, ''); // remove +1 or 1 at the begin
  return phone;
}

export function getDublicateId(curObj, data) {
  const foundObj = data.find((obj) => {
    return (
      curObj['id'] !== obj['id'] &&
      (validatePhone(obj['Phone']) === validatePhone(curObj['Phone']) ||
        obj['Email'].toLowerCase() === curObj['Email'].toLowerCase())
    );
  });
  return foundObj ? foundObj.id : '';
}

export function getValid(rowData, type) {
  let resData = rowData[type].trim();
  let isCorrectData = false;

  if (Number(resData)) resData = Number(resData);

  function isValidEmail(email) {
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }

  //YYYY-MM-DD or MM/DD/YYYY
  function isValidDate(date) {
    const reg = /((0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d)|(^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$)/;
    return reg.test(date);
  }

  switch (type) {
    case 'Full Name':
      if (!Number(resData)) isCorrectData = true;
      return [isCorrectData, resData];

    case 'Phone':
      resData = validatePhone(resData);
      // 10 digits
      if (resData / 10000000000 < 1 && resData / 1000000000 > 1) isCorrectData = true;
      resData = '+1' + resData;
      return [isCorrectData, resData];

    case 'Email':
      if (isValidEmail(resData)) isCorrectData = true;
      return [isCorrectData, resData];

    case 'Age':
      if (Number.isInteger(resData) && resData >= 21) isCorrectData = true;
      return [isCorrectData, resData];

    case 'Experience':
      if (resData >= 0 && resData < rowData['Age']) isCorrectData = true;
      return [isCorrectData, resData];

    case 'Yearly Income':
      if (Number(resData)) {
        resData = resData.toFixed(2);
        if (resData < 1000000) isCorrectData = true;
      }
      return [isCorrectData, resData];

    case 'Has Children':
      resData = resData.toUpperCase();
      if (resData === '') resData = 'FALSE';
      if (resData === 'TRUE' || resData === 'FALSE') isCorrectData = true;
      return [isCorrectData, resData];

    case 'License States':
      isCorrectData = true;
      const stateStrs = resData.split('|');
      if (stateStrs.length > 1)
        // Choose the shortest one
        resData = stateStrs.reduce((a, b) => (a.length <= b.length ? a : b));
      return [isCorrectData, resData];

    case 'Expiration Date':
      if (isValidDate(resData)) isCorrectData = true;
      return [isCorrectData, resData];

    case 'License Number':
      resData = resData.toString();
      if (resData.length === 6) isCorrectData = true;
      return [isCorrectData, resData];

    default:
      return [true, resData];
  }
}

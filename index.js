const fs = require('fs');
const axios = require('axios');

var argv = require('minimist')(process.argv.slice(2));

const getClubHouseData = async (param) => {
  const result = await axios.get(`https://api.app.shortcut.com/api/v3/projects${param}`, {
    headers: { 'Shortcut-Token': '625813ef-b726-47fd-ada4-a1e99b947377' },
  });
  const outArr = [];
  if (Array.isArray(result.data)) {
    for (const i of result.data) {
      outArr.push({ description: i.description, name: i.name, id: i.id });
    }
  } else {
    outArr.push({ description: result.data.description, name: result.data.name, id: result.data.id });
  }
  return outArr;
};

const makeFile = async () => {
  const fileName = typeof argv['o'] === 'string' ? argv['o'] : Math.floor(100000 + Math.random() * 900000);
  const outArr = [];
  if (Array.isArray(argv['p'])) {
    for (const i of argv['p']) {
      if (typeof i !== 'number') return;
      try {
        const json = await getClubHouseData(`/${i}`);
        outArr.push(json[0]);
      } catch (e) {
        console.log('Project ' + i + ' not found, job is continued');
      }
    }
  } else {
    const urlParam = typeof argv['p'] === 'number' ? `/${argv['p']}` : '';
    const json = await getClubHouseData(urlParam);
    outArr.push(...json);
  }
  fs.writeFileSync(`${process.cwd()}/outDir/${fileName}.json`, JSON.stringify(outArr));
};

makeFile();

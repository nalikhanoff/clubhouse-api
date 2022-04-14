const childProcess = require('child_process');
const { readdir, readFile } = require('fs/promises');

test('provided file name exists in outDir folder', async () => {
  const fileName = 'datas';
  childProcess.exec(`node index.js -o ${fileName}`);
  const dirContent = await readdir(`${process.cwd()}/outDir`);
  expect(dirContent.includes(`${fileName}.json`)).toBeTruthy();
});

test('provided id exists in outDir folder', async () => {
  const fileName = 'data2';
  childProcess.exec(`node index.js -o ${fileName} -p 2`);
  const fileContent = await readFile(`${process.cwd()}/outDir/${fileName}.json`);
  const jsData = JSON.parse(fileContent);
  expect(jsData[0].id).toBe(2);
});

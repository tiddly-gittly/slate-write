const placeholder = '/** new tests here generated using `npx zx scripts/test/add-new-test.mjs` */';

const newTestCaseName = await question('What is the name of new test case?');

const files = {};
files['test/end-to-end.test.ts'] = await fs.readFile('test/end-to-end.test.ts', 'utf8');
files['test/wikiast-util-from-slate-plate-ast.test.ts'] = await fs.readFile('wikiast-util-from-slate-plate-ast.test.ts', 'utf8');
files['test/wikiast-util-from-wikitext.test.ts'] = await fs.readFile('test/wikiast-util-from-wikitext.test.ts', 'utf8');
files['test/wikiast-util-to-slate-plate-ast.test.ts'] = await fs.readFile('test/wikiast-util-to-slate-plate-ast.test.ts', 'utf8');
files['test/wikiast-util-to-wikitext.test.ts'] = await fs.readFile('test/wikiast-util-to-wikitext.test.ts', 'utf8');

files['test/end-to-end.test.ts'].replace(
  placeholder,
  `  test('${newTestCaseName}', () => {
  expect(wikiAstDict['${newTestCaseName}']).toMatchObject(wikiAstFromSlateAst(wikiAstToSlateAst(wikiAstDictWithoutPos['${newTestCaseName}'])));
});
${placeholder}`,
);
files['test/wikiast-util-from-slate-plate-ast.test.ts'].replace(
  placeholder,
  `  test('${newTestCaseName}', () => {
    expect(wikiAstFromSlateAst(slateDict['${newTestCaseName}'])).toEqual(wikiAstDictWithoutPos['${newTestCaseName}']);
  });
${placeholder}`,
);
files['test/wikiast-util-from-wikitext.test.ts'].replace(
  placeholder,
  `  test('${newTestCaseName}', () => {
    expect(wikiAstFromWikiText(wikiTextDict['${newTestCaseName}'])).toEqual(wikiAstDict['${newTestCaseName}']);
  });
${placeholder}`,
);
files['test/wikiast-util-to-slate-plate-ast.test.ts'].replace(
  placeholder,
  `  test('${newTestCaseName}', () => {
    expect(wikiAstToSlateAst(wikiAstDict['${newTestCaseName}'])).toMatchObject(slateDict['${newTestCaseName}']);
  });
${placeholder}`,
);
files['test/wikiast-util-to-wikitext.test.ts'].replace(
  placeholder,
  `  test('${newTestCaseName}', () => {
    expect(wikiAstToWikiText(wikiAstDict['${newTestCaseName}'])).toEqual(wikiTextDict['${newTestCaseName}']);
  });
${placeholder}`,
);

await fs.writeFile('test/end-to-end.test.ts', files['test/end-to-end.test.ts'], 'utf8');
await fs.writeFile('wikiast-util-from-slate-plate-ast.test.ts', files['test/wikiast-util-from-slate-plate-ast.test.ts'], 'utf8');
await fs.writeFile('test/wikiast-util-from-wikitext.test.ts', files['test/wikiast-util-from-wikitext.test.ts'], 'utf8');
await fs.writeFile('test/wikiast-util-to-slate-plate-ast.test.ts', files['test/wikiast-util-to-slate-plate-ast.test.ts'], 'utf8');
await fs.writeFile('test/wikiast-util-to-wikitext.test.ts', files['test/wikiast-util-to-wikitext.test.ts'], 'utf8');

await $`npx eslint test --fix`;

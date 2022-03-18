# Test

Here are tests about wiki syntax.

## How to add new test

1. Add wikitext, wikiast, slate-plate-ast to `test/constants.ts`, tests will check transforms between these three type of values.
1. Add tests in each `xxx.test.ts` file, using value from `test/constants.ts`.
1. Add corresponding transform abilities in `src/transform`, as described in its [Readme](../src/transform/README.md).

### How to get wikiast

Open web developer tool in your browser tab that have a tiddlywiki opened, and use `$tw.wiki.parseText('text/vnd.tiddlywiki', 'the wikitext string you want to see ast').tree` to get example wikiast from the string.

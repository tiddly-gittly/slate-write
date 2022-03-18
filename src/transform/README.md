# Transform

This folder contains AST transformers, in two types:

- Between text and AST: `wikiast-util-to-wikitext`
- Between ASTs: `wikiast-util-from-slate-plate-ast` `wikiast-util-to-slate-plate-ast`

1. In `src/transform/serialize.ts`
   1. when loading, get slate-plate-ast using wikitext -> `wikiast-util-from-wikitext` -> `wikiast-util-to-slate-plate-ast`
   1. when saving, get wikitext using slate-plate-ast -> `wikiast-util-from-slate-plate-ast` -> `wikiast-util-to-wikitext`

## slate-plate-ast

SlateJS don't have many constrains on how user construct their JSONSchema, so each slate-based-editor will have different AST. For example, [udecode/plate](https://github.com/udecode/plate) and [prezly/slate](https://github.com/prezly/slate) uses similar but different JSON structure.

In our packages, we choose to use udecode/plate, so we use `wikiast-util-from-slate-plate-ast` to convert Slate generated JSON to wikiast.

## Wiki AST

Similar to SlateJS AST, each wiki system will generate different AST. In our package, we focus on tiddlywiki-generated AST.

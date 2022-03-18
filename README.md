# Slate Write

A WYSIWYG editor for TiddlyWiki.

## How this works

1. we add some type of wikiast to [tw5-typed](https://github.com/tiddly-gittly/TW5-Typed), based on the real json output of `$tw.wiki.parseText('text/vnd.tiddlywiki', input).tree`
1. Transform AST to Slate JSON using [transformers in src/transform](src/transform/README.md)
1. handle keyboard shortcut and basic elements' rendering using slatejs plugins from [Udecode's Plate](https://plate.udecode.io)
1. TODO: render tiddlywiki widget using `dangerouslySetInnerHTML`
1. TODO: optimization: use section splitter in section-editor to ensure only a small potion of text will `onChange` and rerender. And we can get start-end of section from section splitter, so replace the section of text onChange.

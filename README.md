# Slate Write

A WYSIWYG editor for TiddlyWiki.

## How this works

1. we add some type of wikiast to tw5-typed, based on the real json output of `$tw.wiki.parseText('text/vnd.tiddlywiki', input).tree`
1. In `src/transform/serialize.ts`
    1. when loading, get slateast using wikitext -> `wikiast-util-from-wikitext` -> `wikiast-util-to-slateast`
    1. when saving, get wikitext using slateast -> `wikiast-util-from-slateast` -> `wikiast-util-to-wikitext`
1. handle shortcut using slatejs plugins in `src/components/withShortcuts.ts`
1. TODO: render wiki widget using `dangerouslySetInnerHTML`
1. TODO: optimization: use section splitter in section-editor to ensure only a small potion of text will `onChange` and rerender. And we can get start-end of section from section splitter, so replace the section of text onChange.

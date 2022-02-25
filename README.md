# Slate Write

A WYSIWYG editor for TiddlyWiki.

## How this works

1. add type of tidast to tw5-typed
1. write a tidast-util-to-mdast
1. use remark-slate-transformer to get slate ast and render, and get mdast on save (Or maybe fork a tidast-slate-transformer)
1. use md-to-tid to get tid text to set text

import { TComboboxItem } from '@udecode/plate';
import { Tiddler } from 'tiddlywiki';

export interface ISnippetComboboxItem {
  name: string;
  preview: string;
}
export const snippets: Array<TComboboxItem<ISnippetComboboxItem>> = [];

function getSnippetName(tiddler: Tiddler): string {
  const name = tiddler.fields['snippet-name'];
  if (typeof name !== 'string' || name) {
    const splits = tiddler.fields.title.split('/');
    return splits[splits.length - 1];
  }
  return name;
}

// Load tw5 snippet
$tw.utils.each($tw.wiki.filterTiddlers('[all[tiddlers+shadows]tag[$:/tags/TextEditor/Snippet]]'), (snippetTiddlerTitle) => {
  if (!snippetTiddlerTitle) return;
  const snippet = $tw.wiki.getTiddler(snippetTiddlerTitle);
  if (snippet == undefined) return;
  snippets.push({
    key: snippetTiddlerTitle,
    data: {
      name: getSnippetName(snippet),
      preview: `!! ${snippet.fields.caption}${snippet.fields['snippet-description'] ? '\n\n' + snippet.fields['snippet-description'] : ''}`,
    },
    text: snippet.fields.text,
  });
});

// Load KaTeX snippet
$tw.utils.each($tw.wiki.filterTiddlers('[all[tiddlers+shadows]tag[$:/tags/KaTeX/Snippet]]'), (snippetTiddlerTitle) => {
  if (!snippetTiddlerTitle) return;
  const snippet = $tw.wiki.getTiddler(snippetTiddlerTitle);
  if (snippet == undefined) return;
  const name = getSnippetName(snippet);
  snippets.push({
    key: snippetTiddlerTitle,
    data: {
      name,
      preview: snippet.fields.text,
    },
    text: snippet.fields.text,
  });
});

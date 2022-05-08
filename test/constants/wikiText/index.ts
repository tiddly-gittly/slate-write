export const wikiTextDict: Record<string, string> = {
  text: 'AAA',
  'p > text': 'AAA',
  'ol > li > text': `# AAA
# BBB
# CCC`,
  'ul > li > text': `* AAA
* BBB
* CCC`,
  'ol > ol > ol > li': `# AAA
## BBB
### CCC`,
  'p + ol + blockquote > div + ol': `PPP

# AAA

> BBB
> BBB2

# CCC`,
  'p + ol + blockquote > p + ol': `PPP

# AAA

<<<
BBB

BBB2
<<<

# CCC
`,
  'ol > ol > p + empty p': `# 逐字输入
## 先通过 \`/\` 菜单将当前块转换为特殊块，其实就是告诉编辑器进入实时预览模式
## 
`,
  'ol + ol > ol > p': `# AAA
## CCC
## DDD
## EEE
# BBB
## FF \`/\` FFF
## FFF
## GGG
## `,
  'p basic nested marks': `A''A//A//A''A
B//B__B__B//B

C__C~~C~~C__C

D~~D\`D\`D~~D

E\`EEE\`E

F^^F,,F,,F^^F

G,,G''G''G,,G
`,
  'p basic sequence marks': `A''A''''//A//''''A''A

B//B////__B__////B//B

C__C____~~C~~____C__C

D~~D~~~~\`D\`~~~~D~~D

E\`EEE\`E

F^^F^^,,F,,^^F^^F

G,,G,,'',,G,,'',,G,,G`,
  'ol > li > mark > text': `# A''//A//''A
## B//B//B
### C^^C^^C`,
  image: `[img[TiddlyWikiIconBlack.png]]`,
  'image with tooltip and width': `[img width=75% [black one|TiddlyWikiIconBlack.png]]`,
  transclude: `{{favicon.ico}}`,
  'list widget': `<$list filter="[tag[ExampleTag]sort[title]]"/>`,
  'list widget block': `<$list filter="[tag[ExampleTag]sort[title]]"/>

aaa`,
  link: `[[ExampleTag]]`,
  'empty link': `[[]]`,
  'alias link': `[[SomeText|ExampleTag]]`,
  'external link': `<a id="#Top_of_tiddler"></a>

[ext[TW5|https://tiddlywiki.com]]

[ext[Mail me|mailto:me@where.net]]

[ext[Open file|../README.md]]

<a href="##Top_of_tiddler">Top</a>`,
  heading: `! AAA

!! AAA

!!! AAA

!!!! AAA

!!!!! AAA

!!!!!! AAA

AAA`,
  'link in a list': `# AAA
## [[BBB]]
### CCC`,
};

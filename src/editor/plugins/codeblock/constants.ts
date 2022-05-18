export const ELEMENT_CODE_BLOCK = 'codeblock';

export const CODE_BLOCK_LANGUAGES_POPULAR: string[] = [
  'TiddlyWiki',
  'Shell',
  'CSS',
  'Git',
  'GraphQL',
  'HTML',
  'JavaScript',
  'JSON',
  'JSX',
  'Markdown',
  'SQL',
  'SVG',
  'TSX',
  'TypeScript',
  'WebAssembly',
];
export const CODE_BLOCK_LANGUAGES: Record<string, string | string[]> = {
  ANTLR4: 'antlr4',
  C: 'c',
  'C#': 'csharp',
  CSS: 'css',
  CoffeeScript: 'coffeescript',
  CMake: 'cmake',
  Dart: 'dart',
  Django: 'django',
  Docker: 'docker',
  EJS: 'ejs',
  Erlang: 'erlang',
  Git: 'git',
  Go: 'go',
  GraphQL: 'graphql',
  Groovy: 'groovy',
  HTML: 'html',
  Java: 'java',
  JavaScript: 'javascript',
  JSON: 'json',
  JSX: 'jsx',
  Kotlin: 'kotlin',
  LaTeX: 'latex',
  Less: 'less',
  Lua: 'lua',
  Makefile: 'makefile',
  Markdown: ['markdown', 'md'],
  MATLAB: 'matlab',
  Markup: 'markup',
  'Objective-C': 'objectivec',
  Perl: 'perl',
  PHP: 'php',
  PowerShell: 'powershell',
  '.properties': 'properties',
  'Protocol Buffers': 'protobuf',
  Python: 'python',
  R: 'r',
  Ruby: 'ruby',
  'Sass (Sass)': 'sass',
  'Sass (Scss)': 'scss',
  Scala: 'scala',
  Scheme: 'scheme',
  SQL: 'sql',
  Shell: ['bash', 'sh', 'zsh', 'shell'],
  Swift: 'swift',
  SVG: 'svg',
  TSX: 'tsx',
  TiddlyWiki: ['tiddlywiki', 'tid'],
  TypeScript: 'typescript',
  WebAssembly: 'wasm',
  YAML: 'yaml',
  XML: 'xml',
};

export function normalizeLanguage(language: string): string {
  for (const values of Object.values(CODE_BLOCK_LANGUAGES)) {
    if (Array.isArray(values)) {
      if (values.includes(language)) {
        return values[0];
      }
    } else if (values === language) {
      return values;
    }
  }
  return language;
}

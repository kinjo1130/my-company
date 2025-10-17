// CSS ファイルのインポートに対する型定義
declare module '*.css' {
  const content: string;
  export default content;
}

// highlight.js の CSS ファイルに対する型定義
declare module 'highlight.js/styles/*.css' {
  const content: string;
  export default content;
}

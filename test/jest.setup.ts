/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TiddlyWiki } from 'tiddlywiki';

beforeEach(async () => {
  const $tw = TiddlyWiki();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).$tw = $tw;
  $tw.boot.argv = ['--version'];
  await new Promise<void>((resolve: () => unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    $tw.boot.boot(resolve);
  });
});

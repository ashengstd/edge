import worker from '../index';

async function testRouting() {
  const env = {
    ASSETS: {
      fetch: async (req: Request) => {
        return new Response(`Serving asset: ${new URL(req.url).pathname}`, { status: 200 });
      }
    }
  };

  console.log('--- Testing /ui routing ---');
  const uiReq = new Request('http://localhost/ui');
  const uiRes = await worker.fetch(uiReq, env, {});
  const uiText = await uiRes.text();
  console.log(`Path: /ui -> Result: ${uiText}`);

  console.log('\n--- Testing /ui/index.html routing ---');
  const uiAssetsReq = new Request('http://localhost/ui/index.html');
  const uiAssetsRes = await worker.fetch(uiAssetsReq, env, {});
  const uiAssetsText = await uiAssetsRes.text();
  console.log(`Path: /ui/index.html -> Result: ${uiAssetsText}`);

  console.log('\n--- Testing /_next/static/... routing ---');
  const nextReq = new Request('http://localhost/_next/static/main.js');
  const nextRes = await worker.fetch(nextReq, env, {});
  const nextText = await nextRes.text();
  console.log(`Path: /_next/static/main.js -> Result: ${nextText}`);

  console.log('\n--- Testing root (/) without params ---');
  const rootReq = new Request('http://localhost/');
  const rootRes = await worker.fetch(rootReq, env, {});
  const rootText = await rootRes.text();
  console.log(`Path: / -> Result: ${rootText}`);

  console.log('\n--- Testing API with params at root ---');
  const apiReq = new Request('http://localhost/?proxies=test');
  const apiRes = await worker.fetch(apiReq, env, {});
  console.log(`Path: /?proxies=test -> Content-Type: ${apiRes.headers.get('content-type')}`);
}

testRouting().catch(console.error);

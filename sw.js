// SmartMistake Service Worker
// 提供离线缓存和静态资源缓存
// 版本：v3-20250615 - 修复PWA缓存导致的黑屏问题

const CACHE_NAME = 'smartmistake-v3-20250615';
const APP_VERSION = 'v0.2.3';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 安装时缓存静态资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).catch(() => {
      console.log('SW: Static assets caching skipped');
    })
  );
  self.skipWaiting();
});

// 激活时清理旧缓存并通知客户端
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      return self.clients.claim();
    }).then(() => {
      return self.clients.matchAll({ type: 'window' }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'APP_UPDATED', version: APP_VERSION });
        });
      });
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // 对 JS/CSS/HTML 文件：网络优先，确保最新版本
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(request).then((response) => {
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
        }
        return response;
      }).catch(() => {
        return caches.match(request).then((cached) => {
          if (cached) return cached;
          if (request.mode === 'navigate') {
            return new Response(
              '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>更新 - SmartMistake</title></head><body style="background:#0f172a;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;"><div style="text-align:center;padding:20px;"><h1>🔄 需要更新</h1><p>应用已更新，请刷新页面获取最新版本</p><button onclick="location.reload(true)" style="padding:12px 24px;border:none;border-radius:8px;background:#3b82f6;color:#fff;cursor:pointer;font-size:16px;">立即刷新</button></div></body></html>',
              { headers: { 'Content-Type': 'text/html' } }
            );
          }
          throw new Error('Network request failed');
        });
      })
    );
    return;
  }
  
  // 其他资源：缓存优先
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request).then((networkResponse) => {
        if (networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
        }
        return networkResponse;
      }).catch(() => {
        if (request.mode === 'navigate') {
          return new Response(
            '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>离线 - SmartMistake</title></head><body style="background:#0f172a;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;"><div style="text-align:center;padding:20px;"><h1>📴 您处于离线状态</h1><p>请连接网络后刷新页面</p><button onclick="location.reload(true)" style="padding:12px 24px;border:none;border-radius:8px;background:#3b82f6;color:#fff;cursor:pointer;font-size:16px;">刷新</button></div></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        }
        throw new Error('Network request failed');
      });
    })
  );
});

// 监听 skipWaiting 消息
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

var C="att-v6";
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(C).then(function(c){return c.addAll(["./","./index.html","./manifest.json","./firebase-config.js"])}).catch(function(){}));
  self.skipWaiting();
});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener("fetch",function(e){
  var r=e.request;
  if(r.method!=="GET")return;
  var u=new URL(r.url);
  if(u.origin!==location.origin&&u.hostname!=="www.gstatic.com")return;
  e.respondWith(fetch(r).then(function(res){
    if(res&&(res.ok||res.type==="opaque")){var x=res.clone();caches.open(C).then(function(c){c.put(r,x)})}
    return res;
  }).catch(function(){
    return caches.match(r).then(function(m){return m||caches.match("./index.html")});
  }));
});

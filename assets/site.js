/* 全ページ共通：サイト名・ヘッダー・フッター・コードの箱
   サイト名を変えるときは、下の SITE の2行だけ書きかえる。 */
(function () {
  var SITE = {
    name: 'みんなで答える授業アプリ',
    sub: '先生が問題を出し、生徒は自分のタブレットで一斉回答。Googleスプレッドシートで結果にまとめられる無料のアプリ集です。',
  };

  var root = document.body.getAttribute('data-root') || '';   // apps/ の中のページは "../"
  var here = document.body.getAttribute('data-page') || '';

  /* ---------- ヘッダー ---------- */
  var nav = [
    ['top', 'index.html', 'トップ'],
    ['hajimete', 'hajimete.html', 'はじめての方へ'],
    ['secchi', 'secchi.html', '設置の手順'],
    ['tsumazuki', 'tsumazuki.html', 'うまくいかないとき'],
    ['riyou', 'riyou.html', '利用について'],
  ];
  var head = document.createElement('header');
  head.className = 'site-head';
  head.innerHTML =
    '<div class="in"><p class="site-name"><a href="' + root + 'index.html"></a></p>' +
    '<p class="site-sub"></p><nav class="site-nav"></nav></div>';
  head.querySelector('.site-name a').textContent = SITE.name;
  head.querySelector('.site-sub').textContent = SITE.sub;
  var navEl = head.querySelector('.site-nav');
  nav.forEach(function (n) {
    var a = document.createElement('a');
    a.href = root + n[1];
    a.textContent = n[2];
    if (n[0] === here) a.className = 'now';
    navEl.appendChild(a);
  });
  document.body.insertBefore(head, document.body.firstChild);

  /* ---------- フッター ---------- */
  var foot = document.createElement('footer');
  foot.className = 'site-foot';
  foot.innerHTML = '<div class="in"><p><a href="' + root + 'riyou.html">利用について</a>' +
    '<a href="' + root + 'tsumazuki.html">うまくいかないとき</a></p>' +
    '<p>授業や校内での利用・改造は自由です。販売や、そのままの再配布はご遠慮ください。保証やサポートはありません。</p></div>';
  document.body.appendChild(foot);

  /* ---------- タイトル ---------- */
  document.title = (document.title ? document.title + '｜' : '') + SITE.name;

  /* ---------- トップのアプリ一覧 ---------- */
  var list = document.getElementById('app-list');
  if (list && window.APPS) {
    window.APPS.forEach(function (a) {
      var el = document.createElement(a.ready ? 'a' : 'div');
      el.className = 'app' + (a.ready ? '' : ' soon');
      if (a.ready) el.href = root + 'apps/' + a.id + '.html';
      var h = document.createElement('h3'); h.textContent = a.name;
      var p = document.createElement('p'); p.textContent = a.desc;
      var tg = document.createElement('div'); tg.className = 'tags';
      (a.ready ? a.tags : ['準備中'].concat(a.tags)).forEach(function (t, i) {
        var s = document.createElement('span');
        s.className = 'tag' + (!a.ready && i === 0 ? ' wait' : '');
        s.textContent = t;
        tg.appendChild(s);
      });
      el.appendChild(h); el.appendChild(p); el.appendChild(tg);
      list.appendChild(el);
    });
  }

  /* ---------- コードの箱 ----------
     <div class="code-box" data-src="../code/jibun-drill/Code.gs.txt" data-name="Code.gs"></div> */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (ok, ng) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy') ? ok() : ng(); } catch (e) { ng(e); }
      document.body.removeChild(ta);
    });
  }
  function saveFile(text, name) {
    var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  document.querySelectorAll('.code-box').forEach(function (box) {
    var src = box.getAttribute('data-src');
    var name = box.getAttribute('data-name') || 'code.txt';
    box.innerHTML =
      '<div class="code-head"><span class="fname"></span><span class="info">読みこみ中…</span>' +
      '<button class="btn" type="button" data-act="copy" disabled>コードをすべてコピーする</button>' +
      '<button class="btn ghost" type="button" data-act="save" disabled>ファイルとして保存する</button>' +
      '<button class="btn ghost" type="button" data-act="open" disabled>全部を表示する</button></div>' +
      '<pre></pre>';
    box.querySelector('.fname').textContent = name;
    var info = box.querySelector('.info');
    var pre = box.querySelector('pre');
    var text = '';

    fetch(src, { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (t) {
        text = t;
        pre.textContent = t;
        info.textContent = t.split('\n').length + '行';
        box.querySelectorAll('button').forEach(function (b) { b.disabled = false; });
      })
      .catch(function () {
        var m = document.createElement('div');
        m.className = 'code-msg';
        m.textContent = 'コードを読みこめませんでした。ページを読みこみ直してください。' +
          '（パソコンに保存したページを直接開いたときは、コードを読みこめません。サイトのURLから開いてください）';
        pre.replaceWith(m);
        info.textContent = '';
      });

    box.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b || !text) return;
      var act = b.getAttribute('data-act');
      if (act === 'copy') {
        copyText(text).then(function () {
          b.textContent = 'コピーしました';
          b.classList.add('done');
          setTimeout(function () { b.textContent = 'コードをすべてコピーする'; b.classList.remove('done'); }, 2500);
        }).catch(function () {
          b.textContent = 'コピーできませんでした。「ファイルとして保存する」を使ってください';
        });
      } else if (act === 'save') {
        saveFile(text, name);
      } else if (act === 'open') {
        var open = box.classList.toggle('open');
        b.textContent = open ? '小さく表示する' : '全部を表示する';
      }
    });
  });
})();

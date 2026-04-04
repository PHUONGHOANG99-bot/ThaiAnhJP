(function () {
  const set = (selector, text) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  };

  const setAll = (selector, texts) => {
    const list = document.querySelectorAll(selector);
    list.forEach((el, i) => {
      if (texts[i] !== undefined) el.textContent = texts[i];
    });
  };

  const setByHref = (href, text) => {
    document.querySelectorAll(`a[href="${href}"]`).forEach((el) => {
      el.textContent = text;
    });
  };

  const setCommon = () => {
    document.documentElement.lang = 'ja';

    setByHref('#home', 'ホーム');
    setByHref('index.html#home', 'ホーム');
    setByHref('company.html', '会社概要');
    setByHref('business.html', '企業情報');
    setByHref('activities.html', '事業紹介');
    setByHref('recruit.html', '採用情報');
    setByHref('#access', 'お問い合わせ');
    setByHref('index.html#access', 'お問い合わせ');
    setByHref('#news', 'お知らせ');
    setByHref('index.html#news', 'お知らせ');

    document.querySelectorAll('.leading-tight p:nth-child(2)').forEach((el) => {
      el.textContent = '日本の高級メンズファッション';
    });

    document.querySelectorAll('#menuBtn, .mobile-menu-btn').forEach((el) => {
      el.setAttribute('aria-label', 'メニューを開く');
    });
    document.querySelectorAll('.sr-only').forEach((el) => {
      if (el.textContent && el.textContent.includes('menu')) el.textContent = 'メニューを開く';
    });

    document.querySelectorAll('.floating-actions').forEach((el) => {
      el.setAttribute('aria-label', 'クイック連絡');
    });

    document.querySelectorAll('.floating-btn-call .floating-btn__label').forEach((el) => (el.textContent = '今すぐ電話'));
    document.querySelectorAll('.floating-btn-mail .floating-btn__label').forEach((el) => (el.textContent = 'Gmail'));
    document.querySelectorAll('.floating-btn-facebook .floating-btn__label').forEach((el) => (el.textContent = 'Facebook'));
    document.querySelectorAll('.floating-btn-tiktok .floating-btn__label').forEach((el) => (el.textContent = 'TikTok'));

    set('.site-footer__contact h3', 'お問い合わせ');
    set('.site-footer__social h3', 'SNS');
    set('.site-footer__legal h3', '法務情報');

    setAll('.site-footer__contact li span', ['Hotline', 'Email', '対応エリア']);
    setAll('.site-footer__bottom p', ['本物の品質、確かな価値、透明なサービス。', 'カスタマーサポート: 09:00 - 21:00（毎日）']);
  };

  const setIndex = () => {
    document.title = 'Thế Anh JP | 日越スタイルの上質メンズファッション';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Thế Anh JP - 日本スタイルの上質なファッションを提案する企業サイト。');

    set('#intro .home-intro__panel h2', '事業紹介');
    set('#intro .home-intro__panel p', 'Thế Anh JPは高品質なファッション商品の輸入・販売に特化しています。信頼できる仕入れ、丁寧な検品、効率的な運営を軸に、適正価格で安心して選べる買い物体験を提供します。');
    set('#intro .home-intro__cta', '事業紹介ページを見る');

    const marquee = document.querySelector('.intro-marquee');
    if (marquee) marquee.setAttribute('aria-label', '店舗イメージギャラリー');

    set('#recruit-preview h2', '最新のお知らせ');
    set('#access h2', '店舗情報・お問い合わせ');
    setAll('#access .access-badge', ['拠点 01', '拠点 02']);

    document.querySelectorAll('iframe[title*="Bản đồ"]').forEach((el, i) => {
      el.title = i === 0 ? '岐阜店マップ' : '栄店マップ';
    });
  };

  const setCompany = () => {
    document.title = '会社概要 | Thế Anh JP';
    set('main nav[aria-label="Breadcrumb"] a', 'ホーム');
    set('main nav[aria-label="Breadcrumb"] span.text-slate-700', '会社概要');
    setAll('.profile-tab strong', ['会社概要', '沿革', '店舗拠点', '企業情報']);
    set('#company-overview .profile-panel__head h2', '企業プロフィール');
    setAll('.profile-table th', ['会社名', '設立日', '代表者', '本社所在地', '海外拠点', '資本金', '従業員数', '主要取引先', '企業方針']);
    set('.profile-table__link a', '会社資料をダウンロード');
    setAll('.profile-site-card h3', ['拠点1 - GIFU', '拠点2 - SAKAE']);
  };

  const setBusiness = () => {
    document.title = '企業情報 | Thế Anh JP';
    set('.business-hero__label span', '企業概要');
    set('main nav[aria-label="Breadcrumb"] a', 'ホーム');
    set('main nav[aria-label="Breadcrumb"] span.text-slate-700', '企業情報');
    set('.business-block h1', '企業内容');
    setAll('.business-row h2', ['店舗ネットワーク型の販売モデル', '店頭サービス基準', '小売向けマルチチャネル運営']);
  };

  const setActivities = () => {
    document.title = '事業紹介 | Thế Anh JP';
    set('.activities-breadcrumb a', 'ホーム');
    set('.activities-breadcrumb span:last-child', '事業紹介');
    set('.activities-hero__top h1', '事業紹介');
    set('.activities-hero__top p', 'Thế Anh JPは、高品質なファッション商品の仕入れ・検品・販売に特化しています。信頼性と実用性を重視し、適正価格で安定した価値を届けます。');
    setAll('.activities-intro__stats strong', ['100%', '2拠点', '価格透明']);
    setAll('.activities-intro__stats span', ['販売前に全品チェック', '直営で運営', 'オンライン/店舗で統一']);
    setAll('.activities-tab', ['仕入れ選定について', '品質検品について', '価格と販売チャネルについて']);
    setAll('.activities-section__head', ['仕入れ選定について', '品質検品について', '価格と販売チャネルについて', 'お客様の声']);
    setAll('#sourcing h2, #quality h2, #distribution h2, #customer-reviews h2', ['適切な仕入れで品質を安定化', 'お客様に届く前の徹底検品', '適正価格と透明な販売体制', 'お客様の声']);
    set('#customer-reviews p', '一つひとつのレビューをもとに、選品・シルエット・購入体験を継続的に改善しています。');
    setAll('.reviews-nav', ['‹', '›']);
    const closeBtn = document.getElementById('reviewLightboxClose');
    if (closeBtn) closeBtn.setAttribute('aria-label', '画像を閉じる');
  };

  const setRecruit = () => {
    document.title = '採用情報 | Thế Anh JP';
    set('main nav[aria-label="Breadcrumb"] a', 'ホーム');
    set('main nav[aria-label="Breadcrumb"] span.text-slate-700', '採用情報');
    setAll('.recruit-tab strong', ['募集職種', 'スタッフ情報', '成長ステップ', '福利厚生・カルチャー']);
  };

  const setHistory = () => {
    document.title = '沿革 | Thế Anh JP';
  };

  const file = window.location.pathname.split('/').pop() || 'index.html';
  setCommon();

  if (file === 'index.html' || file === '') setIndex();
  if (file === 'company.html') setCompany();
  if (file === 'business.html') setBusiness();
  if (file === 'activities.html') setActivities();
  if (file === 'recruit.html') setRecruit();
  if (file === 'history.html') setHistory();
})();

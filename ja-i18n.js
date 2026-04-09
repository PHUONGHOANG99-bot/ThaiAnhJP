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

  const setMenuByHref = (href, text) => {
    document.querySelectorAll(`.nav-link[href="${href}"], .mobile-link[href="${href}"]`).forEach((el) => {
      el.textContent = text;
    });
  };

  const setCommon = () => {
    document.documentElement.lang = 'ja';

    setMenuByHref('#home', 'ホーム');
    setMenuByHref('index.html#home', 'ホーム');
    setMenuByHref('company.html', '会社概要');
    setMenuByHref('business.html', '企業情報');
    setMenuByHref('activities.html', '事業紹介');
    setMenuByHref('recruit.html', '働く環境');
    setMenuByHref('#access', 'お問い合わせ');
    setMenuByHref('index.html#access', 'お問い合わせ');
    setMenuByHref('#news', 'お知らせ');
    setMenuByHref('index.html#news', 'お知らせ');

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
    setAll('.site-footer__legal p', ['THAI ANH 株式会社（THAI ANH Co., Ltd.）', 'All rights reserved.']);

    setAll('.site-footer__contact li span', ['Hotline', 'Email', '対応エリア']);
    setAll('.site-footer__bottom p', ['本物の品質、確かな価値、透明なサービス。', 'カスタマーサポート: 09:00 - 21:00（毎日）']);
  };

  const setIndex = () => {
    document.title = 'THAI ANH JP | 日越スタイルの上質メンズファッション';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'THAI ANH JP - 日本スタイルの上質なファッションを提案する企業サイト。');

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
    document.title = '会社概要 | THAI ANH JP';
    set('main nav[aria-label="Breadcrumb"] a', 'ホーム');
    set('main nav[aria-label="Breadcrumb"] span.text-slate-700', '会社概要');
    setAll('.profile-tab strong', ['会社概要', '沿革', '店舗拠点']);
    set('#company-overview .profile-panel__head h2', '企業プロフィール');
    setAll('.profile-table th', ['会社名', '設立', '代表者', '事業内容', '本社所在地', '店舗一覧', '従業員数', '主要取引先']);
    set('.profile-table__link a', '会社資料をダウンロード');
    setAll('.profile-site-card h3', ['岐阜店', '名古屋店']);
  };

  const setBusiness = () => {
    document.title = '企業情報 | THAI ANH JP';
    set('.business-hero__label span', '企業概要');
    set('main nav[aria-label="Breadcrumb"] a', 'ホーム');
    set('main nav[aria-label="Breadcrumb"] span.text-slate-700', '企業情報');
  };

  const setActivities = () => {
    document.title = '事業紹介 | THAI ANH JP';
    set('.activities-breadcrumb a', 'ホーム');
    set('.activities-breadcrumb span:last-child', '事業紹介');
    setAll('.activities-intro__stats strong', ['100%', '2拠点', '価格透明']);
    setAll('.activities-intro__stats span', ['販売前に全品チェック', '直営で運営', 'オンライン/店舗で統一']);
    setAll('.activities-tab', ['仕入れ選定について', '品質検品について', '価格と販売チャネルについて']);
    setAll('.activities-section__head', ['仕入れ選定について', '品質検品について', '価格と販売チャネルについて', 'お客様の声']);
    setAll('#sourcing h2, #quality h2, #distribution h2, #customer-reviews h2', ['適切な仕入れで品質を安定化', 'お客様に届く前の徹底検品', '適正価格と透明な販売体制', 'お客様の声']);
    set('#customer-reviews p', '一つひとつのレビューをもとに、選品・シルエット・購入体験を継続的に改善しています。');
    const closeBtn = document.getElementById('reviewLightboxClose');
    if (closeBtn) closeBtn.setAttribute('aria-label', '画像を閉じる');
  };

  const setRecruit = () => {
    document.title = '働く環境 | THAI ANH JP';
    set('main nav[aria-label="Breadcrumb"] a', 'ホーム');
    set('main nav[aria-label="Breadcrumb"] span.text-slate-700', '働く環境');
    setAll('.recruit-tab strong', ['店舗の雰囲気', '接客の流れ', '売場づくりと連携', '日々の業務']);
    setAll('.recruit-panel header p', ['店舗の雰囲気', '接客の流れ', '売場づくりと連携', '日々の業務']);
    setAll('.recruit-panel header h2', ['店舗での働きやすさ', '接客の流れ', '売場づくりと連携', '日々の業務']);
  };

  const setHistory = () => {
    document.title = '沿革 | THAI ANH JP';
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

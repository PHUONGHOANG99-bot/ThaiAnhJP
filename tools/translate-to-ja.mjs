import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const files = readdirSync('.').filter((f) => f.endsWith('.html'));

const replacements = [
  ['<html lang="vi">', '<html lang="ja">'],
  ['Thế Anh JP | Tinh hoa thời trang Việt Nhật', 'Thế Anh JP | 日越スタイルの上質メンズファッション'],
  ['Hồ sơ công ty | Thế Anh JP', '会社概要 | Thế Anh JP'],
  ['Thông tin doanh nghiệp | Thế Anh JP', '企業情報 | Thế Anh JP'],
  ['Giới thiệu | Thế Anh JP', '事業紹介 | Thế Anh JP'],
  ['Thông tin tuyển dụng | Thế Anh JP', '採用情報 | Thế Anh JP'],
  ['Lịch sử công ty | Thế Anh JP', '沿革 | Thế Anh JP'],

  ['Trang chủ', 'ホーム'],
  ['Hồ sơ công ty', '会社概要'],
  ['Thông tin doanh nghiệp', '企業情報'],
  ['Giới thiệu', '事業紹介'],
  ['Thông tin tuyển dụng', '採用情報'],
  ['Liên hệ', 'お問い合わせ'],
  ['Tin tức', 'お知らせ'],

  ['Mở menu', 'メニューを開く'],
  ['Thời Trang Nam Cao Cấp Tại Nhật Bản', '日本の高級メンズファッション'],

  ['Giới thiệu hoạt động kinh doanh của Thế Anh JP: tuyển chọn nguồn hàng chất lượng, kiểm định kỹ và phân phối với giá thành tốt.', 'Thế Anh JPの事業紹介：信頼できる仕入れ、丁寧な検品、適正価格での販売体制。'],
  ['Khám phá quy trình tuyển chọn nguồn hàng, kiểm định chất lượng và phân phối minh bạch của Thế Anh JP.', 'Thế Anh JPの仕入れ選定、品質検品、透明性の高い販売プロセスをご紹介します。'],
  ['Quy trình chọn hàng, kiểm định chất lượng và phân phối đa kênh tại Thế Anh JP.', 'Thế Anh JPの選品・品質確認・マルチチャネル販売の仕組み。'],

  ['Thế Anh JP - Website doanh nghiệp thời trang phong cách Nhật Bản, hiện đại và tối giản.', 'Thế Anh JP - 日本スタイルの上質なファッションを提案する企業サイト。'],
  ['Business Introduction', 'Business Introduction'],
  ['Xem chi tiết trang giới thiệu', '事業紹介ページを見る'],
  ['Thông báo mới', '最新のお知らせ'],
  ['Tuyển dụng', '採用'],
  ['Nhân sự', '人事'],
  ['Thực tập', 'インターン'],
  ['Thông báo', 'お知らせ'],
  ['Mở vị trí Fashion Merchandiser cho thị trường Nhật Bản.', '日本市場向けファッションマーチャンダイザーを募集します。'],
  ['Tuyển Chuyên viên Quản lý mẫu cho trung tâm thiết kế Hà Nội.', 'ハノイデザインセンターでサンプル管理担当を募集します。'],
  ['Nhận hồ sơ thực tập sinh thiết kế cho kỳ Summer 2026.', '2026年夏期のデザインインターン応募を受け付けています。'],
  ['Chính sách đào tạo nội bộ mới cho khối vận hành sản xuất.', '生産運営部門向けの新しい社内研修方針を導入しました。'],
  ['Chi nhánh và liên hệ', '店舗情報・お問い合わせ'],
  ['Cơ sở 01', '拠点 01'],
  ['Cơ sở 02', '拠点 02'],
  ['Bản đồ cơ sở 1 - GIFU', '岐阜店マップ'],
  ['Bản đồ cơ sở 2 - Sakae', '栄店マップ'],

  ['Hồ sơ doanh nghiệp', '企業プロフィール'],
  ['Công ty tổng quan', '会社概要'],
  ['Lịch sử công ty', '沿革'],
  ['Cơ sở cửa hàng', '店舗拠点'],
  ['Tên công ty', '会社名'],
  ['Ngày thành lập', '設立日'],
  ['Người đại diện', '代表者'],
  ['Trụ sở chính', '本社所在地'],
  ['Văn phòng quốc tế', '海外拠点'],
  ['Vốn điều lệ', '資本金'],
  ['Nhân sự', '従業員数'],
  ['Khách hàng chính', '主要取引先'],
  ['Định hướng', '企業方針'],

  ['Nội dung doanh nghiệp', '企業内容'],
  ['Mô hình bán hàng theo hệ thống cửa hàng', '店舗ネットワーク型の販売モデル'],
  ['Tiêu chuẩn dịch vụ tại điểm bán', '店頭サービス基準'],
  ['Vận hành đa kênh cho doanh nghiệp bán lẻ', '小売向けマルチチャネル運営'],

  ['Về tuyển chọn nguồn hàng', '仕入れ選定について'],
  ['Về kiểm định chất lượng', '品質検品について'],
  ['Về giá bán và phân phối', '価格と販売チャネルについて'],
  ['Khách hàng nói gì về Thế Anh JP', 'お客様の声'],
  ['Mỗi phản hồi là dữ liệu thực tế giúp chúng tôi chọn hàng chuẩn hơn, giữ form đẹp hơn\n              và cải thiện trải nghiệm mua sắm mỗi ngày.', '一つひとつのレビューをもとに、選品・シルエット・購入体験を継続的に改善しています。'],
  ['Xem chi tiết', '詳細を見る'],

  ['Liên hệ nhanh', 'クイック連絡'],
  ['Gọi ngay', '今すぐ電話'],
  ['Gọi thoại', '電話'],
  ['Gửi Gmail', 'Gmailを送る'],
  ['Mở Facebook', 'Facebookを開く'],
  ['Mở TikTok', 'TikTokを開く'],

  ['Đơn vị chuyên nhập khẩu và phân phối các sản phẩm thời trang chất lượng,\n              cam kết giá bán hợp lý, minh bạch và phù hợp nhu cầu thực tế của khách hàng.', '高品質ファッション製品の輸入・販売を行い、適正価格と透明性の高いサービスを提供します。'],
  ['Đơn vị thời trang ứng dụng phong cách Nhật Bản, tập trung vào chất liệu bền vững và phom dáng tối giản.', '日本スタイルを取り入れ、サステナブル素材とミニマルなシルエットにこだわるファッションブランドです。'],
  ['Khu vực', '対応エリア'],
  ['Tokyo | Hà Nội | TP.HCM', 'Tokyo | Hanoi | Ho Chi Minh City'],
  ['Pháp lý', '法務情報'],
  ['Mạng xã hội', 'SNS'],
  ['Chất lượng thật, giá trị thật, dịch vụ minh bạch.', '本物の品質、確かな価値、透明なサービス。'],
  ['Hỗ trợ khách hàng: 09:00 - 21:00 (Thứ 2 - Chủ Nhật)', 'カスタマーサポート: 09:00 - 21:00（毎日）']
];

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  for (const [from, to] of replacements) {
    content = content.split(from).join(to);
  }
  writeFileSync(file, content, 'utf8');
}

console.log(`Translated ${files.length} HTML files to JA (static replacement).`);

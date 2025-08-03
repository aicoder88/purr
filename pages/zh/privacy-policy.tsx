import { Container } from '@/components/ui/container';
import { NextPage } from "next";
import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";
import { useTranslation } from "@/lib/translation-context";

const PrivacyPolicyPage: NextPage = () => {
  const { t } = useTranslation();
  
  return (
    <Container>
      <Head>
        <title>隐私政策 | {SITE_NAME}</title>
        <meta name="description" content="Purrify隐私政策 - 了解我们如何收集、使用和保护您的个人信息。" />
        <link rel="canonical" href="https://purrify.ca/zh/privacy-policy" />
        <link rel="alternate" hrefLang="zh" href="https://purrify.ca/zh/privacy-policy" />
        <link rel="alternate" hrefLang="en" href="https://purrify.ca/privacy-policy" />
        <link rel="alternate" hrefLang="fr" href="https://purrify.ca/fr/privacy-policy" />
      </Head>
      
      <div className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">隐私政策</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">最后更新：2024年6月</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 信息收集</h2>
              <p className="text-gray-700 mb-4">
                我们收集您在使用我们网站和服务时提供的信息，包括：
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>姓名和联系信息</li>
                <li>邮寄地址（用于产品配送）</li>
                <li>电子邮件地址</li>
                <li>宠物信息（如猫咪姓名）</li>
                <li>网站使用数据和偏好</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 信息使用</h2>
              <p className="text-gray-700 mb-4">
                我们使用收集的信息用于：
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>处理和配送您的订单</li>
                <li>提供客户支持</li>
                <li>发送产品更新和护理技巧</li>
                <li>改善我们的产品和服务</li>
                <li>遵守法律要求</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 信息保护</h2>
              <p className="text-gray-700 mb-4">
                我们采用行业标准的安全措施来保护您的个人信息，包括加密传输和安全存储。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 信息共享</h2>
              <p className="text-gray-700 mb-4">
                我们不会向第三方出售、交易或转让您的个人信息，除非：
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>获得您的明确同意</li>
                <li>为了完成您的订单（如配送服务）</li>
                <li>法律要求或保护我们的权利</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookie和跟踪技术</h2>
              <p className="text-gray-700 mb-4">
                我们使用Cookie和类似技术来改善您的浏览体验、分析网站使用情况并提供个性化内容。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 您的权利</h2>
              <p className="text-gray-700 mb-4">
                您有权：
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>访问您的个人信息</li>
                <li>更正不准确的信息</li>
                <li>请求删除您的信息</li>
                <li>取消订阅营销通讯</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 联系我们</h2>
              <p className="text-gray-700 mb-4">
                如果您对本隐私政策有任何问题，请通过以下方式联系我们：
              </p>
              <p className="text-gray-700">
                电子邮件：hello@purrify.ca<br />
                电话：+1 514 961 9386<br />
                地址：加拿大蒙特利尔
              </p>
            </section>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicyPage;

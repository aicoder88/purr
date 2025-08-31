import { Container } from '@/components/ui/container';
import { NextPage } from "next";
import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";
import { useTranslation } from "@/lib/translation-context";

const TermsPage: NextPage = () => {
  const { locale } = useTranslation();
  
  return (
    <Container>
      <Head>
        <title>服务条款 | {SITE_NAME}</title>
        <meta name="description" content="Purrify服务条款 - 了解使用我们产品和服务的条款和条件。" />
        <meta name="language" content={locale} />
        <link rel="canonical" href="https://purrify.ca/zh/terms" />
        <link rel="alternate" hrefLang="zh" href="https://purrify.ca/zh/terms" />
        <link rel="alternate" hrefLang="en" href="https://purrify.ca/terms" />
        <link rel="alternate" hrefLang="fr" href="https://purrify.ca/fr/terms" />
      </Head>
      
      <div className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8">服务条款</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">最后更新：2024年6月</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">1. 接受条款</h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                通过访问和使用Purrify网站和产品，您同意受这些服务条款的约束。如果您不同意这些条款，请不要使用我们的服务。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">2. 产品描述</h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                Purrify是一种活性炭猫砂添加剂，旨在减少猫砂盒异味。我们努力准确描述我们的产品，但不保证描述完全准确、完整或无错误。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">3. 订单和付款</h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                所有订单均需经过我们的验证和接受。我们保留拒绝或取消任何订单的权利。价格如有变更，恕不另行通知。
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 mb-4 space-y-2">
                <li>所有价格均以加元显示</li>
                <li>付款在下订单时到期</li>
                <li>我们接受主要信用卡和PayPal</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">4. 配送和退货</h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                我们努力及时配送所有订单。配送时间可能因位置和产品可用性而异。
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 mb-4 space-y-2">
                <li>加拿大境内免费配送</li>
                <li>30天退款保证</li>
                <li>产品必须处于原始状态才能退货</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">5. 使用限制</h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                您同意不会：
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 mb-4 space-y-2">
                <li>将产品用于预期用途以外的目的</li>
                <li>复制或分发我们的内容</li>
                <li>干扰网站的正常运行</li>
                <li>提供虚假或误导性信息</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">6. 免责声明</h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                我们的产品按&quot;现状&quot;提供。我们不对产品的特定结果或效果做出保证。使用我们的产品需自担风险。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">7. 责任限制</h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                在法律允许的最大范围内，Purrify不对任何间接、偶然或后果性损害承担责任。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">8. 适用法律</h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                这些条款受加拿大法律管辖，任何争议将在加拿大法院解决。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">9. 联系信息</h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                如果您对这些条款有任何问题，请联系我们：
              </p>
              <p className="text-gray-700 dark:text-gray-200">
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

export default TermsPage;

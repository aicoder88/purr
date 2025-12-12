import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { Shield, AlertTriangle, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { Container } from '../../src/components/ui/container';
import { Card } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { Badge } from '../../src/components/ui/badge';
import { ReferralAnalyticsDashboard } from '../../src/components/analytics/ReferralAnalyticsDashboard';
import { SITE_NAME } from '../../src/lib/constants';

interface AdminAnalyticsPageProps {
  isAuthorized: boolean;
  userRole?: string;
}

export default function AdminReferralAnalyticsPage({ isAuthorized, userRole }: AdminAnalyticsPageProps) {
  const [systemHealth, setSystemHealth] = useState<'healthy' | 'warning' | 'critical'>('healthy');
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    activeUsers: 0,
    conversionsToday: 0,
    revenueToday: 0,
    systemUptime: '99.9%'
  });
  const canonicalUrl = 'https://www.purrify.ca/admin/referral-analytics';

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics((prev: typeof realTimeMetrics) => ({
        ...prev,
        activeUsers: Math.floor(Math.random() * 50) + 20,
        conversionsToday: Math.floor(Math.random() * 10) + prev.conversionsToday,
        revenueToday: Math.round((Math.random() * 100 + prev.revenueToday) * 100) / 100
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isAuthorized) {
    return (
      <>
        <NextSeo
          title={`Access Denied - ${SITE_NAME}`}
          description="Administrative access required"
          canonical={canonicalUrl}
          openGraph={{
            title: `Access Denied - ${SITE_NAME}`,
            description: 'Administrative access required',
            url: canonicalUrl,
          }}
          noindex
        />
        <Container className="py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Administrative privileges are required to view referral analytics.
            </p>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <NextSeo
        title={`Referral Analytics Dashboard - ${SITE_NAME}`}
        description="Comprehensive analytics and insights for the referral program"
        canonical={canonicalUrl}
        openGraph={{
          title: `Referral Analytics Dashboard - ${SITE_NAME}`,
          description: 'Comprehensive analytics and insights for the referral program',
          url: canonicalUrl,
        }}
        noindex
      />

      <Container className="py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Referral Program Analytics & Management
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={systemHealth === 'healthy' ? 'default' : systemHealth === 'warning' ? 'secondary' : 'destructive'}
                className="flex items-center space-x-1"
              >
                <Activity className="w-3 h-3" />
                <span>System {systemHealth}</span>
              </Badge>
              {userRole && (
                <Badge variant="outline">
                  {userRole}
                </Badge>
              )}
            </div>
          </div>

          {/* System Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {realTimeMetrics.activeUsers}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversions Today</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {realTimeMetrics.conversionsToday}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue Today</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    ${realTimeMetrics.revenueToday.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Uptime</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {realTimeMetrics.systemUptime}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* System Alerts */}
          {systemHealth !== 'healthy' && (
            <Card className="p-4 mb-6 border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    System Performance Notice
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Some analytics data may be delayed. Monitoring team has been notified.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Main Analytics Dashboard */}
        <ReferralAnalyticsDashboard />

        {/* Admin Actions */}
        <Card className="p-6 mt-8">
          <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Administrative Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Manage User Access
            </Button>
            <Button variant="outline" className="justify-start">
              <Activity className="w-4 h-4 mr-2" />
              System Health Check
            </Button>
            <Button variant="outline" className="justify-start">
              <DollarSign className="w-4 h-4 mr-2" />
              Revenue Reports
            </Button>
          </div>
        </Card>

        {/* Data Export & Backup */}
        <Card className="p-6 mt-6">
          <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Data Management
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button size="sm" variant="outline">
              Export All Data
            </Button>
            <Button size="sm" variant="outline">
              Schedule Reports
            </Button>
            <Button size="sm" variant="outline">
              Data Backup Status
            </Button>
            <Button size="sm" variant="outline">
              API Usage Statistics
            </Button>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Last updated: {new Date().toLocaleString()} •
            Data retention: 24 months •
            Compliance: GDPR, CCPA
          </p>
        </div>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  // In production, implement proper authentication/authorization
  // This is a simplified example

  // Check for admin session/token
  const adminToken = req.cookies.admin_token || query.token;
  const isAuthorized = Boolean(adminToken); // Replace with proper auth check

  // Mock user role - in production, derive from authenticated user
  const userRole = isAuthorized ? 'Administrator' : undefined;

  // You could also check specific permissions
  // const hasAnalyticsAccess = await checkUserPermissions(userId, 'analytics');

  return {
    props: {
      isAuthorized,
      userRole
    }
  };
};

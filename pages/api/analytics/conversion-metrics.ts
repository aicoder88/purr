import { NextApiRequest, NextApiResponse } from 'next';
import { TrialConversionTracker } from '../../../src/lib/trial-conversion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { timeframe, source, campaign } = req.query;

      const timeframeNumber = timeframe ? parseInt(timeframe as string) : 30;
      
      if (isNaN(timeframeNumber) || timeframeNumber < 1 || timeframeNumber > 365) {
        return res.status(400).json({ 
          error: 'Invalid timeframe. Must be between 1 and 365 days' 
        });
      }

      const metrics = await TrialConversionTracker.getConversionMetrics(timeframeNumber);

      let filteredMetrics = metrics;
      
      if (source && typeof source === 'string') {
        filteredMetrics = {
          ...metrics,
          topSources: metrics.topSources.filter(s => s.source === source),
        };
      }

      const responseData = {
        success: true,
        timeframe: timeframeNumber,
        metrics: {
          totalTrialUsers: filteredMetrics.totalTrialUsers,
          convertedUsers: filteredMetrics.convertedUsers,
          conversionRate: Math.round(filteredMetrics.conversionRate * 100) / 100,
          avgTimeToConversion: {
            hours: Math.round((filteredMetrics.avgTimeToConversion / (1000 * 60 * 60)) * 100) / 100,
            days: Math.round((filteredMetrics.avgTimeToConversion / (1000 * 60 * 60 * 24)) * 100) / 100,
          },
          topSources: filteredMetrics.topSources.map(source => ({
            source: source.source,
            conversions: source.conversions,
            percentage: metrics.convertedUsers > 0 
              ? Math.round((source.conversions / metrics.convertedUsers * 100) * 100) / 100 
              : 0,
          })),
        },
        filters: {
          source: source || null,
          campaign: campaign || null,
        },
        generatedAt: new Date().toISOString(),
      };

      res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
      res.status(200).json(responseData);
      
    } catch (error) {
      console.error('Conversion metrics lookup failed:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to retrieve conversion metrics',
        metrics: {
          totalTrialUsers: 0,
          convertedUsers: 0,
          conversionRate: 0,
          avgTimeToConversion: { hours: 0, days: 0 },
          topSources: [],
        },
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { action, data } = req.body;

      if (action === 'track_conversion') {
        const { userId } = data;
        if (!userId) {
          return res.status(400).json({ error: 'User ID is required for conversion tracking' });
        }

        await TrialConversionTracker.convertTrialUser(userId);
        
        res.status(200).json({ 
          success: true, 
          message: 'Conversion tracked successfully',
          userId,
          timestamp: new Date().toISOString(),
        });
      } else if (action === 'create_trial') {
        const { email, source, campaign } = data;
        if (!email) {
          return res.status(400).json({ error: 'Email is required for trial creation' });
        }

        const trialUser = await TrialConversionTracker.createTrialUser({
          email,
          source,
          campaign,
        });

        res.status(201).json({ 
          success: true, 
          message: 'Trial user created successfully',
          trialUser,
        });
      } else {
        res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error) {
      console.error('Conversion tracking failed:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to process conversion tracking request' 
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
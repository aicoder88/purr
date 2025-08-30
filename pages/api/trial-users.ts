import { NextApiRequest, NextApiResponse } from 'next';
import { TrialConversionTracker } from '../../src/lib/trial-conversion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, source, campaign } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const trialUser = await TrialConversionTracker.createTrialUser({
        email,
        source,
        campaign,
      });

      res.status(201).json({ success: true, trialUser });
    } catch (error) {
      console.error('Trial user creation failed:', error);
      res.status(500).json({ error: 'Failed to create trial user' });
    }
  } else if (req.method === 'GET') {
    try {
      const { email } = req.query;

      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email is required' });
      }

      const trialUser = await TrialConversionTracker.getTrialUserByEmail(email);
      
      if (!trialUser) {
        return res.status(404).json({ error: 'Trial user not found' });
      }

      res.status(200).json({ success: true, trialUser });
    } catch (error) {
      console.error('Trial user lookup failed:', error);
      res.status(500).json({ error: 'Failed to get trial user' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { userId, action, source, campaign } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      if (action === 'convert') {
        await TrialConversionTracker.convertTrialUser(userId);
        res.status(200).json({ success: true, message: 'User converted successfully' });
      } else if (action === 'update_source') {
        if (!source) {
          return res.status(400).json({ error: 'Source is required for update_source action' });
        }
        await TrialConversionTracker.updateTrialSource(userId, source, campaign);
        res.status(200).json({ success: true, message: 'Source updated successfully' });
      } else {
        res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error) {
      console.error('Trial user update failed:', error);
      res.status(500).json({ error: 'Failed to update trial user' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
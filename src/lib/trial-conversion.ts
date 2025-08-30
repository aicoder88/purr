import { prisma } from './prisma';

export interface TrialUser {
  id: string;
  email: string;
  createdAt: Date;
  convertedAt?: Date;
  source?: string;
  campaign?: string;
}

export interface ConversionMetrics {
  totalTrialUsers: number;
  convertedUsers: number;
  conversionRate: number;
  avgTimeToConversion: number;
  topSources: { source: string; conversions: number }[];
}

export class TrialConversionTracker {
  static async createTrialUser(data: {
    email: string;
    source?: string;
    campaign?: string;
  }): Promise<TrialUser> {
    try {
      const trialUser = await prisma.user.create({
        data: {
          email: data.email,
          name: `Trial_${data.source || 'direct'}`,
        },
      });
      
      return {
        id: trialUser.id,
        email: trialUser.email!,
        createdAt: trialUser.createdAt,
        source: data.source,
        campaign: data.campaign,
      };
    } catch (error) {
      console.error('Failed to create trial user:', error);
      throw new Error('Failed to track trial user');
    }
  }

  static async convertTrialUser(userId: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          name: 'Converted_Customer',
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to convert trial user:', error);
      throw new Error('Failed to track conversion');
    }
  }

  static async getConversionMetrics(timeframe: number = 30): Promise<ConversionMetrics> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - timeframe);

      const trialUsers = await prisma.user.findMany({
        where: {
          createdAt: { gte: startDate },
          name: { startsWith: 'Trial_' },
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      const totalTrialUsers = trialUsers.length;
      const convertedUsers = trialUsers.filter(user => user.name === 'Converted_Customer').length;
      const conversionRate = totalTrialUsers > 0 ? (convertedUsers / totalTrialUsers) * 100 : 0;

      const conversionTimes = trialUsers
        .filter(user => user.name === 'Converted_Customer')
        .map(user => user.updatedAt.getTime() - user.createdAt.getTime());
      
      const avgTimeToConversion = conversionTimes.length > 0
        ? conversionTimes.reduce((sum, time) => sum + time, 0) / conversionTimes.length
        : 0;

      const sourceStats = trialUsers.reduce((acc, user) => {
        const source = user.name?.replace('Trial_', '') || 'direct';
        if (user.name === 'Converted_Customer') {
          acc[source] = (acc[source] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const topSources = Object.entries(sourceStats)
        .map(([source, conversions]) => ({ source, conversions }))
        .sort((a, b) => b.conversions - a.conversions)
        .slice(0, 5);

      return {
        totalTrialUsers,
        convertedUsers,
        conversionRate,
        avgTimeToConversion,
        topSources,
      };
    } catch (error) {
      console.error('Failed to get conversion metrics:', error);
      throw new Error('Failed to retrieve conversion metrics');
    }
  }

  static async getTrialUserByEmail(email: string): Promise<TrialUser | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user || !user.name?.startsWith('Trial_')) return null;

      return {
        id: user.id,
        email: user.email!,
        createdAt: user.createdAt,
        convertedAt: user.name === 'Converted_Customer' ? user.updatedAt : undefined,
        source: user.name.replace('Trial_', ''),
        campaign: undefined,
      };
    } catch (error) {
      console.error('Failed to get trial user:', error);
      return null;
    }
  }

  static async updateTrialSource(userId: string, source: string, campaign?: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          name: `Trial_${source}`,
        },
      });
    } catch (error) {
      console.error('Failed to update trial source:', error);
      throw new Error('Failed to update trial source');
    }
  }
}
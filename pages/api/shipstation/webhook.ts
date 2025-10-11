import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * ShipStation Webhook Handler
 * Receives shipment notifications from ShipStation
 * Documentation: https://www.shipstation.com/docs/api/shipments/
 */

interface ShipStationWebhook {
  resource_url: string;
  resource_type: string;
}

interface ShipmentDetails {
  orderId: number;
  orderNumber: string;
  shipmentId: number;
  trackingNumber: string;
  carrierCode: string;
  shipDate: string;
  voided: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const webhook: ShipStationWebhook = req.body;

    // Only handle shipment notifications
    if (webhook.resource_type !== 'SHIP_NOTIFY') {
      return res.status(200).json({ message: 'Event type not handled' });
    }

    // Fetch shipment details from ShipStation
    const SHIPSTATION_API_KEY = process.env.SHIPSTATION_API_KEY || '';
    const SHIPSTATION_API_SECRET = process.env.SHIPSTATION_API_SECRET || '';

    const response = await fetch(webhook.resource_url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${SHIPSTATION_API_KEY}:${SHIPSTATION_API_SECRET}`).toString('base64')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch shipment details from ShipStation');
    }

    const shipment: ShipmentDetails = await response.json();

    // Find order by order number
    const order = await prisma.retailerOrder.findUnique({
      where: { orderNumber: shipment.orderNumber },
      include: {
        retailer: true,
      },
    });

    if (!order) {
      console.error(`Order not found: ${shipment.orderNumber}`);
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update order with tracking information
    await prisma.retailerOrder.update({
      where: { id: order.id },
      data: {
        status: shipment.voided ? 'CANCELLED' : 'SHIPPED',
        trackingNumber: shipment.trackingNumber,
        shippingCarrier: shipment.carrierCode,
        shippedAt: new Date(shipment.shipDate),
      },
    });

    // TODO: Send email to retailer with tracking information
    // await sendShipmentNotificationEmail(order, shipment);

    console.log(`Order ${order.orderNumber} shipped with tracking ${shipment.trackingNumber}`);

    return res.status(200).json({
      message: 'Shipment notification processed successfully',
      orderNumber: order.orderNumber,
      trackingNumber: shipment.trackingNumber,
    });
  } catch (error) {
    console.error('ShipStation webhook error:', error);
    return res.status(500).json({
      message: 'Failed to process webhook',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await prisma.$disconnect();
  }
}

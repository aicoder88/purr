import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SHIPSTATION_API_KEY = process.env.SHIPSTATION_API_KEY || '';
const SHIPSTATION_API_SECRET = process.env.SHIPSTATION_API_SECRET || '';
const SHIPSTATION_API_URL = 'https://ssapi.shipstation.com';

interface ShipStationOrder {
  orderNumber: string;
  orderDate: string;
  orderStatus: string;
  customerUsername: string;
  customerEmail: string;
  billTo: {
    name: string;
    company: string;
    street1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  shipTo: {
    name: string;
    company: string;
    street1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: Array<{
    sku: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
  amountPaid: number;
  taxAmount: number;
  shippingAmount: number;
  internalNotes?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    // Get retailer order with all details
    const order = await prisma.retailerOrder.findUnique({
      where: { id: orderId },
      include: {
        retailer: {
          include: {
            shippingAddress: true,
            billingAddress: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'PAID') {
      return res.status(400).json({ message: 'Order must be paid before shipping' });
    }

    if (order.shipstationOrderId) {
      return res.status(400).json({
        message: 'Order already sent to ShipStation',
        shipstationOrderId: order.shipstationOrderId,
      });
    }

    const shippingAddress = order.retailer.shippingAddress;
    const billingAddress = order.retailer.billingAddress || shippingAddress;

    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address not found' });
    }

    // Create ShipStation order
    const shipstationOrder: ShipStationOrder = {
      orderNumber: order.orderNumber,
      orderDate: order.createdAt.toISOString(),
      orderStatus: 'awaiting_shipment',
      customerUsername: order.retailer.contactName,
      customerEmail: order.retailer.email,
      billTo: {
        name: order.retailer.contactName,
        company: order.retailer.businessName,
        street1: billingAddress.street,
        city: billingAddress.city,
        state: billingAddress.province,
        postalCode: billingAddress.postalCode,
        country: billingAddress.country,
        phone: order.retailer.phone || '',
      },
      shipTo: {
        name: order.retailer.contactName,
        company: order.retailer.businessName,
        street1: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.province,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
      },
      items: order.items.map((item) => ({
        sku: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      amountPaid: order.totalAmount,
      taxAmount: order.tax,
      shippingAmount: order.shipping,
      internalNotes: order.notes || '',
    };

    // Send to ShipStation
    const response = await fetch(`${SHIPSTATION_API_URL}/orders/createorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${SHIPSTATION_API_KEY}:${SHIPSTATION_API_SECRET}`).toString('base64')}`,
      },
      body: JSON.stringify(shipstationOrder),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`ShipStation API error: ${error}`);
    }

    const shipstationResponse = await response.json();

    // Update order with ShipStation order ID
    await prisma.retailerOrder.update({
      where: { id: orderId },
      data: {
        shipstationOrderId: shipstationResponse.orderId.toString(),
        status: 'PROCESSING',
      },
    });

    // TODO: Send email notification to retailer

    return res.status(200).json({
      message: 'Order sent to ShipStation successfully',
      shipstationOrderId: shipstationResponse.orderId,
    });
  } catch (error) {
    console.error('ShipStation order creation error:', error);
    return res.status(500).json({
      message: 'Failed to create ShipStation order',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await prisma.$disconnect();
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../src/lib/prisma';
import { getSession } from 'next-auth/react';

interface CartItem {
  id: string;
  quantity: number;
  price: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    const { items, customer, total } = req.body;

    // Create order in database
    const order = await prisma.order.create({
      data: {
        totalAmount: total,
        status: 'PENDING',
        customer: {
          create: {
            email: customer.email,
            firstName: customer.firstName,
            lastName: customer.lastName,
            address: customer.address,
            city: customer.city,
            province: customer.province,
            postalCode: customer.postalCode,
            phone: customer.phone,
          },
        },
        items: {
                    create: items.map((item: CartItem) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        userId: session?.user?.email,
      },
    });

    return res.status(200).json({ orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Error creating order' });
  }
} 
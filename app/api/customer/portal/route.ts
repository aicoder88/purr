import { auth } from '@/auth';
import prisma from '@/lib/prisma';

function mapOrderStatus(status: string): 'processing' | 'shipped' | 'delivered' | 'cancelled' {
  switch (status) {
    case 'SHIPPED':
      return 'shipped';
    case 'DELIVERED':
      return 'delivered';
    case 'CANCELLED':
    case 'REFUNDED':
      return 'cancelled';
    default:
      return 'processing';
  }
}

function mapSubscriptionStatus(status: string): 'active' | 'paused' | 'cancelled' {
  switch (status) {
    case 'PAUSED':
      return 'paused';
    case 'CANCELLED':
    case 'EXPIRED':
      return 'cancelled';
    default:
      return 'active';
  }
}

function mapSubscriptionFrequency(frequency: string): 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' {
  switch (frequency) {
    case 'WEEKLY':
      return 'weekly';
    case 'BIWEEKLY':
      return 'bi-weekly';
    case 'BIMONTHLY':
      return 'quarterly';
    default:
      return 'monthly';
  }
}

export async function GET(): Promise<Response> {
  if (!prisma) {
    return Response.json({ message: 'Customer portal is temporarily unavailable.' }, { status: 503 });
  }

  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();
  const role = session?.user?.role;

  if (!email || role !== 'customer') {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const [customerRecord, orders, subscriptions] = await Promise.all([
    prisma.customer.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.findMany({
      where: {
        OR: [
          { user: { email } },
          { customer: { is: { email } } },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    }),
    prisma.subscription.findMany({
      where: { email },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    }),
  ]);

  const customer = {
    id: session.user.id ?? customerRecord?.id ?? email,
    email,
    firstName: customerRecord?.firstName ?? session.user.name?.split(' ')[0] ?? 'Customer',
    lastName: customerRecord?.lastName ?? session.user.name?.split(' ').slice(1).join(' ') ?? '',
    phone: customerRecord?.phone ?? '',
    address: {
      street: customerRecord?.address ?? '',
      city: customerRecord?.city ?? '',
      province: customerRecord?.province ?? '',
      postalCode: customerRecord?.postalCode ?? '',
      country: 'Canada',
    },
    subscriptions: subscriptions.map((subscription) => ({
      id: subscription.id,
      productName: subscription.items.map((item) => item.product.name).join(', ') || 'Purrify subscription',
      frequency: mapSubscriptionFrequency(subscription.frequency),
      nextDelivery: subscription.nextDeliveryDate.toISOString(),
      status: mapSubscriptionStatus(subscription.status),
      price: subscription.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    })),
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    memberSince: orders.at(-1)?.createdAt.toISOString() ?? customerRecord?.createdAt.toISOString() ?? new Date().toISOString(),
  };

  return Response.json({
    customer,
    orders: orders.map((order) => ({
      id: order.id,
      orderNumber: order.stripeSessionId ?? order.id.slice(0, 12).toUpperCase(),
      date: order.createdAt.toISOString(),
      status: mapOrderStatus(order.status),
      total: order.totalAmount,
      items: order.items.map((item) => ({
        id: item.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
        image: item.product.image,
      })),
    })),
    subscriptions: subscriptions.map((subscription) => ({
      id: subscription.id,
      productName: subscription.items.map((item) => item.product.name).join(', ') || 'Purrify subscription',
      status: mapSubscriptionStatus(subscription.status),
      frequency: mapSubscriptionFrequency(subscription.frequency),
      nextDelivery: subscription.nextDeliveryDate.toISOString(),
      price: subscription.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      lastDelivery: subscription.lastDeliveryDate?.toISOString() ?? subscription.createdAt.toISOString(),
      quantity: subscription.items.reduce((sum, item) => sum + item.quantity, 0),
      created: subscription.createdAt.toISOString(),
    })),
  });
}

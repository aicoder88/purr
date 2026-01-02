/**
 * Email Template: Low Stock Alert (Admin Notification)
 * Sent to admin when product inventory falls below threshold
 */

interface LowStockProduct {
  id: string;
  name: string;
  sku: string | null;
  stockQuantity: number;
  lowStockThreshold: number;
}

interface LowStockAlertEmailProps {
  products: LowStockProduct[];
  adminUrl: string;
}

export const LowStockAlertEmailHTML = ({
  products,
  adminUrl,
}: LowStockAlertEmailProps) => {
  const urgentProducts = products.filter((p) => p.stockQuantity === 0);
  const warningProducts = products.filter((p) => p.stockQuantity > 0);

  const productRowsHTML = products
    .map((product) => {
      const isOutOfStock = product.stockQuantity === 0;
      const statusColor = isOutOfStock ? '#ef4444' : '#f59e0b';
      const statusText = isOutOfStock ? 'OUT OF STOCK' : 'LOW STOCK';

      return `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
          <span style="color: #2d3748; font-weight: 500;">${product.name}</span>
          ${product.sku ? `<br><span style="color: #718096; font-size: 12px;">SKU: ${product.sku}</span>` : ''}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <span style="color: ${statusColor}; font-weight: 700; font-size: 18px;">${product.stockQuantity}</span>
          <br>
          <span style="color: #718096; font-size: 12px;">/ ${product.lowStockThreshold} threshold</span>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <span style="display: inline-block; padding: 4px 12px; background-color: ${statusColor}; color: white; font-size: 11px; font-weight: 700; border-radius: 12px; text-transform: uppercase;">
            ${statusText}
          </span>
        </td>
      </tr>
    `;
    })
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Low Stock Alert - Purrify Inventory</title>
</head>
<body style="margin: 0; padding: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: ${urgentProducts.length > 0 ? '#ef4444' : '#f59e0b'}; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff;">
                ${urgentProducts.length > 0 ? 'Urgent: Out of Stock Alert' : 'Low Stock Alert'}
              </h1>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                ${products.length} product${products.length !== 1 ? 's' : ''} need${products.length === 1 ? 's' : ''} attention
              </p>
            </td>
          </tr>

          <!-- Summary -->
          <tr>
            <td style="padding: 30px 40px 20px;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="width: 50%; padding: 16px; background-color: #fef2f2; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; font-size: 32px; font-weight: 700; color: #ef4444;">${urgentProducts.length}</p>
                    <p style="margin: 5px 0 0; font-size: 12px; color: #991b1b; text-transform: uppercase; font-weight: 600;">Out of Stock</p>
                  </td>
                  <td style="width: 10px;"></td>
                  <td style="width: 50%; padding: 16px; background-color: #fffbeb; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; font-size: 32px; font-weight: 700; color: #f59e0b;">${warningProducts.length}</p>
                    <p style="margin: 5px 0 0; font-size: 12px; color: #92400e; text-transform: uppercase; font-weight: 600;">Low Stock</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Product List -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <h3 style="margin: 0; padding: 16px 20px; font-size: 16px; font-weight: 600; color: #1a1a1a; background-color: #edf2f7; border-bottom: 1px solid #e2e8f0;">
                  Inventory Status
                </h3>

                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f7fafc;">
                      <th style="padding: 12px; text-align: left; color: #718096; font-size: 11px; text-transform: uppercase; font-weight: 600;">Product</th>
                      <th style="padding: 12px; text-align: center; color: #718096; font-size: 11px; text-transform: uppercase; font-weight: 600;">Stock</th>
                      <th style="padding: 12px; text-align: center; color: #718096; font-size: 11px; text-transform: uppercase; font-weight: 600;">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${productRowsHTML}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <a href="${adminUrl}/products" style="display: inline-block; padding: 14px 32px; background: #1a1a1a; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                Manage Inventory
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f7fafc; border-top: 1px solid #e2e8f0; text-align: center; color: #718096; font-size: 12px; line-height: 1.6; border-radius: 0 0 12px 12px;">
              This is an automated alert from Purrify Inventory Management.
              <br>
              <a href="${adminUrl}/settings/notifications" style="color: #03E46A; text-decoration: none;">Manage notification settings</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

export const getLowStockAlertSubject = (
  outOfStockCount: number,
  lowStockCount: number
): string => {
  if (outOfStockCount > 0) {
    return `[URGENT] ${outOfStockCount} product${outOfStockCount !== 1 ? 's' : ''} out of stock`;
  }
  return `[Alert] ${lowStockCount} product${lowStockCount !== 1 ? 's' : ''} low on stock`;
};

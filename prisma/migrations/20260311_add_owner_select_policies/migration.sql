-- Allow authenticated users to read only the rows that belong to them.
-- Writes remain server-side through Prisma/API routes.

-- Customer-linked records
DROP POLICY IF EXISTS "users_can_read_own_user" ON "public"."User";
CREATE POLICY "users_can_read_own_user"
ON "public"."User"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') IN ('customer', 'admin', 'editor')
  AND (select auth.jwt() -> 'app_metadata' ->> 'localUserId') IS NOT NULL
  AND id = (select auth.jwt() -> 'app_metadata' ->> 'localUserId')
);

DROP POLICY IF EXISTS "users_can_read_own_orders" ON "public"."Order";
CREATE POLICY "users_can_read_own_orders"
ON "public"."Order"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') IN ('customer', 'admin', 'editor')
  AND (
    (
      (select auth.jwt() -> 'app_metadata' ->> 'localUserId') IS NOT NULL
      AND "userId" = (select auth.jwt() -> 'app_metadata' ->> 'localUserId')
    )
    OR EXISTS (
      SELECT 1
      FROM "public"."customers" c
      WHERE c."orderId" = "Order".id
        AND lower(c.email) = lower((select auth.jwt() ->> 'email'))
    )
  )
);

DROP POLICY IF EXISTS "users_can_read_own_order_items" ON "public"."OrderItem";
CREATE POLICY "users_can_read_own_order_items"
ON "public"."OrderItem"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') IN ('customer', 'admin', 'editor')
  AND EXISTS (
    SELECT 1
    FROM "public"."Order" o
    LEFT JOIN "public"."customers" c
      ON c."orderId" = o.id
    WHERE o.id = "OrderItem"."orderId"
      AND (
        (
          (select auth.jwt() -> 'app_metadata' ->> 'localUserId') IS NOT NULL
          AND o."userId" = (select auth.jwt() -> 'app_metadata' ->> 'localUserId')
        )
        OR lower(c.email) = lower((select auth.jwt() ->> 'email'))
      )
  )
);

DROP POLICY IF EXISTS "users_can_read_own_customers" ON "public"."customers";
CREATE POLICY "users_can_read_own_customers"
ON "public"."customers"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') IN ('customer', 'admin', 'editor')
  AND lower(email) = lower((select auth.jwt() ->> 'email'))
);

DROP POLICY IF EXISTS "users_can_read_own_subscriptions" ON "public"."subscriptions";
CREATE POLICY "users_can_read_own_subscriptions"
ON "public"."subscriptions"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') IN ('customer', 'admin', 'editor')
  AND lower(email) = lower((select auth.jwt() ->> 'email'))
);

DROP POLICY IF EXISTS "users_can_read_own_subscription_items" ON "public"."subscription_items";
CREATE POLICY "users_can_read_own_subscription_items"
ON "public"."subscription_items"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') IN ('customer', 'admin', 'editor')
  AND EXISTS (
    SELECT 1
    FROM "public"."subscriptions" s
    WHERE s.id = "subscription_items"."subscriptionId"
      AND lower(s.email) = lower((select auth.jwt() ->> 'email'))
  )
);

DROP POLICY IF EXISTS "users_can_read_own_referrals" ON "public"."Referral";
CREATE POLICY "users_can_read_own_referrals"
ON "public"."Referral"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') IN ('customer', 'admin', 'editor')
  AND (select auth.jwt() -> 'app_metadata' ->> 'localUserId') IS NOT NULL
  AND (
    "referrerId" = (select auth.jwt() -> 'app_metadata' ->> 'localUserId')
    OR "refereeId" = (select auth.jwt() -> 'app_metadata' ->> 'localUserId')
  )
);

DROP POLICY IF EXISTS "users_can_read_own_referral_codes" ON "public"."referral_codes";
CREATE POLICY "users_can_read_own_referral_codes"
ON "public"."referral_codes"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') IN ('customer', 'admin', 'editor')
  AND (select auth.jwt() -> 'app_metadata' ->> 'localUserId') IS NOT NULL
  AND "userId" = (select auth.jwt() -> 'app_metadata' ->> 'localUserId')
);

DROP POLICY IF EXISTS "users_can_read_own_referral_redemptions" ON "public"."referral_redemptions";
CREATE POLICY "users_can_read_own_referral_redemptions"
ON "public"."referral_redemptions"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') IN ('customer', 'admin', 'editor')
  AND EXISTS (
    SELECT 1
    FROM "public"."referral_codes" rc
    WHERE rc.id = "referral_redemptions"."referralCodeId"
      AND rc."userId" = (select auth.jwt() -> 'app_metadata' ->> 'localUserId')
  )
);

DROP POLICY IF EXISTS "users_can_read_own_referral_rewards" ON "public"."referral_rewards";
CREATE POLICY "users_can_read_own_referral_rewards"
ON "public"."referral_rewards"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') IN ('customer', 'admin', 'editor')
  AND (select auth.jwt() -> 'app_metadata' ->> 'localUserId') IS NOT NULL
  AND "userId" = (select auth.jwt() -> 'app_metadata' ->> 'localUserId')
);

DROP POLICY IF EXISTS "users_can_read_own_customer_metrics" ON "public"."customer_metrics";
CREATE POLICY "users_can_read_own_customer_metrics"
ON "public"."customer_metrics"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') IN ('customer', 'admin', 'editor')
  AND lower(email) = lower((select auth.jwt() ->> 'email'))
);

-- Retailer-linked records
DROP POLICY IF EXISTS "retailers_can_read_own_profile" ON "public"."retailers";
CREATE POLICY "retailers_can_read_own_profile"
ON "public"."retailers"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'retailer'
  AND (select auth.jwt() -> 'app_metadata' ->> 'retailerId') IS NOT NULL
  AND id = (select auth.jwt() -> 'app_metadata' ->> 'retailerId')
);

DROP POLICY IF EXISTS "retailers_can_read_own_shipping_address" ON "public"."shipping_addresses";
CREATE POLICY "retailers_can_read_own_shipping_address"
ON "public"."shipping_addresses"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'retailer'
  AND "retailerId" = (select auth.jwt() -> 'app_metadata' ->> 'retailerId')
);

DROP POLICY IF EXISTS "retailers_can_read_own_billing_address" ON "public"."billing_addresses";
CREATE POLICY "retailers_can_read_own_billing_address"
ON "public"."billing_addresses"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'retailer'
  AND "retailerId" = (select auth.jwt() -> 'app_metadata' ->> 'retailerId')
);

DROP POLICY IF EXISTS "retailers_can_read_own_orders" ON "public"."retailer_orders";
CREATE POLICY "retailers_can_read_own_orders"
ON "public"."retailer_orders"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'retailer'
  AND "retailerId" = (select auth.jwt() -> 'app_metadata' ->> 'retailerId')
);

DROP POLICY IF EXISTS "retailers_can_read_own_order_items" ON "public"."retailer_order_items";
CREATE POLICY "retailers_can_read_own_order_items"
ON "public"."retailer_order_items"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'retailer'
  AND EXISTS (
    SELECT 1
    FROM "public"."retailer_orders" ro
    WHERE ro.id = "retailer_order_items"."orderId"
      AND ro."retailerId" = (select auth.jwt() -> 'app_metadata' ->> 'retailerId')
  )
);

DROP POLICY IF EXISTS "retailers_can_read_products" ON "public"."Product";
CREATE POLICY "retailers_can_read_products"
ON "public"."Product"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'retailer'
);

-- Affiliate-linked records
DROP POLICY IF EXISTS "affiliates_can_read_own_profile" ON "public"."affiliates";
CREATE POLICY "affiliates_can_read_own_profile"
ON "public"."affiliates"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'affiliate'
  AND (select auth.jwt() -> 'app_metadata' ->> 'affiliateId') IS NOT NULL
  AND id = (select auth.jwt() -> 'app_metadata' ->> 'affiliateId')
);

DROP POLICY IF EXISTS "affiliates_can_read_own_clicks" ON "public"."affiliate_clicks";
CREATE POLICY "affiliates_can_read_own_clicks"
ON "public"."affiliate_clicks"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'affiliate'
  AND "affiliateId" = (select auth.jwt() -> 'app_metadata' ->> 'affiliateId')
);

DROP POLICY IF EXISTS "affiliates_can_read_own_conversions" ON "public"."affiliate_conversions";
CREATE POLICY "affiliates_can_read_own_conversions"
ON "public"."affiliate_conversions"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'affiliate'
  AND "affiliateId" = (select auth.jwt() -> 'app_metadata' ->> 'affiliateId')
);

DROP POLICY IF EXISTS "affiliates_can_read_own_payouts" ON "public"."affiliate_payouts";
CREATE POLICY "affiliates_can_read_own_payouts"
ON "public"."affiliate_payouts"
FOR SELECT
TO authenticated
USING (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'affiliate'
  AND "affiliateId" = (select auth.jwt() -> 'app_metadata' ->> 'affiliateId')
);

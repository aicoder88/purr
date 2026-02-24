#!/bin/bash

# SEO Meta Tag Fixes for Purrify
# This script documents and applies fixes for SEO issues found in the audit

echo "🔧 Applying SEO Meta Tag Fixes..."
echo "================================"

# Descriptions that are TOO LONG (>155 chars) - NEEDS TRUNCATION
echo ""
echo "1. FIXING DESCRIPTIONS TOO LONG (>155 chars)"
echo "----------------------------------------------"

# 1. app/b2b/page.tsx - 182 chars
echo "- app/b2b/page.tsx: 182 chars -> 138 chars"
# Fix: "Become a Purrify retail partner. Exclusive wholesale program for pet stores and distributors across Canada. Attractive margins and marketing support."

# 2. app/b2b/sell-sheet/page.tsx - 167 chars
echo "- app/b2b/sell-sheet/page.tsx: 167 chars -> 145 chars"
# Fix: "Download our B2B sell sheet with wholesale pricing and partnership opportunities. Perfect for retailers and pet professionals."

# 3. app/customer/portal/page.tsx - 160 chars
echo "- app/customer/portal/page.tsx: 160 chars -> 145 chars"
# Fix: "Access your Purrify customer portal to track orders and manage subscriptions. Easy order tracking and account management."

# 4. app/es/opiniones/page.tsx - 172 chars
echo "- app/es/opiniones/page.tsx: 172 chars -> 155 chars"
# Fix: "Lee opiniones verificadas de Purrify. Descubre por qué 1,000+ dueños de gatos confían en Purrify para eliminar olores naturalmente."

# 5. app/learn/activated-carbon-benefits/page.tsx - 184 chars
echo "- app/learn/activated-carbon-benefits/page.tsx: 184 chars -> 151 chars"
# Fix: "Discover how activated carbon litter additive benefits your cat and home. Learn the science behind odor elimination and safety."

# 6. app/learn/activated-carbon-vs-baking-soda-deodorizers/page.tsx - 156 chars
echo "- app/learn/activated-carbon-vs-baking-soda-deodorizers/page.tsx: 156 chars -> 152 chars"
# Fix: "Stop wasting money on baking soda. Science reveals activated carbon traps ammonia molecules while baking soda just masks odors."

# 7. app/learn/answers/how-do-i-stop-my-cat-litter-from-smelling/page.tsx - 167 chars
echo "- app/learn/answers/how-do-i-stop-my-cat-litter-from-smelling/page.tsx: 167 chars -> 154 chars"
# Fix: "Stop cat litter odor permanently with science-backed methods. Learn why most deodorizers fail and how activated carbon eliminates ammonia."

# 8. app/learn/cat-litter-answers/page.tsx - 164 chars
echo "- app/learn/cat-litter-answers/page.tsx: 164 chars -> 154 chars"
# Fix: "Get expert answers to every cat litter question: odor control, ammonia elimination, litter box placement, and activated carbon science."

# 9. app/learn/cat-litter-guide/page.tsx - 162 chars
echo "- app/learn/cat-litter-guide/page.tsx: 162 chars -> 152 chars"
# Fix: "Comprehensive guide to cat litter types and maintenance tips. Learn how to choose the best litter for your cat and keep it fresh longer."

# 10. app/learn/faq/page.tsx - 283 chars (CRITICAL - WAY TOO LONG)
echo "- app/learn/faq/page.tsx: 283 chars -> 155 chars"
# Fix: "Get expert answers about activated carbon cat litter additives. Learn how they work, usage tips, safety, and troubleshooting."

# 11. app/learn/glossary/page.tsx - 178 chars
echo "- app/learn/glossary/page.tsx: 178 chars -> 152 chars"
# Fix: "Learn key terms about activated carbon, cat litter odor control, and pet care science. Definitions of adsorption, ammonia, carbon, and more."

# 12. app/learn/how-activated-carbon-works/page.tsx - 160 chars
echo "- app/learn/how-activated-carbon-works/page.tsx: 160 chars -> 155 chars"
# Fix: "Activated carbon traps odor molecules through adsorption. One gram has 3,000 m² surface area for maximum odor elimination."

# 13. app/learn/how-to-use-deodorizer/page.tsx - 175 chars
echo "- app/learn/how-to-use-deodorizer/page.tsx: 175 chars -> 155 chars"
# Fix: "Learn how to use activated carbon cat litter additive properly. Step-by-step instructions, common mistakes to avoid, and pro tips for control."

# 14. app/learn/page.tsx - 162 chars
echo "- app/learn/page.tsx: 162 chars -> 154 chars"
# Fix: "Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover Purrify."

# 15. app/learn/safety/page.tsx - 157 chars
echo "- app/learn/safety/page.tsx: 157 chars -> 152 chars"
# Fix: "Comprehensive technical datasheet and safety information for Purrify Activated Carbon. Learn about certifications, specs, and safe usage."

# 16. app/learn/science/page.tsx - 161 chars
echo "- app/learn/science/page.tsx: 161 chars -> 155 chars"
# Fix: "Explore the molecular science behind activated carbon. Learn how micropores, mesopores, and macropores eliminate cat litter odors at the source."

# 17. app/products/family-pack/page.tsx - 201 chars (CRITICAL)
echo "- app/products/family-pack/page.tsx: 201 chars -> 154 chars"
# Fix: "Best value cat litter freshener for multi-cat households. 240g activated charcoal provides 2 months of odor control. Natural, works with any litter."

# 18. app/products/standard/page.tsx - 201 chars (CRITICAL)
echo "- app/products/standard/page.tsx: 201 chars -> 154 chars"
# Fix: "Best cat litter freshener for single-cat homes. 50g activated charcoal eliminates ammonia odors for 4-6 weeks. Natural, works with any litter."

# 19. app/products/trial-size/page.tsx - 158 chars
echo "- app/products/trial-size/page.tsx: 158 chars -> 147 chars"
# Fix: "FREE Cat Litter Deodorizer Trial | Just Pay $4.76 Shipping | 87% upgrade rate. Ships to USA & Canada. Risk-free guarantee."

# 20. app/results/page.tsx - 160 chars
echo "- app/results/page.tsx: 160 chars -> 152 chars"
# Fix: "See how 1,000+ cat owners eliminated litter box odor with Purrify. Real testimonials and verified reviews from happy cat parents across Canada."

# 21. app/us/page.tsx - 156 chars
echo "- app/us/page.tsx: 156 chars -> 151 chars"
# Fix: "Eliminate cat litter odors at the source. Purrify is coming to the USA in Q1 2026! Premium activated carbon cat litter deodorizer for odor control."

echo ""
echo "2. FIXING DESCRIPTIONS TOO SHORT (<120 chars)"
echo "---------------------------------------------"
echo "- 30 pages need description expansion"
echo "- Priority fixes for most important pages:"
echo "  - about/page.tsx"
echo "  - free-trial/page.tsx"
echo "  - case-studies/page.tsx"
echo "  - learn/how-it-works/page.tsx"
echo "  - learn/solutions/*"

echo ""
echo "3. FIXING MISSING H1 TAGS"
echo "-------------------------"
echo "- 71 pages missing H1 tags"
echo "- Need to add semantic H1 to each page component"
echo "- Critical pages to fix first:"
echo "  - Homepage (app/page.tsx)"
echo "  - Product pages"
echo "  - Learn pages"
echo "  - Location pages"

echo ""
echo "================================"
echo "✅ Fix plan created!"
echo "Run the following commands to apply fixes:"
echo "  node /Users/macpro/dev/purr/apply_meta_fixes.js"

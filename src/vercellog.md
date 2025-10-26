11:30:08.357 Running build in Washington, D.C., USA (East) – iad1
11:30:08.358 Build machine configuration: 2 cores, 8 GB
11:30:08.559 Cloning github.com/aicoder88/purr (Branch: main, Commit: a51b886)
11:30:14.086 Cloning completed: 5.527s
11:30:14.322 Restored build cache from previous deployment (585aUptMXzZRH1x19p89qxYMpQtv)
11:30:15.461 Running "vercel build"
11:30:15.880 Vercel CLI 48.6.0
11:30:16.338 Installing dependencies...
11:30:18.624 
11:30:18.625 up to date in 2s
11:30:18.625 
11:30:18.625 214 packages are looking for funding
11:30:18.626   run `npm fund` for details
11:30:18.656 Detected Next.js version: 15.5.3
11:30:18.657 Running "npx prisma generate && npm run build"
11:30:20.295 Prisma schema loaded from prisma/schema.prisma
11:30:20.867 
11:30:20.868 ✔ Generated Prisma Client (v6.16.1) to ./node_modules/@prisma/client in 368ms
11:30:20.868 
11:30:20.868 Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
11:30:20.868 
11:30:20.868 Tip: Need your database queries to be 1000x faster? Accelerate offers you that and more: https://pris.ly/tip-2-accelerate
11:30:20.868 
11:30:20.999 
11:30:21.000 > purrify@0.1.0 prebuild
11:30:21.000 > node scripts/vercel-prebuild.js
11:30:21.000 
11:30:21.035 🚀 Starting Vercel prebuild process...
11:30:21.065 🚀 Optimizing TypeScript configuration for faster builds...
11:30:21.065   ✓ Set moduleResolution = bundler
11:30:21.066   ✓ Set downlevelIteration = false
11:30:21.066 ✅ TypeScript configuration optimized
11:30:21.066 
11:30:21.066 💡 Build optimization tips:
11:30:21.066   - First build will create incremental build info
11:30:21.067   - Subsequent builds will use cached type information
11:30:21.067   - Expected speedup: 30-40% on rebuilds
11:30:21.067 
11:30:21.067 ✨ TypeScript optimization complete!
11:30:21.069 ℹ️ Skipping dark mode validation in CI/Vercel build
11:30:21.069 🛟 CI/Vercel build detected: skipping duplicate removal and heavy image optimization.
11:30:21.069 📏 Adding width and height attributes to images...
11:30:21.128 🔍 Loading image dimensions...
11:30:21.128 🔍 Finding React files...
11:30:21.145 Found 445 React files to process
11:30:21.158 ✅ Added missing width and height attributes to images in 0 files
11:30:21.161 ✅ Image dimensions added
11:30:21.161 🚀 Vercel prebuild process complete!
11:30:21.166 
11:30:21.166 > purrify@0.1.0 build
11:30:21.166 > NODE_OPTIONS="--max-old-space-size=4096" next build
11:30:21.166 
11:30:21.914    ▲ Next.js 15.5.3
11:30:21.915    - Experiments (use with caution):
11:30:21.915      ✓ optimizeCss
11:30:21.916      ✓ scrollRestoration
11:30:21.916      · optimizePackageImports
11:30:21.916 
11:30:22.010    Skipping linting
11:30:22.011    Checking validity of types ...
11:30:50.544    Creating an optimized production build ...
11:30:50.786    Using tsconfig file: ./tsconfig.json
11:31:02.594  ⚠ Compiled with warnings in 11.5s
11:31:02.594 
11:31:02.595 entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (500 KiB). This can impact web performance.
11:31:02.595 Entrypoints:
11:31:02.595   pages/_app (1.11 MiB)
11:31:02.595       static/chunks/framework-f67df17f-86be6e5334a6811c.js
11:31:02.595       static/chunks/framework-d7c15829-6d0e802d8a91168f.js
11:31:02.595       static/chunks/framework-85cb083c-6ddf0bf5611c5626.js
11:31:02.595       static/chunks/framework-a6f90180-5e2f42e94efb9bca.js
11:31:02.595       static/chunks/framework-d91c2bd6-afc2698e5e3dd57a.js
11:31:02.595       static/chunks/framework-42bbf998-d70464af381acedf.js
11:31:02.595       static/chunks/framework-9a66d3c2-ca41dea05ef55ac7.js
11:31:02.596       static/chunks/framework-2898f16f-17a5a94d157f012c.js
11:31:02.596       static/css/cfd794f1de7eb1d3.css
11:31:02.596       static/chunks/icons-6b948b9f-7b27c942ad765c68.js
11:31:02.596       static/chunks/icons-99448144-5e18042e31ce8d09.js
11:31:02.596       static/chunks/icons-10d866b3-c6715cec020c5c24.js
11:31:02.596       static/chunks/ui-ad6a2f20-4daf1c09cfeaa7a4.js
11:31:02.596       static/chunks/ui-cbdef5fd-f41171cb0d80d2cc.js
11:31:02.596       static/chunks/ui-2cc99616-c73fdd6146dd3844.js
11:31:02.596       static/chunks/vendors--floating-ui-ca82c0b75f04f361.js
11:31:02.596       static/chunks/vendors-next-seo-b926dec94a3ed9a7.js
11:31:02.596       static/chunks/6010-8e3e2746f52a43fb.js
11:31:02.596       static/chunks/pages/_app-f3956634-61fc4c6327521d0c.js
11:31:02.596       static/chunks/pages/_app-8de0743a-e2ab8fead9bff1ba.js
11:31:02.596       static/chunks/pages/_app-d87c119a-5d72633c74c5df47.js
11:31:02.596       static/chunks/pages/_app-d363ae0c-3eb629a86c0dcbe1.js
11:31:02.597       static/css/77a8134886474a3b.css
11:31:02.597       static/chunks/pages/_app-677710ad-d337cdb15b630515.js
11:31:02.597       static/chunks/pages/_app-a9dc968a-4e7dbcad2ecf78e5.js
11:31:02.597       static/chunks/pages/_app-b57d3491-5fd917b8f3c69f83.js
11:31:02.597 
11:31:02.602    Collecting page data ...
11:31:11.579    Generating static pages (0/1034) ...
11:32:12.348    Generating static pages (233/1034) 
11:32:14.945    Generating static pages (258/1034) 
11:32:47.149    Generating static pages (516/1034) 
11:33:20.410    Generating static pages (775/1034) 
11:33:52.938  ✓ Generating static pages (1034/1034)
11:33:53.105    Finalizing page optimization ...
11:33:53.106    Collecting build traces ...
11:33:53.685 
11:33:53.701 Route (pages)                                                         Size  First Load JS
11:33:53.702 ┌ ○ / (1956 ms)                                                    15.4 kB         322 kB
11:33:53.702 ├   /_app                                                              0 B         277 kB
11:33:53.702 ├ ○ /404 (3541 ms)                                                 1.45 kB         278 kB
11:33:53.702 ├ ○ /about/our-story (3538 ms)                                      4.5 kB         311 kB
11:33:53.703 ├ ƒ /admin/referral-analytics                                      4.98 kB         312 kB
11:33:53.703 ├ ƒ /api/analytics/conversion-metrics                                  0 B         277 kB
11:33:53.703 ├ ƒ /api/analytics/optimization                                        0 B         277 kB
11:33:53.703 ├ ƒ /api/analytics/referrals                                           0 B         277 kB
11:33:53.703 ├ ƒ /api/blog-posts                                                    0 B         277 kB
11:33:53.703 ├ ƒ /api/cart-recovery                                                 0 B         277 kB
11:33:53.703 ├ ƒ /api/contact                                                       0 B         277 kB
11:33:53.704 ├ ƒ /api/create-checkout-session                                       0 B         277 kB
11:33:53.704 ├ ƒ /api/edge/prefetch-checkout                                        0 B         277 kB
11:33:53.704 ├ ƒ /api/free-giveaway                                                 0 B         277 kB
11:33:53.704 ├ ƒ /api/leads/city                                                    0 B         277 kB
11:33:53.704 ├ ƒ /api/newsletter                                                    0 B         277 kB
11:33:53.704 ├ ƒ /api/order-management                                              0 B         277 kB
11:33:53.704 ├ ƒ /api/orders                                                        0 B         277 kB
11:33:53.704 ├ ƒ /api/payment-validation                                            0 B         277 kB
11:33:53.704 ├ ƒ /api/referrals/dashboard/[userId]                                  0 B         277 kB
11:33:53.704 ├ ƒ /api/referrals/generate                                            0 B         277 kB
11:33:53.704 ├ ƒ /api/referrals/notifications                                       0 B         277 kB
11:33:53.705 ├ ƒ /api/referrals/track                                               0 B         277 kB
11:33:53.705 ├ ƒ /api/referrals/validate                                            0 B         277 kB
11:33:53.705 ├ ƒ /api/referrals/validate/[code]                                     0 B         277 kB
11:33:53.705 ├ ƒ /api/retailer-inquiry                                              0 B         277 kB
11:33:53.705 ├ ƒ /api/retailer/create-checkout                                      0 B         277 kB
11:33:53.705 ├ ƒ /api/retailer/login                                                0 B         277 kB
11:33:53.705 ├ ƒ /api/retailer/orders                                               0 B         277 kB
11:33:53.705 ├ ƒ /api/retailer/profile                                              0 B         277 kB
11:33:53.705 ├ ƒ /api/retailer/register                                             0 B         277 kB
11:33:53.705 ├ ƒ /api/robots                                                        0 B         277 kB
11:33:53.705 ├ ƒ /api/security/risk-assessment                                      0 B         277 kB
11:33:53.706 ├ ƒ /api/shipstation/create-order                                      0 B         277 kB
11:33:53.706 ├ ƒ /api/shipstation/webhook                                           0 B         277 kB
11:33:53.706 ├ ƒ /api/sitemap                                                       0 B         277 kB
11:33:53.706 ├ ƒ /api/trial-conversion                                              0 B         277 kB
11:33:53.706 ├ ƒ /api/trial-users                                                   0 B         277 kB
11:33:53.706 ├ ƒ /api/webhooks/stripe                                               0 B         277 kB
11:33:53.706 ├ ● /b2b                                                           5.96 kB         313 kB
11:33:53.706 ├ ● /blog                                                          1.77 kB         279 kB
11:33:53.706 ├ ● /blog/[slug]                                                   2.59 kB         309 kB
11:33:53.706 ├ ○ /blog/activated-carbon-litter-additive-benefits (3538 ms)      5.09 kB         312 kB
11:33:53.706 ├ ○ /blog/activated-carbon-vs-baking-soda-comparison (3538 ms)     2.86 kB         309 kB
11:33:53.706 ├ ○ /blog/best-litter-odor-remover-small-apartments (3538 ms)      6.05 kB         313 kB
11:33:53.707 ├ ○ /blog/cat-litter-smell-worse-summer-solutions (3537 ms)        7.16 kB         314 kB
11:33:53.707 ├ ○ /blog/embarrassed-guests-visit-cat-litter-smell (3537 ms)      6.57 kB         313 kB
11:33:53.707 ├ ○ /blog/house-smells-like-cat-litter-solutions (3537 ms)         4.99 kB         312 kB
11:33:53.707 ├ ○ /blog/how-to-use-cat-litter-deodorizer (2237 ms)               5.03 kB         312 kB
11:33:53.707 ├ ○ /blog/most-powerful-odor-absorber (2236 ms)                    6.57 kB         313 kB
11:33:53.707 ├ ○ /blog/multi-cat-litter-deodorizer-guide (2235 ms)              7.88 kB         314 kB
11:33:53.707 ├ ○ /blog/strong-cat-urine-smell-litter-box (2235 ms)              5.16 kB         312 kB
11:33:53.707 ├ ○ /blog/tried-every-litter-deodorizer-90-days-results (2235 ms)  5.64 kB         283 kB
11:33:53.707 ├ ○ /blog/tried-everything-cat-litter-smell-solutions (2235 ms)     7.2 kB         314 kB
11:33:53.711 ├ ○ /blog/using-deodorizers-with-kittens (2235 ms)                 3.19 kB         310 kB
11:33:53.711 ├ ○ /case-studies (2235 ms)                                        5.44 kB         312 kB
11:33:53.711 ├ ○ /checkout (1957 ms)                                            5.59 kB         312 kB
11:33:53.711 ├ ○ /customer/portal (1957 ms)                                       14 kB         291 kB
11:33:53.711 ├ ○ /customer/referrals (1957 ms)                                  7.68 kB         314 kB
11:33:53.711 ├ ○ /customers/case-studies (1957 ms)                              4.86 kB         311 kB
11:33:53.711 ├ ○ /customers/testimonials (1956 ms)                              4.54 kB         311 kB
11:33:53.711 ├ ○ /demo/stage5-features (1956 ms)                                4.61 kB         311 kB
11:33:53.711 ├ ○ /free (1956 ms)                                                  696 B         278 kB
11:33:53.712 ├ ○ /invest (2251 ms)                                              8.81 kB         286 kB
11:33:53.712 ├ ○ /learn/activated-carbon-benefits (2249 ms)                      4.6 kB         311 kB
11:33:53.712 ├ ○ /learn/activated-carbon-vs-baking-soda-deodorizers (2250 ms)   5.65 kB         312 kB
11:33:53.712 ├ ○ /learn/cat-litter-guide (2258 ms)                              3.96 kB         311 kB
11:33:53.712 ├ ○ /learn/faq (2258 ms)                                           5.92 kB         313 kB
11:33:53.712 ├ ○ /learn/how-it-works (2258 ms)                                  4.15 kB         311 kB
11:33:53.712 ├ ○ /learn/how-to-use-deodorizer (2258 ms)                         4.74 kB         311 kB
11:33:53.712 ├ ○ /learn/safety (2257 ms)                                        5.88 kB         312 kB
11:33:53.712 ├ ○ /learn/science (2099 ms)                                       6.57 kB         313 kB
11:33:53.713 ├ ○ /learn/using-deodorizers-with-kittens (2099 ms)                2.09 kB         309 kB
11:33:53.713 ├ ○ /locations/argentia (2099 ms)                                    388 B         307 kB
11:33:53.713 ├ ○ /locations/baddeck (2099 ms)                                     388 B         307 kB
11:33:53.713 ├ ○ /locations/bancroft (2099 ms)                                    387 B         307 kB
11:33:53.713 ├ ○ /locations/banff (2098 ms)                                       386 B         307 kB
11:33:53.713 ├ ○ /locations/barkerville (2099 ms)                                 389 B         307 kB
11:33:53.713 ├ ○ /locations/barrie (2099 ms)                                      384 B         307 kB
11:33:53.713 ├ ○ /locations/bathurst (2224 ms)                                    388 B         307 kB
11:33:53.713 ├ ○ /locations/batoche (2224 ms)                                     386 B         307 kB
11:33:53.713 ├ ○ /locations/belleville (2224 ms)                                  389 B         307 kB
11:33:53.714 ├ ○ /locations/bonavista (2224 ms)                                   390 B         307 kB
11:33:53.714 ├ ○ /locations/borden (2224 ms)                                      386 B         307 kB
11:33:53.714 ├ ○ /locations/brampton (2224 ms)                                    389 B         307 kB
11:33:53.714 ├ ○ /locations/brandon (2224 ms)                                     388 B         307 kB
11:33:53.714 ├ ○ /locations/brantford (2224 ms)                                   389 B         307 kB
11:33:53.714 ├ ○ /locations/brockville (2255 ms)                                  390 B         307 kB
11:33:53.714 ├ ○ /locations/brooks (2254 ms)                                      387 B         307 kB
11:33:53.715 ├ ○ /locations/burlington (2254 ms)                                  390 B         307 kB
11:33:53.715 ├ ○ /locations/burnaby (2254 ms)                                     389 B         307 kB
11:33:53.716 ├ ○ /locations/calgary (2254 ms)                                     388 B         307 kB
11:33:53.717 ├ ○ /locations/cambridge (2254 ms)                                   389 B         307 kB
11:33:53.717 ├ ○ /locations/campbell-river (2254 ms)                              394 B         307 kB
11:33:53.717 ├ ○ /locations/caraquet (2254 ms)                                    386 B         307 kB
11:33:53.717 ├ ○ /locations/cavendish (1986 ms)                                   389 B         307 kB
11:33:53.717 ├ ○ /locations/channel-port-aux-basques (1986 ms)                    402 B         307 kB
11:33:53.717 ├ ○ /locations/charlottetown (1986 ms)                               392 B         307 kB
11:33:53.717 ├ ○ /locations/chatham (1986 ms)                                     387 B         307 kB
11:33:53.717 ├ ○ /locations/chatham-kent (1986 ms)                                391 B         307 kB
11:33:53.717 ├ ○ /locations/chilliwack (1986 ms)                                  389 B         307 kB
11:33:53.717 ├ ○ /locations/churchill (1986 ms)                                   387 B         307 kB
11:33:53.717 ├ ○ /locations/corner-brook (1987 ms)                                393 B         307 kB
11:33:53.718 ├ ○ /locations/cornwall (2253 ms)                                    389 B         307 kB
11:33:53.718 ├ ○ /locations/courtenay (2253 ms)                                   390 B         307 kB
11:33:53.718 ├ ○ /locations/cranbrook (2253 ms)                                   389 B         307 kB
11:33:53.718 ├ ○ /locations/cumberland-house (2253 ms)                            395 B         307 kB
11:33:53.718 ├ ○ /locations/dalhousie (2253 ms)                                   390 B         307 kB
11:33:53.718 ├ ○ /locations/dauphin (2252 ms)                                     387 B         307 kB
11:33:53.718 ├ ○ /locations/dawson (2252 ms)                                      387 B         307 kB
11:33:53.718 ├ ○ /locations/dawson-creek (2252 ms)                                392 B         307 kB
11:33:53.718 ├ ○ /locations/delta (2091 ms)                                       385 B         307 kB
11:33:53.718 ├ ○ /locations/digby (2085 ms)                                       386 B         307 kB
11:33:53.718 ├ ○ /locations/edmonton (2085 ms)                                    389 B         307 kB
11:33:53.718 ├ ○ /locations/elliot-lake (2085 ms)                                 390 B         307 kB
11:33:53.718 ├ ○ /locations/esquimalt (2085 ms)                                   387 B         307 kB
11:33:53.719 ├ ○ /locations/estevan (2085 ms)                                     388 B         307 kB
11:33:53.719 ├ ○ /locations/etobicoke (2085 ms)                                   388 B         307 kB
11:33:53.719 ├ ○ /locations/ferryland (2085 ms)                                   390 B         307 kB
11:33:53.719 ├ ○ /locations/flin-flon (2101 ms)                                   390 B         307 kB
11:33:53.719 ├ ○ /locations/fort-erie (2101 ms)                                   387 B         307 kB
11:33:53.719 ├ ○ /locations/fort-frances (2101 ms)                                391 B         307 kB
11:33:53.719 ├ ○ /locations/fort-mcmurray (2101 ms)                               392 B         307 kB
11:33:53.719 ├ ○ /locations/fort-saint-james (2101 ms)                            396 B         307 kB
11:33:53.719 ├ ○ /locations/fort-saint-john (2100 ms)                             394 B         307 kB
11:33:53.719 ├ ○ /locations/fort-smith (2100 ms)                                  390 B         307 kB
11:33:53.719 ├ ○ /locations/fredericton (2100 ms)                                 390 B         307 kB
11:33:53.719 ├ ○ /locations/gananoque (1982 ms)                                   390 B         307 kB
11:33:53.719 ├ ○ /locations/gander (1982 ms)                                      385 B         307 kB
11:33:53.719 ├ ○ /locations/gatineau (1982 ms)                                    389 B         307 kB
11:33:53.719 ├ ○ /locations/glace-bay (1982 ms)                                   392 B         307 kB
11:33:53.719 ├ ○ /locations/grand-fallswindsor (1981 ms)                          397 B         307 kB
11:33:53.720 ├ ○ /locations/grande-prairie (1981 ms)                              394 B         307 kB
11:33:53.720 ├ ○ /locations/guelph (1981 ms)                                      385 B         307 kB
11:33:53.720 ├ ○ /locations/halifax (1981 ms)                                     387 B         307 kB
11:33:53.720 ├ ○ /locations/hamilton (1820 ms)                                    387 B         307 kB
11:33:53.720 ├ ○ /locations/happy-valleygoose-bay (1820 ms)                       401 B         307 kB
11:33:53.720 ├ ○ /locations/harbour-grace (1820 ms)                               395 B         307 kB
11:33:53.720 ├ ○ /locations/hay-river (1820 ms)                                   389 B         307 kB
11:33:53.720 ├ ○ /locations/hope (1820 ms)                                        385 B         307 kB
11:33:53.720 ├ ○ /locations/inuvik (1820 ms)                                      389 B         307 kB
11:33:53.720 ├ ○ /locations/iqaluit (1819 ms)                                     388 B         307 kB
11:33:53.721 ├ ○ /locations/iroquois-falls (1819 ms)                              396 B         307 kB
11:33:53.721 ├ ○ /locations/jasper (2028 ms)                                      387 B         307 kB
11:33:53.721 ├ ○ /locations/kamloops (2027 ms)                                    389 B         307 kB
11:33:53.721 ├ ○ /locations/kapuskasing (2027 ms)                                 388 B         307 kB
11:33:53.721 ├ ○ /locations/kawartha-lakes (2027 ms)                              393 B         307 kB
11:33:53.721 ├ ○ /locations/kelowna (2027 ms)                                     387 B         307 kB
11:33:53.721 ├ ○ /locations/kenora (2027 ms)                                      387 B         307 kB
11:33:53.721 ├ ○ /locations/kildonan (2027 ms)                                    389 B         307 kB
11:33:53.721 ├ ○ /locations/kimberley (2027 ms)                                   390 B         307 kB
11:33:53.721 ├ ○ /locations/kingston (2007 ms)                                    387 B         307 kB
11:33:53.721 ├ ○ /locations/kirkland-lake (2007 ms)                               394 B         307 kB
11:33:53.721 ├ ○ /locations/kitchener (2007 ms)                                   389 B         307 kB
11:33:53.721 ├ ○ /locations/kitimat (2007 ms)                                     388 B         307 kB
11:33:53.721 ├ ○ /locations/labrador-city (2007 ms)                               394 B         307 kB
11:33:53.721 ├ ○ /locations/lake-louise (2007 ms)                                 390 B         307 kB
11:33:53.721 ├ ○ /locations/langley (2007 ms)                                     390 B         307 kB
11:33:53.721 ├ ○ /locations/laurentian-hills (2007 ms)                            395 B         307 kB
11:33:53.721 ├ ○ /locations/laval (1902 ms)                                       386 B         307 kB
11:33:53.721 ├ ○ /locations/lethbridge (1902 ms)                                  390 B         307 kB
11:33:53.721 ├ ○ /locations/liverpool (1901 ms)                                   390 B         307 kB
11:33:53.721 ├ ○ /locations/london (1901 ms)                                      387 B         307 kB
11:33:53.721 ├ ○ /locations/longueuil (1901 ms)                                   391 B         307 kB
11:33:53.721 ├ ○ /locations/louisbourg (1901 ms)                                  386 B         307 kB
11:33:53.721 ├ ○ /locations/lunenburg (1901 ms)                                   390 B         307 kB
11:33:53.721 ├ ○ /locations/markham (1901 ms)                                     388 B         307 kB
11:33:53.721 ├ ○ /locations/medicine-hat (1871 ms)                                393 B         307 kB
11:33:53.721 ├ ○ /locations/midland (1870 ms)                                     390 B         307 kB
11:33:53.721 ├ ○ /locations/miramichi (1870 ms)                                   390 B         307 kB
11:33:53.721 ├ ○ /locations/mississauga (1870 ms)                                 392 B         307 kB
11:33:53.721 ├ ○ /locations/moncton (1870 ms)                                     386 B         307 kB
11:33:53.721 ├ ○ /locations/montreal (1870 ms)                                    387 B         307 kB
11:33:53.721 ├ ○ /locations/moose-factory (1870 ms)                               394 B         307 kB
11:33:53.721 ├ ○ /locations/moose-jaw (1870 ms)                                   390 B         307 kB
11:33:53.721 ├ ○ /locations/moosonee (2075 ms)                                    389 B         307 kB
11:33:53.721 ├ ○ /locations/nanaimo (2075 ms)                                     387 B         307 kB
11:33:53.723 ├ ○ /locations/nelson (2074 ms)                                      385 B         307 kB
11:33:53.723 ├ ○ /locations/new-westminster (2074 ms)                             394 B         307 kB
11:33:53.723 ├ ○ /locations/niagara-falls (2074 ms)                               393 B         307 kB
11:33:53.723 ├ ○ /locations/niagara-on-the-lake (2074 ms)                         398 B         307 kB
11:33:53.723 ├ ○ /locations/north-bay (2074 ms)                                   390 B         307 kB
11:33:53.723 ├ ○ /locations/north-vancouver (2074 ms)                             393 B         307 kB
11:33:53.723 ├ ○ /locations/north-york (2490 ms)                                  388 B         307 kB
11:33:53.723 ├ ○ /locations/oak-bay (2489 ms)                                     388 B         307 kB
11:33:53.723 ├ ○ /locations/oakville (2489 ms)                                    388 B         307 kB
11:33:53.723 ├ ○ /locations/orillia (2489 ms)                                     387 B         307 kB
11:33:53.723 ├ ○ /locations/oshawa (2489 ms)                                      389 B         307 kB
11:33:53.723 ├ ○ /locations/ottawa (2489 ms)                                      387 B         307 kB
11:33:53.723 ├ ○ /locations/parry-sound (2489 ms)                                 392 B         307 kB
11:33:53.724 ├ ○ /locations/penticton (2489 ms)                                   388 B         307 kB
11:33:53.724 ├ ○ /locations/perth (2046 ms)                                       385 B         307 kB
11:33:53.724 ├ ○ /locations/peterborough (2045 ms)                                391 B         307 kB
11:33:53.724 ├ ○ /locations/picton (2045 ms)                                      385 B         307 kB
11:33:53.724 ├ ○ /locations/pictou (2045 ms)                                      386 B         307 kB
11:33:53.724 ├ ○ /locations/placentia (2045 ms)                                   388 B         307 kB
11:33:53.724 ├ ○ /locations/port-colborne (2045 ms)                               392 B         307 kB
11:33:53.724 ├ ○ /locations/port-hawkesbury (2045 ms)                             395 B         307 kB
11:33:53.724 ├ ○ /locations/powell-river (2045 ms)                                392 B         307 kB
11:33:53.724 ├ ○ /locations/prince-albert (1763 ms)                               393 B         307 kB
11:33:53.724 ├ ○ /locations/prince-george (1763 ms)                               394 B         307 kB
11:33:53.724 ├ ○ /locations/prince-rupert (1762 ms)                               392 B         307 kB
11:33:53.724 ├ ● /locations/province/[provinceSlug] (10829 ms)                  1.71 kB         279 kB
11:33:53.724 ├   ├ /en/locations/province/alberta (867 ms)
11:33:53.724 ├   ├ /en/locations/province/british-columbia (866 ms)
11:33:53.724 ├   ├ /en/locations/province/manitoba (865 ms)
11:33:53.724 ├   ├ /en/locations/province/saskatchewan (839 ms)
11:33:53.724 ├   ├ /en/locations/province/yukon (839 ms)
11:33:53.724 ├   ├ /en/locations/province/new-brunswick (820 ms)
11:33:53.724 ├   ├ /en/locations/province/newfoundland-and-labrador (819 ms)
11:33:53.724 ├   └ [+6 more paths] (avg 819 ms)
11:33:53.725 ├ ○ /locations/quebec-city (1762 ms)                                 391 B         307 kB
11:33:53.725 ├ ○ /locations/quesnel (1763 ms)                                     388 B         307 kB
11:33:53.725 ├ ○ /locations/red-deer (1763 ms)                                    390 B         307 kB
11:33:53.725 ├ ○ /locations/regina (1763 ms)                                      385 B         307 kB
11:33:53.725 ├ ○ /locations/revelstoke (1763 ms)                                  390 B         307 kB
11:33:53.725 ├ ○ /locations/richmond-hill (1879 ms)                               394 B         307 kB
11:33:53.725 ├ ○ /locations/rimouski (1879 ms)                                    390 B         307 kB
11:33:53.725 ├ ○ /locations/rossland (1879 ms)                                    387 B         307 kB
11:33:53.725 ├ ○ /locations/rouyn-noranda (1879 ms)                               393 B         307 kB
11:33:53.725 ├ ○ /locations/saguenay (1879 ms)                                    389 B         307 kB
11:33:53.725 ├ ○ /locations/saint-albert (1879 ms)                                391 B         307 kB
11:33:53.725 ├ ○ /locations/saint-anthony (1879 ms)                               393 B         307 kB
11:33:53.725 ├ ○ /locations/saint-boniface (1879 ms)                              394 B         307 kB
11:33:53.725 ├ ○ /locations/saint-catharines (2033 ms)                            394 B         307 kB
11:33:53.725 ├ ○ /locations/saint-eustache (2033 ms)                              392 B         307 kB
11:33:53.725 ├ ○ /locations/saint-hubert (2032 ms)                                392 B         307 kB
11:33:53.725 ├ ○ /locations/saint-john (2032 ms)                                  388 B         307 kB
11:33:53.725 ├ ○ /locations/saint-thomas (2032 ms)                                394 B         307 kB
11:33:53.725 ├ ○ /locations/sainte-anne-de-beaupre (2032 ms)                      398 B         307 kB
11:33:53.725 ├ ○ /locations/sainte-foy (2032 ms)                                  391 B         307 kB
11:33:53.725 ├ ○ /locations/sainte-therese (1892 ms)                              391 B         307 kB
11:33:53.725 ├ ○ /locations/sarnia-clearwater (2032 ms)                           395 B         307 kB
11:33:53.725 ├ ○ /locations/saskatoon (1891 ms)                                   389 B         307 kB
11:33:53.725 ├ ○ /locations/sault-sainte-marie (1891 ms)                          397 B         307 kB
11:33:53.725 ├ ○ /locations/scarborough (1891 ms)                                 390 B         307 kB
11:33:53.725 ├ ○ /locations/sept-iles (1891 ms)                                   390 B         307 kB
11:33:53.725 ├ ○ /locations/sherbrooke (1891 ms)                                  389 B         307 kB
11:33:53.725 ├ ○ /locations/simcoe (1891 ms)                                      388 B         307 kB
11:33:53.725 ├ ○ /locations/sorel-tracy (1891 ms)                                 389 B         307 kB
11:33:53.725 ├ ○ /locations/souris (1812 ms)                                      385 B         307 kB
11:33:53.725 ├ ○ /locations/springhill (1811 ms)                                  389 B         307 kB
11:33:53.725 ├ ○ /locations/st-johns (1811 ms)                                    386 B         307 kB
11:33:53.725 ├ ○ /locations/stratford (1811 ms)                                   388 B         307 kB
11:33:53.725 ├ ○ /locations/sudbury (1811 ms)                                     385 B         307 kB
11:33:53.725 ├ ○ /locations/summerside (1811 ms)                                  388 B         307 kB
11:33:53.725 ├ ○ /locations/swan-river (1811 ms)                                  387 B         307 kB
11:33:53.725 ├ ○ /locations/sydney (1809 ms)                                      387 B         307 kB
11:33:53.725 ├ ○ /locations/temiskaming-shores (2148 ms)                          397 B         307 kB
11:33:53.725 ├ ○ /locations/thompson (2148 ms)                                    391 B         307 kB
11:33:53.725 ├ ○ /locations/thorold (2148 ms)                                     387 B         307 kB
11:33:53.726 ├ ○ /locations/thunder-bay (2148 ms)                                 391 B         307 kB
11:33:53.726 ├ ○ /locations/timmins (2148 ms)                                     390 B         307 kB
11:33:53.726 ├ ○ /locations/toronto (2148 ms)                                     387 B         307 kB
11:33:53.726 ├ ○ /locations/trail (2148 ms)                                       385 B         307 kB
11:33:53.726 ├ ○ /locations/trenton (2147 ms)                                     387 B         307 kB
11:33:53.726 ├ ○ /locations/trois-rivieres (1848 ms)                              393 B         307 kB
11:33:53.726 ├ ○ /locations/tuktoyaktuk (1848 ms)                                 389 B         307 kB
11:33:53.726 ├ ○ /locations/uranium-city (1847 ms)                                394 B         307 kB
11:33:53.726 ├ ○ /locations/val-dor (1847 ms)                                     389 B         307 kB
11:33:53.726 ├ ○ /locations/vancouver (1847 ms)                                   387 B         307 kB
11:33:53.726 ├ ○ /locations/vaughan (1847 ms)                                     389 B         307 kB
11:33:53.726 ├ ○ /locations/vernon (1847 ms)                                      386 B         307 kB
11:33:53.726 ├ ○ /locations/victoria (1847 ms)                                    389 B         307 kB
11:33:53.726 ├ ○ /locations/wabana (1715 ms)                                      387 B         307 kB
11:33:53.726 ├ ○ /locations/waskaganish (1715 ms)                                 392 B         307 kB
11:33:53.726 ├ ○ /locations/waterloo (1715 ms)                                    389 B         307 kB
11:33:53.726 ├ ○ /locations/welland (1714 ms)                                     388 B         307 kB
11:33:53.726 ├ ○ /locations/west-nipissing (1714 ms)                              394 B         307 kB
11:33:53.726 ├ ○ /locations/west-vancouver (1714 ms)                              393 B         307 kB
11:33:53.726 ├ ○ /locations/white-rock (1714 ms)                                  390 B         307 kB
11:33:53.726 ├ ○ /locations/windsor (1714 ms)                                     385 B         307 kB
11:33:53.726 ├ ○ /locations/winnipeg (1014 ms)                                    388 B         307 kB
11:33:53.726 ├ ○ /locations/woodstock (1014 ms)                                   388 B         307 kB
11:33:53.726 ├ ○ /locations/yarmouth (1014 ms)                                    388 B         307 kB
11:33:53.726 ├ ○ /locations/yellowknife (1014 ms)                                 391 B         307 kB
11:33:53.726 ├ ○ /locations/york (1014 ms)                                        387 B         307 kB
11:33:53.726 ├ ○ /locations/york-factory (1014 ms)                                394 B         307 kB
11:33:53.726 ├ ○ /montreal (1014 ms)                                            10.8 kB         317 kB
11:33:53.726 ├ ○ /offline (1014 ms)                                             1.37 kB         278 kB
11:33:53.726 ├ ○ /privacy (1061 ms)                                               326 B         310 kB
11:33:53.726 ├ ○ /privacy-policy (1061 ms)                                        283 B         310 kB
11:33:53.726 ├ ○ /products/compare (1060 ms)                                    4.66 kB         311 kB
11:33:53.726 ├ ○ /products/family-pack (1061 ms)                                5.26 kB         312 kB
11:33:53.726 ├ ○ /products/standard (1061 ms)                                   5.25 kB         312 kB
11:33:53.726 ├ ○ /products/trial-size (1061 ms)                                 6.22 kB         313 kB
11:33:53.726 ├ ƒ /refer/[code]                                                  3.35 kB         310 kB
11:33:53.726 ├ ○ /retailer/portal/login (1061 ms)                                3.4 kB         280 kB
11:33:53.727 ├ ○ /retailers (1061 ms)                                           9.76 kB         316 kB
11:33:53.727 ├ ○ /reviews (910 ms)                                              4.09 kB         281 kB
11:33:53.728 ├ ƒ /server-sitemap.xml                                              333 B         277 kB
11:33:53.728 ├ ○ /solutions/ammonia-smell-cat-litter (909 ms)                   3.23 kB         280 kB
11:33:53.728 ├ ○ /solutions/apartment-cat-smell-solution (910 ms)               3.55 kB         310 kB
11:33:53.728 ├ ○ /solutions/litter-box-smell-elimination (909 ms)               2.59 kB         309 kB
11:33:53.728 ├ ○ /solutions/multiple-cats-odor-control (909 ms)                 1.96 kB         309 kB
11:33:53.728 ├ ○ /solutions/natural-cat-litter-additive (909 ms)                2.07 kB         279 kB
11:33:53.728 ├ ○ /solutions/senior-cat-litter-solutions (909 ms)                2.79 kB         309 kB
11:33:53.728 ├ ● /stockists                                                     4.83 kB         311 kB
11:33:53.728 ├ ○ /support/contact (909 ms)                                      4.38 kB         311 kB
11:33:53.728 ├ ○ /support/shipping (676 ms)                                     4.44 kB         311 kB
11:33:53.728 ├ ○ /terms (676 ms)                                                  275 B         311 kB
11:33:53.728 ├ ○ /test (677 ms)                                                 1.21 kB         278 kB
11:33:53.728 ├ ○ /thank-you (677 ms)                                            1.36 kB         278 kB
11:33:53.728 └ ○ /tos (677 ms)                                                    321 B         311 kB
11:33:53.728 + First Load JS shared by all                                       304 kB
11:33:53.728   ├ chunks/pages/_app-677710ad-d337cdb15b630515.js                 30.7 kB
11:33:53.728   └ chunks/pages/_app-a9dc968a-4e7dbcad2ecf78e5.js                   33 kB
11:33:53.728   ├ chunks/pages/_app-b57d3491-5fd917b8f3c69f83.js                 15.6 kB
11:33:53.728   ├ chunks/react-36598b9c-3b769740b40629d1.js                        53 kB
11:33:53.728   ├ chunks/ui-ad6a2f20-4daf1c09cfeaa7a4.js                         14.3 kB
11:33:53.728   ├ css/77a8134886474a3b.css                                         26 kB
11:33:53.728   └ other shared chunks (total)                                     131 kB
11:33:53.738 
11:33:53.738 ○  (Static)   prerendered as static content
11:33:53.738 ●  (SSG)      prerendered as static HTML (uses getStaticProps)
11:33:53.738 ƒ  (Dynamic)  server-rendered on demand
11:33:53.738 
11:33:53.749 
11:33:53.749 > purrify@0.1.0 postbuild
11:33:53.749 > next-sitemap && npm run generate-enhanced-sitemap
11:33:53.750 
11:33:53.856 ✨ [next-sitemap] Loading next-sitemap config: file:///vercel/path0/next-sitemap.config.js
11:33:53.878 ✅ [next-sitemap] Generation completed
11:33:53.880 ┌───────────────┬────────┐
11:33:53.880 │ (index)       │ Values │
11:33:53.880 ├───────────────┼────────┤
11:33:53.880 │ indexSitemaps │ 1      │
11:33:53.880 │ sitemaps      │ 1      │
11:33:53.880 └───────────────┴────────┘
11:33:53.881 -----------------------------------------------------
11:33:53.881  SITEMAP INDICES 
11:33:53.881 -----------------------------------------------------
11:33:53.881 
11:33:53.882    ○ https://www.purrify.ca/sitemap.xml
11:33:53.882 
11:33:53.882 
11:33:53.883 -----------------------------------------------------
11:33:53.883  SITEMAPS 
11:33:53.883 -----------------------------------------------------
11:33:53.883 
11:33:53.883    ○ https://www.purrify.ca/sitemap-0.xml
11:33:53.883 
11:33:53.884 
11:33:54.024 
11:33:54.025 > purrify@0.1.0 generate-enhanced-sitemap
11:33:54.025 > node scripts/generate-sitemap.js
11:33:54.025 
11:33:54.525 Enhanced sitemap generated at /vercel/path0/public/enhanced-sitemap.xml
11:33:54.896 Traced Next.js server files in: 72.543ms
11:33:55.675 Created all serverless functions in: 777.619ms
11:33:55.790 Collected static files (public/, static/, .next/static): 58.897ms
11:33:57.672 Build Completed in /vercel/output [4m]
11:33:58.139 Deploying outputs...
11:34:20.156 Deployment completed
11:34:20.995 Creating build cache...
11:34:48.969 Created build cache: 27.966s
11:34:48.970 Uploading build cache [301.32 MB]
11:34:52.351 Build cache uploaded: 3.389s
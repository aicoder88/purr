import { CONTACT_INFO } from '../lib/constants';

export const zh = {
  // Common
  siteName: "Purrify",
  siteDescription: "活性炭猫砂添加剂，从源头消除异味。",

  // Navigation
  nav: {
    home: "首页",
    products: "产品",
    learn: "了解更多",
    howItWorks: "工作原理",
    about: "关于我们",
    whyPurrify: "为什么选择Purrify",
    tryFree: "免费试用装",
    testimonials: "用户评价",
    leaveReview: "留下评价",
    contact: "联系我们",
    blog: "博客",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款",
    // Dropdown items
    trialSize: "免费试用 (仅付运费)",
    compareSizes: "比较规格",
    viewAllProducts: "查看所有产品",
    howItWorksPage: "工作原理",
    faq: "常见问题",
    science: "科学原理",
    buyNow: "立即购买！",
    retailers: "零售商",
    wholesalePricing: "批发价格",
    becomePartner: "成为合作伙伴",
    marketingSupport: "营销支持"
  },

  locationsMenu: {
    selectProvince: "选择省份",
    hoverPrompt: "将鼠标悬停在省份上即可查看城市。",
    provinceCitiesHeading: "{{province}} 城市",
    viewProvinceGuide: "查看 {{province}} 省指南"
  },
  seoKeywords: {
    headTerms: [
      '猫砂异味',
      '猫砂除味',
      '猫砂除臭',
      '猫砂气味清除',
      '最佳猫砂除臭剂',
      '天然猫砂除臭'
    ],
    symptomVariants: [
      '猫砂氨味太重',
      '小公寓猫砂味道大',
      '猫砂为什么这么臭',
      '猫砂味让客人尴尬'
    ],
    solutionVariants: [
      '天然猫砂除臭方法',
      '活性炭猫砂添加剂',
      '无香精猫砂除臭剂',
      '如何快速去除猫砂味'
    ],
    modifiers: {
      housing: ['公寓', '地下室', '多猫家庭', '共用空间'],
      seasonal: ['冬天关窗', '潮湿夏季', '加拿大冬季', '雨季通风差'],
      retailer: ['Pet Valu', 'PetSmart', 'Global Pet Foods', 'Ren\'s Pets', 'Mondou']
    }
  },

  // Products
  products: {
    "purrify-12g": {
      name: "免费试用装",
      description: "免费试用Purrify！\n仅需支付$4.76运费（加拿大境内任一地点）\n\n每位客户限购一套"
    },
    "purrify-50g": {
      name: "Purrify 50g",
      description: "单猫家庭理想选择\n我们最受欢迎的单猫家庭规格。\n一个月的清新！"
    },
    "purrify-120g": {
      name: "常规装",
      description: "双猫家庭完美选择\n多猫家庭的双倍功效。\n最大程度的异味控制。"
    }
  },

  pricing: {
    oneTimeLabel: "一次性购买",
    autoshipLabel: "自动订购省更多",
    autoshipBestLabel: "超值自动订购方案",
    billedEvery: "账单周期：每",
    months: "个月",
    shippingIncluded: "含运费",
    freeShipping: "免运费",
    plusShipping: "+ 运费",
    shippingCalculated: "运费将在结账时计算",
    startAutoship: "开启自动订购",
    buyNow: "立即购买",
    linkComingSoon: "支付链接即将上线",
    recommended: "推荐选择",
    perMonth: "≈ {price}/月",
    saveVsOneTime: "比单次购买节省 {percent}%",
    trialSizeSection: "免费试用 - 仅付运费",
    quarterlyAutoshipSection: "订购享优惠 - 季度自动配送",
    stripeShippingNote: "产品将收货地址将以您在下一页 Stripe 填写的 'SHIP TO' 为准"
  },

  announcementBar: {
    freeShipping: {
      line1: '免运费',
      line2: '适用于所有自动订购项目',
    },
    madeInCanada: {
      line1: '加拿大制造',
      line2: '采用本地及全球采购原料',
    },
    naturalCarbon: {
      line1: '无毒成分',
      line2: '由100%天然活性椰壳炭制成',
    },
    socialProof: {
      line1: '无化学品、香精或添加剂',
      line2: '加拿大数千名猫主人的共同选择',
    },
    moneyBack: {
      line1: '30天退款保证',
      line2: '不满意？无条件全额退款',
    },
  },

  // Hero Section
  hero: {
    catLitter: "猫砂",
    rabbitLitter: "兔砂",
    fridgeSmells: "冰箱异味",
    ferretCage: "雪貂笼",
    eliminateCatOdors: "7天消除猫砂异味",
    instantly: "瞬间见效",
    description: "先进的活性炭技术中和氨气和异味的速度比传统解决方案快3倍。几秒钟内将您的猫砂盒从有异味变为清新。",
    socialProof: {
      trustNumber: "1,000+",
      trustText: "猫主人信任Purrify",
      ratingText: "来自 138 条评论的 4.8/5 评分"
    },
    buttons: {
      shopNow: "🛒 立即购买 - $24.95",
      reviews: "⭐ 138+ 评论",
      learnMore: "了解工作原理"
    },
    ariaLabels: {
      shopNow: "立即购买Purrify产品",
      reviews: "阅读138+顾客评论",
      playVideo: "播放演示视频，展示Purrify消除猫砂异味的效果"
    },
    dualPath: {
      consumer: {
        title: "为您的爱猫",
        description: "个人用户——快速结账，直接送达",
        cta: "立即为我的猫购买"
      },
      retailer: {
        title: "零售商与分销商",
        description: "批发价格、大宗订购、营销支持",
        cta: "访问批发门户"
      }
    }
  },

  // About Section
  about: {
    naturalAndEffective: "天然有效"
  },

  // Features
  features: {
    odorElimination: {
      title: "异味消除",
      description: "Purrify的先进配方有效地从源头消除令人不快的猫砂盒异味。"
    },
    catFriendly: {
      title: "对猫咪友好",
      description: "采用天然成分制成，无添加香精或染料。"
    },
    longLastingFreshness: {
      title: "持久清新",
      description: "提供长达7天的持续清新效果。"
    },
    worksWithAnyLitter: {
      title: "适用于任何猫砂",
      description: "与所有类型的猫砂兼容，包括结团砂、水晶砂和天然砂。"
    },
    natural: {
      title: "天然成分",
      description: "采用100%天然活性炭制成，无化学品、香精或添加剂。",
    },
    costEffective: {
      title: "经济实惠",
      description: "延长猫砂使用寿命，为您节省金钱。"
    },
    freePurrify: {
      title: "免费Purrify",
      description: "立即获取免费样品。"
    },
    beforeAfter: {
      title: "使用前后对比",
      description: "查看Purrify的惊人效果。"
    }
  },

  // Benefits
  benefits: {
    molecular: {
      title: "分子级异味控制",
      description: "在分子级别捕获和中和异味。"
    },
    sevenDayFreshness: {
      title: "7天清新保证",
      description: "一次使用，享受一周的清新环境。"
    },
    natural: {
      title: "100%天然",
      description: "采用100%天然活性炭；不添加化学品、香精或添加剂。",
    },
    universalFit: {
      title: "通用兼容",
      description: "适用于所有品牌和类型的猫砂。"
    },
    highlyRated: {
      title: "高度评价",
      description: "获得 1,000+ 满意客户的五星好评。"
    }
  },

  // How It Works
  howItWorks: {
    simpleAs123: "简单三步骤",
    steps: [
      {
        number: "1",
        title: "撒入",
        description: "将Purrify撒在干净的猫砂上"
      },
      {
        number: "2",
        title: "混合",
        description: "轻轻搅拌确保均匀分布"
      },
      {
        number: "3",
        title: "享受",
        description: "享受7天的清新无异味环境"
      }
    ],
    litterTypes: {
      clumping: "结团砂",
      crystal: "水晶砂",
      natural: "天然砂",
      clay: "粘土砂",
      nonClumping: "非结团砂"
    }
  },

  // Products Section
  productsSection: {
    forEveryCatHousehold: "适合每个猫咪家庭",
    pickYourPowerLevel: "选择您的功效级别",
    subtitle: "从试用装到家庭装，我们为每种需求提供完美的解决方案",
    powerLevels: {
      kittenPower: "小猫功效",
      standardPower: "标准功效",
      maximumPower: "最大功效"
    },
    mostPopular: "最受欢迎",
    addToCart: "加入购物车",
    buyNow: "立即购买",
    subscribeNow: "订阅享优惠",
    adding: "添加中...",
    viewAllProducts: "查看所有产品"
  },

  // Stores Section
  storesSection: {
    availableInStores: "门店有售",
    soldInFollowingStores: "在以下门店有售",
    subtitle: "在您附近的宠物用品店寻找Purrify",
    requestStoreAvailability: "申请门店供货",
    dontSeeLocalStore: "没看到您当地的门店？",
    callStore: "致电门店",
    sending: "发送中...",
    requestSent: "请求已发送！",
    requestSuccess: "谢谢！我们会帮助您在当地商店购买Purrify。",
    requestError: "发生错误。请直接联系我们 support@purrify.ca",
    storeDescriptions: {
      completePetCareAndSupplies: "完整的宠物护理和用品",
      premiumPetBoutique: "高端宠物精品店",
      familyOwnedPetStore: "家庭经营的宠物店",
      globalPetFoodsLocation: "Global Pet Foods门店",
      premiumPetProductsAndSupplies: "高端宠物产品和用品",
      fullServicePetStore: "全方位服务宠物店",
      petStoreWithGroomingServices: "提供美容服务的宠物店"
    }
  },

  // Call to Action
  cta: {
    title: "准备好体验差异了吗？",
    subtitle: "加入 1,000+ 满意的猫主人，今天就试试 Purrify",
    buttonText: "立即订购",
    joinText: "加入Purrify家族",
    guarantee: "专属客服支持"
  },

  // FAQ
  faq: {
    title: "常见问题",
    commonQuestions: "常见问题解答",
    subtitle: "找到您关于Purrify最常见问题的答案",
    stillHaveQuestions: "还有问题？",
    contactTeam: "联系我们的团队",
    forMoreInfo: "获取更多信息",
    items: [
      {
        question: "什么是Purrify？",
        answer: "Purrify是一种活性炭猫砂添加剂，从源头消除异味，而不是用香料掩盖异味。"
      },
      {
        question: "Purrify如何工作？",
        answer: "Purrify使用活性炭技术通过吸附捕获和中和异味分子，在分子级别有效消除猫砂异味。"
      },
      {
        question: "Purrify能持续多久？",
        answer: "一次使用Purrify可以让您的猫砂盒保持无异味状态长达7天，具体取决于使用情况和猫咪数量。"
      },
      {
        question: "Purrify可以与任何类型的猫砂一起使用吗？",
        answer: "是的，Purrify适用于所有类型的猫砂，包括粘土砂、结团砂、水晶砂和天然砂。"
      },
      {
        question: "我应该多久使用一次Purrify？",
        answer: "为获得最佳效果，每次更换或添加新猫砂时都要在猫砂上撒一层Purrify。只需薄薄一层即可持续控制异味。"
      },
      {
        question: "一包Purrify能用多久？",
        answer: "这取决于您有多少只猫以及更换猫砂的频率。平均而言，我们的65g包装对于定期更换猫砂的单猫家庭可以使用约1-2个月。"
      },
      {
        question: "Purrify与香味猫砂或除臭剂有什么不同？",
        answer: "与掩盖异味的香味产品不同，Purrify使用活性炭技术实际捕获和中和源头的异味分子。它不会为您的家增添任何香味，只是消除难闻的气味。"
      }
    ]
  },

  // Contact
  contact: {
    title: "联系我们",
    subtitle: "我们很乐意听到您的声音",
    address: "加拿大蒙特利尔",
    phone: CONTACT_INFO.phone,
    email: "hello@purrify.ca",
    courriel: "hello@purrify.ca",
    hours: {
      title: "营业时间",
      monday: "周一：上午9点 - 下午5点",
      tuesday: "周二：上午9点 - 下午5点",
      wednesday: "周三：上午9点 - 下午5点",
      thursday: "周四：上午9点 - 下午5点",
      friday: "周五：上午9点 - 下午5点",
      saturday: "周六：上午10点 - 下午2点",
      sunday: "周日：休息"
    },
    form: {
      name: "姓名",
      email: "邮箱",
      message: "留言",
      submit: "发送消息"
    }
  },

  // Newsletter
  newsletter: {
    title: "订阅我们的通讯",
    subtitle: "获取最新的猫咪护理技巧和Purrify更新",
    placeholder: "输入您的邮箱地址",
    buttonText: "订阅",
    successMessage: "感谢您的订阅！",
    errorMessage: "订阅失败，请重试。",
    joinFamily: {
      title: "加入Purrify大家庭",
      subtitle: "首单享10%折扣，获得专属猫咪护理技巧",
      benefits: {
        firstOrder: "首单10%折扣",
        firstOrderDesc: "新订阅者专属折扣",
        catCareTips: "猫咪护理技巧",
        catCareTipsDesc: "每周专家建议和猫砂技巧",
        earlyAccess: "抢先体验",
        earlyAccessDesc: "第一时间了解新产品",
        communityStories: "社区故事",
        communityStoriesDesc: "其他猫主人的成功故事"
      },
      emailPlaceholder: "输入您的邮箱地址",
      ctaButton: "首单享10%折扣",
      joinText: "加入 1,000+ 快乐客户 • 无垃圾邮件，随时退订",
      features: {
        weeklyTips: "✓ 每周技巧",
        exclusiveOffers: "✓ 专属优惠",
        earlyAccessProducts: "✓ 抢先体验"
      }
    }
  },

  // Trust Badges
  trustBadges: {
    moneyBack: {
      title: "加拿大客服团队",
      description: "真实团队随时帮助您优化除臭效果",
      highlight: "猫咪护理专家"
    },
    securePayment: {
      title: "安全支付",
      description: "SSL加密结账与Stripe",
      highlight: "256位SSL"
    },
    fastShipping: {
      title: "快速配送",
      description: "快速可靠的配送",
      highlight: "当天处理"
    },
    customerRating: {
      title: "4.9/5客户评分",
      description: "基于 138 条真实评价",
      highlight: "98%满意度"
    },
    happyCustomers: {
      title: "1,000+满意客户",
      description: "全加拿大猫主人的信赖之选",
      highlight: "自2019年"
    },
    premiumQuality: {
      title: "优质产品",
      description: "滤材级活性炭，常用于水/空气过滤",
      highlight: "无添加香精"
    }
  },

  // Payment Security
  paymentSecurity: {
    securePayment: "安全支付",
    sslEncrypted: "256位SSL",
    sslEncryptedCheckout: "您的支付信息经过加密且安全。我们绝不存储您的支付详情。"
  },

  // Free Giveaway Form
  freeGiveaway: {
    formTitle: "获取免费Purrify样品",
    fullName: "全名",
    emailAddress: "邮箱地址",
    catNames: "猫咪姓名",
    catNamePlaceholder: "输入您猫咪的名字",
    addAnotherCat: "添加另一只猫咪",
    submitting: "提交中...",
    submitButton: "获取免费样品",
    successMessage: "成功！您的免费样品正在路上。",
    errorMessage: "提交失败，请重试。",
    errorGeneric: "出现错误，请稍后重试。",
    privacyNotice: "我们尊重您的隐私，绝不会分享您的信息。"
  },

  // SEO
  seo: {
    keywords: "猫砂添加剂, 异味控制, 活性炭, 宠物护理, 猫咪产品",
    openGraph: {
      title: "Purrify - 活性炭猫砂添加剂",
      description: "使用Purrify活性炭添加剂消除猫砂盒异味。天然、无香、有效。"
    },
    metaDescription: "Purrify是一款优质的活性炭猫砂添加剂，可在分子水平上消除异味。采用天然椰壳炭制成，提供7天清新效果，适用于所有类型的猫砂。深受加拿大 1,000+ 猫主人的信赖。"
  },

  // Structured Data
  structuredData: {
    organization: {
      name: "Purrify",
      description: "优质活性炭猫砂添加剂，在分子水平上消除异味。采用天然椰壳炭在加拿大制造。",
      foundingDate: "2023",
      contactPoint: {
        telephone: CONTACT_INFO.phoneInternational,
        email: "hello@purrify.ca",
        contactType: "客户服务",
        areaServed: ["CA", "US"],
        availableLanguage: ["英语", "法语", "中文"]
      },
      areaServed: "加拿大"
    },
    product: {
      name: "Purrify活性炭猫砂添加剂",
      description: "活性炭猫砂添加剂，从根源消除异味。"
    },
    localBusiness: {
      type: "宠物用品店",
      name: "Purrify",
      description: "活性炭猫砂添加剂，从根源消除异味。"
    },
    breadcrumb: {
      home: "首页"
    },
    video: {
      name: "Purrify猫砂添加剂有效性演示",
      description: "了解Purrify如何有效消除猫砂异味。"
    },
    website: {
      name: "Purrify - 活性炭猫砂添加剂",
      description: "优质活性炭猫砂添加剂，在分子水平上消除异味。",
      inLanguage: "zh-CN"
    },
    offerCatalog: {
      name: "猫砂异味控制产品",
      products: {
        trial: {
          name: "Purrify 12g 试用装",
          description: "试用装活性炭猫砂添加剂 - 完美的测试选择",
          sku: "purrify-12g"
        },
        standard: {
          name: "Purrify 50g 标准装",
          description: "最受欢迎的规格 - 单猫家庭一个月用量",
          sku: "purrify-50g"
        },
        family: {
          name: "Purrify 120g 家庭装",
          description: "大容量装，非常适合多猫家庭 - 最大程度控制异味",
          sku: "purrify-120g"
        }
      },
      priceRange: "$6.99 - $29.99"
    },
    faqPage: {
      questions: [
        {
          question: "什么是Purrify，它是如何工作的？",
          answer: "Purrify是一种猫砂活性炭添加剂，在分子水平上消除异味。活性炭拥有数百万个微孔，可以捕获和中和产生异味的化合物，相比传统猫砂提供更优异的异味控制效果。"
        },
        {
          question: "Purrify可以在猫和人周围使用吗？",
          answer: "Purrify使用与家用净水器和空气过滤器常见的同类型活性炭，不添加香精或染料。"
        },
        {
          question: "我应该使用多少Purrify？",
          answer: "为获得最佳效果，每个标准猫砂盆使用大约1-2汤匙Purrify。在完全更换猫砂时将其与现有猫砂充分混合。12g试用装正好适合一次猫砂盆更换。"
        },
        {
          question: "Purrify适用于所有类型的猫砂吗？",
          answer: "是的！Purrify设计用于任何类型的猫砂 - 粘土、结团、水晶、天然或可生物降解的。它增强您已经在使用的猫砂的异味控制特性。"
        }
      ]
    }
  },

  // Blog Section
  blogSection: {
    catCareTips: "猫咪护理技巧",
    fromOurBlog: "来自我们的博客",
    description: "获取专家建议和技巧，让您的猫咪保持健康快乐",
    newPost: "新文章",
    readFullArticle: "阅读全文",
    viewAllArticles: "查看所有文章"
  },

  // Contact Section
  contactSection: {
    getInTouch: "联系我们",
    ourLocation: "我们的位置",
    phoneNumber: "电话号码",
    phoneDescription: "我们把那股顽固的味道牢牢关进了电话号码里。拨打 1-450-6-ODORS-3 (也就是 1 (450) 663-6773)，体验我们对清新空气的执着。",
    openingHours: "营业时间",
    weekdays: "工作日：上午9点 - 下午5点",
    saturday: "周六：上午10点 - 下午2点",
    sunday: "周日：休息",
    sendMessage: "发送消息",
    replyTime: "我们通常在24小时内回复"
  },

  // Footer
  footer: {
    quickLinks: "快速链接",
    openingHours: "营业时间",
    contactUs: "联系我们",
    allRightsReserved: "版权所有"
  },

  // Free Trial
  freeTrial: {
    urgentBanner: "限时优惠",
    free: "免费"
  },

  // Enhanced Product Comparison
  enhancedProductComparison: {
    compareAndSave: "比较并节省",
    chooseYourPerfectSize: "选择您的完美尺寸",
    purrifySize: "Purrify 规格",
    subtitle: "所有尺寸都提供相同的强效异味消除。根据您的家庭规模和使用频率选择。",
    trial: "试用装",
    mostPopular: "最受欢迎",
    bestValue: "最佳价值",
    premium: "高级装",
    perfectForFirstTime: "首次使用者的完美选择",
    idealForSingleCat: "单猫家庭的理想选择",
    perfectForMultiCat: "多猫家庭的完美选择",
    duration: "持续时间",
    coverage: "覆盖范围",
    odorControl: "7天异味控制",
    odorControlTrial: "7天异味控制",
    odorControlMedium: "14天异味控制",
    odorControlLarge: "30天异味控制",
    naturalIngredients: "100%天然成分",
    easyApplication: "易于使用",
    moneyBackGuarantee: "专家支持团队",
    freeShipping: "包含配送",
    freeShippingDetailed: "包含配送。",
    autoshipHero: "自动订购省更多",
    autoshipHighlight: "订阅立享优惠",
    bulkDiscount: "批量折扣",
    prioritySupport: "优先客户支持",
    tryRiskFree: "无风险试用",
    chooseThisSize: "选择此尺寸",
    chosenByCustomers: "🔥 68%的客户选择此方案",
    whyChoosePurrify: "为什么选择Purrify？",
    joinThousands: "加入 1,000+ 名信任 Purrify 的猫主人",
    happyCustomers: "满意客户",
    averageRating: "平均评分",
    satisfactionRate: "满意度",
    odorFreeGuarantee: "每次使用都带来清新空气",
    moneyBackGuaranteeText: "有疑问？我们的团队随时为您提供除臭技巧。"
  },

  // Subscription Offer
  subscriptionOffer: {
    subscribeAndSave: "订阅并节省",
    neverRunOut: "永不缺货，节省更多",
    subtitle: "设置自动配送，享受独家折扣和便利。随时取消。",
    monthly: "每月",
    everyTwoMonths: "每两个月",
    quarterly: "每季度",
    save: "节省",
    mostFlexible: "最灵活",
    bestValue: "最佳价值",
    maxSavings: "最大节省",
    oneTimePurchase: "一次性购买",
    subscriptionBenefits: "订阅优势",
    // freeShipping: "所有订单免费配送", // TODO: Restore when free shipping is available
    exclusiveDiscounts: "独家订阅者折扣",
    prioritySupport: "优先客户支持",
    flexibleSchedule: "灵活的配送计划",
    cancelAnytime: "随时取消",
    startSubscription: "开始订阅",
    selectPlan: "选择计划",
    popularChoice: "热门选择"
  },

  // Urgency Banner
  urgencyBanner: {
    limitedTime: "限时优惠",
    saveToday: "今日节省",
    onAllOrders: "所有订单",
    // freeShipping: "+ 免费配送", // TODO: Restore when free shipping is available
    hurryOffer: "抓紧时间！优惠即将结束",
    claimDiscount: "领取折扣",
    timeLeft: "剩余时间",
    days: "天",
    hours: "小时",
    minutes: "分钟",
    seconds: "秒",
    onlyLeft: "仅剩",
    inStock: "库存",
    orderNow: "立即订购"
  },

  // Email Capture Popup
  emailCapture: {
    waitDontGo: "等等！别走！",
    exclusiveOffer: "获得独家优惠",
    subtitle: "在您离开之前，获取15%的首次订单折扣",
    emailPlaceholder: "输入您的邮箱地址",
    claimDiscount: "领取15%折扣",
    noThanks: "不，谢谢",
    instantAccess: "立即获取您的折扣码",
    limitedTime: "限时优惠 - 不要错过！",
    successMessage: "成功！请查看您的邮箱获取折扣码。",
    errorMessage: "出现错误，请重试。"
  },

  // Reviews Section
  reviewsSection: {
    customerReviews: "客户评价",
    realStories: "真实故事来自快乐的猫主人",
    verifiedReviews: "已验证评价",
    averageRating: "平均评分",
    readMore: "阅读更多",
    writeReview: "写评价",
    helpful: "有帮助",
    verified: "已验证",
    productUsed: "使用产品",
    catsOwned: "猫咪数量",
    useCase: "使用场景"
  },

  // Case Studies
  caseStudies: {
    customerSuccess: "客户成功案例",
    realResults: "真实客户的真实结果",
    detailedStories: "发现Purrify如何通过详细案例研究改变加拿大各地的家庭",
    averageOdorReduction: "平均异味减少",
    timeToSeeResults: "见效时间",
    customerSatisfaction: "客户满意度",
    catsPerStudy: "每项研究的猫咪数",
    theChallenge: "挑战",
    theSolution: "解决方案",
    theResults: "结果",
    longTermOutcome: "长期结果",
    keyPainPoints: "关键痛点",
    implementation: "实施方案",
    writeYourStory: "准备写下您自己的成功故事？",
    joinSatisfied: "加入 1,000+ 名用 Purrify 改变家庭的满意客户。",
    shopPurrify: "购买Purrify",
    tryFreeSample: "试用免费样品",
    moreCustomerStories: "更多客户故事",
    videoTestimonials: "视频见证",
    productComparison: "产品比较"
  },

  // Additional Subscription Offer Translations
  subscriptionOfferExtended: {
    autoshipBadge: "季度自动配送",
    headline: "自动守护你的猫砂清新",
    supportingCopy: "选择每3个月自动补货的组合，省心、省钱、家里始终清新。",
    perMonthLabel: "≈ {price}/月",
    saveVsOneTime: "比单次购买节省 {percent}%",
    skipOrCancelAnytime: "随时跳过或取消",
    shippingIncluded: "含运费",
    freeShippingIncluded: "免运费",
    priorityCustomerSupport: "优先客户支持",
    startAutoship: "开启自动订购",
    linkComingSoon: "支付链接即将上线",
    quarterlyBilling: "每 3 个月结算一次",
    autoshipHero: "自动订购省更多",
    autoshipHighlight: "订阅立享优惠",
    standardPlanTitle: "季度自动配送 – 3 × 50g",
    standardDescription: "单猫家庭的理想选择，每个月都保持清新。",
    includesThreeStandard: "包含 3 袋 50g，一次送达",
    familyPlanTitle: "超值自动配送 – 3 × 常规装 120g",
    familyDescription: "专为多猫或敏感家庭设计，单次使用成本最低。",
    includesThreeFamily: "包含 3 袋 120g 常规装（一次送达）",
    bestValueBadge: "最佳价值",
    save: "节省",
    joinThePurrifyFamily: "加入Purrify大家庭"
  },


  // Testimonials Section
  testimonialsSection: {
    customerLove: "客户喜爱",
    littersOfLove: "来自宠物主人社区的满满爱意",
    dontJustTakeOurWord: "不要只听我们的一面之词。这里是我们的客户对Purrify的评价。",
    readMoreReviews: "阅读更多评价"
  },

  // Common UI Elements
  ui: {
    // Review System
    allRatings: "所有评分",
    allSizes: "所有规格",
    newestFirst: "最新优先",
    oldestFirst: "最旧优先",
    highestRated: "评分最高",
    lowestRated: "评分最低",
    mostHelpful: "最有帮助",
    verifiedPurchase: "已验证购买",

    // Payment & Cart
    securePayment: "安全支付",
    shoppingCart: "购物车",

    // General
    happyCustomers: "满意客户",
    moneyBack: "专家支持",
    averageRating: "平均评分",
    satisfactionRate: "满意度",
    // freeShipping: "免费配送", // TODO: Restore when free shipping is available
    skipAnytime: "随时跳过",
    highlyRated: "高度评价",
    errorDetails: "错误详情"
  },

  // Free Trial Page
  freeTrialPage: {
    urgentBanner: "限时优惠",
    free: "免费",
    claimTrial: "获取您的免费Purrify试用装",
    whatYouGet: "您将获得：",
    freeTrialBag: "价值$4.76的12g Purrify试用装（仅需支付$4.76加拿大境内运费）",
    // freeShippingDoor: "免费送货到您家门口", // TODO: Restore when free shipping is available
    expertTips: "专家猫咪护理技巧和指南",
    zeroCommitment: "零承诺 - 这是我们送给您的礼物",
    attention: "注意：对于厌倦了憋气的猫主人",
    limitedQuantity: "仅限前500名猫主人",
    alreadyClaimed: "已领取",
    countdownLabels: {
      hours: "小时",
      minutes: "分钟",
      seconds: "秒"
    },
    testimonials: [
      {
        text: "我简直不敢相信。几个小时内，我的整个房子又恢复了清新。我甚至几个月来第一次邀请了婆婆过来！",
        author: "张女士，多伦多"
      },
      {
        text: "我丈夫以为我把猫砂全部扔掉了。异味就这样...消失了。",
        author: "李女士，温哥华"
      }
    ],
    testimonialsTestUsers: "我们的测试用户怎么说：",
    claimNow: "立即领取您的免费试用装",
    warningHighDemand: "⚠️ 注意：由于需求量大，我们无法保证倒计时结束后仍有库存。",
    privacyNotice: "100%免费。无需信用卡。",
    zeroCommitmentGift: "零承诺 - 这是我们送给您的礼物",
    instantOdorElimination: "体验神奇的异味消除效果",
    completeInstructions: "完整的使用说明以获得最佳效果",
    noShippingFees: "无运费，无隐藏费用，无陷阱",
    disappearsIn: "注意：此优惠将在以下时间后消失：",
    limitedTo500: "仅限前500名猫主人。",
    yourFreeTrialWaits: "您的免费试用装正在等待 - 但只有现在行动才能获得。",
    betaTestersHeader: "我们的测试用户怎么说：",
    claimFreeTrialNow: "立即领取您的免费试用装",
    attention100Free: "100%免费。无需信用卡。",
    noCreditCard: "无需信用卡。",
    limitedTimeOffer: "限时优惠。每户限领一份。",
    restrictionsApply: "可能适用运费限制。我们保留随时终止此促销活动的权利。",
    highDemandWarning: "由于需求量大，我们无法保证倒计时结束后仍有库存",
    disclaimer: "100%免费。无需信用卡。限时优惠。每户限领一份。可能适用运费限制。我们保留随时终止此促销活动的权利"
  },

  // Contact Page
  contactPage: {
    title: "我们随时为您提供帮助",
    subtitle: "我们友好的客户支持团队随时准备为您提供专业建议和解决方案。",
    chooseContactMethod: "选择联系我们的方式",
    contactReasons: [
      { value: "general", label: "一般问题" },
      { value: "product", label: "产品信息" },
      { value: "order", label: "订单支持" },
      { value: "shipping", label: "运输问题" },
      { value: "return", label: "退货/退款" },
      { value: "wholesale", label: "批发咨询" },
      { value: "feedback", label: "意见反馈" }
    ],
    contactMethods: [
      {
        title: "邮件支持",
        description: "通过邮件获得详细帮助",
        responseTime: "通常在24小时内"
      },
      {
        title: "电话支持",
        description: "直接与我们的团队交谈",
        responseTime: "周一至周五，上午9点-下午5点"
      },
      {
        title: "在线客服",
        description: "快速问题的即时帮助",
        responseTime: "平均响应时间：2分钟"
      }
    ],
    form: {
      fullName: "全名",
      emailAddress: "邮箱地址",
      subject: "主题",
      message: "留言",
      contactReason: "联系原因",
      orderNumber: "订单号（如适用）",
      submit: "发送消息",
      submitting: "发送中...",
      successMessage: "感谢您联系我们！我们将在24小时内回复您。",
      errorMessage: "抱歉，发送消息时出现错误。请重试或直接联系我们。",
      sendingMessage: "发送中...",
      sendMessage: "发送消息",
      subjectPlaceholder: "简要描述您的请求",
      messagePlaceholder: "请提供关于您的问题或疑虑的详细信息...",
      orderNumberPlaceholder: "例如：PUR-12345",
      contactNow: "立即联系"
    },
    faqs: [
      {
        question: "使用Purrify多快能看到效果？",
        answer: "大多数客户在使用后的几小时内就能注意到异味显著减少。活性炭一接触就开始捕获异味分子。"
      },
      {
        question: "如果效果不明显我该怎么办？",
        answer: "请随时联系我们！我们的客服团队会查看您的使用方式，提供定制建议，并帮助您获得理想的除臭效果。"
      },
      {
        question: "多猫家庭有批发价吗？",
        answer: "是的！我们的500g经济装为多猫家庭提供最佳价值。我们还为宠物店和兽医提供批发价。"
      },
      {
        question: "如果我的猫不小心吃到一些怎么办？",
        answer: "家用过滤中常见的活性炭属于惰性材料。Purrify设计为与猫砂混合使用；如少量摄入一般按常规观察即可，如摄入较多或有担忧请咨询兽医。"
      }
    ],
    businessHours: {
      title: "营业时间",
      weekdays: "上午9:00 - 下午5:00 EST",
      saturday: "上午10:00 - 下午2:00 EST",
      sunday: "休息",
      closed: "休息"
    },
    location: {
      title: "我们的位置",
      address: "蒙特利尔，魁北克省，加拿大",
      shippingNote: "我们向全加拿大发货，并在蒙特利尔地区提供本地取货。"
    },
    frequentlyAskedQuestions: "常见问题",
    quickAnswersCommon: "常见问题的快速答案",
    dontSeeQuestion: "没有看到您的问题？",
    viewCompleteFAQ: "查看完整FAQ",
    backToHome: "返回首页"
  },

  // Product Comparison
  productComparison: {
    title: "比较Purrify产品",
    subtitle: "为您的家庭找到完美尺寸 - 从试用装到批量节省",
    findPerfectSize: "为您的家庭找到完美尺寸",
    products: [
      {
        id: "trial",
        name: "免费试用",
        subtitle: "12g 套装",
        duration: "1周",
        cats: "1只猫",
        features: ["12g活性炭", "仅付运费", "完美体验"],
        bestFor: "想要免费试用Purrify的新客户",
        cta: "获取免费试用"
      },
      {
        id: "regular",
        name: "常规装",
        subtitle: "120g 套装 - 最受欢迎",
        duration: "3个月",
        cats: "1-2只猫",
        features: ["120g活性炭", "订阅省更多", "免费配送"],
        bestFor: "单猫或双猫家庭的持续清新选择",
        cta: "订阅省钱"
      },
      {
        id: "large",
        name: "大装",
        subtitle: "240g 套装 - 最佳价值",
        duration: "3个月",
        cats: "3+只猫",
        features: ["240g活性炭", "最大节省", "免费配送"],
        bestFor: "多猫家庭和重度使用者",
        cta: "订阅省钱"
      }
    ],
    comparisonFeatures: [
      { feature: "异味消除" },
      { feature: "适用于任何猫砂" },
      { feature: "延长猫砂寿命" },
      { feature: "专家指导" },
      // { feature: "免费运送" }, // TODO: Restore when free shipping is available
      { feature: "批量节省" },
      { feature: "适合多猫" }
    ],
    usageCalculator: {
      title: "每种尺寸能持续多长时间？",
      subtitle: "根据您家庭规模估算持续时间",
      numberOfCats: "猫咪数量",
      typicalChanges: "典型更换",
      estimateDuration: "根据您家庭规模估算持续时间"
    },
    stillUnsure: "仍然不确定选择哪种尺寸？",
    getPersonalizedAdvice: "获取个性化建议",
    tryRiskFree: "无风险试用 - $4.76",
    learnMoreAboutPurrify: "了解更多关于Purrify",
    featuresComparison: "功能比较",
    seeHowProductsCompare: "看看我们的产品如何并排比较",
    howLongWillEachSizeLast: "每种尺寸能持续多长时间？",
    popular: "热门",
    bestValue: "最佳价值",
    perfectForFirstTime: "新用户的完美选择",
    idealForSingleCat: "单猫家庭的理想选择",
    perfectForMultiCat: "多猫家庭的完美选择",
    economicChoice: "经济选择",
    maxValuePerGram: "每克最大价值",
    bulkSavingsIncluded: "包含批量节省",
    sustainableSupply: "可持续供应",
    // freeShippingIncluded: "包含免费运送", // TODO: Restore when free shipping is available
    features: "特点",
    idealFor: "适合",
    duration: "持续时间",
    saveMoney: "节省",
    getBestValue: "获取最佳价值",
    chooseThisSize: "选择此尺寸",
    tryWithoutRisk: "无风险试用",
    chooseSmallSize: "选择小装",
    tableHeaders: {
      feature: "特征",
      trial: "12g 试用装",
      regular: "120g 常规装",
      large: "240g 大装"
    },
    units: {
      cat: "只猫",
      cats: "只猫",
      week: "周",
      weeks: "周",
      day: "天",
      days: "天",
      weekly: "每周",
      perWeek: "每周"
    },
    seo: {
      title: "找到完美尺寸",
      description: "比较所有Purrify尺寸，找到满足您家庭需求的完美活性炭猫砂添加剂。"
    },
    stillUnsureDescription: "从我们的无风险试用装开始，亲自体验Purrify的不同。",
    relatedPages: [
      {
        title: "工作原理",
        description: "了解我们活性炭技术背后的科学原理及其高效原因。",
        link: "/learn/how-it-works"
      },
      {
        title: "客户评价",
        description: "看看1,000+满意客户如何评价他们的Purrify体验。",
        link: "/reviews"
      },
      {
        title: "猫砂指南",
        description: "了解不同类型的猫砂以及如何为您的爱猫选择最佳选择。",
        link: "/learn/cat-litter-guide"
      }
    ]
  },

  // 零售与B2B
  retailers: {
    seo: {
      pageTitle: "批发与零售合作伙伴",
      description: "加入我们的零售网络。提供批发价格、营销支持以及经过验证的热销产品。",
      openGraphAlt: "批发合作伙伴",
      keywords: "批发猫砂添加剂, 宠物店产品, 零售合作, 大宗订单, 批发价格, 营销支持"
    },
    map: {
      title: "我们的零售合作伙伴与客户 | Purrify网络",
      description: "探索我们在加拿大不断增长的零售商和满意客户网络。加入我们成功的合作伙伴大家庭。"
    },
    hero: {
      badge: "商务合作",
      title: "与Purrify合作",
      subtitle: "批发成功",
      description: "加入遍布加拿大的数百家宠物店，共同销售全国最受欢迎的活性炭猫砂添加剂。销量验证、客户忠诚、营销支持一应俱全。",
      cta: {
        primary: "查看批发价格",
        secondary: "成为合作伙伴"
      }
    },
    benefits: {
      pricing: {
        title: "批发价格",
        description: "最高可享50%利润率及阶梯折扣"
      },
      marketing: {
        title: "营销支持",
        description: "提供终端陈列、团队培训、联合广告资源"
      },
      proven: {
        title: "验证过的产品",
        description: "4.8/5 评分，重复购买率高"
      },
      highDemand: {
        title: "需求旺盛",
        description: "猫主人主动寻找异味解决方案，Purrify直击痛点。"
      },
      highMargins: {
        title: "高利润",
        description: "体积小、价值高，比传统猫砂利润更佳。"
      },
      easyStocking: {
        title: "易于陈列",
        description: "包装紧凑，无需冷藏，保质期长。"
      },
      marketingSupport: {
        title: "完善营销资料",
        description: "提供货架展示、产品培训、顾客教育内容与联合广告。"
      },
      customerLoyalty: {
        title: "提升客户忠诚度",
        description: "当异味问题被解决后，顾客会按月回购并推荐您的门店。"
      },
      fastMoving: {
        title: "动销快速",
        description: "消耗型产品，补货需求可预测。"
      },
      title: "零售商选择Purrify的理由",
      description: "加入已经引入Purrify并取得突出业绩的成功宠物店网络。",
      success: {
        title: "真实成功案例"
      }
    },
    pricing: {
      title: "批发价格层级",
      description: "灵活的定价方案，帮助您在为客户提供价值的同时最大化利润。",
      tiers: {
        starter: {
          name: "入门",
          description: "适合小型宠物店"
        },
        growth: {
          name: "成长",
          description: "最受成熟门店欢迎"
        },
        enterprise: {
          name: "企业",
          description: "适用于连锁及大型零售商"
        }
      },
      additional: {
        title: "提供批量折扣",
        description: "需要更大量？我们可为连锁、分销商及高销量零售商提供定制报价。"
      }
    },
    marketing: {
      title: "全方位营销支持",
      description: "我们提供销售Purrify所需的一切：店内陈列、员工培训、脚本与现成素材。",
      coop: {
        title: "联合广告计划",
        description: "可获得广告补贴，在当地市场（平面、广播、数字）推广Purrify。"
      }
    },
    testimonials: {
      title: "合作伙伴怎么说",
      description: "来自加拿大各地宠物店主和店长的真实反馈。",
      metrics: {
        title: "经过验证的业务成果"
      }
    },
    contact: {
      title: "成为Purrify合作伙伴",
      description: "准备把加拿大最受欢迎的猫砂添加剂放到货架上了吗？填写表单，我们将在24小时内联系您。"
    }
  },

  // Privacy Policy
  privacyPolicy: {
    title: "隐私政策",
    lastUpdated: "最后更新：2024年6月",
    sections: [
      {
        title: "信息收集",
        content: "我们收集您在使用我们网站和服务时提供的信息，包括：",
        items: [
          "姓名和联系信息",
          "邮寄地址（用于产品配送）",
          "电子邮件地址",
          "宠物信息（如猫咪姓名）",
          "网站使用数据和偏好"
        ]
      },
      {
        title: "信息使用",
        content: "我们使用收集的信息用于：",
        items: [
          "处理和配送您的订单",
          "提供客户支持",
          "发送产品更新和护理技巧",
          "改善我们的产品和服务",
          "遵守法律要求"
        ]
      },
      {
        title: "信息保护",
        content: "我们采用行业标准的安全措施来保护您的个人信息，包括加密传输和安全存储。",
        items: []
      },
      {
        title: "信息共享",
        content: "我们不会向第三方出售、交易或转让您的个人信息，除非：",
        items: [
          "获得您的明确同意",
          "为了完成您的订单（如配送服务）",
          "法律要求或保护我们的权利"
        ]
      },
      {
        title: "Cookie和跟踪技术",
        content: "我们使用Cookie和类似技术来改善您的浏览体验、分析网站使用情况并提供个性化内容。",
        items: []
      },
      {
        title: "您的权利",
        content: "您有权：",
        items: [
          "访问您的个人信息",
          "更正不准确的信息",
          "请求删除您的信息",
          "取消订阅营销通讯"
        ]
      },
      {
        title: "联系我们",
        content: "如果您对本隐私政策有任何问题，请通过以下方式联系我们：",
        items: []
      }
    ],
    contactInfo: {
      email: "hello@purrify.ca",
      phone: CONTACT_INFO.phone,
      address: "加拿大蒙特利尔"
    }
  },

  // FAQ Items
  faqItems: [
    {
      id: 1,
      category: "product",
      question: "什么是Purrify，它是如何工作的？",
      answer: "Purrify是一种活性炭猫砂添加剂，在分子级别消除异味。活性炭具有数百万个微观孔隙，可以捕获和中和引起异味的化合物。",
      popular: true,
      tags: ["活性炭", "异味控制"]
    },
    {
      id: 2,
      category: "product",
      question: "Purrify可以在猫和人周围使用吗？",
      answer: "Purrify使用与家用净水器和空气过滤器常见的同类型活性炭，不添加香精或染料。",
      popular: true,
      tags: ["使用", "滤材级", "无香"]
    }
  ],

  // FAQ Categories
  faqCategories: [
    { id: "all", name: "所有问题", count: 16 },
    { id: "product", name: "产品信息", count: 6 },
    { id: "usage", name: "使用和应用", count: 4 },
    { id: "shipping", name: "运输和配送", count: 3 },
    { id: "payment", name: "付款和账单", count: 2 },
    { id: "support", name: "客户支持", count: 1 }
  ],

  // FAQ Page
  faqPage: {
    title: "常见问题",
    subtitle: "关于Purrify您需要知道的一切",
    searchPlaceholder: "搜索答案...",
    popularQuestions: "最受欢迎的问题",
    quickAnswers: "最常见问题的快速答案",
    categories: "分类",
    questionsFound: "找到的问题",
    questionsFoundPlural: "找到的问题",
    clearSearch: "清除搜索",
    noQuestionsFound: "未找到问题",
    adjustSearchTerms: "尝试调整您的搜索词或类别过滤器",
    stillHaveQuestions: "还有问题？",
    cantFindWhatLooking: "找不到您要找的内容？我们的客户支持团队随时为您提供帮助！",
    customerSupportReady: "我们的客户支持团队随时为您提供帮助！",
    emailSupport: "邮件支持",
    detailedEmailHelp: "通过邮件获得详细答案",
    liveChat: "在线客服",
    realTimeChatHelp: "与我们实时聊天",
    phoneSupport: "电话支持",
    speakDirectlyTeam: "直接与我们的团队交谈",
    contactUs: "联系我们",
    startChat: "开始聊天",
    callNow: "立即致电",
    readyToTryPurrify: "准备试试Purrify？",
    startWithRiskFreeTrial: "从我们的无风险试用装开始，亲自体验差异。",
    compareAllSizes: "比较所有尺寸",
    tryRiskFree: "无风险试用 - $4.76",
    learnMoreAboutPurrify: "进一步了解Purrify",
    howItWorks: "工作原理",
    learnScience: "了解我们的活性炭技术为何如此高效。",
    catLitterGuide: "猫砂指南",
    completeGuide: "全面介绍猫砂类型、护理技巧与最佳实践。",
    customerStories: "用户故事",
    realExperiences: "阅读真实猫主人分享的Purrify体验。",
    popularTag: "热门",
    breadcrumbs: {
      home: "首页",
      learn: "了解更多",
      faq: "常见问题"
    }
  },


  // Homepage specific translations
  homepage: {
    seo: {
      pageTitle: "天然猫砂添加剂瞬间消除猫异味",
      keywords: "猫砂添加剂,异味控制,活性炭,天然除臭剂,猫砂清新,加拿大猫产品",
      openGraphImageAlt: "Purrify - 消除猫异味的天然猫砂添加剂",
      videoAlt: "Purrify消除猫砂异味演示",
      videoDescription: "展示Purrify消除猫砂异味效果的视频",
      videoEffectivenessDemo: "Purrify对猫砂异味的有效性演示"
    },
    trustBadges: {
      securePayment: {
        title: "安全付款",
        description: "256位SSL",
        detail: "通过Stripe进行SSL加密结账"
      }
    },
    socialProof: {
      nationalDelivery: "100%天然 • 加拿大制造",
      fastDelivery: "全加拿大快速配送",
      recentOrders: "本周订单"
    },
    hero: {
      videoAriaLabel: "演示视频显示Purrify活性炭猫砂添加剂在应用前后消除猫砂异味",
      videoFallbackText: "您的浏览器不支持视频标签。此视频演示了Purrify活性炭猫砂添加剂在应用到猫砂前后消除异味的效果。",
      videoDescriptions: "中文描述",
      highlyRated: "高评分",
      moneyBackGuarantee: "专家支持团队",
      freeShippingCanada: "加拿大免费配送"
    },
    enhancedComparison: {
      duration: "持续时间",
      coverage: "覆盖范围",
      chooseYourPerfectSize: "选择您的完美尺寸",
      allSizesDeliver: "所有尺寸都提供相同的强大除臭效果。根据您的家庭规模和使用频率进行选择。",
      whyChoosePurrify: "为什么选择Purrify？",
      joinThousands: "加入 1,000+ 名信任 Purrify 的满意猫主人",
      happyCustomers: "满意客户",
      averageRating: "平均评分",
      satisfactionRate: "满意率",
      odorFreeGuarantee: "每次使用都带来清新空气",
      tryRiskFree: "无风险试用",
      chooseThisSize: "选择此尺寸"
    },
    altText: {
      scientificDiagram: "科学图表显示活性炭分子结构，具有捕获异味分子的微孔",
      productPackages: "三个Purrify产品包装展示不同尺寸：12g试用装、50g标准装和120g家庭装",
      microscopicView: "活性炭的微观视图，显示捕获异味分子的多孔结构",
      happyCat: "快乐的猫咪在清新无异味的家庭环境中安静休息",
      happyCatAlt: "快乐的猫咪",
      userAvatar: "用户",
      customerTestimonials: "查看客户评价",
      leaveGoogleReview: "留下Google评价",
      litterCompatibility: "一只猫享受它最喜欢的猫砂，展示 Purrify 与所有类型猫砂的兼容性"
    },
    subscription: {
      fastDelivery: "快速配送",
      quickReliableShipping: "快速可靠的配送",
      skipAnytime: "随时跳过",
      fullControlDeliveries: "对配送全面控制",
      lovedByCustomers: "深受 1,000+ 客户的喜爱",
      joinSatisfiedCustomers: "加入超过 1,000 满意客户的行列：",
      thirtyDayGuarantee: "持续支持",
      moneyBackPromise: "客户关怀承诺",
      fiveStarRated: "五星评级",
      reviewsRating: "138 条评价中 4.9/5 星",
      testimonialQuote: "\"今年通过订阅我节省了超过200美元，我的猫咪猫砂盒从不异味！\" - Sarah M."
    }
  },

  // Blog
  blog: {
    multiCat: {
      title: "最佳多猫猫砂除臭剂：2024年终极气味控制指南",
      description: "发现多猫家庭最有效的猫砂除臭剂。使用经过验证的活性炭技术的专家解决方案，消除多只猫产生的强烈异味。",
      category: "多猫家庭指南",
      publishDate: "发布于 2024年9月16日",
      readTime: "12分钟阅读",
      breadcrumb: "多猫解决方案",
      stats: {
        title: "多猫家庭统计",
        strongerOdors: "比单猫更强烈的异味",
        litterBoxes: "每只猫最少猫砂盒数量",
        moreDeodorizer: "需要更多除臭剂",
        maintenance: "所需维护"
      }
    },
    odorAbsorber: {
      title: "猫砂最强异味吸附剂：2025 科学指南",
      description: "探索猫砂盒最强的异味吸附策略，对比活性炭、沸石与混合系统，让你的家可以在无刺激香味的情况下保持清新。",
      category: "气味科学与技术",
      publishDate: "发布于 2025年10月19日",
      readTime: "14分钟阅读",
      breadcrumb: "气味科学",
      stats: {
        title: "除味性能指标",
        ammoniaReduction: "实验数据显示活性炭层可降低高达92%的氨浓度",
        adsorptionSpeed: "多孔结构可在60秒内锁住异味分子",
        safeUsage: "无香精、无化学添加 - 为敏感猫设计",
        refreshTiming: "每次清铲或补砂时补充炭层以保持效果"
      }
    }
  },

  // Scrolling Announcement Bar
  scrollingBar: {
    freeShipping: "订阅订单免运费",
    madeInCanada: "加拿大制造，采用国内外优质原料"
  },

  // Upsell Page
  upsell: {
    pageTitle: "特别一次性优惠 - Purrify",
    metaDescription: "新客户专属一次性优惠。季度自动订购可节省25%。",
    offerExpired: "优惠已过期",
    offerExpiresIn: "优惠将在以下时间后过期",
    headline: "等等！独家一次性优惠",
    subheadline: "添加自动订购，立省25%",
    saveBadge: "节省29%",
    productTitle: "Purrify 50g 自动订购",
    productSubtitle: "3个月供应（3 × 50g 袋装）",
    youSave: "您节省",
    benefit1: "永不缺货 - 每3个月自动配送",
    benefit2: "包含免费送货（节省$7.99）",
    benefit3: "永久锁定此特惠价格",
    benefit4: "随时取消或跳过（无需承诺）",
    benefit5: "每次发货前自动提醒",
    processing: "处理中...",
    addToOrder: "是的！添加到我的订单",
    noThanks: "不用了，我宁愿以后支付全价",
    feature1Title: "即时激活",
    feature1Description: "您的自动订购在此订单后立即开始",
    feature2Title: "100%满意",
    feature2Description: "每次发货均享30天退款保证",
    feature3Title: "灵活控制",
    feature3Description: "随时在线跳过、暂停或取消",
    testimonialText: "我差点跳过自动订购优惠，但我很高兴我没有这样做！少了一件要记住的事情，节省的费用也会累积。而且，我永远不会在最需要的时候用完。",
    testimonialAuthor: "— Sarah M., 多伦多",
    faqTitle: "常见问题",
    faq1Question: "我可以随时取消吗？",
    faq1Answer: "当然可以！随时从您的账户仪表板取消、跳过或修改订阅。无需费用，无需麻烦。",
    faq2Question: "我什么时候会被收费？",
    faq2Answer: "您今天将为此特别优惠付费。您的下一次发货将在3个月后，您将在7天前收到提醒电子邮件。",
    faq3Question: "价格是锁定的吗？",
    faq3Answer: "是的！只要您继续订阅，此特惠价格就会锁定。您永远不会支付超过此价格。",
    bottomNote: "此一次性优惠仅在您首次购买后立即可用",
    returnHome: "返回首页"
  },

  // Affiliate Page
  affiliate: {
    metaTitle: "通过Purrify联盟计划赚取月收入",
    metaDescription: "向猫主人推荐Purrify，终身赚取30%的循环佣金。加入数百名成功的联盟会员，通过帮助猫咪无异味生活赚取被动收入。",
    hero: {
      badge: "加入我们的联盟计划",
      title: "通过Purrify赚取月收入",
      subtitle: "向猫主人推荐Purrify，终身赚取30%的月度循环收入。",
      primaryCTA: "成为联盟会员",
      secondaryCTA: "查看收益计算器"
    },
    calculator: {
      title: "计算您的潜在收益",
      subtitle: "调整滑块，查看您使用Purrify 30%佣金可以赚取多少",
      standardProduct: "50g 标准装（$24.99）- 推荐数/月",
      familyPack: "120g 家庭装（$44.99）- 推荐数/月",
      perSale: "每笔销售",
      monthlyIncome: "预计月收入",
      yearlyIncome: "预计年收入",
      disclaimer: "这些是基于30%佣金的潜在收益。实际结果可能有所不同。",
      cta: "立即开始赚钱"
    },
    howItWorks: {
      title: "如何运作",
      step1: {
        title: "加入计划",
        description: "创建您的联盟账户并获得您的独特推荐链接。加入是免费的，只需不到2分钟。"
      },
      step2: {
        title: "分享您的链接",
        description: "通过社交媒体、博客文章、视频或电子邮件与您的受众分享您的推荐链接。我们提供营销材料帮助您成功。"
      },
      step3: {
        title: "终身获得报酬",
        description: "您的推荐客户每次购买都能赚取30%的循环佣金 - 不仅仅是第一次购买，而是永远。每月通过您首选的方式发送付款。"
      }
    },
    benefits: {
      title: "为什么加入Purrify联盟计划？",
      subtitle: "我们设计了这个计划，通过行业领先的佣金和支持帮助您成功",
      benefit1: {
        title: "30%终身佣金",
        description: "与大多数仅在首次销售时支付的计划不同，您的推荐客户每次购买都能赚取30% - 永远。建立真正的被动收入。"
      },
      benefit2: {
        title: "高转化率产品",
        description: "Purrify解决猫主人每天面临的真实问题。凭借4.8/5星和98%满意度，我们的产品不言自明。"
      },
      benefit3: {
        title: "实时跟踪",
        description: "通过我们先进的联盟仪表板实时监控您的收益、点击和转化。对您的表现完全透明。"
      },
      benefit4: {
        title: "营销资源",
        description: "获取专业横幅、电子邮件模板、产品图片和经过验证的文案。我们提供您成功所需的一切。"
      }
    },
    testimonials: {
      title: "我们联盟会员的成功故事",
      testimonial1: {
        quote: "在过去的6个月里，我仅通过向我的猫博客受众推荐Purrify就赚了超过3,400美元。循环佣金增长得很快！",
        name: "Jessica M.",
        role: "猫博客主"
      },
      testimonial2: {
        quote: "我加入过的最好的联盟计划。优质产品，高转化率，30%的终身佣金无与伦比。强烈推荐！",
        name: "Mike T.",
        role: "宠物产品评论员"
      },
      testimonial3: {
        quote: "支持团队太棒了。他们帮助我优化内容，现在我获得了稳定的月收入。这真的是被动收入。",
        name: "Amanda R.",
        role: "YouTube创作者"
      }
    },
    faq: {
      title: "常见问题",
      question1: "我能赚多少钱？",
      answer1: "您每次销售赚取30%的佣金。如果您推荐10位客户每月购买24.99美元的标准装，那就是每月74.97美元的循环收入。您可以赚取的金额没有限制。",
      question2: "我什么时候获得报酬？",
      answer2: "佣金通过PayPal、直接存款或支票每月支付。我们在每月15日支付上个月的收益。最低支付金额为50美元。",
      question3: "Cookie有效期多长？",
      answer3: "我们的联盟Cookie有效期为90天。如果有人点击您的链接并在90天内购买，您将获得该销售以及该客户所有未来购买的信用。",
      question4: "我需要网站吗？",
      answer4: "不需要！虽然拥有网站有帮助，但您可以在社交媒体、YouTube、电子邮件通讯或任何与猫主人联系的地方分享您的联盟链接。",
      question5: "你们提供什么营销材料？",
      answer5: "我们提供专业横幅、产品图片、电子邮件模板、社交媒体帖子和经过验证的文案。您需要的一切都可以立即开始推广。"
    },
    finalCTA: {
      title: "准备开始赚钱了吗？",
      subtitle: "加入数百名成功的联盟会员，通过Purrify赚取被动收入",
      cta: "加入联盟计划",
      disclaimer: "免费加入 • 无月费 • 立即开始赚钱"
    }
  },

  // 氨气控制着陆页
  ammonia: {
    meta: {
      title: "猫砂氨气控制 | 天然除臭 | Purrify",
      description: "使用Purrify活性炭配方消除猫砂盆氨气味。从源头控制异味7天以上。对猫咪安全。立即购买。"
    },
    breadcrumb: "氨气控制",
    hero: {
      headline: "氨气控制：从源头消除猫砂盆异味",
      subheadline: "Purrify椰壳活性炭在氨气分子扩散到空气中之前将其捕获，让您的家保持清新7天以上。",
      cta: "立即购买",
      secondaryCta: "了解工作原理"
    },
    trust: {
      happyCats: "只快乐的猫咪"
    },
    understanding: {
      headline: "了解氨气：猫砂盆异味的真正原因",
      intro: "那种独特的猫砂盆异味并非来自您的猫咪——而是猫砂中发生的化学反应。了解这个过程是消除它的第一步。",
      chemistry: {
        title: "异味背后的化学原理",
        description: "当您的猫咪排尿时，尿液中含有一种叫做尿素的化合物。仅需2-4小时，猫砂盆中自然存在的细菌就开始将尿素分解成氨气（NH₃）。这就是那股刺鼻的气味，可以弥漫整个家。",
        formula: "尿素 + 细菌 + 时间 = 氨气"
      },
      factors: {
        title: "为什么会越来越严重",
        point1: "温度：细菌在温暖环境中繁殖更快，产生更多氨气",
        point2: "湿度：潮湿加速分解过程，帮助氨气挥发到空气中",
        point3: "累积：每天增加更多尿液，产生更多氨气",
        point4: "封闭空间：放在衣柜或封闭家具中的猫砂盆会困住并浓缩氨气"
      },
      health: {
        title: "氨气暴露的健康问题",
        description: "长期接触氨气不仅令人不适——还可能导致真正的健康问题。在维护不当的猫砂盆附近常见的浓度下，氨气可能刺激人和猫的眼睛和呼吸系统。猫咪凭借敏感的鼻子，实际上可能开始回避氨气味太重的猫砂盆，导致在家中其他地方发生意外。"
      }
    },
    problem: {
      headline: "为什么香味猫砂没有用",
      card1: {
        title: "掩盖而非解决",
        description: "香味只能暂时掩盖氨气味，但不能消除来源。异味总是会回来。"
      },
      card2: {
        title: "健康隐患",
        description: "人工香料可能刺激敏感的猫咪和有过敏或呼吸系统问题的人。"
      },
      card3: {
        title: "持续开支",
        description: "频繁更换猫砂以控制异味的成本会很快累积——每周都在花费您的时间和金钱。"
      },
      card4: {
        title: "猫砂盆回避",
        description: "猫咪经常拒绝使用气味强烈的猫砂盆——无论是氨气还是浓烈的香料。这导致室外事故和行为问题。"
      }
    },
    solution: {
      headline: "真正除臭的科学",
      intro: "活性炭通过与掩盖剂完全不同的机制工作——这就是它真正有效的原因。",
      description: "活性炭具有微孔结构，拥有数百万个微小孔隙，可以物理捕获氨气分子。与掩盖剂不同，活性炭通过吸附作用在分子水平上捕获异味——您再也不会闻到它。",
      adsorption: {
        title: "吸附：关键区别",
        description: "吸附（带'd'）与吸收不同。当氨气分子接触活性炭时，它们不只是渗入——而是在分子水平上与碳表面结合。这种物理过程不受pH值影响，使其对氨气有效，而小苏打则无效。"
      },
      pores: {
        title: "优化的孔隙结构",
        micro: "微孔（<2nm）：永久捕获小氨气分子",
        meso: "中孔（2-50nm）：作为高速公路引导氨气进入微孔",
        macro: "大孔（>50nm）：允许气体快速进入的入口点",
        description: "Purrify的椰壳活性炭经过专门处理，优化孔隙分布以捕获氨气。结果：对导致异味问题的确切分子具有最大捕获效率。"
      },
      surface: {
        title: "巨大的表面积",
        stat: "1,150 m²/g",
        comparison: "这相当于每茶匙含有4个网球场大小的捕获表面。相比之下，小苏打仅有0.2 m²/g——表面积少了近6,000倍。",
        explanation: "这巨大的表面积解释了为什么少量活性炭能在如此长的时间内捕获如此多的氨气。"
      }
    },
    benefits: {
      headline: "为什么猫主人选择Purrify",
      pillar1: {
        title: "天然科学",
        intro: "100%天然椰壳活性炭",
        description: "100%天然椰壳活性炭。无化学物质、香料或可能伤害您猫咪的添加剂。",
        detail: "我们的活性炭来自可持续收获的椰壳。与化学除臭剂不同，它不会向您的家中添加任何东西——它只能去除异味。"
      },
      pillar2: {
        title: "持久有效",
        intro: "一次使用保护7天以上",
        description: "一次使用可保护7天以上，减少猫砂更换次数，为您省钱。",
        detail: "活性炭的高表面积意味着它可以在几天内继续吸附氨气。大多数用户发现他们需要更换猫砂的频率降低了。"
      },
      pillar3: {
        title: "安全温和",
        intro: "对所有年龄的猫咪安全",
        description: "兽医认可的配方，对所有年龄的猫咪都安全，包括幼猫和有敏感问题的老年猫。",
        detail: "活性炭是惰性的——它不会与猫咪的皮肤或消化系统发生反应。它与净水器和医疗应用中使用的是同一种材料。"
      }
    },
    howToUse: {
      headline: "如何使用Purrify实现最大氨气控制",
      intro: "三个简单步骤即可获得无异味的猫砂盆",
      step1: {
        title: "撒入",
        description: "在干净的猫砂上均匀撒上一层薄薄的Purrify。50g袋装可覆盖标准猫砂盆7天以上。"
      },
      step2: {
        title: "混合",
        description: "轻轻搅拌使Purrify与整个猫砂混合。这确保活性炭在整个猫砂盆中分布均匀。"
      },
      step3: {
        title: "享受",
        description: "Purrify开始立即吸附氨气。大多数用户注意到24小时内异味显著减少。"
      },
      proTip: {
        title: "专业提示",
        description: "在每周定期铲便后，添加一小撮新的Purrify到受影响的区域。这可以保持新鲜活性炭在需要的地方，无需完全更换猫砂。"
      },
      tips: {
        title: "获得最佳效果的专业提示",
        tip1: "如果有强烈的现有异味，先彻底更换猫砂，然后在新猫砂中添加Purrify",
        tip2: "多猫家庭可能需要每4-5天重新添加，而不是7天",
        tip3: "适用于所有猫砂类型：结团砂、粘土砂、水晶砂、木砂、玉米砂或纸基猫砂"
      }
    },
    results: {
      headline: "期望效果：真实结果时间线",
      intro: "以下是猫主人在使用Purrify后通常的体验。",
      day1: {
        title: "24小时内",
        description: "氨味明显减少。异味的刺鼻感随着活性炭开始捕获空气中的氨气分子而显著减弱。"
      },
      day3: {
        title: "第2-3天",
        description: "大部分现有异味被消除。即使是强烈、顽固的异味也会随着氨气持续被吸附而被捕获。客人不会注意到任何猫砂异味。"
      },
      week1: {
        title: "一周后",
        description: "持续保持清新。活性炭仍在工作，不断捕获新产生的氨气。是时候再次添加一些Purrify了。"
      },
      ongoing: {
        title: "持续使用",
        description: "定期补充后，您的家将持续保持清新。许多用户表示他们'忘记'家里有猫砂盆，因为根本没有异味提醒他们。"
      }
    },
    comparison: {
      headline: "Purrify与其他解决方案的比较",
      intro: "并非所有除臭方法都是一样的。以下是最常见方法的对比。",
      headers: {
        method: "方法",
        effectiveness: "有效性",
        duration: "持续时间",
        safety: "猫咪安全"
      },
      purrify: {
        method: "Purrify (活性炭)",
        effectiveness: "95%",
        duration: "7天以上",
        safety: "100%安全"
      },
      bakingSoda: {
        method: "小苏打",
        effectiveness: "20%",
        duration: "1-2天",
        safety: "安全"
      },
      scented: {
        method: "香味猫砂",
        effectiveness: "30%",
        duration: "数小时",
        safety: "可能刺激"
      },
      airFreshener: {
        method: "空气清新剂",
        effectiveness: "10%",
        duration: "数小时",
        safety: "可能刺激"
      },
      frequentChanges: {
        method: "频繁更换猫砂",
        effectiveness: "70%",
        duration: "直到下次使用",
        safety: "安全但昂贵"
      },
      note: "有效性评级基于氨气减少量。Purrify通过吸附作用专门针对氨气，而其他方法主要是掩盖或临时吸收。"
    },
    stats: {
      days: { value: "7+", label: "天清新" },
      savings: { value: "更少", label: "更换次数" },
      customers: { value: "10,000+", label: "快乐猫咪" },
      rating: { value: "4.9★", label: "客户评分" }
    },
    faq: {
      headline: "氨气控制常见问题",
      q1: "Purrify如何控制氨气？",
      a1: "Purrify使用椰壳活性炭，具有数百万微孔，通过吸附作用捕获氨气分子。与小苏打或掩盖异味的香料不同，活性炭物理捕获并保持氨气，使其永远不会到达您的鼻子。",
      q2: "活性炭对猫咪安全吗？",
      a2: "是的，活性炭是100%天然和无毒的。它与净水器和空气净化器中使用的材料相同，几十年来一直安全地用于宠物周围。Purrify不含化学物质、香料或添加剂。",
      q3: "我应该使用多少Purrify？",
      a3: "只需在猫砂上撒上薄薄一层并混合即可。一袋50g可处理标准猫砂盆约7天。如果有多只猫，请使用我们的120g装。",
      q4: "它适用于所有类型的猫砂吗？",
      a4: "是的！Purrify适用于结团粘土、非结团、水晶、纸质、木质和玉米基猫砂。它可以增强任何猫砂的除臭效果。",
      q5: "Purrify与小苏打有什么不同？",
      a5: "小苏打只能暂时中和一些异味，需要不断重新使用。活性炭通过吸附作用物理捕获氨气分子，一次使用即可提供7天以上的保护。",
      q6: "它能消除现有的异味吗？",
      a6: "Purrify从您添加的那一刻起就开始吸收氨气。现有异味通常在24-48小时内随着活性炭吸收而消失。",
      q7: "对幼猫安全吗？",
      a7: "绝对安全。Purrify对所有年龄的猫咪都安全。没有可能刺激幼猫或敏感猫咪的化学物质或香料。",
      q8: "一袋能用多久？",
      a8: "50g袋装可供一只猫使用约7天。120g袋装可供多猫家庭（2-3只猫）使用约7天。大多数客户发现他们需要更换猫砂的频率降低了。"
    },
    cta: {
      headline: "准备好拥有清新的家了吗？",
      subheadline: "加入数千名已经彻底消除猫砂盆异味的猫主人。",
      button: "购买Purrify",
      secondaryButton: "免费试用",
      benefit1: "满35元免运费",
      benefit2: "30天满意保证"
    }
  }
};

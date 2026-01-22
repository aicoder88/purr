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
    marketingSupport: "营销支持",
    // Partner Programs
    partnerPrograms: "合作伙伴计划",
    forGroomers: "宠物美容师",
    forShelters: "动物收容所",
    affiliateProgram: "联盟计划",
    b2bInquiry: "企业合作咨询",
    customerReviews: "客户评价",
    shipsToUSA: "配送至美国",
    // Learn dropdown items
    safetyInfo: "安全信息",
    activatedCarbonBenefits: "活性炭的好处",
    catLitterGuide: "猫砂指南",
    howToUse: "使用方法",
    technologyComparison: "技术对比",
    solutions: "解决方案",
    // Solutions dropdown items
    ammoniaSmellControl: "氨味控制",
    apartmentLiving: "公寓生活",
    litterBoxOdor: "猫砂盆异味",
    multipleCats: "多只猫",
    naturalAdditive: "天然添加剂",
    seniorCats: "老年猫",
    // UI elements
    toggleMenu: "切换菜单",
    toggleTheme: "切换主题",
    signOut: "退出登录",
    signedIn: "已登录",
    // B2B pivot keys
    findStore: "查找商店",
    findNearYou: "附近查找",
    whereToBuy: "哪里购买",
    askForPurrify: "在您的商店询问Purrify"
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
    pricing: {
      trial: "免费试用 (仅需 $4.76 运费)",
      standard: "50g: $14.99",
      family: "120g: $24.99"
    },
    buttons: {
      shopNow: "🛒 立即购买 - $24.95",
      reviews: "⭐ 138+ 评论",
      learnMore: "了解工作原理",
      tryFree: "免费试用"
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
    },
    simplified: {
      free: "免费",
      justPayShipping: "仅需支付4.76美元运费",
      noMore: "告别",
      litterBoxSmell: "猫砂异味",
      valueProposition: "活性炭从源头消除异味。适用于任何猫砂。",
      trialSize: "试用装",
      standard: "标准装",
      familyPack: "家庭装",
      plusSH: "+ 运费",
      thirtyDayGuarantee: "30天保证",
      getFreeSample: "获取免费样品",
      soldThisWeek: "本周已售87件",
      limitedStock: "冬季库存有限",
      moneyBackGuarantee: "30天退款保证",
      freeShippingOver: "满35美元免运费"
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
    },
    learnTheScience: "了解科学原理",
    compareSizes: "比较我们的尺寸",
    coconutDescription: "纯净、可持续的椰壳通过过滤纯净的高压蒸汽活化，打开数百万个孔洞、隧道和通道，锁住异味分子。"
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
    viewAllProducts: "查看所有产品",
    quantity: "数量",
    decreaseQuantity: "减少数量",
    increaseQuantity: "增加数量",
    // B2B pivot keys
    findNearYou: "附近查找",
    askYourStore: "在您当地的宠物店询问Purrify",
    availableAtStores: "加拿大各地宠物店有售"
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
    guarantee: "专属客服支持",
    // B2B pivot keys
    b2bTitle: "在您附近找到Purrify",
    b2bSubtitle: "加拿大各地宠物店有售。在您当地的宠物零售商询问Purrify。",
    b2bButtonText: "查找附近商店",
    b2bGuarantee: "全国宠物零售商有售"
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
    ],
    learnMore: "了解更多"
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
    errorInvalidEmail: "请输入有效的邮箱地址",
    errorGeneric: "出错了，请重试。",
    privacyText: "无垃圾邮件，随时退订。我们尊重您的隐私。",
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
      welcomeMessage: "欢迎加入Purrify！",
      features: {
        weeklyTips: "✓ 每周技巧",
        exclusiveOffers: "✓ 专属优惠",
        earlyAccessProducts: "✓ 抢先体验"
      }
    },
    popup: {
      title: "首单享{discount}%折扣！",
      description: "加入 1,000+ 快乐客户，获得专属技巧、折扣和新产品抢先体验。",
      buttonText: "立即享{discount}%折扣"
    },
    footer: {
      title: "与Purrify保持联系",
      description: "获取猫咪护理技巧和专属优惠，直接发送到您的邮箱。",
      placeholder: "您的邮箱",
      buttonText: "订阅"
    },
    inline: {
      title: "加入Purrify社区",
      description: "获取专家猫咪护理技巧和专属优惠，直接发送到您的邮箱。",
      buttonText: "免费订阅",
      successText: "订阅成功！"
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

  // 404 Not Found Page
  notFoundPage: {
    title: "404 - 页面未找到",
    description: "哎呀！您要查找的页面可能已被移动、删除或从未存在过。",
    lookingFor: "您可能在寻找：",
    returnHome: "返回首页",
    suggestedPages: {
      home: { title: "首页", description: "返回我们的主页" },
      products: { title: "产品", description: "浏览我们的猫砂添加剂" },
      howItWorks: { title: "工作原理", description: "了解Purrify如何消除异味" },
      blog: { title: "博客", description: "阅读我们关于猫咪护理的最新文章" },
      contact: { title: "联系我们", description: "与我们的团队联系" }
    }
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

  // Footer Navigation
  footerNav: {
    // Section headers
    trustedReviews: "可信评价",
    products: "产品",
    learn: "了解更多",
    popularArticles: "热门文章",
    company: "公司",
    // Product links
    trialSize: "试用装",
    standardSize: "标准装",
    familyPack: "家庭装",
    compareSizes: "比较规格",
    // Learn links
    howItWorks: "工作原理",
    faq: "常见问题",
    science: "科学原理",
    safetyInfo: "安全信息",
    catLitterGuide: "猫砂指南",
    ammoniaSolutions: "氨味解决方案",
    litterCalculator: "猫砂计算器",
    // Article links
    houseSmells: "家里有猫砂味？",
    multiCatGuide: "多猫除臭指南",
    triedEverything: "试过所有猫味解决方案？",
    powerfulAbsorber: "最强除味剂",
    smallApartments: "最适合小公寓",
    // Company links
    about: "关于我们",
    blog: "博客",
    locations: "门店位置",
    stockists: "销售点",
    testimonials: "用户评价",
    retailers: "零售商",
    retailerPortal: "零售商门户",
    hospitality: "酒店业",
    groomers: "宠物美容师",
    shelters: "收容所",
    b2bInquiry: "企业合作咨询",
    invest: "投资者",
    affiliateProgram: "联盟计划",
    results: "成功案例",
    contact: "联系我们",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款",
    // Review platforms
    trustpilot: "Trustpilot",
    googleReviews: "谷歌评论"
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
    errorDetails: "错误详情",
    moneyBackGuarantee: "30天退款保证"
  },

  // Exit Intent Popup
  exitPopup: {
    title: "等等！别空手离开",
    subtitle: "首单享受10%折扣",
    description: "加入数千名快乐的猫主人，获取独家优惠。不适用于免费试用。",
    placeholder: "输入您的邮箱",
    button: "获取折扣",
    noThanks: "不用了，我更喜欢原价",
    successTitle: "成功订阅！",
    successMessage: "结账时使用代码 WELCOME10 享受10%折扣！"
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
      },
      boostYour: "提升您的",
      petStoreProfits: "宠物店利润",
      mainDescription: "加入21家已建立的零售商，销售加拿大#1的猫砂除臭解决方案，利润率超过50%",
      retailerCount: "21家成熟零售商",
      marginHighlight: "50%+利润率",
      stats: {
        profitMargins: { value: "50%", label: "利润率" },
        repurchaseRate: { value: "89%", label: "复购率" },
        setupTime: { value: "24小时", label: "设置时间" }
      },
      valueProps: {
        highMargin: {
          title: "高利润产品",
          highlight: "高达55%利润率",
          description: "优质定价配合轻便运输。比传统重型猫砂产品利润更高。"
        },
        customerLoyalty: {
          title: "客户忠诚度",
          highlight: "4.8/5星评分",
          description: "客户成为忠实推广者。每月复购和推荐带来稳定收入。"
        },
        completeSupport: {
          title: "全面支持",
          highlight: "一切包含",
          description: "包含POS材料、培训、营销支持和专属客户经理。"
        }
      },
      trustIndicators: {
        label: "受领先零售商信赖：",
        types: {
          petStores: "宠物店",
          vetClinics: "兽医诊所",
          groomers: "美容师",
          distributors: "分销商"
        }
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
    wholesalePricing: {
      sectionBadge: "透明批发价格",
      title: "选择您的",
      titleHighlight: "利润水平",
      subtitle: "与加拿大最畅销的猫砂除臭解决方案合作。无隐藏费用，无意外。",
      packageIncludes: "套餐包含：",
      trustSignals: {
        noSetupFees: "零设置费",
        approval72hr: "72小时审批",
        provenROI: "已验证ROI"
      },
      tiers: {
        starter: {
          name: "入门套餐",
          badge: "快速启动",
          description: "非常适合试水",
          contents: [
            "一盒试用装（25小袋）",
            "一盒中号装（15中袋）",
            "一盒大号装（10大袋）"
          ],
          features: [
            "经过验证的4.8/5星产品",
            "轻便运输优势",
            "包含基本POS展示架",
            "邮件支持和设置指南",
            "损坏商品免费更换"
          ],
          cta: "开始使用"
        },
        growth: {
          name: "成长伙伴",
          badge: "最佳价值",
          description: "成长型零售商的明智选择",
          contents: [
            "五盒试用装（125小袋）",
            "五盒中号装（75中袋）",
            "五盒大号装（50大袋）",
            "赠品：5袋免费中号装"
          ],
          features: [
            "高级柜台展示架",
            "员工培训材料",
            "数字营销素材（社交帖子、邮件模板）",
            "优先电话和邮件支持"
          ],
          cta: "开始成长"
        },
        scale: {
          name: "规模成功",
          badge: "企业级",
          description: "追求认真的收入增长",
          contents: [
            "十盒试用装（250小袋）",
            "十盒中号装（150中袋）",
            "十盒大号装（100大袋）",
            "赠品：25袋额外试用装吸引新客户"
          ],
          features: [
            "成长伙伴的所有内容",
            "专属客户经理",
            "定制营销材料和联合品牌",
            "区域保护权",
            "季度业务回顾和销售分析",
            "优先库存分配"
          ],
          cta: "开始使用"
        }
      },
      bottomCta: {
        title: "准备好提升收入了吗？",
        description: "加入已经与Purrify获得高利润的21家蒙特利尔及周边地区零售商。",
        setupNote: "设置时间不到24小时。",
        primaryButton: "申请合作伙伴",
        secondaryButton: "致电我们"
      }
    },
    contact: {
      title: "成为Purrify零售合作伙伴",
      description: "准备好将加拿大#1猫砂添加剂添加到您的商店？填写下面的表格，我们将在24小时内回复您。",
      sectionBadge: "加入21家成熟伙伴",
      sectionTitle: "开始您的",
      sectionTitleHighlight: "合作伙伴关系",
      sectionDescription: "准备好与加拿大#1猫砂除臭解决方案获得50%+利润率？",
      setupNote: "设置时间不到24小时。",
      urgencyStats: {
        approvalTime: { value: "72小时", label: "审批时间" },
        setupFees: { value: "零", label: "设置费用" },
        currentPartners: { value: "21", label: "当前合作伙伴" }
      },
      form: {
        title: "合作伙伴申请",
        subtitle: "快速2分钟申请。我们当天回复！",
        fields: {
          businessName: { label: "企业名称", placeholder: "您的宠物店名称", required: true },
          contactName: { label: "联系人姓名", placeholder: "您的全名", required: true },
          position: { label: "您在公司的职位", placeholder: "如：老板、经理、采购、销售代表" },
          email: { label: "电子邮件地址", placeholder: "your@email.com", required: true },
          phone: { label: "电话号码", placeholder: "(555) 123-4567" },
          businessType: {
            label: "企业类型",
            placeholder: "选择企业类型",
            required: true,
            options: {
              independentPetStore: "独立宠物店",
              petStoreChain: "连锁宠物店",
              veterinaryClinic: "兽医诊所",
              groomingSalon: "宠物美容沙龙",
              distributor: "分销商",
              other: "其他"
            }
          },
          locations: { label: "门店数量", placeholder: "1" },
          currentProducts: { label: "最畅销猫砂品牌", placeholder: "您卖得最多的#1猫砂品牌是什么？" },
          message: { label: "补充信息", placeholder: "告诉我们关于您的业务和批发需求..." }
        },
        submitButton: "提交合作伙伴申请",
        submitting: "提交中..."
      },
      success: {
        title: "申请已收到！",
        welcome: "欢迎加入Purrify合作伙伴网络！",
        responseTime: "我们将在72小时内回复您。",
        nextSteps: {
          title: "您的下一步",
          step1: { title: "申请审核", description: "我们的团队审核您的店铺详情" },
          step2: { title: "合作伙伴电话", description: "讨论价格、支持和物流" },
          step3: { title: "开始销售", description: "接收库存并启动" }
        },
        timeline: {
          title: "预计收入时间线",
          approval: { value: "72小时", label: "审批" },
          firstShipment: { value: "3-5天", label: "首次发货" },
          firstSales: { value: "第1周", label: "首次销售" }
        },
        needHelp: "需要即时帮助？"
      },
      successStories: {
        title: "合作伙伴成功案例",
        stories: {
          pattesEtGriffes: {
            businessName: "Pattes et Griffes – Sainte‑Thérèse",
            businessType: "店主 / 经理",
            quote: "我们的客户现在点名要Purrify。在柜台推荐很容易，订货月月稳定。",
            metric: "30天订货周期"
          },
          chico: {
            businessName: "Chico – Boul. St‑Laurent (蒙特利尔)",
            businessType: "店铺经理",
            quote: "易于存储，利润高，走货快。销售物料帮助我们的团队快速向购物者解释优势。",
            metric: "高周转率"
          }
        }
      },
      contactInfo: {
        title: "需要即时帮助？",
        subtitle: "立即与合作伙伴专员交谈",
        wholesaleEmail: "wholesale@purrify.ca",
        emailLabel: "合作伙伴邮箱",
        emailHint: "点击撰写邮件或复制地址。",
        copied: "已复制！",
        copyFailed: "复制失败",
        businessHours: { title: "营业时间", hours: "周一至周五：东部时间上午9点至下午6点" }
      },
      errors: {
        submitFailed: "提交时出错。请重试或直接联系我们：wholesale@purrify.ca",
        defaultSuccess: "合作伙伴申请发送成功！我们将在72小时内联系您。"
      }
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
    },
    categoryList: [
      { name: "所有问题" },
      { name: "产品信息" },
      { name: "使用与应用" },
      { name: "产品比较" },
      { name: "故障排除" },
      { name: "配送与交付" },
      { name: "付款与账单" },
      { name: "客户支持" }
    ],
    faqItems: [
      {
        question: "什么是Purrify，它是如何工作的？",
        answer: "Purrify是一种猫砂活性炭添加剂，通过称为吸附的过程在分子级别消除异味。与仅掩盖异味的除臭剂不同，Purrify将异味分子（氨、硫醇和其他化合物）捕获在数百万个微观孔隙中。我们的椰壳活性炭每个颗粒都有巨大的内表面积 - 1克的表面积相当于一个网球场！这使得Purrify能够在异味分子到达您的鼻子之前消除高达99.5%的异味分子，让您的家保持7天以上的清新。"
      },
      {
        question: "Purrify对猫和小猫安全吗？",
        answer: "是的！Purrify由100%天然椰壳活性炭制成 - 与医院水过滤系统和空气净化器中使用的食品级无毒材料相同。即使被摄入也完全安全（尽管您的猫不会故意吃它），不会引起呼吸问题，不含任何化学物质、香料或添加剂。小猫、老年猫和敏感猫的主人都放心使用。事实上，活性炭在兽医中毒治疗中使用，因为它在结合毒素方面非常安全和有效。"
      },
      {
        question: "一瓶Purrify能用多久？",
        answer: "这取决于您选择的尺寸和您有多少只猫。我们的30g试用装对于一只猫可以用2周（每7天使用一次）。60g常规装可用4周，120g大装可用8周，240g经济装可用16周（单猫家庭）。对于多猫家庭，大装（120g）或经济装（240g）提供最佳性价比，因为您可能需要在使用频繁的猫砂盆中更频繁地使用。"
      },
      {
        question: "如何将Purrify应用到我的猫砂中？",
        answer: "非常简单！摇晃瓶子，取下按压盖，均匀地在干净的猫砂上撒15g（约2汤匙），用您的铲子轻轻混合，就完成了。为获得最佳效果，在完全更换猫砂盆后应用于新鲜猫砂，或当您注意到异味开始返回时（通常每7天）。无需复杂的计算 - 我们的瓶子有清晰的测量标记，每次使用不到30秒。"
      },
      {
        question: "Purrify适用于所有类型的猫砂吗？",
        answer: "当然！Purrify与所有类型的猫砂兼容：结团、非结团、粘土、硅胶、木材、纸、小麦、玉米和天然/环保猫砂。它通过在分子级别与猫砂材料混合而起作用，不会干扰其结团或吸收性能。无论您使用5美元的猫砂还是50美元的高级猫砂，Purrify都能在不改变其工作方式的情况下增强其异味控制性能。"
      },
      {
        question: "Purrify与普通猫砂盆除臭剂有什么区别？",
        answer: "普通除臭剂用强烈的香味掩盖异味（就像在垃圾上喷香水），而Purrify通过分子吸附完全消除异味。大多数除臭剂含有小苏打、人工香料或精油，只能暂时掩盖异味，并可能刺激您猫的呼吸道。Purrify的活性炭在其多孔结构内物理捕获和保持异味分子，消除异味源而不仅仅是掩盖它。这就是为什么Purrify持续7天以上，而香味除臭剂通常在24-48小时内失效。"
      },
      {
        question: "Purrify会影响我的猫砂的结团能力吗？",
        answer: "完全不会！Purrify旨在与猫砂配合使用，而不是对抗它。活性炭不会干扰结块形成、水分吸收或铲除能力。它只是添加了您现有猫砂无法提供的异味控制层。事实上，许多客户报告说他们的猫砂在使用Purrify后似乎工作得更好，因为它保持更长时间的清新，使他们在完全更换之前从每个猫砂盆中获得更多价值。"
      },
      {
        question: "我可以在自动猫砂盆中使用Purrify吗？",
        answer: "可以！Purrify与Litter-Robot、PetSafe ScoopFree和其他自动猫砂盆配合使用效果极佳。只需像往常一样在猫使用猫砂盆之前撒上并混合。细粉不会干扰传感器或耙子机制。事实上，增强的异味控制对自动猫砂盆特别有价值，因为猫砂在完全更换之间在装置中停留的时间更长。"
      },
      {
        question: "多只猫需要使用更多吗？",
        answer: "对于多只猫，您可能需要更频繁地使用Purrify（每5-6天而不是每7天）或每次使用稍多一些。我们的建议：1-2只猫的家庭 → 60g常规装或120g大装；3只以上猫的家庭 → 120g大装或240g经济装以获得最佳性价比。经济装对多猫家庭特别经济，因为您降低了每次使用的成本。"
      },
      {
        question: "是什么使Purrify的活性炭与普通木炭不同？",
        answer: "活性炭经过专门的高温活化过程，创造出数百万个微观孔隙，使其表面积比普通木炭大100-300倍。我们特别选择椰壳炭是因为它具有理想的孔隙结构，可以捕获小尺寸的异味分子，如氨（0.26nm）和硫醇（0.4nm）。烧烤煤球或木灰中的普通木炭缺乏这种微孔结构，基本上不会提供任何异味控制。"
      },
      {
        question: "Purrify每月花费多少？",
        answer: "这取决于您选择的尺寸。对于一只猫：试用装$4.76用2周（$9.52/月），常规装$8.52/月，大装$7.97/月（最佳性价比），经济装$7.44/月（最低价格）。对于多只猫，我们推荐大装或经济装，因为您可能需要更频繁地使用。120g大装为大多数家庭提供了最佳的价值和便利性 - 每周不到$2就能获得完全清新的空气。"
      },
      {
        question: "Purrify提供免费送货吗？",
        answer: "是的！我们在加拿大为超过$35的订单提供免费送货。大多数客户通过购买120g大装（$15.95）或240g经济装（$29.76），或捆绑多个商品来轻松达到这个金额。订单通常在5-7个工作日内通过加拿大邮政送达。对于低于$35的订单，根据您的位置应用标准运费。"
      },
      {
        question: "Purrify工作得有多快？",
        answer: "您会立即看到（或者说闻到）效果！一旦您撒上Purrify，活性炭就开始捕获异味分子。大多数客户在最初几个小时内就注意到异味控制的显著改善。与仅暂时掩盖异味的香味解决方案不同，Purrify的吸附作用全天候工作7天以上，随着越来越多的异味分子被捕获而持续改善。"
      },
      {
        question: "我可以将Purrify与其他异味控制解决方案一起使用吗？",
        answer: "可以！Purrify与其他异味控制解决方案配合良好，尽管大多数客户发现他们不再需要它们。您可以将其与猫砂盆衬垫、垫子或封闭式猫砂盆一起使用。但是，避免使用小苏打或强烈的粉末香料，因为它们可能会干扰木炭捕获异味的能力。为获得最佳效果，让Purrify成为您的主要异味控制解决方案 - 它比您可以与之结合的任何东西都更有效。"
      },
      {
        question: "您的退货政策是什么？",
        answer: "我们提供30天无问题退款保证。如果您因任何原因对Purrify不完全满意，请在购买后30天内联系我们以获得全额退款。我们只支付退货运费（如适用） - 否则保留产品。我们对您会喜欢Purrify充满信心，使退货完全无风险。要启动退货，只需发送电子邮件至hello@purrify.com。"
      },
      {
        question: "Purrify环保且可持续吗？",
        answer: "当然！Purrify由100%可再生椰壳制成 - 这是椰子行业的副产品，否则将成为废物。它不含合成化学物质、人工香料或添加剂。包装可回收，由于Purrify延长了猫砂的使用寿命，您实际上总体上减少了猫砂浪费。通过使用天然可再生资源同时帮助您的猫砂持续更长时间，Purrify是最环保的异味控制解决方案之一。"
      },
      {
        question: "Purrify在有多个猫砂盆的家庭中有效吗？",
        answer: "是的！只需独立地将Purrify应用于每个猫砂盆。如果您有2-3个猫砂盆，120g大装或240g经济装提供最佳性价比，因为您可以用一次购买处理多个猫砂盆。许多多猫砂盆家庭使用'每只猫一个猫砂盆加一个'的规则，Purrify在这种配置中完美工作 - 只需每7天在每个猫砂盆中撒15g。"
      },
      {
        question: "我可以使用比推荐量少的Purrify吗？",
        answer: "虽然从技术上讲您可以使用更少，但我们建议每次使用完整的15g（约2汤匙）以获得最佳异味控制。使用较少可能无法提供足够的活性炭来有效捕获猫砂盆中的所有异味分子，特别是在7天周期结束时。把它想象成异味控制保险 - 完整的15g确保最大效果。如果您想节省，我们的240g经济装以$1.86的价格提供最佳的每次使用成本。"
      },
      {
        question: "如果我的猫患有哮喘或过敏怎么办？",
        answer: "Purrify非常适合患有哮喘或过敏的猫，因为它不含香料、化学物质或刺激性颗粒。与可能引发呼吸问题的香味除臭剂不同，活性炭是惰性和无味的。事实上，带有活性炭过滤器的空气净化器通常被推荐给患有哮喘的猫主人。与往常一样，如果您的猫有严重的健康状况，请咨询您的兽医，但Purrify是最安全、最温和的异味控制选择之一。"
      },
      {
        question: "Purrify与封闭式猫砂盆在异味控制方面相比如何？",
        answer: "Purrify和封闭式猫砂盆解决不同的问题。封闭式猫砂盆容纳异味（防止扩散）但不消除异味 - 猫砂盆内的空气仍然闻起来很糟糕，当您的猫进入或您出来铲除时，这些集中的异味会逃逸。Purrify实际上在分子级别消除异味，所以没有什么需要容纳的。许多客户同时使用两者 - 在封闭式猫砂盆内使用Purrify以获得双重保护 - 但大多数人发现仅使用Purrify就完全消除了对封闭式猫砂盆的需求！"
      },
      {
        question: "我需要专门用于猫砂盆的活性炭吗？",
        answer: "是的！并非所有活性炭都是相同的。来自水族箱、空气净化器或园艺产品的木炭针对不同的分子大小和污染物类型进行了优化。Purrify的椰壳活性炭经过专门选择，具有理想的颗粒大小，可以捕获存在于0.2-0.5nm范围内的特定猫砂盆异味分子（氨、硫醇、挥发性硫化合物）。使用通用木炭就像使用咖啡过滤器来过滤水一样 - 工作用的材料错误。"
      },
      {
        question: "我可以在商店购买Purrify吗？",
        answer: "目前，Purrify主要通过我们的网站提供，以确保新鲜度、质量和直接面向消费者的定价。我们正在开展零售合作伙伴关系，可能很快会在精选商店中销售。在线订购意味着您可以直接从我们这里获得最新鲜的产品，没有零售加价。此外，我们的网店提供数量折扣、超过$35的免费送货以及您在商店找不到的订阅节省。"
      },
      {
        question: "如果我在7天后忘记使用Purrify怎么办？",
        answer: "没问题！Purrify不会在第8天神奇地停止工作。木炭孔隙随着时间的推移逐渐饱和，所以您可能会在第8-10天注意到气味稍微强一些。只需在您记得时应用下一次15g剂量。为了保持一致的记忆，许多客户选择每周的'Purrify日'（如星期日）并将其添加到他们的猫砂盆清洁例程中。有些人设置手机日历提醒。"
      },
      {
        question: "当我撒Purrify时会产生灰尘吗？",
        answer: "Purrify是一种细粉，所以在使用过程中有一些最小的灰尘 - 类似于撒小苏打。要最小化灰尘：（1）在猫砂表面附近撒而不是从高处，（2）慢慢撒而不是快速倾倒，（3）使用后轻轻混合。灰尘迅速沉降在猫砂中，混合后变得不可检测。与香味除臭剂不同，活性炭在猫挖掘时不会产生香味云。"
      },
      {
        question: "我可以在自制猫砂中使用Purrify吗？",
        answer: "可以！Purrify适用于自制猫砂解决方案，如木屑、碎报纸、沙子或锯末。事实上，自制材料通常缺乏商业猫砂的内置异味控制，所以Purrify特别有价值。只需在您的自制猫砂盆材料上撒15g并混合。活性炭将以完全相同的方式工作 - 捕获异味分子，无论您使用什么猫砂盆材料。"
      },
      {
        question: "我如何知道购买哪种尺寸的Purrify？",
        answer: "对于一只猫：30g试用装（2周）用于试用，60g常规装（1个月）用于偶尔使用，120g大装（2个月，最佳性价比！），240g经济装（4个月）用于坚定的用户。对于2-3只猫：120g大装或240g经济装，因为您可能会更频繁地使用。对于4只以上的猫或多猫砂盆家庭：240g经济装或多瓶。还不确定？大多数首次客户从60g常规装或120g大装开始。"
      },
      {
        question: "我需要将Purrify混合到猫砂中还是只是撒在上面？",
        answer: "为获得最佳效果，使用您的铲子将Purrify轻轻混合到猫砂的上层2-3英寸中。这将活性炭分布在您的猫挖掘的层中以及尿液形成的地方。您不需要深度混合或实现完美分布 - 只需用铲子轻轻几次就足够了。有些人只是把它撒在上面，让猫的挖掘自然混合，这也有效，但手动混合确保从第一天起就有更均匀的覆盖。"
      },
      {
        question: "Purrify对尿液非常浓的老年猫有效吗？",
        answer: "当然！老年猫通常有更浓缩的尿液，使异味控制更具挑战性。Purrify的活性炭对老年猫尿液中的强氨和硫醇特别有效。许多客户专门购买Purrify是因为他们的老年猫产生的异味普通猫砂无法处理。对于特别强烈的情况，您可能每5-6天而不是每7天使用一次，但大多数人发现7天的时间表即使对老年猫也有效。"
      },
      {
        question: "我可以在小猫训练盘中使用Purrify吗？",
        answer: "可以！Purrify对小猫完全安全，在它们较小的训练盘中同样有效。只需根据盘的大小调整用量 - 对于较小的小猫盘，使用约1汤匙（7-8g）而不是完整的15g。这有助于年幼的小猫从一开始就积极地将他们的猫砂盆与清洁和新鲜联系起来，建立良好的猫砂盆习惯。"
      },
      {
        question: "如果我把Purrify洒在地板上怎么办？",
        answer: "别担心！活性炭完全安全且惰性。只需像任何其他家用灰尘一样扫或吸洒出的粉末。它不会弄脏地板、地毯或织物。如果它落在地毯上，彻底吸尘 - 黑色细粉可能在浅色地毯上可见，直到被吸走。避免湿擦，因为这可能会散布粉末；始终先干燥清洁。"
      },
      {
        question: "我可以订阅自动配送吗？",
        answer: "可以！我们提供自动配送订阅，可享受10%的折扣。选择您喜欢的尺寸和配送频率（每4、8或12周），我们会在您用完之前自动将Purrify送到您家门口。您可以随时暂停、跳过或取消 - 没有合同或承诺。大多数单猫客户选择每8周配送一次120g大装，以永远不会用完Purrify，同时保持低的每次使用成本。"
      },
      {
        question: "Purrify与小苏打产品在异味控制方面相比如何？",
        answer: "小苏打通过化学反应中和异味，但容量有限，一旦反应完成就停止工作（通常在猫砂盆中24-48小时）。Purrify的活性炭通过吸附在其孔隙中物理捕获异味分子，持续时间更长（7天以上），并在更广泛的异味分子范围内起作用。小苏打也可能有粉尘，对强烈的氨气味不太有效，而Purrify的木炭专门设计用于猫砂盆异味分子。"
      },
      {
        question: "你们提供批量折扣吗？",
        answer: "是的！您购买的越多，节省的越多：购买2-3瓶 → 节省10%，购买4-5瓶 → 节省15%，购买6瓶以上 → 节省20%。这些折扣与我们已经经济实惠的240g经济装叠加。多猫家庭或为朋友购买的客户经常利用批量折扣。此外，超过$35的订单免费送货使批量购买更有价值。"
      },
      {
        question: "如果Purrify对我不起作用，我该怎么办？",
        answer: "首先，确保您每次使用完整的15g（约2汤匙）并应用于干净的猫砂。其次，检查您的猫砂是否过期或过度饱和（如果超过2-3周，可能是时候完全更换了）。第三，对于特别强烈的异味（多只猫、老年猫），尝试每5-6天而不是每7天使用一次。如果您已经尝试了这些步骤但仍然不满意，请联系我们 - 我们有30天保证支持，将与您合作解决问题或提供全额退款。"
      },
      {
        question: "我可以在兔子或其他小宠物的猫砂盆中使用Purrify吗？",
        answer: "当然！虽然Purrify是为猫砂盆设计的，但它同样适用于兔子、雪貂、豚鼠、龙猫和其他小宠物的猫砂盆。只需根据猫砂盆的大小调整用量 - 根据大小使用约10-15g。活性炭对所有小宠物都安全，摄入无毒，并有效控制任何小型哺乳动物的尿液异味。"
      },
      {
        question: "我应该如何储存Purrify？",
        answer: "将Purrify储存在阴凉干燥的地方，按压盖紧紧关闭。避免暴露在高湿度下，这可能导致活性炭开始从空气中吸附水分，而不是保存其对猫砂盆异味的容量。不要冷藏或冷冻 - 橱柜或食品储藏室中的室温是完美的。妥善储存，Purrify保持2-3年的全部效力。瓶子紧凑，易于存放在水槽下、清洁柜或您存放猫砂盆用品的任何地方。"
      },
      {
        question: "我可以携带Purrify旅行吗？",
        answer: "可以！Purrify可以安全旅行。按压盖瓶子防溢，活性炭不是液体或气溶胶，因此可以放在随身行李或托运行李中。如果您与猫一起旅行并携带便携式猫砂盆，只需在30g试用瓶中携带少量。它对酒店房间、度假租赁或拜访家人特别有用 - 在猫的临时猫砂盆中撒Purrify以保持租赁空间无异味。"
      }
    ]
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

  // 商店定位器
  maps: {
    findNearYou: "在您附近找到Purrify | 零售店位置",
    discoverWhere: "发现在加拿大各地哪里可以购买Purrify。每个位置代表一个可以找到我们产品的零售店。",
    retailStores: "Purrify在加拿大各地的零售店 - 蒙特利尔、多伦多、温哥华等",
    cities: {
      montreal: "蒙特利尔",
      quebec: "魁北克市",
      toronto: "多伦多",
      vancouver: "温哥华",
      calgary: "卡尔加里",
      ottawa: "渥太华"
    },
    iframeTitle: "Purrify零售店位置地图"
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
      intro: "如果您尝试过香味猫砂、小苏打或空气清新剂，但发现它们只能工作一两天，这是有科学原因的：这些方法都不能真正消除氨气。",
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
      intro: "数千名猫主人选择活性炭除臭是有原因的。",
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
        number: "1",
        title: "撒入",
        description: "在干净的猫砂上均匀撒上一层薄薄的Purrify。50g袋装可覆盖标准猫砂盆7天以上。"
      },
      step2: {
        number: "2",
        title: "混合",
        description: "轻轻搅拌使Purrify与整个猫砂混合。这确保活性炭在整个猫砂盆中分布均匀。"
      },
      step3: {
        number: "3",
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
      rating: { value: "4.9★", label: "客户评分" },
      surfaceArea: { value: "1,150", label: "m²/g表面积" },
      natural: { value: "100%", label: "天然成分" }
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
  },

  // B2B垂直页面
  veterinarians: {
    seo: {
      pageTitle: "宠物医院合作伙伴",
      description: "与Purrify合作，向客户推荐天然健康的除臭解决方案。批发价格、样品套装和培训包含在内。",
      keywords: "宠物医院产品, 猫砂添加剂兽医, 宠物健康产品批发, 兽医推荐猫用品",
      openGraphAlt: "宠物医院合作伙伴"
    },
    hero: {
      badge: "宠物医院合作计划",
      titleLine1: "自信地",
      titleLine2: "推荐",
      description: "为您的客户提供以健康为导向的除臭解决方案，",
      highlight: "100%天然无香精",
      stats: {
        natural: "天然",
        chemicals: "无化学物质",
        days: "天保护"
      },
      cta: {
        primary: "申请样品套装",
        secondary: "查看合作选项"
      },
      trustedBy: "获得兽医专业人士的信赖：",
      badges: {
        fragrance: "无香精",
        natural: "无毒",
        sensitive: "敏感猫咪适用"
      },
      valueProps: {
        health: {
          title: "健康优先配方",
          subtitle: "无香精无刺激物",
          description: "椰壳活性炭，零化学添加剂 - 非常适合有呼吸敏感或过敏的猫咪。"
        },
        ammonia: {
          title: "减少氨气暴露",
          subtitle: "更好的空气质量",
          description: "活性炭从源头捕获氨气分子，减少对猫咪及其主人的呼吸道刺激。"
        },
        revenue: {
          title: "额外收入来源",
          subtitle: "高利润，重复购买",
          description: "客户信任您的推荐。为养猫最大的困扰提供解决方案，建立忠诚度。"
        }
      }
    }
  },

  catCafes: {
    seo: {
      pageTitle: "猫咖除臭解决方案",
      description: "让您的猫咖全天保持清新。Purrify活性炭无香精消除猫砂异味。",
      keywords: "猫咖除臭, 猫咖用品, 商用猫砂, 猫咖清新",
      openGraphAlt: "猫咖合作伙伴"
    },
    hero: {
      badge: "猫咖合作计划",
      titleLine1: "让您的猫咖",
      titleLine2: "全天清新",
      description: "高流量场所需要持续的清新感。使用Purrify的无香精除臭让顾客不断回头。",
      stats: {
        days: "天清新",
        fragrances: "香精",
        natural: "天然"
      },
      cta: {
        primary: "申请猫咖样品套装",
        secondary: "查看批发价格"
      }
    }
  },

  shelters: {
    seo: {
      pageTitle: "动物收容所解决方案",
      description: "有效管理收容所异味。Purrify帮助为潜在领养者创造温馨的环境。",
      keywords: "收容所除臭, 动物收容所用品, 猫砂批发, 收容所异味管理",
      openGraphAlt: "收容所合作伙伴"
    },
    hero: {
      badge: "收容所合作计划",
      titleLine1: "创造",
      titleLine2: "温馨的领养环境",
      description: "第一印象对潜在领养者很重要。保持收容所清新，不使用刺激性香精。",
      stats: {
        cats: "帮助的猫咪",
        shelters: "合作收容所",
        natural: "天然"
      },
      cta: {
        primary: "申请收容所样品",
        secondary: "查看捐赠计划"
      }
    }
  },

  groomers: {
    seo: {
      pageTitle: "猫咪美容师解决方案",
      description: "保持美容沙龙的清新。Purrify消除猫砂异味，提供更好的客户体验。",
      keywords: "美容沙龙除臭, 猫咪美容用品, 沙龙清新, 美容除臭",
      openGraphAlt: "美容师合作伙伴"
    },
    hero: {
      badge: "美容师合作计划",
      titleLine1: "清新的沙龙",
      titleLine2: "满意的客户",
      description: "提供清新无香精环境的优质美容体验。",
      stats: {
        freshness: "清新度",
        clients: "满意客户",
        natural: "天然"
      },
      cta: {
        primary: "申请样品",
        secondary: "查看专业价格"
      }
    },
    cta: {
      primary: "开始销售Purrify",
      secondary: "咨询信息"
    },
    opportunity: {
      title: "美容师的机会",
      intro: "每次猫咪美容预约都是解决客户#1投诉的机会。",
      points: {
        clientsAsk: {
          title: "客户已经在问",
          description: "猫主人在预约时经常提到猫砂异味问题。"
        },
        expertPosition: {
          title: "成为专家",
          description: "当您推荐Purrify时，您成为猫咪护理的可信顾问。"
        },
        repeatRevenue: {
          title: "重复购买潜力",
          description: "Purrify是消耗品。客户每月回购。"
        },
        easyDemo: {
          title: "可展示的效果",
          description: "在您的沙龙展示效果。一次演示创造终身客户。"
        }
      }
    },
    addOnSale: {
      title: "轻松附加销售",
      description: "Purrify在预约期间自然销售",
      points: [
        "美容时30秒快速解释",
        "关于猫咪护理的自然对话",
        "客户已经信任您的建议",
        "无压力销售 - 产品说明一切"
      ]
    },
    partnerBenefits: {
      title: "合作福利",
      benefits: {
        wholesale: {
          title: "批发价格",
          description: "每笔销售的优质利润。提供批量折扣。"
        },
        display: {
          title: "展示材料",
          description: "免费柜台展示和促销材料。"
        },
        training: {
          title: "产品培训",
          description: "产品优势的快速培训。"
        },
        tracking: {
          title: "销售跟踪",
          description: "通过合作伙伴门户跟踪您的销售。"
        }
      }
    },
    retailPackage: {
      title: "您的美容师零售包",
      subtitle: "开始销售所需的一切",
      includes: [
        "柜台展示架",
        "演示样品",
        "促销材料",
        "培训指南",
        "营销支持"
      ]
    },
    testimonials: {
      title: "美容师怎么说",
      items: [
        {
          quote: "我的客户很高兴我有解决他们猫砂异味问题的方案。",
          author: "猫咪美容沙龙",
          location: "多伦多, ON",
          result: "每月15+单位"
        }
      ]
    },
    form: {
      title: "合作咨询",
      businessName: "企业名称",
      contactName: "联系人姓名",
      email: "电子邮件",
      phone: "电话",
      location: "位置",
      monthlyClients: "每月猫咪客户",
      interest: "告诉我们您的兴趣",
      submit: "提交咨询",
      success: {
        title: "咨询已收到！",
        message: "谢谢！我们的团队将在24-48小时内与您联系。"
      }
    },
    contact: {
      title: "有问题？让我们谈谈！",
      description: "我们的合作团队随时为您提供帮助。",
      callUs: "致电我们",
      emailUs: "给我们发邮件",
      moreInfo: "需要更多信息？",
      requestGuide: "索取我们的详细指南"
    }
  },

  hospitality: {
    seo: {
      pageTitle: "宠物友好住宿解决方案",
      description: "让您的Airbnb和宠物友好住宿无异味。接受宠物的房东的低调解决方案。",
      keywords: "宠物友好airbnb, 猫咪住宿, 度假租赁宠物, 租赁除臭",
      openGraphAlt: "住宿合作伙伴"
    },
    hero: {
      badge: "住宿合作计划",
      titleLine1: "宠物友好住宿",
      titleLine2: "零异味",
      description: "接受宠物而不牺牲清新度。预订之间的低调解决方案。",
      stats: {
        reviews: "五星评价",
        bookings: "预订量",
        natural: "天然"
      },
      cta: {
        primary: "申请样品",
        secondary: "查看房东解决方案"
      }
    }
  },

  // Social Proof Badges Section
  socialProofBadges: {
    trustedVerified: "已验证信赖",
    findUsOn: "在以下平台找到我们",
    viewOnPlatform: "在{{platform}}查看Purrify",
    platforms: {
      trustpilot: "Trustpilot",
      googleBusiness: "Google Business",
      crunchbase: "Crunchbase",
      productHunt: "Product Hunt",
      yelp: "Yelp",
      wellfound: "Wellfound"
    }
  },

  // B2B Case Studies Section
  b2bCaseStudies: {
    badge: "真实成果",
    title: "合作伙伴成功案例",
    subtitle: "了解像您这样的企业如何通过Purrify实现可衡量的成果",
    cta: "准备好为您的企业获得类似的成果了吗？",
    ctaButton: "联系我们的合作团队",
    businessTypes: {
      veterinarian: "宠物诊所",
      catCafe: "猫咖",
      shelter: "动物救助站",
      groomer: "宠物美容",
      hospitality: "宠物友好住宿"
    },
    labels: {
      challenge: "挑战",
      solution: "解决方案",
      catsServed: "只猫服务"
    }
  },
  // 推荐计划 - Sprint 6C
  referral: {
    dashboard: {
      title: "推荐好友，双方各得5加元",
      loginRequired: "登录以访问您的推荐仪表板并开始赚取奖励。",
      signIn: "登录",
      retry: "重试",
      generateDescription: "生成您的专属推荐码并分享给朋友。他们首单可享5加元优惠，您在他们购买后可获得5加元积分！",
      generateButton: "生成我的推荐码",
      generating: "生成中..."
    },
    stats: {
      completedReferrals: "已完成推荐",
      totalEarned: "总收益",
      availableCredit: "可用积分",
      pending: "待处理"
    },
    milestone: {
      title: "里程碑进度",
      referrals: "次推荐",
      nextReward: "下一个奖励"
    },
    rewards: {
      title: "您的奖励",
      credit: "积分",
      available: "可用"
    },
    activity: {
      title: "最近活动",
      completed: "已完成",
      pending: "待处理"
    },
    widget: {
      title: "推荐好友，双方各得5加元",
      giveGet: "推荐好友，双方各得5加元",
      description: "与朋友分享您的推荐码。他们可享5加元优惠，您可获得5加元积分！",
      shareDescription: "与朋友分享您的推荐码",
      yourCode: "您的推荐码",
      shareLink: "分享链接",
      copy: "复制",
      copyCode: "复制推荐码",
      copyLink: "复制链接",
      copied: "已复制！",
      shareVia: "通过以下方式分享",
      howItWorks: "如何运作",
      step1: "与朋友分享您的推荐码或链接",
      step2: "他们首单可享5加元优惠",
      step3: "他们购买后您可获得5加元积分"
    },
    share: {
      email: "邮件",
      sms: "短信",
      link: "链接"
    },
    checkout: {
      haveCode: "有推荐码？点击这里",
      enterReferralCode: "输入推荐码",
      enterCode: "请输入推荐码",
      emailRequired: "请先输入您的邮箱",
      invalidCode: "无效的推荐码",
      error: "应用推荐码失败。请重试。",
      apply: "应用",
      applying: "应用中...",
      applied: "推荐码已应用！",
      referredBy: "由 {name} 推荐",
      off: "优惠",
      remove: "移除",
      discountNote: "使用朋友的推荐码可享5加元优惠"
    }
  },

  // City Page Translations (for location-based SEO pages)
  cityPage: {
    seo: {
      title: "{{city}}猫砂除臭剂 | Purrify活性炭",
      descriptionWithPopulation: "{{city}}猫砂有味道？Purrify活性炭自然消除氨气异味。{{province}}全境快速配送。{{population}}+猫主人信赖之选。",
      descriptionDefault: "{{city}}猫砂有味道？Purrify活性炭自然消除氨气异味。{{province}}全境快速配送。对猫咪和幼猫安全。"
    },
    loading: "正在跳转...",
    hero: {
      heading: "{{city}}最佳猫砂除臭剂",
      subheading: "{{city}}及{{province}}全境{{audience}}+猫主人信赖之选"
    },
    whyChoose: {
      heading: "为什么{{city}}猫主人选择Purrify",
      perfectFor: "非常适合{{feature}}",
      fastShipping: "{{province}}全境快速配送",
      worksWithAllBrands: "适用于您喜爱的所有猫砂品牌"
    },
    cta: {
      tryInCity: "在{{city}}试用Purrify",
      seeHowItWorks: "了解活性炭技术原理 →",
      shopOnline: "立即在线购买",
      submitVideo: "📹 提交您的视频评价",
      writeReview: "✍️ 撰写评价",
      exploreTestimonials: "查看更多{{province}}用户评价 →"
    },
    whereToFind: {
      heading: "在{{city}}哪里可以买到Purrify",
      localStore: {
        heading: "咨询当地宠物店",
        description: "{{city}}的独立宠物店销售这款备受猫主人好评的除臭剂。",
        tip: "从您喜欢的社区店开始，或者告诉他们您想在货架上看到Purrify。"
      },
      orderDirect: {
        heading: "直接订购，快速配送",
        description: "更喜欢送货上门？在线订购，{{province}}全境2-3个工作日内送达清新空气。"
      }
    },
    playbook: {
      heading: "{{city}}清新空气指南",
      step1: "每次清理猫砂后，在顶部撒上2汤匙。",
      step2: "如果您的家面临{{painPoint}}，每隔一天刷新一次。",
      step3: "照常更换猫砂——Purrify适用于结团砂、膨润土砂和天然猫砂。"
    },
    testimonials: {
      heading: "{{city}}猫主人怎么说",
      wasHelpful: "这对您有帮助吗？",
      shareStory: {
        heading: "分享您在{{city}}的成功故事",
        description: "您是喜爱Purrify的{{city}}猫主人吗？我们很乐意展示您的故事，帮助其他当地猫主人发现无异味生活。"
      }
    },
    provinceWide: {
      heading: "{{province}}全境猫主人都喜爱Purrify",
      description: "加入{{province}}数千名已彻底消除猫砂异味的满意猫主人。",
      averageRating: "⭐ 平均评分4.8/5",
      happyHomes: "🏠 {{audience}}+幸福家庭",
      fastShipping: "🚚 {{province}}快速配送"
    },
    faq: {
      heading: "{{city}}常见问题",
      delivery: {
        question: "你们配送到{{city}}，{{province}}吗？",
        answer: "是的！{{province}}全境快速配送，包括{{city}}的每个社区。订单在2-3个工作日内送达。"
      },
      painPoint: {
        question: "Purrify如何帮助面临{{painPoint}}的家庭？",
        answer: "在您常用的猫砂上撒上Purrify。活性炭与氨分子结合，即使在{{painPoint}}时也有效。无需改变猫咪的习惯即可获得清新空气。"
      },
      litterBrands: {
        question: "哪些猫砂品牌与{{city}}的Purrify搭配最佳？",
        answer: "Purrify适用于所有类型的猫砂——结团粘土、水晶、天然松木、玉米、小麦和豆腐猫砂。{{city}}猫主人将其与他们从独立宠物店购买的猫砂品牌搭配使用，它增强了所有猫砂的效果，而不会改变猫咪的偏好。"
      },
      climate: {
        question: "Purrify如何应对{{province}}的{{seasonalTip}}？",
        answer: "活性炭技术独立于温度和湿度运作。无论您在{{city}}面临{{seasonalTip}}，Purrify的分子除臭功能全天候持续工作。非常适合面临{{province}}气候挑战的{{keyFeature}}。"
      },
      stores: {
        question: "我能在{{city}}的宠物店找到Purrify吗？",
        answer: "{{city}}的许多独立零售商都有Purrify库存。提前致电确认库存，或在线订购，{{province}}全境保证2-3天送达。"
      },
      multiCat: {
        question: "Purrify对{{city}}的多猫家庭安全吗？",
        answer: "绝对安全！Purrify对多猫家庭完全安全。许多{{city}}家庭在2-4个猫砂盆中使用它。活性炭无毒、无香味，不会刺激敏感的猫咪。非常适合{{keyFeature}}。"
      }
    }
  },

  // Locations Hub and Province Pages
  locations: {
    hub: {
      badge: "全国覆盖",
      heading: "加拿大全境猫砂异味控制",
      description: "发现加拿大各地的Purrify销售点。选择您的省份，查找城市专属指南、配送信息和当地猫主人资源。",
      selectProvince: "选择您的省份",
      whyChoose: "为什么选择Purrify？",
      benefit1: "天然活性炭技术",
      benefit2: "适用于所有猫砂类型",
      benefit3: "加拿大全境快速配送",
      shopCta: "购买Purrify",
      citiesAvailable: "{{count}}个城市可用",
      cityAvailable: "1个城市可用",
      viewGuide: "查看省份指南 →",
      fastShipping: {
        title: "快速配送",
        description: "全省可靠配送，可追踪物流"
      },
      naturalSolution: {
        title: "天然解决方案",
        description: "活性炭技术，卓越异味控制"
      },
      localSupport: {
        title: "本地支持",
        description: "根据您的气候定制的城市专属指南"
      }
    },
    province: {
      badge: "省份指南",
      heading: "{{province}}猫砂异味控制",
      description: "查找{{province}}全境的Purrify零售商和快速配送选项。各大城市猫主人信赖之选。",
      citiesHeading: "我们在{{province}}服务的城市",
      viewCityGuide: "查看城市指南",
      cityCardDescription: "了解{{city}}的除臭解决方案",
      exploreOther: "探索其他省份",
      orderOnline: "在线订购快速配送",
      orderDescription: "找不到当地商店？{{province}}全境2-3个工作日内Purrify送货上门。"
    }
  },

  // Thank You / Order Confirmation Page
  thankYou: {
    heading: "谢谢您！",
    headingWithName: "谢谢您，{{name}}！",
    subheading: "您的订单已确认。",
    subheadingExtended: "您的订单已确认。准备好体验您拥有过的最清新的家吧！",
    orderConfirmed: "订单已确认",
    orderNumber: "订单号",
    product: "产品",
    quantity: "数量",
    total: "总计",
    expectedDelivery: "预计送达",
    deliveryCA: "加拿大境内7-10个工作日",
    deliveryUS: "美国10-14个工作日",
    deliveryIntl: "国际14-21个工作日",
    shipsWithin: "1-2个工作日内发货",
    confirmationSent: "确认邮件已发送至",
    checkSpam: "如果5分钟内未收到，请检查垃圾邮件文件夹",
    trackingInfo: "订单发货后，物流信息将发送到您的邮箱。",
    whatToExpect: {
      heading: "期待什么",
      step1Title: "收到您的Purrify",
      step1Desc: "您的包裹将以环保的隐蔽包装送达。每个容器都已密封以保持新鲜。",
      step2Title: "首次使用说明",
      step2Desc: "为获得最佳效果，请从干净的猫砂盆开始：",
      step2Item1: "清洁并更换猫砂盆",
      step2Item2: "在表面撒上薄薄一层Purrify",
      step2Item3: "无需混合 - 从表面起作用",
      step2Item4: "每次更换猫砂后重新使用",
      step3Title: "体验不同",
      step3Desc: "大多数客户在60秒内就能感受到差异！活性炭瞬间捕捉氨分子 - 不是遮盖，而是真正消除异味。",
      proTip: "专业提示：",
      proTipText: "少量即可！只需轻轻覆盖表面即可。过量使用不会造成伤害，但没有必要。"
    },
    shareSection: {
      heading: "分享清新",
      description: "认识有臭猫砂盆的人吗？分享您的推荐链接，他们将获得免费试用！",
      generating: "正在生成您的个人推荐链接...",
      whatsapp: "WhatsApp",
      facebook: "Facebook",
      email: "邮件"
    },
    autoshipCta: {
      heading: "再也不会断货",
      saveBadge: "节省30%",
      description: "订阅自动配送，每次订单节省30%，加上免费送货。随时取消。",
      savings: "节省",
      shipping: "配送",
      cancel: "取消",
      button: "升级至自动配送"
    },
    helpSection: {
      question: "问题？",
      weAreHere: "我们随时为您服务！",
      returnHome: "返回首页"
    },
    questionsHeading: "对订单有疑问？",
    questionsDescription: "联系我们的客服团队，我们很乐意为您提供帮助。",
    contactSupport: "联系客服",
    continueShopping: "继续购物",
    referralCta: {
      heading: "喜欢Purrify吗？",
      description: "与朋友分享，每次推荐可获得5加元积分！",
      button: "获取我的推荐链接"
    }
  },

  // Reviews Page
  reviews: {
    heading: "猫主人怎么说",
    subheading: "来自真实客户的真实评价",
    verifiedPurchase: "已验证购买",
    helpful: "有帮助",
    writeReview: "撰写评价",
    filterBy: "筛选",
    allRatings: "所有评分",
    sortBy: "排序",
    mostRecent: "最新",
    mostHelpful: "最有帮助",
    highestRated: "评分最高",
    lowestRated: "评分最低",
    showingReviews: "显示{{count}}条评价",
    noReviews: "暂无评价。成为第一个分享体验的人！",
    loadMore: "加载更多评价"
  },

  // Reviews Page (Full Page)
  reviewsPage: {
    pageTitle: "客户评价 - 真实见证",
    metaDescription: "★ 4.9/5评分 | 超过1,000名猫主人使用Purrify消除了猫砂盆异味。阅读真实评价。配送至美国和加拿大。",
    badge: "客户评价",
    heading: "来自快乐猫主人的真实故事",
    description: "了解为什么超过1,000名加拿大猫主人信任Purrify来自然消除猫砂盆异味。阅读来自加拿大各地真实客户的验证评价。",
    breadcrumb: {
      home: "首页",
      reviews: "评价"
    },
    stats: {
      averageRating: "平均评分",
      verifiedReviews: "已验证评价",
      happyCustomers: "满意客户",
      monthsInMarket: "上市月数"
    },
    reviewCard: {
      verified: "已验证",
      product: "产品",
      cats: "猫咪数量",
      useCase: "使用场景"
    },
    trustSection: {
      heading: "为什么客户信任Purrify",
      verifiedTitle: "已验证评价",
      verifiedDesc: "所有评价均来自使用过Purrify产品的验证购买者。",
      ratingTitle: "4.9/5评分",
      ratingDesc: "所有产品尺寸和客户类型均保持高评分。",
      customersTitle: "超过1,000名客户",
      customersDesc: "不断壮大的加拿大满意猫主人社区。"
    },
    ctaSection: {
      heading: "加入超过1,000名快乐猫主人",
      description: "获得与我们验证客户相同的效果。无风险试用Purrify，了解为什么它是加拿大最值得信赖的天然猫砂除臭剂。",
      shopNow: "立即购买",
      tryFreeSample: "试用免费样品"
    },
    relatedLinks: {
      heading: "了解更多关于Purrify",
      comparison: "产品比较",
      comparisonDesc: "查看Purrify的对比",
      caseStudies: "案例研究",
      caseStudiesDesc: "详细的成功故事",
      usageInfo: "使用信息",
      usageInfoDesc: "与猫和小猫一起使用",
      storeLocations: "门店位置",
      storeLocationsDesc: "查找附近的Purrify"
    }
  },

  // Related Articles Section
  relatedArticles: {
    title: "相关文章",
    readMore: "阅读更多"
  },

  // Review System Component
  reviewSystem: {
    customerReviews: "客户评价",
    reviews: "条评价",
    basedOn: "基于",
    wouldRecommend: "会推荐",
    verifiedPurchases: "已验证购买",
    viewAllReviews: "查看所有评价",
    loadMoreReviews: "加载更多评价",
    filters: {
      allRatings: "所有评分",
      stars: "星",
      star: "星",
      allSizes: "所有尺寸",
      trial: "12g 试用装",
      regular: "50g 标准装",
      large: "120g 大号装"
    },
    sort: {
      newestFirst: "最新优先",
      oldestFirst: "最早优先",
      highestRated: "评分最高",
      lowestRated: "评分最低",
      mostHelpful: "最有帮助"
    },
    review: {
      verifiedPurchase: "已验证购买",
      size: "尺寸",
      cat: "只猫",
      cats: "只猫",
      usingFor: "使用时长",
      helpful: "有帮助",
      recommendsProduct: "推荐此产品"
    }
  },

  // Social Follow CTA
  socialFollow: {
    headline: "关注我们获取更多技巧",
    description: "加入我们的社区，获取猫咪护理技巧和独家优惠。",
    followOn: "关注Purrify于"
  },

  // Affiliate Dashboard
  affiliateDashboard: {
    pageTitle: "联盟会员仪表板",
    loginTitle: "联盟会员登录",

    dashboard: "仪表板",
    earnings: "收益",
    payouts: "提现",
    settings: "设置",
    logout: "退出登录",

    overview: {
      welcome: "欢迎回来",
      yourCode: "您的联盟代码",
      copyCode: "复制代码",
      copiedCode: "已复制！",
      shareLink: "您的分享链接",
      copyLink: "复制链接",
      copiedLink: "链接已复制！"
    },

    stats: {
      totalClicks: "总点击数",
      totalConversions: "转化数",
      conversionRate: "转化率",
      pendingEarnings: "待结算收益",
      availableBalance: "可提现余额",
      totalEarnings: "累计收益",
      pendingNote: "佣金在30天后结算"
    },

    conversions: {
      title: "最近转化",
      noConversions: "暂无转化记录。分享您的链接开始赚钱！",
      date: "日期",
      orderId: "订单号",
      orderAmount: "订单金额",
      commission: "佣金",
      status: "状态",
      statusPending: "待结算",
      statusCleared: "已结算",
      statusPaid: "已支付",
      statusVoided: "已作废"
    },

    payoutsSection: {
      title: "提现记录",
      requestPayout: "申请提现",
      minimumPayout: "最低提现金额为$50",
      payoutMethod: "提现方式",
      paypalEmail: "PayPal邮箱",
      etransferEmail: "电子转账邮箱",
      amount: "金额",
      requestedDate: "申请日期",
      processedDate: "处理日期",
      status: "状态",
      statusPending: "待处理",
      statusProcessing: "处理中",
      statusCompleted: "已完成",
      statusRejected: "已拒绝",
      noPayouts: "暂无提现记录",
      insufficientBalance: "余额不足以提现",
      payoutRequested: "提现申请已成功提交"
    },

    settingsSection: {
      title: "账户设置",
      payoutSettings: "提现设置",
      payoutMethodLabel: "首选提现方式",
      paypalOption: "PayPal",
      etransferOption: "电子转账（仅限加拿大）",
      emailLabel: "提现邮箱地址",
      saveSettings: "保存设置",
      settingsSaved: "设置保存成功"
    },

    assets: {
      title: "营销素材",
      description: "下载横幅、产品图片和促销文案。",
      banners: "横幅广告",
      productImages: "产品图片",
      socialPosts: "社交媒体文案",
      brandGuide: "品牌指南",
      brandColors: "品牌颜色",
      guidelines: "使用规范",
      downloadAll: "全部下载",
      copyText: "复制文案"
    },

    login: {
      title: "联盟会员登录",
      email: "电子邮箱",
      password: "密码",
      rememberMe: "记住我",
      forgotPassword: "忘记密码？",
      loginButton: "登录",
      loggingIn: "登录中...",
      noAccount: "还不是联盟会员？",
      applyNow: "立即申请",
      invalidCredentials: "邮箱或密码错误",
      accountInactive: "您的联盟会员账户未激活"
    },

    errors: {
      loadFailed: "加载数据失败",
      saveFailed: "保存设置失败",
      payoutFailed: "提现申请失败",
      sessionExpired: "您的会话已过期，请重新登录。"
    }
  },

  // Try Free Landing Page (for Ad Campaigns)
  tryFreePage: {
    meta: {
      title: "免费试用Purrify - 仅需4.76美元运费 | 猫砂异味消除剂",
      description: "获取您的免费Purrify试用装 - 仅需支付4.76美元运费。30秒内消除猫砂异味。138+条五星评价。30天退款保证。"
    },
    hero: {
      badge: "限时优惠",
      headline: "免费试用Purrify",
      subheadline: "仅需4.76美元运费",
      description: "了解为什么1,000+猫主人信赖Purrify消除猫砂异味。立即获取您的免费试用装，体验不同之处。",
      cta: "获取我的免费试用装",
      shippingNote: "加拿大全境配送"
    },
    problem: {
      headline: "厌倦了屏住呼吸？",
      subheadline: "我们理解。那猫砂异味令人尴尬。",
      points: [
        "客人来访时匆忙检查猫砂盒",
        "冬天也要开窗通风只为驱散异味",
        "不断购买无效的空气清新剂",
        "担心家里闻起来像有猫住"
      ]
    },
    howItWorks: {
      headline: "30秒清新空气",
      subheadline: "简单三步",
      steps: [
        {
          number: "1",
          title: "撒入",
          description: "打开包装，撒在猫砂上"
        },
        {
          number: "2",
          title: "捕捉",
          description: "活性炭瞬间捕捉氨气分子"
        },
        {
          number: "3",
          title: "清新",
          description: "享受7天以上的无异味清新"
        }
      ]
    },
    socialProof: {
      headline: "加入1,000+快乐猫主人",
      rating: "4.9",
      reviewCount: "138",
      reviewLabel: "验证评价",
      testimonials: [
        {
          text: "我原本持怀疑态度，但几小时内我的整个公寓就闻起来很清新了。我的客人根本不知道我养猫！",
          author: "Sarah M.",
          location: "Toronto, ON"
        },
        {
          text: "终于有真正有效的产品了。不再需要用空气清新剂掩盖异味。",
          author: "Mike R.",
          location: "Vancouver, BC"
        },
        {
          text: "这是我花过的最值的4.76美元。已经订购了完整尺寸！",
          author: "Jennifer K.",
          location: "Montreal, QC"
        }
      ]
    },
    guarantee: {
      headline: "30天退款保证",
      description: "如果您对效果不满意，我们将退款。无需任何理由。",
      badge: "无风险试用"
    },
    finalCta: {
      headline: "准备好轻松呼吸了吗？",
      description: "立即获取您的免费Purrify试用装。仅需支付4.76美元运费。",
      buttonText: "获取我的免费试用装",
      note: "随时取消。无需订阅。"
    },
    trust: {
      madeInCanada: "加拿大制造",
      natural: "100%天然",
      fragrance: "无香料",
      secure: "安全结账"
    }
  },

  // 离线页面
  offlinePage: {
    title: "您处于离线状态",
    description: "看起来您失去了互联网连接。别担心 - 您仍可以浏览一些缓存页面。重新联机后，一切将恢复正常。",
    tryAgain: "重试",
    goHome: "返回首页",
    availableOffline: "离线可用",
    cachedPages: {
      homepage: "首页",
      trialSize: "试用装产品",
      howItWorks: "工作原理",
      contactSupport: "联系支持"
    },
    emergencyContact: "如需立即帮助，您也可以致电我们"
  },

  // 表单（标准化消息）
  forms: {
    success: {
      general: "感谢您联系我们！我们将在24小时内回复您。",
      b2bContact: "感谢您的关注！我们的团队将在24-48小时内与您联系，讨论后续步骤。",
      retailerContact: "感谢您的关注！我们的合作伙伴团队将在24-48小时内与您联系，讨论价格和后续步骤。",
      hospitalityContact: "谢谢！我们的酒店团队将在24小时内与您联系，为您的物业提供定制价格。",
      shelterContact: "感谢您的关注！我们的团队将在24-48小时内与您联系，讨论我们如何支持您的收容所。",
      groomerContact: "感谢您的关注！我们的合作伙伴团队将在24-48小时内与您联系，讨论后续步骤。",
      vetContact: "感谢您的关注！我们的兽医团队将在24-48小时内与您联系，讨论合作机会。",
      catCafeContact: "感谢您的关注！我们的团队将在24-48小时内与您联系，讨论Purrify如何使您的猫咖受益。"
    },
    errors: {
      pleaseEnterTitle: "请输入标题",
      invalidEmail: "电子邮件或密码无效",
      requiredField: "此字段为必填项",
      submitFailed: "提交表单失败。请重试。"
    }
  },

  // 产品页面
  productPages: {
    cancelAnytime: "随时取消。免费配送。",
    shipsFree: "免费配送",
    subscribeAndSave: "订阅并节省",
    save: "节省",
    savePercent: "节省{percent}%",
    perMonth: "每月",
    billedQuarterly: "按季度计费",
    shippingSavings: "每单节省$15-20+，相比单独购买",
    save25vsStandard: "相比购买两个标准装节省25%",
    save25FamilyPack: "家庭装节省25%"
  },

  // 科学页面
  sciencePage: {
    seo: {
      title: "活性炭如何消除猫砂异味：科学原理",
      description: "氨分子为0.26纳米。我们的微孔经过精确设计以捕获它们。以下是工程化孔隙结构如何捕获尿液（氨）和粪便（硫醇）异味。"
    },
    breadcrumb: {
      home: "首页",
      learn: "学习",
      science: "科学"
    },
    hero: {
      heading: "精心设计以消除猫砂异味",
      description: "与研究科学家合作，我们设计了完美的孔隙结构来捕获尿液中的氨和粪便中的硫醇——这两种分子是猫砂盒独特气味的来源。",
      ctaButton: "体验科学"
    },
    understanding: {
      sectionTitle: "理解猫砂异味：两大罪魁祸首",
      description: "那种独特的猫砂盒气味来自两种特定分子。要消除它们，您需要了解它们。",
      ammonia: {
        title: "氨（NH₃）",
        subtitle: "来自猫尿",
        smell: "刺鼻、呛人、刺激眼睛——像清洁剂的味道",
        moleculeSize: "微小，仅0.26纳米",
        problem: "当细菌分解尿液中的尿素时形成",
        whyHard: "大多数活性炭的孔隙太大，无法捕获如此小的分子"
      },
      mercaptans: {
        title: "硫醇",
        subtitle: "来自猫粪",
        smell: "臭鸡蛋、下水道、硫磺——令人作呕的感觉",
        moleculeSize: "更大、更复杂的硫化合物",
        problem: "当粪便中的蛋白质分解时释放",
        whyHard: "粘性分子需要特定孔径才能捕获"
      },
      breakthrough: "这里是突破：大多数活性炭是为水过滤或一般空气净化而设计的。我们与研究科学家合作，专门针对这两种分子设计活性炭——为猫砂异味创造了完美的陷阱。"
    },
    imageCaptions: {
      freshHome: {
        title: "您的猫咪值得拥有清新的家",
        description: "分子级除臭，而非掩盖"
      },
      noOdors: {
        title: "告别尴尬异味",
        description: "科学支持的异味控制，适合现代猫主人"
      }
    },
    poreSize: {
      sectionTitle: "完美的孔径分布",
      description: "实验室测试确认我们优化的微孔-介孔-大孔比例",
      micropores: {
        size: "<2纳米",
        title: "微孔",
        specialist: "氨专家",
        target: "NH₃（0.26纳米）",
        density: "最高浓度",
        function: "锁住最小的异味分子"
      },
      mesopores: {
        size: "2-50纳米",
        title: "介孔",
        specialist: "硫醇陷阱",
        target: "硫化合物",
        density: "优化比例",
        function: "捕获复杂的粪便异味"
      },
      macropores: {
        size: ">50纳米",
        title: "大孔",
        specialist: "运输系统",
        target: "所有分子",
        density: "战略布局",
        function: "快速输送到捕获位点"
      },
      surfaceArea: {
        title: "表面积：1050平方米/克",
        description: "仅一克Purrify™就有超过12个网球场大小的除臭表面积",
        iodineNumber: "碘值 毫克/克",
        ctcAdsorption: "CTC吸附",
        hardness: "硬度",
        moisture: "水分"
      }
    },
    scienceFacts: {
      sectionTitle: "精密工程孔隙结构",
      description: "并非所有活性炭都相同。我们与科学家合作，优化猫砂异味的每个细节。",
      facts: [
        {
          title: "工程化孔隙架构",
          description: "与研究科学家合作，我们优化了微孔（< 2纳米）、介孔（2-50纳米）和大孔（> 50纳米）的精确比例，为猫砂异味分子创造了完美的陷阱。"
        },
        {
          title: "氨捕获精通",
          description: "来自猫尿的氨分子（NH₃）非常微小——只有0.26纳米。我们富含微孔的结构创造了数百万个完美尺寸的捕获位点，在您闻到之前就锁住氨。"
        },
        {
          title: "硫醇消除",
          description: "硫醇（硫化合物）赋予粪便独特的臭鸡蛋味。我们的介孔通道专门设计用于永久捕获这些更大、更复杂的分子。"
        },
        {
          title: "三孔协同作用",
          description: "大孔充当高速公路，将异味分子深入输送到活性炭中。介孔捕获中等大小的硫化合物。微孔捕获最小的氨分子。无一遗漏。"
        }
      ]
    },
    microscopicView: {
      imageCaptions: {
        microscope: "研究级显微镜揭示孔隙结构",
        labTesting: "实验室测试确认优化性能",
        molecular: "分子级捕获异味化合物"
      },
      whatYoureLookingAt: {
        title: "您正在查看的内容",
        description: "这些图像展示了我们优化孔隙结构背后的实验室研究。每个微小的通道和空腔都是一个陷阱，等待在分子水平上捕获异味分子。",
        bullets: [
          "数百万个孔隙创造巨大表面积（1050平方米/克）",
          "不同孔径 = 捕获不同异味分子",
          "一旦被捕获，分子无法逃回空气中"
        ]
      },
      quote: {
        text: "关键不仅是拥有孔隙，而是拥有正确尺寸的孔隙，以正确的比例，用于捕获您想要捕获的特定分子。",
        attribution: "与活性炭科学家的研究合作"
      }
    },
    technicalPerformance: {
      sectionTitle: "实验室验证性能",
      description: "活性炭测试的真实数据确认我们优化的孔隙结构提供卓越吸附",
      particleSize: {
        title: "8×30目颗粒分布",
        effectiveSize: "有效粒径：",
        meanDiameter: "平均直径：",
        uniformityCoefficient: "均匀系数：",
        whyMatters: "为什么重要：一致的颗粒尺寸确保通过猫砂的均匀流动和与异味分子的最大接触。我们的8×30目专门设计用于猫砂的最佳性能。"
      },
      adsorption: {
        title: "快速脱氯性能",
        halfLength: "半长值：",
        apparentDensity: "表观密度：",
        betSurface: "BET表面积：",
        whyMatters: "为什么重要：快速氯去除证明了活性炭的微孔结构高度活跃。如果它能如此快速地捕获氯分子，氨就毫无机会。"
      }
    },
    engineeredPerformance: {
      title: "为真实世界性能而设计",
      description: "实验室测试表明，我们的8×30目活性炭在不同温度（5-25°C）下保持最佳流动特性和最小压力损失。这意味着无论您的猫砂盒在凉爽的地下室还是温暖的浴室，都能持续捕获异味。",
      stats: {
        temperatureRange: "5-25°C",
        temperatureLabel: "温度范围",
        performanceLabel: "性能",
        pressureLossLabel: "压力损失"
      }
    },
    processTimeline: {
      sectionTitle: "三种孔隙类型如何协同工作",
      description: "我们经研究支持的孔隙架构创造了专门为猫砂异味设计的捕获系统。",
      steps: [
        {
          title: "罪魁祸首：氨和硫醇",
          description: "猫尿分解成氨（NH₃）——那种刺鼻、刺激眼睛的气味。粪便释放硫醇——闻起来像臭鸡蛋或下水道的硫化合物。这些是我们设计Purrify来捕获的分子。"
        },
        {
          title: "大孔：快速通道",
          description: "大孔（> 50纳米）充当高速公路，快速将异味分子深入输送到活性炭结构中。把它们想象成防止瓶颈的入口点。"
        },
        {
          title: "介孔：硫醇陷阱",
          description: "中等大小的介孔（2-50纳米）完美尺寸用于捕获硫醇和粪便中的其他硫化合物。这些孔隙创造了紧密的抓握，不会松开。"
        },
        {
          title: "微孔：氨消除器",
          description: "微小的微孔（< 2纳米）针对氨的0.26纳米尺寸进行了优化。每克有数百万个这样的捕获位点，氨分子在您闻到之前就被永久锁住。"
        }
      ]
    },
    researchSection: {
      title: "世界上最有效的猫砂异味解决方案",
      description: "通过设计完美的微孔-介孔-大孔比例，我们创造了专门优化用于捕获氨和硫醇的活性炭——正是使猫砂盒产生异味的分子。",
      stats: {
        ammoniaSize: "0.26纳米",
        ammoniaSizeLabel: "氨分子大小 - 完美匹配的微孔",
        poreTypes: "3种孔隙类型",
        poreTypesLabel: "微 + 介 + 大 = 完全捕获",
        surfaceArea: "1050平方米/克",
        surfaceAreaLabel: "表面积 - 数百万个捕获位点"
      },
      buttons: {
        experience: "体验科学",
        learnMore: "了解更多"
      }
    },
    backToLearn: "返回学习"
  }

};
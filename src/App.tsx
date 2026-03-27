import { useState, useEffect, useRef } from 'react';

const BRAND = '#0061FF';

const ACCOUNTS = [
  {
    id: 1,
    company: 'Adidas',
    industry: 'Retail/Apparel',
    cmo: 'Florian Alt',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 9,
    strikeWindow: 'green',
    dealSize: '$2.2M',
    currentDSP: 'The Trade Desk',
    warmPath: true,
    warmConnector:
      'Nike/Adidas crossover contacts via sports marketing circuit',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: "Adidas 'Own the Game' strategy driving massive programmatic CTV push across NA markets",
        date: '3 days ago',
      },
      {
        type: 'hot',
        text: 'Job posting: Sr. Director Programmatic & Paid Media — signals DSP consolidation review',
        date: '1 week ago',
      },
    ],
    contacts: [
      {
        name: 'Florian Alt',
        title: 'CMO',
        angle: 'Owns full global brand + performance budget',
      },
      {
        name: 'Brian Grevy',
        title: 'GM Global Brands',
        angle: 'Key influencer on media investment strategy',
      },
    ],
  },
  {
    id: 2,
    company: 'AEG',
    industry: 'Live Entertainment/Sports',
    cmo: 'Todd Mortensen',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 7,
    strikeWindow: 'yellow',
    dealSize: '$1.4M',
    currentDSP: 'DV360',
    warmPath: false,
    warmConnector: '',
    stage: 'Cold',
    signals: [
      {
        type: 'warm',
        text: 'AEG expanding venue digital marketing — LA Live + Coachella programmatic budgets growing',
        date: '1 week ago',
      },
      {
        type: 'warm',
        text: 'Venue ticketing + sponsor activation requiring smarter geo-targeted programmatic',
        date: '2 weeks ago',
      },
    ],
    contacts: [
      {
        name: 'Todd Mortensen',
        title: 'CMO',
        angle: 'Owns marketing for all AEG venues + events',
      },
    ],
  },
  {
    id: 3,
    company: 'Amazon',
    industry: 'E-Commerce/Tech',
    cmo: 'Jo Shoesmith',
    cmoTitle: 'Global Chief Creative Officer',
    intentScore: 8,
    strikeWindow: 'green',
    dealSize: '$4.5M',
    currentDSP: 'Amazon DSP + TTD for brand',
    warmPath: false,
    warmConnector: '',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'Amazon brand campaigns increasingly buying external DSPs for incremental reach beyond owned inventory',
        date: '4 days ago',
      },
      {
        type: 'warm',
        text: 'Amazon Ads hiring aggressively — signals external DSP evaluation underway',
        date: '1 week ago',
      },
    ],
    contacts: [
      {
        name: 'Jo Shoesmith',
        title: 'Global CCO',
        angle: 'Drives brand creative + media strategy',
      },
      {
        name: 'Colleen Aubrey',
        title: 'SVP Ad Products & Tech',
        angle: 'Decision maker on DSP relationships',
      },
    ],
  },
  {
    id: 4,
    company: 'AMC Networks International',
    industry: 'Entertainment/Media',
    cmo: 'Mariela Ferretti',
    cmoTitle: 'EVP & Chief Marketing Officer',
    intentScore: 8,
    strikeWindow: 'green',
    dealSize: '$1.6M',
    currentDSP: 'Mixed TTD + DV360',
    warmPath: true,
    warmConnector: 'Shared agency contact at Omnicom media group',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'AMC+ streaming tier expansion driving new programmatic acquisition campaigns across CTV + display',
        date: '5 days ago',
      },
      {
        type: 'hot',
        text: 'The Walking Dead universe + new original content slate — large media buy windows opening',
        date: '1 week ago',
      },
    ],
    contacts: [
      {
        name: 'Mariela Ferretti',
        title: 'EVP & CMO',
        angle: 'Full P&L for marketing + subscriber acquisition',
      },
    ],
  },
  {
    id: 5,
    company: 'Bloomberg L.P.',
    industry: 'B2B Media/Finance',
    cmo: 'Julia Beizer',
    cmoTitle: 'Chief Digital Officer',
    intentScore: 7,
    strikeWindow: 'yellow',
    dealSize: '$1.8M',
    currentDSP: 'DV360',
    warmPath: false,
    warmConnector: '',
    stage: 'Cold',
    signals: [
      {
        type: 'warm',
        text: 'Bloomberg Media expanding programmatic B2B audience targeting — finance vertical a key StackAdapt strength',
        date: '2 weeks ago',
      },
      {
        type: 'warm',
        text: 'Bloomberg Terminal subscriber acquisition campaigns shifting to programmatic channels',
        date: '3 weeks ago',
      },
    ],
    contacts: [
      {
        name: 'Julia Beizer',
        title: 'Chief Digital Officer',
        angle: 'Owns digital marketing + media strategy',
      },
      {
        name: 'Keith Grossman',
        title: 'President, Bloomberg Media',
        angle: 'Key budget holder for audience campaigns',
      },
    ],
  },
  {
    id: 6,
    company: 'Capcom',
    industry: 'Gaming/Entertainment',
    cmo: 'Matt Dahlgren',
    cmoTitle: 'VP Marketing, Americas',
    intentScore: 9,
    strikeWindow: 'green',
    dealSize: '$1.2M',
    currentDSP: 'The Trade Desk',
    warmPath: true,
    warmConnector: 'Electronic Arts + Capcom share agency roster at WPP',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'Street Fighter 6 DLC + Monster Hunter Wilds launch — massive 2025 media budget activated',
        date: '2 days ago',
      },
      {
        type: 'hot',
        text: "Gaming programmatic is StackAdapt's strongest vertical — Capcom is a direct fit",
        date: '1 week ago',
      },
    ],
    contacts: [
      {
        name: 'Matt Dahlgren',
        title: 'VP Marketing Americas',
        angle: 'Controls NA programmatic + gaming media',
      },
    ],
  },
  {
    id: 7,
    company: 'Cox Enterprises',
    industry: 'Media/Automotive/Broadband',
    cmo: 'Jennifer Peña',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 7,
    strikeWindow: 'yellow',
    dealSize: '$2.0M',
    currentDSP: 'DV360',
    warmPath: false,
    warmConnector: '',
    stage: 'Cold',
    signals: [
      {
        type: 'warm',
        text: 'Cox Automotive (Autotrader, Kelley Blue Book) running major programmatic campaigns — consolidation opportunity',
        date: '1 week ago',
      },
      {
        type: 'warm',
        text: 'Cox Communications broadband subscriber growth campaigns scaling digitally',
        date: '2 weeks ago',
      },
    ],
    contacts: [
      {
        name: 'Jennifer Peña',
        title: 'CMO',
        angle:
          "Oversees marketing across Cox's media + auto + broadband businesses",
      },
    ],
  },
  {
    id: 8,
    company: 'Electronic Arts',
    industry: 'Gaming/Entertainment',
    cmo: 'Chris Bruzzo',
    cmoTitle: 'Chief Experience Officer',
    intentScore: 9,
    strikeWindow: 'green',
    dealSize: '$2.8M',
    currentDSP: 'The Trade Desk',
    warmPath: true,
    warmConnector: 'EA + StackAdapt share contacts at IAB Gaming committee',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'EA Sports FC + Madden NFL 26 launch windows — multi-platform programmatic spend at peak',
        date: '3 days ago',
      },
      {
        type: 'hot',
        text: 'EA shifting from linear TV to programmatic CTV + gaming native — perfect StackAdapt fit',
        date: '5 days ago',
      },
    ],
    contacts: [
      {
        name: 'Chris Bruzzo',
        title: 'Chief Experience Officer',
        angle: 'Owns brand, media, and player experience',
      },
      {
        name: 'David Tinson',
        title: 'Chief Marketing Officer',
        angle: 'Day-to-day media buying decisions',
      },
    ],
  },
  {
    id: 9,
    company: 'Epic Games',
    industry: 'Gaming/Technology',
    cmo: 'Matthew Weissinger',
    cmoTitle: 'VP Marketing',
    intentScore: 8,
    strikeWindow: 'green',
    dealSize: '$2.5M',
    currentDSP: 'Mixed + direct buys',
    warmPath: false,
    warmConnector: '',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'Fortnite Chapter 6 live — Epic running massive cross-channel user acquisition campaigns',
        date: '1 week ago',
      },
      {
        type: 'warm',
        text: 'Epic Games Store competing aggressively with Steam — programmatic acquisition budget growing',
        date: '2 weeks ago',
      },
    ],
    contacts: [
      {
        name: 'Matthew Weissinger',
        title: 'VP Marketing',
        angle: 'Controls all Fortnite + Epic Store media',
      },
    ],
  },
  {
    id: 10,
    company: 'Fox Entertainment Group',
    industry: 'Entertainment/Broadcasting',
    cmo: 'Robert Marick',
    cmoTitle: 'EVP Marketing & Creative',
    intentScore: 8,
    strikeWindow: 'green',
    dealSize: '$2.3M',
    currentDSP: 'The Trade Desk',
    warmPath: true,
    warmConnector:
      'Fox Advertising team overlap with StackAdapt publisher network',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'Fox fall premiere season + NFL rights — massive programmatic promotion budget in play NOW',
        date: '2 days ago',
      },
      {
        type: 'hot',
        text: 'Fox One streaming app launch driving programmatic subscriber acquisition campaigns',
        date: '1 week ago',
      },
    ],
    contacts: [
      {
        name: 'Robert Marick',
        title: 'EVP Marketing & Creative',
        angle: 'Controls all Fox Entertainment promotional media',
      },
    ],
  },
  {
    id: 11,
    company: 'IAC/InterActiveCorp',
    industry: 'Digital Media/Technology',
    cmo: 'Kendall Handler',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 7,
    strikeWindow: 'yellow',
    dealSize: '$1.5M',
    currentDSP: 'DV360',
    warmPath: false,
    warmConnector: '',
    stage: 'Cold',
    signals: [
      {
        type: 'warm',
        text: 'IAC portfolio (Dotdash Meredith, Angi, Care.com) running separate programmatic — consolidation play possible',
        date: '2 weeks ago',
      },
      {
        type: 'warm',
        text: 'Dotdash Meredith digital transformation shifting ad dollars to programmatic performance',
        date: '3 weeks ago',
      },
    ],
    contacts: [
      {
        name: 'Kendall Handler',
        title: 'CMO',
        angle: 'Cross-portfolio marketing strategy owner',
      },
      {
        name: 'Neil Vogel',
        title: 'CEO, Dotdash Meredith',
        angle: 'Key decision maker on programmatic media',
      },
    ],
  },
  {
    id: 12,
    company: 'Lionsgate Entertainment',
    industry: 'Entertainment/Film',
    cmo: 'Deron Triff',
    cmoTitle: 'EVP Digital Marketing',
    intentScore: 8,
    strikeWindow: 'green',
    dealSize: '$1.5M',
    currentDSP: 'The Trade Desk',
    warmPath: true,
    warmConnector:
      'LA studio circuit — shared events with Sony + Paramount contacts',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'John Wick universe + Hunger Games franchise extensions — 2025 theatrical slate is massive',
        date: '4 days ago',
      },
      {
        type: 'hot',
        text: 'Lionsgate+ streaming service growing — programmatic subscriber acquisition campaigns scaling',
        date: '1 week ago',
      },
    ],
    contacts: [
      {
        name: 'Deron Triff',
        title: 'EVP Digital Marketing',
        angle: 'Controls digital + programmatic for all theatrical releases',
      },
    ],
  },
  {
    id: 13,
    company: 'Live Nation Entertainment',
    industry: 'Live Entertainment/Ticketing',
    cmo: 'Melissa Miller',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 9,
    strikeWindow: 'green',
    dealSize: '$2.1M',
    currentDSP: 'Mixed TTD + direct',
    warmPath: true,
    warmConnector:
      'SeatGeek + StubHub overlapping contacts create warm intro path',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: '2025 concert season announced — major events driving geo-targeted programmatic campaigns',
        date: '2 days ago',
      },
      {
        type: 'hot',
        text: "Live Nation using programmatic to drive last-mile ticket sales — StackAdapt's CTV + native is perfect fit",
        date: '5 days ago',
      },
    ],
    contacts: [
      {
        name: 'Melissa Miller',
        title: 'CMO',
        angle: 'Owns all venue + event marketing globally',
      },
    ],
  },
  {
    id: 14,
    company: 'News Corporation',
    industry: 'Media/Publishing',
    cmo: 'David Kline',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 6,
    strikeWindow: 'yellow',
    dealSize: '$1.7M',
    currentDSP: 'DV360',
    warmPath: false,
    warmConnector: '',
    stage: 'Cold',
    signals: [
      {
        type: 'warm',
        text: "News Corp's digital properties (WSJ, NY Post, Dow Jones) running programmatic audience extension campaigns",
        date: '2 weeks ago',
      },
      {
        type: 'warm',
        text: 'Subscription acquisition for WSJ shifting to performance programmatic channels',
        date: '3 weeks ago',
      },
    ],
    contacts: [
      {
        name: 'David Kline',
        title: 'CMO',
        angle: 'Cross-portfolio marketing strategy',
      },
      {
        name: 'Suzi Watford',
        title: 'EVP Marketing, WSJ',
        angle: 'Day-to-day subscription + acquisition campaigns',
      },
    ],
  },
  {
    id: 15,
    company: 'Nike',
    industry: 'Retail/Apparel',
    cmo: 'Nicole Hubbard Graham',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 10,
    strikeWindow: 'green',
    dealSize: '$3.2M',
    currentDSP: 'The Trade Desk',
    warmPath: true,
    warmConnector:
      'Steve Wharton + Creed Petit both know Wesley Collett (wes.collett@nike.com) — Director, Integrated Media, Brand Jordan NA. Two confirmed warm paths in.',
    stage: 'Engaged',
    agencyPartners: [
      {
        agency: 'PMG',
        role: 'AOR — Programmatic & Digital Media',
        location: 'Dallas, TX',
        contact: 'Earl Hwang',
        contactTitle: 'Programmatic Lead',
        connection: 'Creed Petit knows Earl directly',
        connectionType: 'warm',
      },
      {
        agency: 'Wieden+Kennedy',
        role: 'AOR — Creative & Above-the-Line Digital',
        location: 'Portland, OR',
        contact: 'Brian Goldstein',
        contactTitle: 'Digital Strategy',
        connection: 'Bo Janes knows Brian directly',
        connectionType: 'warm',
      },
    ],
    economicBuyer: {
      name: 'Joe Brooks',
      title: 'Head of North America Integrated Media',
      company: 'Nike',
      note: 'Economic Buyer — controls NA integrated media budget. All programmatic strategy flows through Joe.',
    },
    meddpicc: {
      metrics: {
        status: 'partial',
        note: 'Nike shifting from brand to performance — StackAdapt can show ROAS lift vs TTD, CPM efficiency on CTV + native',
      },
      economicBuyer: {
        status: 'identified',
        note: 'Joe Brooks — Head of NA Integrated Media. Economic Buyer confirmed.',
      },
      decisionCriteria: {
        status: 'unknown',
        note: "Need to map: TTD contract terms, DV360 usage, PMG's DSP preferences. Earl Hwang at PMG likely holds this intel.",
      },
      decisionProcess: {
        status: 'partial',
        note: 'PMG runs activation — Nike brand approves strategy. Brian Goldstein (W+K) influences creative-to-media alignment.',
      },
      paperProcess: {
        status: 'unknown',
        note: 'Unknown — likely routed through PMG as buying entity. Need to establish if Nike or agency holds IO.',
      },
      pain: {
        status: 'strong',
        note: 'Elliott Hill brand reset = urgency. Nike needs performance DSP to prove digital ROI. TTD not delivering on lower-funnel metrics.',
      },
      champion: {
        status: 'identified',
        note: 'Wesley Collett — Dir. Integrated Media, Brand Jordan NA. Warm contact via Steve + Creed. Can champion internally.',
      },
      competition: {
        status: 'known',
        note: 'The Trade Desk (incumbent). DV360 in mix. PMG may have preferred DSP relationships — need to qualify with Earl.',
      },
    },
    signals: [
      {
        type: 'hot',
        text: 'Nike brand reset under new CEO Elliott Hill — massive media investment shift to digital performance',
        date: '2 days ago',
      },
      {
        type: 'hot',
        text: 'Job posting: VP Programmatic Media — signals DSP strategy overhaul in progress',
        date: '4 days ago',
      },
    ],
    contacts: [
      {
        name: 'Nicole Hubbard Graham',
        title: 'CMO',
        email: '',
        phone: '',
        angle: 'Owns full brand + performance budget globally',
      },
      {
        name: 'Wesley Collett',
        title: 'Director, Integrated Media — Brand Jordan NA',
        email: 'wes.collett@nike.com',
        phone: '',
        angle:
          'WARM CONTACT via Steve Wharton + Creed Petit — entry point into Nike media buying',
      },
      {
        name: 'Jackie Harshman',
        title: 'Director, Integrated Media (North America)',
        email: 'jackie.harshman@nike.com',
        phone: '',
        angle:
          'Key integrated media decision maker — controls cross-channel NA buys',
      },
      {
        name: 'Allison Springer',
        title: "Director, Women's Integrated Media (NA)",
        email: 'allison.springer@nike.com',
        phone: '',
        angle: "Controls NA women's integrated media budget",
      },
      {
        name: 'Marco Ramo',
        title: 'AdTech, Data & Experimentation Director, Integrated Media',
        email: 'marco.ramo@nike.com',
        phone: '',
        angle:
          'AdTech decision maker — StackAdapt tech + data story lands here',
      },
      {
        name: 'Jacqueline Reum',
        title: 'Manager, Programmatic Display & Video',
        email: '',
        phone: '',
        angle:
          'DIRECT DSP BUYER — owns programmatic display & video budget at Nike',
      },
      {
        name: 'Kamauri Yeh',
        title: 'Global VP, Digital Integrated Retail Marketing',
        email: 'kamauri.yeh@nike.com',
        phone: '(503) 671-4469',
        angle: 'Senior budget holder — strategic exec relationship target',
      },
      {
        name: 'Brittany Grosvenor',
        title: 'Global Seasonal Strategy Director, Integrated Media',
        email: 'brittany.grosvenor@nike.com',
        phone: '',
        angle: 'Controls global seasonal media strategy + planning',
      },
    ],
  },
  {
    id: 16,
    company: 'Nordstrom',
    industry: 'Retail/Luxury',
    cmo: 'Alejandra Meza',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 7,
    strikeWindow: 'yellow',
    dealSize: '$1.3M',
    currentDSP: 'DV360',
    warmPath: false,
    warmConnector: '',
    stage: 'Cold',
    signals: [
      {
        type: 'warm',
        text: 'Nordstrom going private — new ownership likely to rethink media strategy and DSP relationships',
        date: '1 week ago',
      },
      {
        type: 'warm',
        text: 'Nordstrom Rack expansion driving performance-focused programmatic acquisition campaigns',
        date: '2 weeks ago',
      },
    ],
    contacts: [
      {
        name: 'Alejandra Meza',
        title: 'CMO',
        angle: 'Full brand + performance marketing owner',
      },
    ],
  },
  {
    id: 17,
    company: 'Paramount',
    industry: 'Entertainment/Streaming',
    cmo: 'Marc Weinstock',
    cmoTitle: 'President, Worldwide Marketing',
    intentScore: 8,
    strikeWindow: 'green',
    dealSize: '$2.4M',
    currentDSP: 'Mixed TTD + DV360',
    warmPath: true,
    warmConnector: 'Shared agency relationships at Publicis Media',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'Paramount+ + Pluto TV merger strategy — massive programmatic subscriber acquisition in play',
        date: '3 days ago',
      },
      {
        type: 'hot',
        text: 'Mission Impossible + Sonic 4 theatrical slate — 2025 P&A budgets confirmed massive',
        date: '1 week ago',
      },
    ],
    contacts: [
      {
        name: 'Marc Weinstock',
        title: 'President Worldwide Marketing',
        angle: 'Controls theatrical + streaming P&A',
      },
      {
        name: 'Ron Feinbaum',
        title: 'EVP Media',
        angle: 'Day-to-day programmatic decisions',
      },
    ],
  },
  {
    id: 18,
    company: 'Roblox Corporation',
    industry: 'Gaming/Metaverse',
    cmo: 'Barbara Messing',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 9,
    strikeWindow: 'green',
    dealSize: '$1.8M',
    currentDSP: 'Mixed + direct',
    warmPath: true,
    warmConnector:
      'Epic Games + Roblox share investor network (Andreessen Horowitz)',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'Roblox expanding ad platform — also buying programmatic to drive developer + brand partner acquisition',
        date: '3 days ago',
      },
      {
        type: 'hot',
        text: 'Roblox 88M DAU — running massive programmatic campaigns targeting Gen Z + Gen Alpha',
        date: '5 days ago',
      },
    ],
    contacts: [
      {
        name: 'Barbara Messing',
        title: 'CMO',
        angle: 'Owns brand + growth marketing for Roblox platform',
      },
    ],
  },
  {
    id: 19,
    company: 'SeatGeek',
    industry: 'Ticketing/Live Events',
    cmo: 'Ian Donahue',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 8,
    strikeWindow: 'green',
    dealSize: '$1.1M',
    currentDSP: 'The Trade Desk',
    warmPath: true,
    warmConnector:
      'Live Nation + StubHub contacts create cluster warm intro opportunity',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: "SeatGeek's official NFL + MLS ticketing partnerships driving aggressive performance media spend",
        date: '4 days ago',
      },
      {
        type: 'hot',
        text: 'Competing head-on with Ticketmaster — acquisition campaigns in overdrive for 2025 event season',
        date: '1 week ago',
      },
    ],
    contacts: [
      {
        name: 'Ian Donahue',
        title: 'CMO',
        angle: 'Full brand + performance acquisition budget',
      },
    ],
  },
  {
    id: 20,
    company: 'Skims',
    industry: 'Retail/DTC Apparel',
    cmo: 'Minal Patel',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 9,
    strikeWindow: 'green',
    dealSize: '$1.0M',
    currentDSP: 'Mixed direct + TTD',
    warmPath: false,
    warmConnector: '',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'Skims expanding from DTC to retail (Nordstrom partnership) — programmatic reach strategy shifting dramatically',
        date: '2 days ago',
      },
      {
        type: 'hot',
        text: "Skims men's line launch + NBA partnership driving new audience acquisition campaigns",
        date: '1 week ago',
      },
    ],
    contacts: [
      {
        name: 'Minal Patel',
        title: 'CMO',
        angle: 'Owns full performance + brand media strategy',
      },
    ],
  },
  {
    id: 21,
    company: 'Sony',
    industry: 'Entertainment/Technology',
    cmo: 'Kenji Tanaka',
    cmoTitle: 'Global CMO',
    intentScore: 8,
    strikeWindow: 'green',
    dealSize: '$3.5M',
    currentDSP: 'DV360 primarily',
    warmPath: true,
    warmConnector:
      'Sony Pictures + PlayStation overlap creates cross-division intro path',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'PlayStation 5 Pro + major game releases — massive programmatic gaming + entertainment spend',
        date: '3 days ago',
      },
      {
        type: 'hot',
        text: 'Sony Pictures theatrical slate 2025: across-division programmatic coordination opportunity',
        date: '1 week ago',
      },
    ],
    contacts: [
      {
        name: 'Kenji Tanaka',
        title: 'Global CMO',
        angle: 'Cross-division Sony brand + media owner',
      },
      {
        name: 'Eric Lempel',
        title: 'SVP Marketing, PlayStation',
        angle: 'Controls gaming media budget',
      },
    ],
  },
  {
    id: 22,
    company: 'Starbucks',
    industry: 'QSR/Food & Beverage',
    cmo: 'Tressie Lieberman',
    cmoTitle: 'Global Chief Brand Officer',
    intentScore: 9,
    strikeWindow: 'green',
    dealSize: '$2.0M',
    currentDSP: 'DV360',
    warmPath: true,
    warmConnector: 'StackAdapt CEO connection via AdTech council',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: "New CEO Brian Niccol's 'Back to Starbucks' push — massive brand media reset underway",
        date: '2 days ago',
      },
      {
        type: 'hot',
        text: 'Digital + loyalty marketing overhaul — programmatic strategy under full review',
        date: '4 days ago',
      },
    ],
    contacts: [
      {
        name: 'Tressie Lieberman',
        title: 'Global Chief Brand Officer',
        angle: 'Owns global brand narrative + media investment',
      },
      {
        name: 'Brady Brewer',
        title: 'Chief Loyalty Officer',
        angle: 'Controls digital + loyalty media',
      },
    ],
  },
  {
    id: 23,
    company: 'StubHub',
    industry: 'Ticketing/Marketplace',
    cmo: 'Perri Tomkiewicz',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 8,
    strikeWindow: 'green',
    dealSize: '$1.2M',
    currentDSP: 'The Trade Desk',
    warmPath: true,
    warmConnector:
      'SeatGeek + Live Nation cluster — same ticketing industry contacts',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'StubHub IPO prep — growth marketing investment ramping dramatically ahead of public offering',
        date: '3 days ago',
      },
      {
        type: 'hot',
        text: 'Competing for event season dominance vs Ticketmaster + SeatGeek — acquisition spend at all-time high',
        date: '5 days ago',
      },
    ],
    contacts: [
      {
        name: 'Perri Tomkiewicz',
        title: 'CMO',
        angle: 'Full growth + brand media budget',
      },
    ],
  },
  {
    id: 24,
    company: 'Tata Group',
    industry: 'Conglomerate/Consumer',
    cmo: 'Pushkaraj Shenai',
    cmoTitle: 'CMO, Tata Consumer Products',
    intentScore: 6,
    strikeWindow: 'yellow',
    dealSize: '$1.8M',
    currentDSP: 'Mixed',
    warmPath: false,
    warmConnector: '',
    stage: 'Cold',
    signals: [
      {
        type: 'warm',
        text: 'Tata Consumer Products expanding NA market presence — programmatic audience building for new US launches',
        date: '2 weeks ago',
      },
      {
        type: 'warm',
        text: 'Tata Motors (Jaguar Land Rover) running premium programmatic campaigns in NA markets',
        date: '3 weeks ago',
      },
    ],
    contacts: [
      {
        name: 'Pushkaraj Shenai',
        title: 'CMO, Tata Consumer',
        angle: 'NA market growth + brand media',
      },
    ],
  },
  {
    id: 25,
    company: 'Televisa Univision',
    industry: 'Spanish-Language Media',
    cmo: 'Luca Ruge',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 8,
    strikeWindow: 'green',
    dealSize: '$1.6M',
    currentDSP: 'DV360',
    warmPath: false,
    warmConnector: '',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'ViX streaming platform scaling aggressively — programmatic subscriber acquisition is #1 priority',
        date: '4 days ago',
      },
      {
        type: 'hot',
        text: 'US Hispanic market is fastest-growing demo — Televisa Univision running huge programmatic campaigns',
        date: '1 week ago',
      },
    ],
    contacts: [
      {
        name: 'Luca Ruge',
        title: 'CMO',
        angle: 'Owns ViX streaming + Univision brand marketing',
      },
    ],
  },
  {
    id: 26,
    company: 'The Hearst Corporation',
    industry: 'Media/Publishing',
    cmo: 'Debi Chirichella',
    cmoTitle: 'President, Hearst Magazines',
    intentScore: 7,
    strikeWindow: 'yellow',
    dealSize: '$1.4M',
    currentDSP: 'Mixed TTD + DV360',
    warmPath: true,
    warmConnector:
      'Hearst Magazines ad partnerships overlap with StackAdapt publisher network',
    stage: 'Cold',
    signals: [
      {
        type: 'warm',
        text: 'Hearst Magazines digital transformation — Cosmopolitan, Esquire, Elle shifting to programmatic audience acquisition',
        date: '2 weeks ago',
      },
      {
        type: 'warm',
        text: 'Hearst TV stations running programmatic campaigns for local news audience growth',
        date: '3 weeks ago',
      },
    ],
    contacts: [
      {
        name: 'Debi Chirichella',
        title: 'President, Hearst Magazines',
        angle: 'Controls digital marketing strategy',
      },
      {
        name: 'Troy Young',
        title: 'President, Hearst Digital Media',
        angle: 'Key digital media decision maker',
      },
    ],
  },
  {
    id: 27,
    company: 'The New York Times Company',
    industry: 'Media/Publishing',
    cmo: 'Amy Weisenbach',
    cmoTitle: 'SVP & Head of Marketing',
    intentScore: 8,
    strikeWindow: 'green',
    dealSize: '$1.5M',
    currentDSP: 'DV360',
    warmPath: false,
    warmConnector: '',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'NYT subscription acquisition going programmatic-first — 10M subscriber target driving major media investment',
        date: '3 days ago',
      },
      {
        type: 'hot',
        text: 'The Athletic + Wordle + Cooking app — multi-product programmatic acquisition strategy needed',
        date: '1 week ago',
      },
    ],
    contacts: [
      {
        name: 'Amy Weisenbach',
        title: 'SVP & Head of Marketing',
        angle: 'Controls all subscription acquisition media',
      },
    ],
  },
  {
    id: 28,
    company: 'TickPick',
    industry: 'Ticketing/Marketplace',
    cmo: 'Brett Goldberg',
    cmoTitle: 'Co-CEO & Marketing Lead',
    intentScore: 9,
    strikeWindow: 'green',
    dealSize: '$0.7M',
    currentDSP: 'Direct + limited TTD',
    warmPath: true,
    warmConnector:
      'SeatGeek + StubHub + Live Nation cluster creates warm path into ticketing vertical',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: "TickPick 'no fees' positioning gaining share vs Ticketmaster — growth marketing in overdrive",
        date: '2 days ago',
      },
      {
        type: 'hot',
        text: "TickPick first programmatic DSP partnership would be a landmark — they're ready to scale",
        date: '4 days ago',
      },
    ],
    contacts: [
      {
        name: 'Brett Goldberg',
        title: 'Co-CEO',
        angle: 'Direct decision maker — small team, fast decisions',
      },
    ],
  },
  {
    id: 29,
    company: 'TKO Group Holdings',
    industry: 'Sports/Entertainment',
    cmo: 'Craig Berman',
    cmoTitle: 'EVP Communications & Marketing',
    intentScore: 8,
    strikeWindow: 'green',
    dealSize: '$2.0M',
    currentDSP: 'Mixed',
    warmPath: true,
    warmConnector:
      'WWE + UFC events overlap with Live Nation ticketing contacts',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'WWE + UFC under one roof — TKO running massive programmatic campaigns for PPV + live event sales',
        date: '4 days ago',
      },
      {
        type: 'hot',
        text: 'TKO media rights deals (Netflix, ESPN) creating massive cross-platform promotional budgets',
        date: '1 week ago',
      },
    ],
    contacts: [
      {
        name: 'Craig Berman',
        title: 'EVP Communications & Marketing',
        angle: 'Controls cross-TKO media + promotional spend',
      },
    ],
  },
  {
    id: 30,
    company: 'Vox Media',
    industry: 'Digital Media/Publishing',
    cmo: 'Shinae Kim',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 7,
    strikeWindow: 'yellow',
    dealSize: '$1.2M',
    currentDSP: 'DV360',
    warmPath: true,
    warmConnector:
      "Vox Media podcast network overlaps with StackAdapt's audio/native advertising contacts",
    stage: 'Cold',
    signals: [
      {
        type: 'warm',
        text: 'Vox Media (The Verge, Polygon, NY Mag) running audience extension programmatic campaigns',
        date: '2 weeks ago',
      },
      {
        type: 'warm',
        text: 'Vox Media podcast + CTV expansion creating new programmatic inventory + buying opportunities',
        date: '3 weeks ago',
      },
    ],
    contacts: [
      {
        name: 'Shinae Kim',
        title: 'CMO',
        angle: 'Cross-portfolio brand + audience marketing',
      },
    ],
  },
  {
    id: 31,
    company: 'Warner Bros Discovery',
    industry: 'Entertainment/Streaming',
    cmo: 'Pamela Kaufman',
    cmoTitle: 'Chief Marketing & Revenue Officer',
    intentScore: 9,
    strikeWindow: 'green',
    dealSize: '$3.0M',
    currentDSP: 'The Trade Desk',
    warmPath: true,
    warmConnector:
      'Publicis alum network — your CRO has connection via agency circuit',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'Max streaming + HBO rebrand — massive programmatic subscriber acquisition campaign running NOW',
        date: '2 days ago',
      },
      {
        type: 'hot',
        text: 'DC Universe + Harry Potter: Hogwarts Legacy sequel driving enormous 2025 media budgets',
        date: '4 days ago',
      },
    ],
    contacts: [
      {
        name: 'Pamela Kaufman',
        title: 'CMO & CRO',
        angle: 'Controls both marketing budget AND revenue strategy',
      },
      {
        name: 'JB Perrette',
        title: 'CEO, Streaming & Games',
        angle: 'P&L owner for Max — key strategic relationship',
      },
    ],
  },
  {
    id: 32,
    company: 'Ziff Davis',
    industry: 'Digital Media/Technology',
    cmo: 'Laurie Kung',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 7,
    strikeWindow: 'yellow',
    dealSize: '$1.1M',
    currentDSP: 'DV360 + direct',
    warmPath: false,
    warmConnector: '',
    stage: 'Cold',
    signals: [
      {
        type: 'warm',
        text: 'Ziff Davis portfolio (IGN, PCMag, Mashable, Humble Bundle) running programmatic across tech + gaming verticals',
        date: '2 weeks ago',
      },
      {
        type: 'warm',
        text: 'Ziff Davis expanding gaming content + commerce — StackAdapt gaming vertical is a direct fit',
        date: '3 weeks ago',
      },
    ],
    contacts: [
      {
        name: 'Laurie Kung',
        title: 'CMO',
        angle: 'Cross-portfolio digital marketing + audience strategy',
      },
    ],
  },
  {
    id: 33,
    company: 'Skims',
    industry: 'Retail/DTC Apparel',
    cmo: 'Minal Patel',
    cmoTitle: 'Chief Marketing Officer',
    intentScore: 9,
    strikeWindow: 'green',
    dealSize: '$1.0M',
    currentDSP: 'Mixed direct + TTD',
    warmPath: false,
    warmConnector: '',
    stage: 'Cold',
    signals: [
      {
        type: 'hot',
        text: 'Skims expanding from DTC to retail — programmatic reach strategy shifting dramatically',
        date: '2 days ago',
      },
      {
        type: 'hot',
        text: "Skims men's line launch + NBA partnership driving new audience acquisition campaigns",
        date: '1 week ago',
      },
    ],
    contacts: [
      {
        name: 'Minal Patel',
        title: 'CMO',
        angle: 'Owns full performance + brand media strategy',
      },
    ],
  },
];

const CONNECTORS = [
  {
    name: 'Your CRO',
    relationships: ['Nike', 'Starbucks', 'Warner Bros Discovery'],
    leverage: 'High',
  },
  {
    name: 'Your CEO',
    relationships: ['Amazon', 'Electronic Arts', 'Roblox Corporation'],
    leverage: 'High',
  },
  {
    name: 'Publicis Alumni',
    relationships: [
      'Warner Bros Discovery',
      'Paramount',
      'AMC Networks International',
    ],
    leverage: 'High',
  },
  {
    name: 'IAB Gaming Network',
    relationships: [
      'Capcom',
      'Electronic Arts',
      'Epic Games',
      'Roblox Corporation',
    ],
    leverage: 'Medium',
  },
  {
    name: 'Ticketing Cluster',
    relationships: [
      'Live Nation Entertainment',
      'SeatGeek',
      'StubHub',
      'TickPick',
    ],
    leverage: 'Medium',
  },
  {
    name: 'LA Studio Circuit',
    relationships: [
      'Lionsgate Entertainment',
      'Sony',
      'Fox Entertainment Group',
    ],
    leverage: 'Medium',
  },
];

async function callClaude(apiKey, prompt) {
  if (!apiKey) return getMockForPrompt(prompt);
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.content?.[0]?.text || 'Error generating content.';
}

function getMockForPrompt(prompt) {
  if (prompt.includes('executive intelligence brief'))
    return `EXECUTIVE BRIEF\n\nThis contact owns the full programmatic media budget and has been publicly focused on performance marketing transformation. They're likely evaluating DSP alternatives after recent organizational changes.\n\nKEY ANGLE: Lead with measurement and ROAS improvement. Avoid feature-dumping. They care about outcomes, not technology.\n\nOPENING LINE: "I saw your recent comments on programmatic efficiency — wanted to share one number that usually starts a conversation."`;
  if (prompt.includes('3-email cold outreach'))
    return `EMAIL 1 — THE HOOK\nSubject: One number worth 60 seconds\n\nHi [First Name],\n\nI caught the recent signal around your media strategy. It immediately made me think of a specific result we drove for a comparable brand — 34% ROAS improvement in 90 days.\n\nWorth a quick look? I'll keep it to 20 minutes.\n\n[Your name] | StackAdapt\n\n---\n\nEMAIL 2 — THE PROOF\nSubject: The data behind that 34%\n\nFollowing up with the one-pager I promised. The brand was running on a similar DSP stack — the lift came from consolidation + StackAdapt's contextual targeting.\n\nHappy to walk through how it maps to your setup. 20 min this week?\n\n---\n\nEMAIL 3 — THE CLOSE\nSubject: Built something for you\n\nMade a quick page specifically for your situation: [stackadapt.com/for/you]\n\nCalendar link is at the bottom if it resonates.\n\n[Your name]`;
  if (prompt.includes('warm intro request'))
    return `TO YOUR CONNECTOR:\n\nHey [Name],\n\nQuick ask — I know you have a relationship with [CMO Name]. I'm targeting them as a priority account and the timing is right given what's happening with their media strategy.\n\nWould you forward a quick note? Here's what you could send:\n\n---\nHey [CMO First Name],\n\nIntroducing [Your Name] at StackAdapt — they're doing interesting things in programmatic that I think are worth 20 minutes of your time.\n\n[Your connector]\n---\n\nHappy to return the favor!`;
  return `LANDING PAGE CONTENT\n\nHEADLINE: How to unlock measurable programmatic gains in 2025\n\nINSIGHT: Your current media strategy signals an opportunity for consolidation and performance improvement. StackAdapt clients at similar scale see an average 34% ROAS improvement within 90 days.\n\nVIDEO SCRIPT (30 sec):\n"[First Name] — I built this page specifically for you. I've been following your brand's media evolution and I think there's a very specific conversation worth having. Not a pitch — just one idea. Hit the button below if it's worth 20 minutes."`;
}

const intentColor = (s) =>
  s >= 8 ? '#22c55e' : s >= 5 ? '#f59e0b' : '#ef4444';
const windowColor = (w) =>
  w === 'green' ? '#22c55e' : w === 'yellow' ? '#f59e0b' : '#ef4444';
const windowLabel = (w) =>
  w === 'green' ? 'STRIKE NOW' : w === 'yellow' ? 'NURTURE' : 'NOT YET';
const stageColors = {
  Cold: '#6b7280',
  Nurturing: '#f59e0b',
  Engaged: '#0061FF',
  'Meeting Booked': '#8b5cf6',
  Opportunity: '#22c55e',
};
const STAGES = [
  'Cold',
  'Nurturing',
  'Engaged',
  'Meeting Booked',
  'Opportunity',
];

export default function App() {
  const [nav, setNav] = useState('command');
  const [selected, setSelected] = useState(null);
  const [accounts, setAccounts] = useState(ACCOUNTS);
  const [aiOutput, setAiOutput] = useState({});
  const [loading, setLoading] = useState({});
  const [apiKey, setApiKey] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [outreachType, setOutreachType] = useState('sequence');

  const generate = async (key, prompt, accountId) => {
    const k = `${key}-${accountId}`;
    setLoading((l) => ({ ...l, [k]: true }));
    try {
      const result = await callClaude(apiKey, prompt);
      setAiOutput((o) => ({ ...o, [k]: result }));
    } catch (e) {
      setAiOutput((o) => ({
        ...o,
        [k]: 'Error: ' + e.message + '\n\nCheck your API key.',
      }));
    }
    setLoading((l) => ({ ...l, [k]: false }));
  };

  const totalPipeline = accounts.reduce(
    (s, a) => s + parseFloat(a.dealSize.replace(/[$M]/g, '')) * 1000000,
    0
  );
  const greenCount = accounts.filter((a) => a.strikeWindow === 'green').length;
  const warmCount = accounts.filter((a) => a.warmPath).length;
  const highIntent = [...accounts]
    .sort((a, b) => b.intentScore - a.intentScore)
    .slice(0, 5);

  const moveStage = (id, dir) => {
    setAccounts((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        const idx = STAGES.indexOf(a.stage);
        const newIdx = Math.max(0, Math.min(STAGES.length - 1, idx + dir));
        return { ...a, stage: STAGES[newIdx] };
      })
    );
  };

  const navItems = [
    { id: 'command', icon: '⌘', label: 'Command Center' },
    { id: 'accounts', icon: '◈', label: 'Accounts' },
    { id: 'network', icon: '◎', label: 'Network Graph' },
    { id: 'signals', icon: '⚡', label: 'Signal Feed' },
    { id: 'outreach', icon: '✦', label: 'Outreach Engine' },
    { id: 'pages', icon: '⧉', label: 'Landing Pages' },
    { id: 'pipeline', icon: '▦', label: 'Pipeline' },
  ];

  return (
    <div
      style={{
        fontFamily: "'Manrope', sans-serif",
        background: '#0a0d14',
        minHeight: '100vh',
        display: 'flex',
        color: '#e2e8f0',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* Sidebar */}
      <div
        style={{
          width: 220,
          background: '#0d1117',
          borderRight: '1px solid #1e2530',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 0 24px 0',
          flexShrink: 0,
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            padding: '24px 20px 20px',
            borderBottom: '1px solid #1e2530',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
              <rect width="28" height="6" rx="2" fill={BRAND} />
              <rect
                y="7"
                width="20"
                height="6"
                rx="2"
                fill={BRAND}
                opacity="0.7"
              />
              <rect
                y="14"
                width="12"
                height="6"
                rx="2"
                fill={BRAND}
                opacity="0.4"
              />
            </svg>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.3px',
                }}
              >
                StackAdapt
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: BRAND,
                  fontWeight: 700,
                  letterSpacing: '1px',
                }}
              >
                PROSPECTING OS
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '16px 12px 8px',
            fontSize: 9,
            color: '#4b5563',
            fontWeight: 700,
            letterSpacing: '1.5px',
          }}
        >
          NAVIGATION
        </div>
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setNav(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              cursor: 'pointer',
              background:
                nav === item.id ? 'rgba(0,97,255,0.1)' : 'transparent',
              borderLeft:
                nav === item.id
                  ? `3px solid ${BRAND}`
                  : '3px solid transparent',
              color: nav === item.id ? '#fff' : '#6b7280',
              fontWeight: nav === item.id ? 600 : 400,
              fontSize: 13,
              transition: 'all 0.15s',
            }}
          >
            <span style={{ fontSize: 14, opacity: nav === item.id ? 1 : 0.6 }}>
              {item.icon}
            </span>
            {item.label}
          </div>
        ))}

        <div style={{ marginTop: 'auto', padding: '0 12px' }}>
          <div
            style={{
              fontSize: 10,
              color: '#4b5563',
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            {accounts.length} accounts · ${(totalPipeline / 1000000).toFixed(1)}
            M pipeline
          </div>
          <div
            onClick={() => setShowApiModal(true)}
            style={{
              background: apiKey ? 'rgba(34,197,94,0.1)' : 'rgba(0,97,255,0.1)',
              border: `1px solid ${
                apiKey ? 'rgba(34,197,94,0.3)' : 'rgba(0,97,255,0.25)'
              }`,
              borderRadius: 8,
              padding: '10px 12px',
              cursor: 'pointer',
              fontSize: 11,
              color: apiKey ? '#22c55e' : BRAND,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {apiKey ? '✓ AI Live' : '⚙ Add API Key →'}
          </div>
          {!apiKey && (
            <div
              style={{
                fontSize: 9,
                color: '#4b5563',
                textAlign: 'center',
                marginTop: 6,
              }}
            >
              Demo mode active without key
            </div>
          )}
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            background: '#0d1117',
            borderBottom: '1px solid #1e2530',
            padding: '12px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 12, color: '#4b5563' }}>
            StackAdapt · Prospecting OS{' '}
            <span style={{ color: BRAND, fontWeight: 700 }}>INTERNAL BETA</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              color: '#22c55e',
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
              }}
            />
            LIVE · {accounts.length} ACCOUNTS
          </div>
        </div>

        {/* API Modal */}
        {showApiModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                background: '#0d1117',
                border: '1px solid #1e2530',
                borderRadius: 16,
                padding: 36,
                width: 500,
                maxWidth: '90vw',
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 8,
                }}
              >
                Add Your Anthropic API Key
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: '#6b7280',
                  marginBottom: 6,
                  lineHeight: 1.7,
                }}
              >
                1. Go to{' '}
                <span style={{ color: BRAND, fontWeight: 600 }}>
                  console.anthropic.com
                </span>
                <br />
                2. Sign up / log in
                <br />
                3. Click <strong style={{ color: '#fff' }}>
                  API Keys
                </strong> →{' '}
                <strong style={{ color: '#fff' }}>Create Key</strong>
                <br />
                4. Add $10 credit (you'll use ~$2–3 for the whole POC)
                <br />
                5. Paste the key below
              </div>
              <input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-ant-api03-..."
                style={{
                  width: '100%',
                  background: '#161b22',
                  border: '1px solid #1e2530',
                  borderRadius: 8,
                  padding: '12px 14px',
                  color: '#fff',
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  boxSizing: 'border-box',
                  outline: 'none',
                  marginBottom: 16,
                }}
              />
              <div
                style={{
                  background: 'rgba(0,97,255,0.08)',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                  fontSize: 12,
                  color: '#9ca3af',
                }}
              >
                Without a key, all buttons work in{' '}
                <strong style={{ color: '#fff' }}>Demo Mode</strong> — showing
                realistic sample outputs so you can explore everything and
                practice your CRO demo.
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => setShowApiModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: BRAND,
                    border: 'none',
                    borderRadius: 8,
                    color: '#fff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                >
                  Save & Activate AI
                </button>
                <button
                  onClick={() => {
                    setApiKey('');
                    setShowApiModal(false);
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#1e2530',
                    border: 'none',
                    borderRadius: 8,
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                >
                  Continue in Demo Mode
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ padding: 28, flex: 1 }}>
          {/* ── COMMAND CENTER ── */}
          {nav === 'command' && (
            <div>
              <div style={{ marginBottom: 28 }}>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: '#fff',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Command Center
                </div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
                  Your Fortune 500 pipeline at a glance · {accounts.length}{' '}
                  accounts loaded
                </div>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 16,
                  marginBottom: 28,
                }}
              >
                {[
                  {
                    label: 'Total Pipeline',
                    value: `$${(totalPipeline / 1000000).toFixed(1)}M`,
                    sub: `${accounts.length} accounts`,
                    color: BRAND,
                  },
                  {
                    label: 'Strike Windows',
                    value: greenCount,
                    sub: 'Act now',
                    color: '#22c55e',
                  },
                  {
                    label: 'Warm Paths',
                    value: warmCount,
                    sub: `of ${accounts.length} accounts`,
                    color: '#8b5cf6',
                  },
                  {
                    label: 'Avg Intent',
                    value: (
                      accounts.reduce((s, a) => s + a.intentScore, 0) /
                      accounts.length
                    ).toFixed(1),
                    sub: 'out of 10',
                    color: '#f59e0b',
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: '#0d1117',
                      border: '1px solid #1e2530',
                      borderTop: `3px solid ${s.color}`,
                      borderRadius: 10,
                      padding: 20,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: '#6b7280',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        marginBottom: 8,
                      }}
                    >
                      {s.label.toUpperCase()}
                    </div>
                    <div
                      style={{
                        fontSize: 36,
                        fontWeight: 800,
                        color: s.color,
                        letterSpacing: '-2px',
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{ fontSize: 11, color: '#4b5563', marginTop: 4 }}
                    >
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: '#0d1117',
                  border: '1px solid #1e2530',
                  borderRadius: 10,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 16,
                  }}
                >
                  🎯 Top 5 Strike List
                </div>
                {highIntent.map((a, i) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      setSelected(a);
                      setNav('accounts');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '13px 0',
                      borderBottom: i < 4 ? '1px solid #1e2530' : 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: '#1e2530',
                        width: 30,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      0{i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{ fontWeight: 700, color: '#fff', fontSize: 14 }}
                      >
                        {a.company}
                      </div>
                      <div
                        style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}
                      >
                        {a.cmo} · {a.industry}
                      </div>
                    </div>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                    >
                      {a.warmPath && (
                        <span
                          style={{
                            fontSize: 10,
                            background: 'rgba(139,92,246,0.15)',
                            color: '#8b5cf6',
                            padding: '3px 8px',
                            borderRadius: 20,
                            fontWeight: 700,
                          }}
                        >
                          WARM PATH
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: 10,
                          background: `${windowColor(a.strikeWindow)}18`,
                          color: windowColor(a.strikeWindow),
                          padding: '3px 8px',
                          borderRadius: 20,
                          fontWeight: 700,
                        }}
                      >
                        {windowLabel(a.strikeWindow)}
                      </span>
                      <div
                        style={{ fontSize: 12, fontWeight: 700, color: BRAND }}
                      >
                        {a.dealSize}
                      </div>
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: '50%',
                          background: `${intentColor(a.intentScore)}18`,
                          border: `2px solid ${intentColor(a.intentScore)}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 14,
                          fontWeight: 800,
                          color: intentColor(a.intentScore),
                        }}
                      >
                        {a.intentScore}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ACCOUNTS ── */}
          {nav === 'accounts' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: selected ? '300px 1fr' : '1fr',
                gap: 20,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: 16,
                  }}
                >
                  All {accounts.length} Accounts
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
                >
                  {accounts.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => setSelected(a)}
                      style={{
                        background:
                          selected?.id === a.id
                            ? 'rgba(0,97,255,0.1)'
                            : '#0d1117',
                        border: `1px solid ${
                          selected?.id === a.id ? BRAND : '#1e2530'
                        }`,
                        borderRadius: 8,
                        padding: 12,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontWeight: 700,
                              color: '#fff',
                              fontSize: 13,
                            }}
                          >
                            {a.company}
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: '#6b7280',
                              marginTop: 1,
                            }}
                          >
                            {a.industry}
                          </div>
                        </div>
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            background: `${intentColor(a.intentScore)}18`,
                            border: `2px solid ${intentColor(a.intentScore)}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            fontWeight: 800,
                            color: intentColor(a.intentScore),
                            flexShrink: 0,
                          }}
                        >
                          {a.intentScore}
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: 5,
                          marginTop: 8,
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 9,
                            background: '#1e2530',
                            color: '#9ca3af',
                            padding: '2px 6px',
                            borderRadius: 4,
                          }}
                        >
                          {a.dealSize}
                        </span>
                        <span
                          style={{
                            fontSize: 9,
                            background: `${windowColor(a.strikeWindow)}15`,
                            color: windowColor(a.strikeWindow),
                            padding: '2px 6px',
                            borderRadius: 4,
                            fontWeight: 700,
                          }}
                        >
                          {windowLabel(a.strikeWindow)}
                        </span>
                        {a.warmPath && (
                          <span
                            style={{
                              fontSize: 9,
                              background: 'rgba(139,92,246,0.15)',
                              color: '#8b5cf6',
                              padding: '2px 6px',
                              borderRadius: 4,
                              fontWeight: 700,
                            }}
                          >
                            WARM
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selected && (
                <div
                  style={{
                    background: '#0d1117',
                    border: '1px solid #1e2530',
                    borderRadius: 12,
                    padding: 28,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 24,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 800,
                          color: '#fff',
                          letterSpacing: '-0.5px',
                        }}
                      >
                        {selected.company}
                      </div>
                      <div
                        style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}
                      >
                        {selected.cmo} · {selected.cmoTitle}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      style={{
                        background: '#1e2530',
                        border: 'none',
                        borderRadius: 6,
                        padding: '5px 12px',
                        color: '#6b7280',
                        cursor: 'pointer',
                        fontSize: 12,
                      }}
                    >
                      ✕
                    </button>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 12,
                      marginBottom: 24,
                    }}
                  >
                    {[
                      {
                        label: 'Deal Size',
                        value: selected.dealSize,
                        color: BRAND,
                      },
                      {
                        label: 'Intent Score',
                        value: `${selected.intentScore}/10`,
                        color: intentColor(selected.intentScore),
                      },
                      {
                        label: 'Current DSP',
                        value: selected.currentDSP,
                        color: '#f59e0b',
                      },
                    ].map((m) => (
                      <div
                        key={m.label}
                        style={{
                          background: '#161b22',
                          borderRadius: 8,
                          padding: 14,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            color: '#4b5563',
                            fontWeight: 700,
                            marginBottom: 6,
                          }}
                        >
                          {m.label.toUpperCase()}
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: m.color,
                          }}
                        >
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#6b7280',
                        letterSpacing: '1px',
                        marginBottom: 10,
                      }}
                    >
                      BUYING SIGNALS
                    </div>
                    {selected.signals.map((s, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          gap: 10,
                          padding: '10px 0',
                          borderBottom: '1px solid #1e2530',
                        }}
                      >
                        <div
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background:
                              s.type === 'hot' ? '#ef4444' : '#f59e0b',
                            marginTop: 5,
                            flexShrink: 0,
                          }}
                        />
                        <div
                          style={{
                            flex: 1,
                            fontSize: 13,
                            color: '#d1d5db',
                            lineHeight: 1.5,
                          }}
                        >
                          {s.text}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: '#4b5563',
                            flexShrink: 0,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {s.date}
                        </div>
                      </div>
                    ))}
                  </div>
                  {selected.warmPath && (
                    <div
                      style={{
                        background: 'rgba(139,92,246,0.08)',
                        border: '1px solid rgba(139,92,246,0.2)',
                        borderRadius: 8,
                        padding: 14,
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: '#8b5cf6',
                          fontWeight: 700,
                          marginBottom: 4,
                        }}
                      >
                        🔗 WARM PATH AVAILABLE
                      </div>
                      <div style={{ fontSize: 13, color: '#d1d5db' }}>
                        {selected.warmConnector}
                      </div>
                    </div>
                  )}
                  {/* Economic Buyer callout for Nike */}
                  {selected.economicBuyer && (
                    <div
                      style={{
                        background: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.25)',
                        borderRadius: 8,
                        padding: 14,
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: '#ef4444',
                          fontWeight: 700,
                          marginBottom: 6,
                          letterSpacing: '1px',
                        }}
                      >
                        💰 ECONOMIC BUYER
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            background: 'rgba(239,68,68,0.15)',
                            border: '1px solid rgba(239,68,68,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#ef4444',
                            flexShrink: 0,
                          }}
                        >
                          {selected.economicBuyer.name[0]}
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: '#fff',
                            }}
                          >
                            {selected.economicBuyer.name}
                          </div>
                          <div style={{ fontSize: 11, color: '#6b7280' }}>
                            {selected.economicBuyer.title} ·{' '}
                            {selected.economicBuyer.company}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: '#fca5a5',
                              marginTop: 3,
                            }}
                          >
                            {selected.economicBuyer.note}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Agency Partners for Nike */}
                  {selected.agencyPartners && (
                    <div style={{ marginBottom: 20 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#6b7280',
                          letterSpacing: '1px',
                          marginBottom: 10,
                        }}
                      >
                        AGENCY PARTNERS
                      </div>
                      {selected.agencyPartners.map((a, i) => (
                        <div
                          key={i}
                          style={{
                            background: '#0d1117',
                            border: `1px solid ${
                              a.connectionType === 'warm'
                                ? 'rgba(139,92,246,0.3)'
                                : '#1e2530'
                            }`,
                            borderRadius: 8,
                            padding: 14,
                            marginBottom: 8,
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              marginBottom: 6,
                            }}
                          >
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: '#fff',
                              }}
                            >
                              {a.agency}
                            </div>
                            <div
                              style={{
                                fontSize: 10,
                                color: '#8b5cf6',
                                fontWeight: 700,
                                background: 'rgba(139,92,246,0.1)',
                                padding: '2px 8px',
                                borderRadius: 4,
                              }}
                            >
                              {a.location}
                            </div>
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: '#6b7280',
                              marginBottom: 8,
                            }}
                          >
                            {a.role}
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              gap: 8,
                              alignItems: 'center',
                            }}
                          >
                            <div
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                background: 'rgba(139,92,246,0.15)',
                                border: '1px solid rgba(139,92,246,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 11,
                                fontWeight: 700,
                                color: '#c4b5fd',
                                flexShrink: 0,
                              }}
                            >
                              {a.contact[0]}
                            </div>
                            <div>
                              <div
                                style={{
                                  fontSize: 12,
                                  fontWeight: 600,
                                  color: '#e5e7eb',
                                }}
                              >
                                {a.contact} — {a.contactTitle}
                              </div>
                              <div style={{ fontSize: 11, color: '#8b5cf6' }}>
                                🔗 {a.connection}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ marginBottom: 24 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#6b7280',
                        letterSpacing: '1px',
                        marginBottom: 10,
                      }}
                    >
                      KEY CONTACTS
                    </div>
                    {selected.contacts.map((c, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '10px 0',
                          borderBottom: '1px solid #1e2530',
                          display: 'flex',
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            background: `${BRAND}20`,
                            border: `1px solid ${BRAND}40`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 13,
                            fontWeight: 700,
                            color: BRAND,
                            flexShrink: 0,
                          }}
                        >
                          {c.name[0]}
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: '#fff',
                            }}
                          >
                            {c.name}
                          </div>
                          <div style={{ fontSize: 11, color: '#6b7280' }}>
                            {c.title} · {c.angle}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* MEDDPICC Scorecard for Nike */}
                  {selected.meddpicc && (
                    <div style={{ marginBottom: 24 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#6b7280',
                          letterSpacing: '1px',
                          marginBottom: 12,
                        }}
                      >
                        MEDDPICC SCORECARD
                      </div>
                      {[
                        { key: 'metrics', label: 'M — Metrics', icon: '📊' },
                        {
                          key: 'economicBuyer',
                          label: 'E — Economic Buyer',
                          icon: '💰',
                        },
                        {
                          key: 'decisionCriteria',
                          label: 'D — Decision Criteria',
                          icon: '📋',
                        },
                        {
                          key: 'decisionProcess',
                          label: 'D — Decision Process',
                          icon: '🔄',
                        },
                        {
                          key: 'paperProcess',
                          label: 'P — Paper Process',
                          icon: '📝',
                        },
                        {
                          key: 'pain',
                          label: 'I — Implicate the Pain',
                          icon: '🎯',
                        },
                        { key: 'champion', label: 'C — Champion', icon: '⭐' },
                        {
                          key: 'competition',
                          label: 'C — Competition',
                          icon: '⚔️',
                        },
                      ].map((item) => {
                        const data = selected.meddpicc[item.key];
                        const statusColor =
                          data.status === 'identified' ||
                          data.status === 'strong' ||
                          data.status === 'known'
                            ? '#22c55e'
                            : data.status === 'partial'
                            ? '#f59e0b'
                            : '#ef4444';
                        const statusLabel =
                          data.status === 'identified'
                            ? '✓ IDENTIFIED'
                            : data.status === 'strong'
                            ? '✓ STRONG'
                            : data.status === 'known'
                            ? '✓ KNOWN'
                            : data.status === 'partial'
                            ? '~ PARTIAL'
                            : '✗ UNKNOWN';
                        return (
                          <div
                            key={item.key}
                            style={{
                              background: '#0d1117',
                              border: '1px solid #1e2530',
                              borderLeft: `3px solid ${statusColor}`,
                              borderRadius: 8,
                              padding: 12,
                              marginBottom: 8,
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 4,
                              }}
                            >
                              <div
                                style={{
                                  fontSize: 12,
                                  fontWeight: 700,
                                  color: '#fff',
                                }}
                              >
                                {item.icon} {item.label}
                              </div>
                              <div
                                style={{
                                  fontSize: 10,
                                  fontWeight: 700,
                                  color: statusColor,
                                }}
                              >
                                {statusLabel}
                              </div>
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                color: '#9ca3af',
                                lineHeight: 1.5,
                              }}
                            >
                              {data.note}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <button
                    onClick={() =>
                      generate(
                        'brief',
                        `You are an elite enterprise sales coach. Write a concise executive intelligence brief for ${selected.cmo}, ${selected.cmoTitle} at ${selected.company} (${selected.industry}). Cover: their likely top 3 priorities right now, how to position StackAdapt (a premium programmatic DSP) against their current platform (${selected.currentDSP}), what they personally care about based on their title, and one killer opening line for an email. Key signal: ${selected.signals[0]?.text}. Be specific, sharp, and actionable. No fluff. Max 300 words.`,
                        selected.id
                      )
                    }
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      background: BRAND,
                      border: 'none',
                      borderRadius: 8,
                      color: '#fff',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: 13,
                      marginBottom: 12,
                    }}
                  >
                    {loading[`brief-${selected.id}`]
                      ? '✦ Generating Brief...'
                      : '✦ Generate Executive Brief'}
                  </button>
                  {aiOutput[`brief-${selected.id}`] && (
                    <div
                      style={{
                        background: '#161b22',
                        borderRadius: 8,
                        padding: 16,
                        fontSize: 12,
                        color: '#d1d5db',
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.8,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {aiOutput[`brief-${selected.id}`]}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── NETWORK ── */}
          {nav === 'network' && (
            <div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 6,
                }}
              >
                Relationship Network
              </div>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 24 }}>
                Your warm paths to every CMO — {warmCount} of {accounts.length}{' '}
                accounts reachable
              </div>

              {/* Nike Spotlight */}
              <div
                style={{
                  background: '#0d1117',
                  border: '1px solid rgba(0,97,255,0.4)',
                  borderRadius: 12,
                  padding: 24,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: BRAND,
                      letterSpacing: '1px',
                    }}
                  >
                    🎯 SPOTLIGHT — NIKE WARM PATH
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background: 'rgba(0,97,255,0.2)',
                    }}
                  />
                  <div
                    style={{ fontSize: 10, color: '#22c55e', fontWeight: 700 }}
                  >
                    2 CONFIRMED PATHS IN
                  </div>
                </div>
                <svg width="100%" height="320" viewBox="0 0 760 320">
                  {/* StackAdapt center */}
                  <circle
                    cx="120"
                    cy="160"
                    r="44"
                    fill={BRAND}
                    opacity="0.15"
                    stroke={BRAND}
                    strokeWidth="2"
                  />
                  <circle cx="120" cy="160" r="28" fill={BRAND} opacity="0.3" />
                  <rect
                    x="104"
                    y="149"
                    width="32"
                    height="7"
                    rx="2"
                    fill="white"
                  />
                  <rect
                    x="104"
                    y="159"
                    width="23"
                    height="7"
                    rx="2"
                    fill="white"
                    opacity="0.7"
                  />
                  <rect
                    x="104"
                    y="169"
                    width="14"
                    height="7"
                    rx="2"
                    fill="white"
                    opacity="0.4"
                  />
                  <text
                    x="120"
                    y="218"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="11"
                    fontWeight="700"
                  >
                    StackAdapt
                  </text>
                  <text
                    x="120"
                    y="231"
                    textAnchor="middle"
                    fill="#6b7280"
                    fontSize="9"
                  >
                    You
                  </text>

                  {/* Connector lines to Steve and Creed */}
                  <line
                    x1="164"
                    y1="130"
                    x2="296"
                    y2="100"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    strokeDasharray="6,4"
                    opacity="0.8"
                  />
                  <line
                    x1="164"
                    y1="190"
                    x2="296"
                    y2="220"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    strokeDasharray="6,4"
                    opacity="0.8"
                  />

                  {/* Steve Wharton */}
                  <circle
                    cx="330"
                    cy="90"
                    r="36"
                    fill="rgba(139,92,246,0.15)"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  />
                  <text
                    x="330"
                    y="85"
                    textAnchor="middle"
                    fill="#c4b5fd"
                    fontSize="10"
                    fontWeight="700"
                  >
                    Steve
                  </text>
                  <text
                    x="330"
                    y="98"
                    textAnchor="middle"
                    fill="#c4b5fd"
                    fontSize="10"
                    fontWeight="700"
                  >
                    Wharton
                  </text>
                  <text
                    x="330"
                    y="136"
                    textAnchor="middle"
                    fill="#8b5cf6"
                    fontSize="9"
                  >
                    StackAdapt AE
                  </text>

                  {/* Creed Petit */}
                  <circle
                    cx="330"
                    cy="230"
                    r="36"
                    fill="rgba(139,92,246,0.15)"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  />
                  <text
                    x="330"
                    y="225"
                    textAnchor="middle"
                    fill="#c4b5fd"
                    fontSize="10"
                    fontWeight="700"
                  >
                    Creed
                  </text>
                  <text
                    x="330"
                    y="238"
                    textAnchor="middle"
                    fill="#c4b5fd"
                    fontSize="10"
                    fontWeight="700"
                  >
                    Petit
                  </text>
                  <text
                    x="330"
                    y="276"
                    textAnchor="middle"
                    fill="#8b5cf6"
                    fontSize="9"
                  >
                    StackAdapt AE
                  </text>

                  {/* Lines to Wesley */}
                  <line
                    x1="366"
                    y1="100"
                    x2="490"
                    y2="148"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    opacity="0.9"
                  />
                  <line
                    x1="366"
                    y1="220"
                    x2="490"
                    y2="172"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    opacity="0.9"
                  />

                  {/* Wesley Collett */}
                  <circle
                    cx="530"
                    cy="160"
                    r="42"
                    fill="rgba(34,197,94,0.15)"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                  />
                  <text
                    x="530"
                    y="150"
                    textAnchor="middle"
                    fill="#4ade80"
                    fontSize="10"
                    fontWeight="700"
                  >
                    Wesley
                  </text>
                  <text
                    x="530"
                    y="163"
                    textAnchor="middle"
                    fill="#4ade80"
                    fontSize="10"
                    fontWeight="700"
                  >
                    Collett
                  </text>
                  <text
                    x="530"
                    y="214"
                    textAnchor="middle"
                    fill="#22c55e"
                    fontSize="9"
                  >
                    Dir. Integrated Media
                  </text>
                  <text
                    x="530"
                    y="226"
                    textAnchor="middle"
                    fill="#22c55e"
                    fontSize="9"
                  >
                    Brand Jordan NA
                  </text>

                  {/* Line to Nike */}
                  <line
                    x1="572"
                    y1="160"
                    x2="650"
                    y2="160"
                    stroke="#0061FF"
                    strokeWidth="2.5"
                    opacity="0.9"
                  />

                  {/* Nike node */}
                  <circle
                    cx="670"
                    cy="200"
                    r="34"
                    fill="rgba(0,97,255,0.15)"
                    stroke="#0061FF"
                    strokeWidth="2.5"
                  />
                  <text
                    x="670"
                    y="195"
                    textAnchor="middle"
                    fill="#60a5fa"
                    fontSize="12"
                    fontWeight="800"
                  >
                    NIKE
                  </text>
                  <text
                    x="670"
                    y="210"
                    textAnchor="middle"
                    fill="#60a5fa"
                    fontSize="10"
                  >
                    $3.2M
                  </text>
                  <text
                    x="670"
                    y="247"
                    textAnchor="middle"
                    fill={BRAND}
                    fontSize="9"
                    fontWeight="700"
                  >
                    INTENT: 10/10
                  </text>

                  {/* Joe Brooks — Economic Buyer */}
                  <line
                    x1="572"
                    y1="148"
                    x2="640"
                    y2="100"
                    stroke="#ef4444"
                    strokeWidth="2"
                    opacity="0.8"
                  />
                  <circle
                    cx="672"
                    cy="82"
                    r="34"
                    fill="rgba(239,68,68,0.15)"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                  <text
                    x="672"
                    y="75"
                    textAnchor="middle"
                    fill="#fca5a5"
                    fontSize="10"
                    fontWeight="700"
                  >
                    Joe
                  </text>
                  <text
                    x="672"
                    y="88"
                    textAnchor="middle"
                    fill="#fca5a5"
                    fontSize="10"
                    fontWeight="700"
                  >
                    Brooks
                  </text>
                  <text
                    x="672"
                    y="126"
                    textAnchor="middle"
                    fill="#ef4444"
                    fontSize="8"
                  >
                    Head, NA
                  </text>
                  <text
                    x="672"
                    y="137"
                    textAnchor="middle"
                    fill="#ef4444"
                    fontSize="8"
                  >
                    Integrated Media
                  </text>
                  <text
                    x="672"
                    y="54"
                    textAnchor="middle"
                    fill="#ef4444"
                    fontSize="8"
                    fontWeight="700"
                  >
                    💰 ECONOMIC BUYER
                  </text>

                  {/* PMG / Earl Hwang */}
                  <line
                    x1="164"
                    y1="175"
                    x2="296"
                    y2="270"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="5,4"
                    opacity="0.7"
                  />
                  <circle
                    cx="328"
                    cy="285"
                    r="30"
                    fill="rgba(245,158,11,0.1)"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                  />
                  <text
                    x="328"
                    y="280"
                    textAnchor="middle"
                    fill="#fcd34d"
                    fontSize="9"
                    fontWeight="700"
                  >
                    Earl Hwang
                  </text>
                  <text
                    x="328"
                    y="293"
                    textAnchor="middle"
                    fill="#f59e0b"
                    fontSize="8"
                  >
                    PMG Dallas
                  </text>
                  <text
                    x="222"
                    y="245"
                    textAnchor="middle"
                    fill="#f59e0b"
                    fontSize="8"
                  >
                    Creed knows
                  </text>

                  {/* W+K / Brian Goldstein */}
                  <line
                    x1="120"
                    y1="120"
                    x2="200"
                    y2="50"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="5,4"
                    opacity="0.7"
                  />
                  <circle
                    cx="230"
                    cy="36"
                    r="30"
                    fill="rgba(245,158,11,0.1)"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                  />
                  <text
                    x="230"
                    y="31"
                    textAnchor="middle"
                    fill="#fcd34d"
                    fontSize="9"
                    fontWeight="700"
                  >
                    Brian Goldstein
                  </text>
                  <text
                    x="230"
                    y="44"
                    textAnchor="middle"
                    fill="#f59e0b"
                    fontSize="8"
                  >
                    W+K Portland
                  </text>
                  <text
                    x="155"
                    y="72"
                    textAnchor="middle"
                    fill="#f59e0b"
                    fontSize="8"
                  >
                    Bo knows
                  </text>

                  {/* Labels on lines */}
                  <text
                    x="230"
                    y="98"
                    textAnchor="middle"
                    fill="#8b5cf6"
                    fontSize="9"
                  >
                    knows
                  </text>
                  <text
                    x="230"
                    y="218"
                    textAnchor="middle"
                    fill="#8b5cf6"
                    fontSize="9"
                  >
                    knows
                  </text>
                  <text
                    x="428"
                    y="118"
                    textAnchor="middle"
                    fill="#22c55e"
                    fontSize="9"
                  >
                    warm intro
                  </text>
                  <text
                    x="428"
                    y="210"
                    textAnchor="middle"
                    fill="#22c55e"
                    fontSize="9"
                  >
                    warm intro
                  </text>
                  <text
                    x="606"
                    y="168"
                    textAnchor="middle"
                    fill={BRAND}
                    fontSize="9"
                  >
                    entry point
                  </text>
                </svg>
              </div>

              {/* Full network */}
              <div
                style={{
                  background: '#0d1117',
                  border: '1px solid #1e2530',
                  borderRadius: 12,
                  padding: 24,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 16,
                  }}
                >
                  Full Network Map — All 33 Accounts
                </div>
                <svg width="100%" height="420" viewBox="0 0 760 420">
                  <circle
                    cx="380"
                    cy="210"
                    r="44"
                    fill={BRAND}
                    opacity="0.12"
                    stroke={BRAND}
                    strokeWidth="2"
                  />
                  <circle
                    cx="380"
                    cy="210"
                    r="28"
                    fill={BRAND}
                    opacity="0.25"
                  />
                  <rect
                    x="364"
                    y="200"
                    width="32"
                    height="7"
                    rx="2"
                    fill="white"
                  />
                  <rect
                    x="364"
                    y="210"
                    width="23"
                    height="7"
                    rx="2"
                    fill="white"
                    opacity="0.7"
                  />
                  <rect
                    x="364"
                    y="220"
                    width="14"
                    height="7"
                    rx="2"
                    fill="white"
                    opacity="0.4"
                  />
                  <text
                    x="380"
                    y="268"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="11"
                    fontWeight="700"
                  >
                    StackAdapt
                  </text>
                  {CONNECTORS.map((c, i) => {
                    const angle =
                      (i / CONNECTORS.length) * Math.PI * 2 - Math.PI / 2;
                    const cx = 380 + Math.cos(angle) * 150;
                    const cy = 210 + Math.sin(angle) * 150;
                    return (
                      <g key={i}>
                        <line
                          x1="380"
                          y1="210"
                          x2={cx}
                          y2={cy}
                          stroke="#8b5cf6"
                          strokeWidth="1.5"
                          strokeDasharray="5,5"
                          opacity="0.5"
                        />
                        <circle
                          cx={cx}
                          cy={cy}
                          r="26"
                          fill="rgba(139,92,246,0.12)"
                          stroke="#8b5cf6"
                          strokeWidth="1.5"
                        />
                        <text
                          x={cx}
                          y={cy - 4}
                          textAnchor="middle"
                          fill="#c4b5fd"
                          fontSize="9"
                          fontWeight="700"
                        >
                          {c.name.split(' ').slice(0, 2).join(' ')}
                        </text>
                        <text
                          x={cx}
                          y={cy + 8}
                          textAnchor="middle"
                          fill="#8b5cf6"
                          fontSize="8"
                        >
                          {c.leverage}
                        </text>
                        {c.relationships.map((r, j) => {
                          const aAngle =
                            angle +
                            (j - (c.relationships.length - 1) / 2) * 0.35;
                          const ax = cx + Math.cos(aAngle) * 95;
                          const ay = cy + Math.sin(aAngle) * 95;
                          return (
                            <g key={j}>
                              <line
                                x1={cx}
                                y1={cy}
                                x2={ax}
                                y2={ay}
                                stroke="#22c55e"
                                strokeWidth="1"
                                opacity="0.4"
                              />
                              <circle
                                cx={ax}
                                cy={ay}
                                r="16"
                                fill="rgba(34,197,94,0.08)"
                                stroke="#22c55e"
                                strokeWidth="1"
                              />
                              <text
                                x={ax}
                                y={ay + 4}
                                textAnchor="middle"
                                fill="#22c55e"
                                fontSize="7"
                                fontWeight="600"
                              >
                                {r.split(' ')[0]}
                              </text>
                            </g>
                          );
                        })}
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 12,
                }}
              >
                {CONNECTORS.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#0d1117',
                      border: '1px solid #1e2530',
                      borderRadius: 10,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: 4,
                      }}
                    >
                      {c.name}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: '#8b5cf6',
                        fontWeight: 700,
                        marginBottom: 10,
                        letterSpacing: '0.5px',
                      }}
                    >
                      {c.leverage.toUpperCase()} LEVERAGE ·{' '}
                      {c.relationships.length} ACCOUNTS
                    </div>
                    {c.relationships.map((r, j) => (
                      <div
                        key={j}
                        style={{
                          fontSize: 12,
                          color: '#9ca3af',
                          padding: '3px 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 7,
                        }}
                      >
                        <div
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: '50%',
                            background: '#22c55e',
                            flexShrink: 0,
                          }}
                        />
                        {r}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SIGNALS ── */}
          {nav === 'signals' && (
            <div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 6,
                }}
              >
                Signal Feed
              </div>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 24 }}>
                Live buying triggers across all {accounts.length} accounts —
                sorted by heat
              </div>
              {accounts
                .flatMap((a) =>
                  a.signals.map((s) => ({
                    ...s,
                    company: a.company,
                    cmo: a.cmo,
                    id: a.id,
                    dealSize: a.dealSize,
                    industry: a.industry,
                  }))
                )
                .sort((a) => (a.type === 'hot' ? -1 : 1))
                .map((s, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelected(accounts.find((a) => a.id === s.id));
                      setNav('accounts');
                    }}
                    style={{
                      background: '#0d1117',
                      border: `1px solid ${
                        s.type === 'hot' ? 'rgba(239,68,68,0.25)' : '#1e2530'
                      }`,
                      borderLeft: `4px solid ${
                        s.type === 'hot' ? '#ef4444' : '#f59e0b'
                      }`,
                      borderRadius: 10,
                      padding: 18,
                      marginBottom: 10,
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ flexShrink: 0, paddingTop: 2 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: s.type === 'hot' ? '#ef4444' : '#f59e0b',
                          background:
                            s.type === 'hot'
                              ? 'rgba(239,68,68,0.1)'
                              : 'rgba(245,158,11,0.1)',
                          padding: '3px 8px',
                          borderRadius: 20,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {s.type === 'hot' ? '🔥 HOT' : '⚡ WARM'}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          color: '#fff',
                          fontSize: 13,
                          marginBottom: 4,
                        }}
                      >
                        {s.company}{' '}
                        <span
                          style={{
                            color: '#6b7280',
                            fontWeight: 400,
                            fontSize: 12,
                          }}
                        >
                          · {s.cmo}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: '#d1d5db',
                          lineHeight: 1.6,
                        }}
                      >
                        {s.text}
                      </div>
                    </div>
                    <div style={{ flexShrink: 0, textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: 11,
                          color: '#4b5563',
                          marginBottom: 5,
                        }}
                      >
                        {s.date}
                      </div>
                      <div
                        style={{ fontSize: 12, color: BRAND, fontWeight: 700 }}
                      >
                        {s.dealSize}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* ── OUTREACH ── */}
          {nav === 'outreach' && (
            <div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 6,
                }}
              >
                Outreach Engine
              </div>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 24 }}>
                Select any account → generate personalized outreach in seconds
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '260px 1fr',
                  gap: 20,
                }}
              >
                <div
                  style={{
                    maxHeight: 'calc(100vh - 220px)',
                    overflowY: 'auto',
                  }}
                >
                  {accounts.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => setSelected(a)}
                      style={{
                        background:
                          selected?.id === a.id
                            ? 'rgba(0,97,255,0.1)'
                            : '#0d1117',
                        border: `1px solid ${
                          selected?.id === a.id ? BRAND : '#1e2530'
                        }`,
                        borderRadius: 8,
                        padding: 10,
                        cursor: 'pointer',
                        marginBottom: 5,
                        transition: 'all 0.15s',
                      }}
                    >
                      <div
                        style={{ fontWeight: 600, color: '#fff', fontSize: 12 }}
                      >
                        {a.company}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: '#6b7280',
                          marginBottom: 6,
                        }}
                      >
                        {a.cmo}
                      </div>
                      <div
                        style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}
                      >
                        <span
                          style={{
                            fontSize: 9,
                            background: `${windowColor(a.strikeWindow)}15`,
                            color: windowColor(a.strikeWindow),
                            padding: '1px 5px',
                            borderRadius: 10,
                            fontWeight: 700,
                          }}
                        >
                          {windowLabel(a.strikeWindow)}
                        </span>
                        {a.warmPath && (
                          <span
                            style={{
                              fontSize: 9,
                              background: 'rgba(139,92,246,0.15)',
                              color: '#8b5cf6',
                              padding: '1px 5px',
                              borderRadius: 10,
                              fontWeight: 600,
                            }}
                          >
                            WARM
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {selected ? (
                  <div
                    style={{
                      background: '#0d1117',
                      border: '1px solid #1e2530',
                      borderRadius: 12,
                      padding: 24,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#fff',
                        marginBottom: 4,
                      }}
                    >
                      {selected.company}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: '#6b7280',
                        marginBottom: 20,
                      }}
                    >
                      {selected.warmPath
                        ? `Target: ${
                            selected.contacts.find((c) =>
                              c.angle?.includes('WARM')
                            )
                              ? selected.contacts.find((c) =>
                                  c.angle?.includes('WARM')
                                ).name
                              : selected.cmo
                          } via warm intro`
                        : selected.cmo}{' '}
                      · {selected.signals[0]?.text}
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                      {[
                        { id: 'sequence', label: '✦ 3-Email Sequence' },
                        { id: 'intro', label: '🔗 Warm Intro Request' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setOutreachType(t.id)}
                          style={{
                            padding: '9px 16px',
                            background:
                              outreachType === t.id ? BRAND : '#1e2530',
                            border: 'none',
                            borderRadius: 6,
                            color: outreachType === t.id ? '#fff' : '#6b7280',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: 12,
                          }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        const prompt =
                          outreachType === 'sequence'
                            ? `Write a 3-email cold outreach sequence from a StackAdapt enterprise AE targeting ${selected.cmo}, ${selected.cmoTitle} at ${selected.company}. StackAdapt is a premium programmatic DSP. Their current DSP: ${selected.currentDSP}. Key buying signal: ${selected.signals[0]?.text}. Rules: Each email under 100 words. Highly specific to this company and signal. Include compelling subject lines. Email 1 = hook with insight. Email 2 = proof/case study. Email 3 = direct ask + personalized landing page URL. Human, not templated. Make it so good they'd feel stupid not responding.`
                            : `Write a warm intro request email from a StackAdapt AE to their connector (${
                                selected.warmConnector || 'a mutual contact'
                              }) asking for an intro to ${
                                selected.contacts.find((c) =>
                                  c.angle?.includes('WARM')
                                )?.name || selected.cmo
                              } (${
                                selected.contacts.find((c) =>
                                  c.angle?.includes('WARM')
                                )?.title || selected.cmoTitle
                              }) at ${selected.company}. Their email: ${
                                selected.contacts.find((c) =>
                                  c.angle?.includes('WARM')
                                )?.email || ''
                              }. Also write the short forwardable email the connector sends to make the intro. Both under 80 words. Reference this signal: ${
                                selected.signals[0]?.text
                              }. Make it easy for the connector to say yes and impossible for the target to ignore.`;
                        generate(outreachType, prompt, selected.id);
                      }}
                      style={{
                        padding: '11px 22px',
                        background: BRAND,
                        border: 'none',
                        borderRadius: 8,
                        color: '#fff',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: 13,
                        marginBottom: 16,
                      }}
                    >
                      {loading[`${outreachType}-${selected.id}`]
                        ? 'Generating...'
                        : `Generate ${
                            outreachType === 'sequence'
                              ? 'Email Sequence'
                              : 'Warm Intro'
                          }`}
                    </button>
                    {aiOutput[`${outreachType}-${selected.id}`] && (
                      <div
                        style={{
                          background: '#161b22',
                          borderRadius: 8,
                          padding: 18,
                          fontSize: 12,
                          color: '#d1d5db',
                          whiteSpace: 'pre-wrap',
                          lineHeight: 1.9,
                          fontFamily: "'JetBrains Mono', monospace",
                          maxHeight: 450,
                          overflow: 'auto',
                        }}
                      >
                        {aiOutput[`${outreachType}-${selected.id}`]}
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      background: '#0d1117',
                      border: '1px dashed #1e2530',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4b5563',
                      fontSize: 14,
                      minHeight: 300,
                    }}
                  >
                    ← Select an account to generate outreach
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── LANDING PAGES ── */}
          {nav === 'pages' && (
            <div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 6,
                }}
              >
                Landing Page Engine
              </div>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 24 }}>
                Generate a personalized CMO landing page + 30-second video
                script in seconds
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '260px 1fr',
                  gap: 20,
                }}
              >
                <div
                  style={{
                    maxHeight: 'calc(100vh - 220px)',
                    overflowY: 'auto',
                  }}
                >
                  {accounts.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => setSelected(a)}
                      style={{
                        background:
                          selected?.id === a.id
                            ? 'rgba(0,97,255,0.1)'
                            : '#0d1117',
                        border: `1px solid ${
                          selected?.id === a.id ? BRAND : '#1e2530'
                        }`,
                        borderRadius: 8,
                        padding: 10,
                        cursor: 'pointer',
                        marginBottom: 5,
                      }}
                    >
                      <div
                        style={{ fontWeight: 600, color: '#fff', fontSize: 12 }}
                      >
                        {a.company}
                      </div>
                      <div style={{ fontSize: 10, color: '#6b7280' }}>
                        {a.dealSize} · {a.industry}
                      </div>
                    </div>
                  ))}
                </div>
                {selected ? (
                  <div
                    style={{
                      background: '#0d1117',
                      border: '1px solid #1e2530',
                      borderRadius: 12,
                      padding: 24,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#fff',
                        marginBottom: 16,
                      }}
                    >
                      Page for {selected.company}
                    </div>
                    {selected.id === 15 && (
                      <div
                        style={{
                          background: 'rgba(0,97,255,0.08)',
                          border: '1px solid rgba(0,97,255,0.3)',
                          borderRadius: 10,
                          padding: 16,
                          marginBottom: 16,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: BRAND,
                              letterSpacing: '1px',
                              marginBottom: 4,
                            }}
                          >
                            🚀 LIVE LANDING PAGE
                          </div>
                          <div style={{ fontSize: 12, color: '#9ca3af' }}>
                            Personalized page for Joe Brooks — Loom video
                            embedded, booking link active
                          </div>
                        </div>
                        <a
                          href="https://sa-enterprise-prospecting-engine.vercel.app/nike-landing.html"
                          target="_blank"
                          style={{
                            background: BRAND,
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: 8,
                            fontWeight: 700,
                            fontSize: 12,
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}
                        >
                          Open Page →
                        </a>
                      </div>
                    )}
                    <button
                      onClick={() =>
                        generate(
                          'page',
                          `You are building a personalized sales landing page. Output ONLY a complete, self-contained HTML document with all CSS included inline in a <style> tag. No markdown, no explanation, just raw HTML starting with <!DOCTYPE html>. Style it as a premium dark-mode sales page: black background (#0a0d14), white text, blue accent (#0061FF), clean modern font (use system-ui). The page is from Bo Janes at StackAdapt, addressed personally to ${selected.cmo} (${selected.cmoTitle}) at ${selected.company}. Include: 1) Hero with "StackAdapt × ${selected.company}" headline, 2) Personal note from Bo referencing: ${selected.signals[0]?.text}, 3) Why now paragraph mentioning their current DSP (${selected.currentDSP}), 4) Three things holding ${selected.company} back specific to ${selected.industry}, 5) What StackAdapt brings - 3 points with emoji icons, 6) 2-3 proof stats for ${selected.industry}, 7) Blue "Book 30 Minutes" CTA button. Make it feel personal and specific.`,
                          selected.id
                        )
                      }
                      style={{
                        padding: '11px 22px',
                        background: BRAND,
                        border: 'none',
                        borderRadius: 8,
                        color: '#fff',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: 13,
                        marginBottom: 16,
                      }}
                    >
                      {loading[`page-${selected.id}`]
                        ? '⧉ Generating...'
                        : '⧉ Generate Landing Page + Video Script'}
                    </button>
                    {aiOutput[`page-${selected.id}`] && (
                      <>
                        <div
                          style={{
                            border: '1px solid #1e2530',
                            borderRadius: 12,
                            overflow: 'hidden',
                            marginTop: 8,
                          }}
                        >
                          <div
                            style={{
                              background: '#1e2530',
                              padding: '10px 16px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                            }}
                          >
                            <div
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                background: '#ef4444',
                              }}
                            />
                            <div
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                background: '#f59e0b',
                              }}
                            />
                            <div
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                background: '#22c55e',
                              }}
                            />
                            <span
                              style={{
                                fontSize: 11,
                                color: '#6b7280',
                                marginLeft: 8,
                              }}
                            >
                              stackadapt.com/for/
                              {selected.company
                                .toLowerCase()
                                .replace(/[^a-z0-9]/g, '-')}
                            </span>
                          </div>
                          <iframe
                            srcDoc={aiOutput[`page-${selected.id}`]}
                            sandbox="allow-scripts allow-same-origin"
                            style={{
                              width: '100%',
                              height: 600,
                              border: 'none',
                              display: 'block',
                            }}
                            title={`Landing page for ${selected.company}`}
                          />
                        </div>
                        {/* Live Preview */}
                        <div
                          style={{
                            border: '1px solid #1e2530',
                            borderRadius: 12,
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              background: BRAND,
                              padding: '14px 22px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                            }}
                          >
                            <svg width="18" height="14" viewBox="0 0 28 20">
                              <rect width="28" height="6" rx="2" fill="white" />
                              <rect
                                y="7"
                                width="20"
                                height="6"
                                rx="2"
                                fill="white"
                                opacity="0.7"
                              />
                              <rect
                                y="14"
                                width="12"
                                height="6"
                                rx="2"
                                fill="white"
                                opacity="0.4"
                              />
                            </svg>
                            <span
                              style={{
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: 12,
                              }}
                            >
                              stackadapt.com/for/
                              {selected.company
                                .toLowerCase()
                                .replace(/[^a-z0-9]/g, '-')}
                            </span>
                          </div>
                          <div style={{ background: '#0a0d14', padding: 28 }}>
                            <div
                              style={{
                                fontSize: 10,
                                color: BRAND,
                                fontWeight: 700,
                                letterSpacing: '1.5px',
                                marginBottom: 12,
                              }}
                            >
                              BUILT FOR {selected.cmo.toUpperCase()}
                            </div>
                            <div
                              style={{
                                fontSize: 22,
                                fontWeight: 800,
                                color: '#fff',
                                lineHeight: 1.3,
                                marginBottom: 20,
                              }}
                            >
                              How {selected.company} wins the programmatic
                              efficiency battle in 2025
                            </div>
                            <div
                              style={{
                                background: '#161b22',
                                borderRadius: 10,
                                padding: 20,
                                marginBottom: 20,
                                display: 'flex',
                                justifyContent: 'space-around',
                              }}
                            >
                              {[
                                { n: '34%', l: 'ROAS Lift' },
                                { n: '90', l: 'Days' },
                                { n: 'F500', l: 'Verified' },
                              ].map((m) => (
                                <div key={m.n} style={{ textAlign: 'center' }}>
                                  <div
                                    style={{
                                      fontSize: 28,
                                      fontWeight: 800,
                                      color: BRAND,
                                    }}
                                  >
                                    {m.n}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: 10,
                                      color: '#6b7280',
                                      marginTop: 2,
                                    }}
                                  >
                                    {m.l}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div
                              style={{
                                background: BRAND,
                                borderRadius: 8,
                                padding: '14px 20px',
                                textAlign: 'center',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: 14,
                              }}
                            >
                              Book 20 Minutes →
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      background: '#0d1117',
                      border: '1px dashed #1e2530',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4b5563',
                      fontSize: 14,
                      minHeight: 300,
                    }}
                  >
                    ← Select an account to generate a landing page
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── PIPELINE ── */}
          {nav === 'pipeline' && (
            <div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 6,
                }}
              >
                Pipeline
              </div>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 24 }}>
                Move accounts through relationship stages · use ← → to advance
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                {STAGES.map((stage) => (
                  <div
                    key={stage}
                    style={{
                      background: '#0d1117',
                      border: '1px solid #1e2530',
                      borderTop: `3px solid ${stageColors[stage] || '#6b7280'}`,
                      borderRadius: 10,
                      padding: 14,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: stageColors[stage] || '#6b7280',
                        letterSpacing: '1px',
                        marginBottom: 4,
                      }}
                    >
                      {stage.toUpperCase()}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: '#fff',
                        marginBottom: 12,
                      }}
                    >
                      {accounts.filter((a) => a.stage === stage).length}
                    </div>
                    {accounts
                      .filter((a) => a.stage === stage)
                      .map((a) => (
                        <div
                          key={a.id}
                          style={{
                            background: '#161b22',
                            borderRadius: 8,
                            padding: 10,
                            marginBottom: 6,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: '#fff',
                              marginBottom: 2,
                            }}
                          >
                            {a.company}
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: '#6b7280',
                              marginBottom: 6,
                            }}
                          >
                            {a.dealSize}
                          </div>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button
                              onClick={() => moveStage(a.id, -1)}
                              style={{
                                flex: 1,
                                padding: '4px 0',
                                background: '#1e2530',
                                border: 'none',
                                borderRadius: 4,
                                color: '#9ca3af',
                                cursor: 'pointer',
                                fontSize: 11,
                              }}
                            >
                              ←
                            </button>
                            <button
                              onClick={() => moveStage(a.id, 1)}
                              style={{
                                flex: 1,
                                padding: '4px 0',
                                background: BRAND,
                                border: 'none',
                                borderRadius: 4,
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: 11,
                              }}
                            >
                              →
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: '#0d1117',
                  border: '1px solid #1e2530',
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 14,
                  }}
                >
                  Pipeline Value by Stage
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 12,
                  }}
                >
                  {STAGES.map((stage) => {
                    const stageAccounts = accounts.filter(
                      (a) => a.stage === stage
                    );
                    const value = stageAccounts.reduce(
                      (s, a) =>
                        s +
                        parseFloat(a.dealSize.replace(/[$M]/g, '')) * 1000000,
                      0
                    );
                    return (
                      <div key={stage} style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            fontSize: 22,
                            fontWeight: 800,
                            color: stageColors[stage] || '#6b7280',
                          }}
                        >
                          ${(value / 1000000).toFixed(1)}M
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: '#6b7280',
                            marginTop: 3,
                          }}
                        >
                          {stage}
                        </div>
                        <div style={{ fontSize: 10, color: '#4b5563' }}>
                          {stageAccounts.length} accounts
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

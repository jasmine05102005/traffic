// SmartCommute AI Mock Data for Top 10 Indian Cities

export const CITIES = {
  HYDERABAD: 'Hyderabad',
  VIJAYAWADA: 'Vijayawada',
  BENGALURU: 'Bengaluru',
  DELHI: 'Delhi NCR',
  MUMBAI: 'Mumbai',
  CHENNAI: 'Chennai',
  KOLKATA: 'Kolkata',
  PUNE: 'Pune',
  AHMEDABAD: 'Ahmedabad',
  JAIPUR: 'Jaipur'
};

export const CITY_COORDINATES = {
  [CITIES.HYDERABAD]: [17.42, 78.43],
  [CITIES.VIJAYAWADA]: [16.506, 80.64],
  [CITIES.BENGALURU]: [12.9716, 77.5946],
  [CITIES.DELHI]: [28.6139, 77.2090],
  [CITIES.MUMBAI]: [19.0760, 72.8777],
  [CITIES.CHENNAI]: [13.0827, 80.2707],
  [CITIES.KOLKATA]: [22.5726, 88.3639],
  [CITIES.PUNE]: [18.5204, 73.8567],
  [CITIES.AHMEDABAD]: [23.0225, 72.5714],
  [CITIES.JAIPUR]: [26.9124, 75.7873]
};

// Locations for route selection in 10 cities
export const LOCATIONS = {
  [CITIES.HYDERABAD]: [
    { id: 'secunderabad', name: 'Secunderabad Station', coords: [17.4399, 78.4983] },
    { id: 'hitec_city', name: 'HITEC City Metro', coords: [17.4483, 78.3741] },
    { id: 'gachibowli', name: 'Gachibowli DLF', coords: [17.4401, 78.3489] },
    { id: 'jubilee_hills', name: 'Jubilee Hills Road No. 36', coords: [17.4319, 78.4093] },
    { id: 'charminar', name: 'Charminar', coords: [17.3616, 78.4747] },
    { id: 'begumpet', name: 'Begumpet Airport Rd', coords: [17.4375, 78.4482] }
  ],
  [CITIES.VIJAYAWADA]: [
    { id: 'benz_circle', name: 'Benz Circle', coords: [16.5011, 80.6480] },
    { id: 'mg_road', name: 'MG Road Hub', coords: [16.5062, 80.6416] },
    { id: 'pnbs', name: 'Pandit Nehru Bus Station', coords: [16.5097, 80.6200] },
    { id: 'railway_station', name: 'Vijayawada Junction', coords: [16.5186, 80.6212] },
    { id: 'kanaka_durga', name: 'Kanaka Durga Temple', coords: [16.5158, 80.6053] }
  ],
  [CITIES.BENGALURU]: [
    { id: 'majestic', name: 'Majestic Metro Interchange', coords: [12.9779, 77.5729] },
    { id: 'indiranagar', name: 'Indiranagar Hub', coords: [12.9784, 77.6408] },
    { id: 'whitefield', name: 'Whitefield ITPL', coords: [12.9866, 77.7329] },
    { id: 'mg_road_blr', name: 'MG Road Metro', coords: [12.9738, 77.6119] },
    { id: 'koramangala', name: 'Koramangala 4th Block', coords: [12.9338, 77.6244] }
  ],
  [CITIES.DELHI]: [
    { id: 'connaught_place', name: 'Connaught Place (CP)', coords: [28.6304, 77.2177] },
    { id: 'ndls', name: 'New Delhi Railway Station', coords: [28.6429, 77.2215] },
    { id: 'noida_62', name: 'Noida Sector 62', coords: [28.6253, 77.3732] },
    { id: 'cyber_city', name: 'Gurugram Cyber City', coords: [28.4950, 77.0896] },
    { id: 'india_gate', name: 'India Gate Hub', coords: [28.6129, 77.2295] }
  ],
  [CITIES.MUMBAI]: [
    { id: 'cst_station', name: 'Chhatrapati Shivaji Terminal', coords: [18.9400, 72.8353] },
    { id: 'bkc_hub', name: 'Bandra Kurla Complex (BKC)', coords: [19.0596, 72.8643] },
    { id: 'andheri_metro', name: 'Andheri Metro Hub', coords: [19.1200, 72.8450] },
    { id: 'nariman_point', name: 'Nariman Point Terminal', coords: [18.9269, 72.8224] }
  ],
  [CITIES.CHENNAI]: [
    { id: 'chennai_central', name: 'Chennai Central Station', coords: [13.0824, 80.2750] },
    { id: 't_nagar', name: 'T-Nagar Commercial Hub', coords: [13.0418, 80.2341] },
    { id: 'omr_corridor', name: 'OMR IT Corridor', coords: [12.9156, 80.2312] },
    { id: 'guindy_metro', name: 'Guindy Metro Station', coords: [13.0092, 80.2131] }
  ],
  [CITIES.KOLKATA]: [
    { id: 'howrah_bridge', name: 'Howrah Station Hub', coords: [22.5851, 88.3458] },
    { id: 'salt_lake', name: 'Salt Lake Sector V', coords: [22.5735, 88.4331] },
    { id: 'park_street', name: 'Park Street Metro', coords: [22.5532, 88.3533] }
  ],
  [CITIES.PUNE]: [
    { id: 'pune_junction', name: 'Pune Junction Station', coords: [18.5289, 73.8744] },
    { id: 'hinjewadi_it', name: 'Hinjewadi IT Phase 1', coords: [18.5913, 73.7389] },
    { id: 'shivajinagar', name: 'Shivajinagar Bus Hub', coords: [18.5310, 73.8550] }
  ],
  [CITIES.AHMEDABAD]: [
    { id: 'kalupur_station', name: 'Kalupur Central Station', coords: [23.0298, 72.5970] },
    { id: 'satellite_GIDC', name: 'Satellite IT Zone', coords: [23.0280, 72.5250] },
    { id: 'ashram_road', name: 'Ashram Road Boulevard', coords: [23.0385, 72.5732] }
  ],
  [CITIES.JAIPUR]: [
    { id: 'jaipur_junction', name: 'Jaipur Junction', coords: [26.9200, 75.7860] },
    { id: 'c_scheme', name: 'C-Scheme Business Hub', coords: [26.9110, 75.8010] },
    { id: 'mansarovar', name: 'Mansarovar Metro Station', coords: [26.8770, 75.7530] }
  ]
};

// Generates default route when direct data is missing
export const getDefaultRoute = (origin, dest) => {
  if (!origin || !dest) return [];

  return [
    {
      id: 'custom_fastest',
      type: 'Fastest Route',
      title: 'AI Smart Multi-Modal Corridor',
      duration: 28,
      cost: 40,
      co2Saved: 1.8,
      mode: 'Metro + EV Feeder scooter',
      ecoScore: 92,
      segments: [
        { mode: 'walk', desc: `Walk from ${origin.name} to corridor platform`, duration: 4, cost: 0, coords: [origin.coords, [origin.coords[0] - 0.002, origin.coords[1] + 0.002]] },
        { mode: 'metro', desc: 'Transit via rapid mass-railway network', duration: 18, cost: 20, coords: [[origin.coords[0] - 0.002, origin.coords[1] + 0.002], [dest.coords[0] + 0.002, dest.coords[1] - 0.002]] },
        { mode: 'scooter', desc: `EV smart E-scooter feeder to ${dest.name}`, duration: 6, cost: 20, coords: [[dest.coords[0] + 0.002, dest.coords[1] - 0.002], dest.coords] }
      ]
    },
    {
      id: 'custom_cheapest',
      type: 'Cheapest Route',
      title: 'Unified Bus Feeder Corridor',
      duration: 44,
      cost: 15,
      co2Saved: 2.1,
      mode: 'Electric City Bus',
      ecoScore: 96,
      segments: [
        { mode: 'walk', desc: 'Walk to municipal bus stop', duration: 5, cost: 0, coords: [origin.coords, [origin.coords[0] - 0.001, origin.coords[1] + 0.001]] },
        { mode: 'bus', desc: 'City Bus transit (zero-emission vehicle)', duration: 34, cost: 15, coords: [[origin.coords[0] - 0.001, origin.coords[1] + 0.001], dest.coords] },
        { mode: 'walk', desc: 'Walk to destination', duration: 5, cost: 0, coords: [dest.coords, dest.coords] }
      ]
    },
    {
      id: 'custom_greenest',
      type: 'Greenest Route',
      title: 'EV Rideshare Shuttle Pool',
      duration: 34,
      cost: 35,
      co2Saved: 2.5,
      mode: 'EV Shared Cab',
      ecoScore: 98,
      segments: [
        { mode: 'cab', desc: 'Shared Electric Cab pool', duration: 30, cost: 35, coords: [origin.coords, dest.coords] },
        { mode: 'walk', desc: 'Short walk to destination gate', duration: 4, cost: 0, coords: [dest.coords, dest.coords] }
      ]
    }
  ];
};

// Smart Parking Locations for 10 cities
export const PARKING_LOTS = {
  [CITIES.HYDERABAD]: [
    { id: 'prk_hitec', name: 'HITEC Cyber Towers Parking', coords: [17.4490, 78.3755], total: 150, available: 42, rate: 30, type: 'Smart/EV' },
    { id: 'prk_dlf', name: 'DLF Cybercity Ground Parking', coords: [17.4410, 78.3495], total: 200, available: 12, rate: 40, type: 'Multi-Level' },
    { id: 'prk_sec', name: 'Secunderabad Railway Station Multi-level', coords: [17.4410, 78.4990], total: 300, available: 125, rate: 20, type: 'Multi-Level' },
    { id: 'prk_jhills', name: 'Jubilee Hills Metro Mall Parking', coords: [17.4330, 78.4080], total: 80, available: 0, rate: 50, type: 'Smart' }
  ],
  [CITIES.VIJAYAWADA]: [
    { id: 'prk_benz', name: 'Benz Circle Trendset Mall', coords: [16.5018, 80.6490], total: 100, available: 35, rate: 25, type: 'Mall Smart' },
    { id: 'prk_pnbs', name: 'PNBS Terminal Parking', coords: [16.5105, 80.6210], total: 120, available: 62, rate: 15, type: 'Public Smart' },
    { id: 'prk_kdurga', name: 'Durga Ghat Tourist Parking', coords: [16.5150, 80.6030], total: 180, available: 8, rate: 20, type: 'Ground Smart' }
  ],
  [CITIES.BENGALURU]: [
    { id: 'prk_majestic', name: 'Majestic Metro Multi-Level', coords: [12.9770, 77.5740], total: 250, available: 94, rate: 30, type: 'Metro Smart' },
    { id: 'prk_indira', name: 'Indiranagar Double Road Lot', coords: [12.9790, 77.6415], total: 120, available: 8, rate: 40, type: 'Ground Smart' },
    { id: 'prk_whitefield', name: 'ITPL Cyber Park Complex', coords: [12.9855, 77.7340], total: 350, available: 142, rate: 50, type: 'Smart/EV Reserved' }
  ],
  [CITIES.DELHI]: [
    { id: 'prk_cp', name: 'Connaught Place Underground Block B', coords: [28.6310, 77.2185], total: 400, available: 184, rate: 30, type: 'Underground Smart' },
    { id: 'prk_ndls', name: 'New Delhi Railway Station Multilevel', coords: [28.6435, 77.2225], total: 500, available: 110, rate: 20, type: 'Municipal Multi-Level' },
    { id: 'prk_cybercity', name: 'Gurugram Cyber Hub Smart Parking', coords: [28.4960, 77.0910], total: 300, available: 42, rate: 60, type: 'AI Optimised / EV' }
  ],
  [CITIES.MUMBAI]: [
    { id: 'prk_cst', name: 'Fort CST Underground Parking', coords: [18.9410, 72.8360], total: 200, available: 45, rate: 40, type: 'Smart/EV' },
    { id: 'prk_bkc', name: 'BKC MMRDA Smart Plaza', coords: [19.0580, 72.8650], total: 400, available: 112, rate: 50, type: 'Smart Multi-Level' }
  ],
  [CITIES.CHENNAI]: [
    { id: 'prk_central', name: 'Chennai Central Railway Parking', coords: [13.0830, 80.2760], total: 180, available: 32, rate: 20, type: 'Public Smart' },
    { id: 'prk_omr', name: 'Tidel Park OMR EV Hub', coords: [12.9160, 80.2320], total: 220, available: 94, rate: 35, type: 'EV Priority' }
  ],
  [CITIES.KOLKATA]: [
    { id: 'prk_howrah', name: 'Howrah Station Terminal Lot', coords: [22.5860, 88.3460], total: 250, available: 104, rate: 20, type: 'Multi-Level' },
    { id: 'prk_saltlake', name: 'Sector V Techno Plaza Lot', coords: [22.5740, 88.4340], total: 150, available: 18, rate: 30, type: 'Smart Plaza' }
  ],
  [CITIES.PUNE]: [
    { id: 'prk_hinjewadi', name: 'Hinjewadi Quadron IT Parking', coords: [18.5920, 73.7400], total: 300, available: 165, rate: 30, type: 'Corporate Multi-Level' }
  ],
  [CITIES.AHMEDABAD]: [
    { id: 'prk_kalupur', name: 'Kalupur Station Metro Lot', coords: [23.0305, 72.5980], total: 150, available: 42, rate: 15, type: 'Smart Plaza' }
  ],
  [CITIES.JAIPUR]: [
    { id: 'prk_mansarovar', name: 'Mansarovar Metro Ground Lot', coords: [26.8780, 75.7540], total: 100, available: 58, rate: 20, type: 'Public Smart' }
  ]
};

// EV Charging Stations for 10 cities
export const EV_STATIONS = {
  [CITIES.HYDERABAD]: [
    { id: 'ev_hitec', name: 'Tata Power EZ Charge (HITEC)', coords: [17.4475, 78.3730], fastChargers: 4, slowChargers: 8, availableFast: 2, availableSlow: 5, batterySwapAvailable: true, rate: 18 },
    { id: 'ev_gachibowli', name: 'Ather Grid Charging Station (DLF)', coords: [17.4385, 78.3478], fastChargers: 6, slowChargers: 0, availableFast: 3, availableSlow: 0, batterySwapAvailable: false, rate: 15 }
  ],
  [CITIES.VIJAYAWADA]: [
    { id: 'ev_mgroad', name: 'Jio-bp Pulse Charging Hub (MG Rd)', coords: [16.5055, 80.6425], fastChargers: 4, slowChargers: 4, availableFast: 1, availableSlow: 3, batterySwapAvailable: true, rate: 14 }
  ],
  [CITIES.BENGALURU]: [
    { id: 'ev_majestic', name: 'BESCOM Fast EV Charging Center', coords: [12.9760, 77.5710], fastChargers: 8, slowChargers: 12, availableFast: 5, availableSlow: 9, batterySwapAvailable: true, rate: 12 },
    { id: 'ev_whitefield', name: 'Zeon Charging ITPL Zone', coords: [12.9875, 77.7315], fastChargers: 6, slowChargers: 6, availableFast: 2, availableSlow: 4, batterySwapAvailable: true, rate: 18 }
  ],
  [CITIES.DELHI]: [
    { id: 'ev_cp', name: 'Tata Power EZ Charge CP Hub', coords: [28.6295, 77.2160], fastChargers: 8, slowChargers: 10, availableFast: 4, availableSlow: 7, batterySwapAvailable: true, rate: 16 },
    { id: 'ev_noida', name: 'Blue Smart Charging Noida Depot', coords: [28.6240, 77.3710], fastChargers: 12, slowChargers: 6, availableFast: 8, availableSlow: 3, batterySwapAvailable: true, rate: 14 }
  ],
  [CITIES.MUMBAI]: [
    { id: 'ev_cst_mumbai', name: 'Tata Power Fort Depot', coords: [18.9405, 72.8345], fastChargers: 8, slowChargers: 8, availableFast: 3, availableSlow: 6, batterySwapAvailable: true, rate: 18 },
    { id: 'ev_bkc_mumbai', name: 'Jio-bp BKC Super Hub', coords: [19.0605, 72.8635], fastChargers: 15, slowChargers: 10, availableFast: 7, availableSlow: 8, batterySwapAvailable: true, rate: 15 }
  ],
  [CITIES.CHENNAI]: [
    { id: 'ev_chennai_central', name: 'Ather Grid Central Station Hub', coords: [13.0820, 80.2745], fastChargers: 4, slowChargers: 0, availableFast: 2, availableSlow: 0, batterySwapAvailable: false, rate: 16 }
  ],
  [CITIES.KOLKATA]: [
    { id: 'ev_kolkata_saltlake', name: 'Tata Power EZ Salt Lake Hub', coords: [22.5730, 88.4325], fastChargers: 6, slowChargers: 6, availableFast: 4, availableSlow: 3, batterySwapAvailable: true, rate: 14 }
  ],
  [CITIES.PUNE]: [
    { id: 'ev_pune_hinjewadi', name: 'Ather Grid Hinjewadi Tech Park', coords: [18.5910, 73.7375], fastChargers: 8, slowChargers: 4, availableFast: 3, availableSlow: 2, batterySwapAvailable: true, rate: 15 }
  ],
  [CITIES.AHMEDABAD]: [
    { id: 'ev_ahmedabad_central', name: 'Jio-bp Ashram Road Depot', coords: [23.0380, 72.5725], fastChargers: 6, slowChargers: 6, availableFast: 2, availableSlow: 4, batterySwapAvailable: true, rate: 14 }
  ],
  [CITIES.JAIPUR]: [
    { id: 'ev_jaipur_junction', name: 'Tata Power Jaipur Station Hub', coords: [26.9205, 75.7850], fastChargers: 4, slowChargers: 8, availableFast: 1, availableSlow: 5, batterySwapAvailable: false, rate: 16 }
  ]
};

// Mock Rideshare Offers for 10 cities
export const RIDESHARES = {
  [CITIES.HYDERABAD]: [
    { id: 'rs_1', driver: 'Rahul Sharma', rating: 4.8, vehicle: 'Tata Nexon EV', route: 'Secunderabad to Gachibowli', cost: 75, match: 94, eta: 5, seats: 2, coords: [17.4350, 78.4550] },
    { id: 'rs_2', driver: 'Priya Reddy', rating: 4.9, vehicle: 'Ola S1 Pro (Scooter)', route: 'Jubilee Hills to HITEC City', cost: 40, match: 88, eta: 3, seats: 1, coords: [17.4380, 78.3900] }
  ],
  [CITIES.VIJAYAWADA]: [
    { id: 'rs_4', driver: 'Srinivas Rao', rating: 4.7, vehicle: 'Mahindra Treo (Electric Auto)', route: 'PNBS to Benz Circle', cost: 20, match: 96, eta: 4, seats: 3, coords: [16.5080, 80.6300] }
  ],
  [CITIES.BENGALURU]: [
    { id: 'rs_6', driver: 'Karthik Gowda', rating: 4.8, vehicle: 'Ather 450X (Scooter)', route: 'Majestic to Indiranagar', cost: 45, match: 93, eta: 6, seats: 1, coords: [12.9750, 77.6000] },
    { id: 'rs_7', driver: 'Sneha Nair', rating: 4.9, vehicle: 'Tata Tiago EV', route: 'Indiranagar to Whitefield ITPL', cost: 85, match: 96, eta: 4, seats: 3, coords: [12.9820, 77.6800] }
  ],
  [CITIES.DELHI]: [
    { id: 'rs_8', driver: 'Amit Kumar', rating: 4.7, vehicle: 'MG Comet EV', route: 'Connaught Place to Gurugram', cost: 110, match: 95, eta: 8, seats: 2, coords: [28.5500, 77.1500] }
  ],
  [CITIES.MUMBAI]: [
    { id: 'rs_10', driver: 'Vikram Mehta', rating: 4.8, vehicle: 'MG ZS EV', route: 'CST to BKC Plaza', text: 'Bandra pool leg', cost: 80, match: 92, eta: 6, seats: 3, coords: [19.0100, 72.8450] }
  ],
  [CITIES.CHENNAI]: [
    { id: 'rs_11', driver: 'Kavin Selvam', rating: 4.9, vehicle: 'TVS iQube (Scooter)', route: 'Chennai Central to T-Nagar', cost: 35, match: 89, eta: 4, seats: 1, coords: [13.0600, 80.2500] }
  ],
  [CITIES.KOLKATA]: [
    { id: 'rs_12', driver: 'Subrata Dey', rating: 4.7, vehicle: 'Mahindra Treo Auto', route: 'Howrah to Park Street', cost: 25, match: 91, eta: 5, seats: 3, coords: [22.5650, 88.3500] }
  ],
  [CITIES.PUNE]: [
    { id: 'rs_13', driver: 'Aditya Patil', rating: 4.8, vehicle: 'Tata Nexon EV', route: 'Pune Junction to Hinjewadi IT', cost: 95, match: 94, eta: 7, seats: 2, coords: [18.5500, 73.8000] }
  ],
  [CITIES.AHMEDABAD]: [
    { id: 'rs_14', driver: 'Harsh Patel', rating: 4.6, vehicle: 'Ather 450X', route: 'Kalupur to Satellite Zone', cost: 40, match: 88, eta: 6, seats: 1, coords: [23.0290, 72.5500] }
  ],
  [CITIES.JAIPUR]: [
    { id: 'rs_15', driver: 'Rajesh Sharma', rating: 4.9, vehicle: 'Ola S1 Pro', route: 'Jaipur Station to C-Scheme', cost: 25, match: 93, eta: 3, seats: 1, coords: [26.9150, 75.7900] }
  ]
};

// Simulation Logs / Alerts for Government Dashboard
export const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'info', text: 'AI Optimization enabled for TSRTC bus fleets in Hyderabad Zone.', time: '08:50' },
  { id: 2, type: 'warning', text: 'Congestion spike predicted at Jubilee Hills Checkpost. Rerouting 45 commute vehicles.', time: '08:48' },
  { id: 3, type: 'eco', text: 'Daily CO2 savings target exceeded. Total: 12.8 tons offset across pilot cities.', time: '08:45' },
  { id: 4, type: 'info', text: 'Metro Line 1 passenger count peak: 14,200/hr. Feeder shuttles activated.', time: '08:40' },
  { id: 5, type: 'warning', text: 'Low battery swap inventory at Ather Begumpet Hub. Restocking schedule dispatched.', time: '08:35' }
];

// Historical Analytics Data for Government Charts
export const CONGESTION_FORECAST = [
  { hour: '06:00', historical: 20, optimized: 15 },
  { hour: '07:00', historical: 40, optimized: 28 },
  { hour: '08:00', historical: 75, optimized: 42 },
  { hour: '09:00', historical: 95, optimized: 54 },
  { hour: '10:00', historical: 88, optimized: 48 },
  { hour: '11:00', historical: 60, optimized: 38 },
  { hour: '12:00', historical: 50, optimized: 35 },
  { hour: '13:00', historical: 45, optimized: 30 },
  { hour: '14:00', historical: 48, optimized: 32 },
  { hour: '15:00', historical: 55, optimized: 35 },
  { hour: '16:00', historical: 68, optimized: 40 },
  { hour: '17:00', historical: 82, optimized: 46 },
  { hour: '18:00', historical: 98, optimized: 58 },
  { hour: '19:00', historical: 92, optimized: 52 },
  { hour: '20:00', historical: 70, optimized: 44 },
  { hour: '21:00', historical: 45, optimized: 30 }
];

export const TRANSIT_SHARE = [
  { name: 'Metro services', value: 42, color: '#00d2ff' },
  { name: 'City buses', value: 28, color: '#00ff88' },
  { name: 'Ride-sharing', value: 15, color: '#ffb300' },
  { name: 'E-bikes / Scooters', value: 10, color: '#a855f7' },
  { name: 'Private Vehicles', value: 5, color: '#ef4444' }
];

export const MONTHLY_CARBON_SAVINGS = [
  { month: 'Jan', co2: 8.5, target: 8.0 },
  { month: 'Feb', co2: 9.8, target: 8.5 },
  { month: 'Mar', co2: 11.2, target: 9.0 },
  { month: 'Apr', co2: 10.5, target: 9.5 },
  { month: 'May', co2: 12.4, target: 10.0 },
  { month: 'Jun', co2: 13.8, target: 10.5 }
];

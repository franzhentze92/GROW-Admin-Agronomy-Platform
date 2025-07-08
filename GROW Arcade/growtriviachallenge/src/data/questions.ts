export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  category: 'soil' | 'plant' | 'animal' | 'human' | 'planetary';
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

export const questions: Question[] = [
  // --- SOIL HEALTH: EASY ---
  {
    id: 'soil-1',
    text: 'What is soil made of?',
    options: ['Only rocks', 'Water and air only', 'Minerals, organic matter, water, and air', 'Just sand'],
    correctAnswer: 2,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Soil is a mixture of minerals, organic matter, water, and air.'
  },
  {
    id: 'soil-2',
    text: 'Which animal helps make soil healthy by breaking down dead plants?',
    options: ['Earthworm', 'Butterfly', 'Cat', 'Bird'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Earthworms break down dead plants and enrich the soil.'
  },
  {
    id: 'soil-3',
    text: 'What color is healthy soil often?',
    options: ['Bright blue', 'Dark brown or black', 'Pink', 'White'],
    correctAnswer: 1,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Healthy soil is usually dark brown or black due to organic matter.'
  },
  {
    id: 'soil-4',
    text: 'What do plants get from soil?',
    options: ['Music', 'Nutrients and water', 'Light', 'Air only'],
    correctAnswer: 1,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Plants absorb nutrients and water from the soil.'
  },
  {
    id: 'soil-5',
    text: 'Which of these is NOT found in soil?',
    options: ['Rocks', 'Plastic', 'Water', 'Air'],
    correctAnswer: 1,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Plastic is not a natural part of healthy soil.'
  },
  {
    id: 'soil-6',
    text: 'What do we call the top layer of soil?',
    options: ['Bedrock', 'Topsoil', 'Mantle', 'Lava'],
    correctAnswer: 1,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Topsoil is the uppermost layer of soil, rich in organic matter.'
  },
  {
    id: 'soil-7',
    text: 'Which tool is used to dig soil?',
    options: ['Spoon', 'Shovel', 'Pen', 'Brush'],
    correctAnswer: 1,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'A shovel is commonly used to dig soil.'
  },
  {
    id: 'soil-8',
    text: 'What helps prevent soil from blowing away?',
    options: ['Trees and plants', 'Cars', 'Plastic bags', 'Loud noises'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Trees and plants hold soil in place with their roots.'
  },
  {
    id: 'soil-9',
    text: 'What is compost?',
    options: ['Old food and plants that turn into soil', 'Plastic waste', 'Rocks', 'Metal'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Compost is decomposed organic matter that enriches soil.'
  },
  {
    id: 'soil-10',
    text: 'Why do farmers add manure to soil?',
    options: ['To make it smell nice', 'To add nutrients', 'To make it hard', 'To dry it out'],
    correctAnswer: 1,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Manure adds nutrients to the soil, helping plants grow.'
  },
  // --- SOIL HEALTH: EASY (ADDED) ---
  {
    id: 'soil-11',
    text: 'What is the main purpose of soil for plants?',
    options: ['To provide a place to play', 'To give nutrients and support', 'To keep them dry', 'To make them colorful'],
    correctAnswer: 1,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Soil provides nutrients and physical support for plants to grow.'
  },
  {
    id: 'soil-12',
    text: 'Which of these is a living thing found in healthy soil?',
    options: ['Earthworm', 'Plastic bag', 'Glass', 'Metal can'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Earthworms are living creatures that help keep soil healthy.'
  },
  {
    id: 'soil-13',
    text: 'What do roots do in the soil?',
    options: ['Fly in the air', 'Absorb water and nutrients', 'Make noise', 'Glow in the dark'],
    correctAnswer: 1,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Roots absorb water and nutrients from the soil for the plant.'
  },
  {
    id: 'soil-14',
    text: 'Which of these helps soil stay moist?',
    options: ['Mulch', 'Plastic', 'Rocks', 'Paper'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Mulch helps soil retain moisture and stay cool.'
  },
  {
    id: 'soil-15',
    text: 'What is a sign of healthy soil?',
    options: ['Lots of worms', 'No plants', 'Dry and cracked', 'Covered in trash'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Healthy soil often has many worms and other small creatures.'
  },
  {
    id: 'soil-16',
    text: 'Why should we avoid stepping on garden soil too much?',
    options: ['It makes it dirty', 'It compacts the soil', 'It makes it colorful', 'It makes it wet'],
    correctAnswer: 1,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Stepping on soil too much compacts it, making it hard for roots to grow.'
  },
  {
    id: 'soil-17',
    text: 'What is the best way to add nutrients to soil?',
    options: ['Add compost', 'Add plastic', 'Add sand', 'Add stones'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Compost adds nutrients and organic matter to soil.'
  },
  {
    id: 'soil-18',
    text: 'Which of these is a type of soil?',
    options: ['Clay', 'Glass', 'Plastic', 'Metal'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Clay is a type of soil with small particles.'
  },
  {
    id: 'soil-19',
    text: 'What do you call soil that is good for growing plants?',
    options: ['Fertile', 'Sticky', 'Hard', 'Dry'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Fertile soil is rich in nutrients and good for growing plants.'
  },
  {
    id: 'soil-20',
    text: 'What can you add to soil to help plants grow better?',
    options: ['Fertilizer', 'Paint', 'Plastic', 'Sandpaper'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Fertilizer adds nutrients to soil, helping plants grow.'
  },
  {
    id: 'soil-21',
    text: 'What is soil erosion?',
    options: ['Soil being washed or blown away', 'Soil turning into water', 'Soil growing plants', 'Soil making noise'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Soil erosion is when soil is carried away by wind or water.'
  },
  {
    id: 'soil-22',
    text: 'Which of these helps keep soil healthy?',
    options: ['Planting cover crops', 'Leaving soil bare', 'Adding trash', 'Pouring oil'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Cover crops protect and enrich the soil.'
  },
  {
    id: 'soil-23',
    text: 'What is the main ingredient in sandy soil?',
    options: ['Sand', 'Clay', 'Plastic', 'Metal'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Sandy soil is made mostly of sand particles.'
  },
  {
    id: 'soil-24',
    text: 'Why do gardeners test soil?',
    options: ['To check nutrients and pH', 'To see if it is tasty', 'To make it colorful', 'To make it noisy'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Testing soil helps gardeners know what nutrients or changes are needed.'
  },
  {
    id: 'soil-25',
    text: 'What is the best way to keep soil from drying out?',
    options: ['Water it and use mulch', 'Add rocks', 'Add plastic', 'Leave it bare'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Watering and using mulch help keep soil moist.'
  },
  {
    id: 'soil-26',
    text: 'What do you call soil that is too wet and sticky?',
    options: ['Clay', 'Sand', 'Gravel', 'Dust'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Clay soil is often wet and sticky.'
  },
  {
    id: 'soil-27',
    text: 'What is the main job of soil in a garden?',
    options: ['Support and feed plants', 'Make noise', 'Grow rocks', 'Hold water only'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Soil supports plants and provides them with nutrients and water.'
  },
  {
    id: 'soil-28',
    text: 'Which of these is a benefit of earthworms in soil?',
    options: ['They make tunnels that help air and water move', 'They eat plants', 'They make soil hard', 'They dry out the soil'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Earthworms make tunnels that help air and water move through soil.'
  },
  {
    id: 'soil-29',
    text: 'What is the best way to keep soil healthy?',
    options: ['Add organic matter', 'Add plastic', 'Add salt', 'Add paint'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Adding organic matter like compost keeps soil healthy.'
  },
  {
    id: 'soil-30',
    text: 'What happens if soil is too hard?',
    options: ['Roots have trouble growing', 'Plants grow faster', 'Soil gets lighter', 'Soil turns blue'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Hard soil makes it difficult for roots to grow and for water to move.'
  },
  // --- SOIL HEALTH: EASY (ADDED 2) ---
  {
    id: 'soil-31',
    text: 'What is the main reason plants need soil?',
    options: ['To get nutrients and water', 'To fly', 'To make noise', 'To glow'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Soil provides plants with nutrients and water they need to grow.'
  },
  {
    id: 'soil-32',
    text: 'Which of these is a sign of poor soil health?',
    options: ['Few plants growing', 'Lots of worms', 'Dark color', 'Moisture'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'If few plants grow, the soil may be unhealthy.'
  },
  {
    id: 'soil-33',
    text: 'What do you call the process of adding dead plants to soil to help it?',
    options: ['Composting', 'Painting', 'Sweeping', 'Washing'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Composting adds nutrients to soil by breaking down dead plants.'
  },
  {
    id: 'soil-34',
    text: 'Which of these is NOT a type of soil?',
    options: ['Chocolate', 'Clay', 'Sand', 'Silt'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Chocolate is not a type of soil.'
  },
  {
    id: 'soil-35',
    text: 'What is the best way to keep soil from washing away?',
    options: ['Plant grass or trees', 'Remove all plants', 'Add plastic', 'Dig holes'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Plants help hold soil in place and prevent erosion.'
  },
  {
    id: 'soil-36',
    text: 'What is the main job of earthworms in soil?',
    options: ['Make tunnels and break down matter', 'Eat leaves', 'Make noise', 'Fly'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Earthworms make tunnels and help break down organic matter.'
  },
  {
    id: 'soil-37',
    text: 'Which of these is a benefit of adding mulch to soil?',
    options: ['Keeps soil moist', 'Makes soil hard', 'Removes nutrients', 'Adds plastic'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Mulch helps soil retain moisture and stay cool.'
  },
  {
    id: 'soil-38',
    text: 'What is the best way to improve sandy soil?',
    options: ['Add compost or organic matter', 'Add more sand', 'Add plastic', 'Add rocks'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Adding compost improves sandy soil by helping it hold water and nutrients.'
  },
  {
    id: 'soil-39',
    text: 'What is the main ingredient in clay soil?',
    options: ['Tiny particles', 'Big rocks', 'Plastic', 'Glass'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Clay soil is made of very tiny particles.'
  },
  {
    id: 'soil-40',
    text: 'Why is it important to keep soil covered with plants or mulch?',
    options: ['To prevent erosion and keep moisture', 'To make it look pretty', 'To keep it cold', 'To attract animals'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Covering soil prevents erosion and helps retain moisture.'
  },
  {
    id: 'soil-41',
    text: 'What is the best way to test if soil is healthy?',
    options: ['Look for worms and plant growth', 'Check if it is dry', 'See if it is hard', 'Smell it'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Healthy soil usually has worms and lots of plant growth.'
  },
  {
    id: 'soil-42',
    text: 'What happens if you add too much water to soil?',
    options: ['It can drown plant roots', 'It makes plants grow faster', 'It adds nutrients', 'It makes soil disappear'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Too much water can drown plant roots and harm plants.'
  },
  {
    id: 'soil-43',
    text: 'Which of these is a natural way to add nutrients to soil?',
    options: ['Compost', 'Plastic', 'Paint', 'Glass'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Compost is a natural way to add nutrients to soil.'
  },
  {
    id: 'soil-44',
    text: 'What is the main job of soil in a forest?',
    options: ['Support trees and plants', 'Make noise', 'Grow rocks', 'Hold water only'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Soil supports trees and plants in a forest.'
  },
  {
    id: 'soil-45',
    text: 'What is the best way to keep soil from blowing away in the wind?',
    options: ['Plant grass or shrubs', 'Remove all plants', 'Add plastic', 'Dig holes'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Plants help hold soil in place and prevent wind erosion.'
  },
  {
    id: 'soil-46',
    text: 'What is the main reason to add compost to a garden?',
    options: ['To add nutrients', 'To make it hard', 'To dry it out', 'To add plastic'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Compost adds nutrients to the soil, helping plants grow.'
  },
  {
    id: 'soil-47',
    text: 'What is the best way to keep soil healthy in a garden?',
    options: ['Rotate crops', 'Plant the same thing every year', 'Add plastic', 'Add salt'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Rotating crops helps keep soil healthy and prevents disease.'
  },
  {
    id: 'soil-48',
    text: 'What is the main job of soil in a farm?',
    options: ['Support crops and provide nutrients', 'Make noise', 'Grow rocks', 'Hold water only'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Soil supports crops and provides them with nutrients and water.'
  },
  {
    id: 'soil-49',
    text: 'What is the best way to keep soil from getting too hard?',
    options: ['Add organic matter and avoid stepping on it', 'Add plastic', 'Add salt', 'Add paint'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Adding organic matter and avoiding compaction keeps soil loose and healthy.'
  },
  {
    id: 'soil-50',
    text: 'What is the main reason to keep soil healthy?',
    options: ['To grow strong plants', 'To make it colorful', 'To make it noisy', 'To attract animals'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'easy',
    explanation: 'Healthy soil is needed to grow strong, healthy plants.'
  },
  // --- SOIL HEALTH: MEDIUM ---
  {
    id: 'soil-51',
    text: 'What is the main function of mycorrhizal fungi in soil?',
    options: [
      'Help plants absorb nutrients',
      'Cause soil erosion',
      'Make soil dry',
      'Increase soil compaction'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Mycorrhizal fungi form symbiotic relationships with plant roots, helping them absorb nutrients.'
  },
  {
    id: 'soil-52',
    text: 'Which soil property is measured by a penetrometer?',
    options: [
      'Compaction',
      'Color',
      'pH',
      'Temperature'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'A penetrometer measures how compacted the soil is.'
  },
  {
    id: 'soil-53',
    text: 'What is the main cause of soil acidification?',
    options: [
      'Overuse of nitrogen fertilizers',
      'Adding compost',
      'Planting trees',
      'Using mulch'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Excessive use of nitrogen fertilizers can make soil more acidic.'
  },
  {
    id: 'soil-54',
    text: 'Which soil layer contains the most plant roots?',
    options: [
      'Topsoil',
      'Bedrock',
      'Subsoil',
      'Parent material'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Most plant roots are found in the topsoil layer.'
  },
  {
    id: 'soil-55',
    text: 'What is the main benefit of crop rotation for soil?',
    options: [
      'Prevents nutrient depletion',
      'Increases soil erosion',
      'Reduces soil moisture',
      'Makes soil harder'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Crop rotation helps maintain soil fertility and prevents nutrient depletion.'
  },
  {
    id: 'soil-56',
    text: 'Which element is essential for chlorophyll production in plants?',
    options: [
      'Magnesium',
      'Iron',
      'Calcium',
      'Sulfur'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Magnesium is a key component of chlorophyll.'
  },
  {
    id: 'soil-57',
    text: 'What is the main function of soil aggregates?',
    options: [
      'Improve soil structure and water movement',
      'Increase soil acidity',
      'Reduce soil fertility',
      'Make soil heavier'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Soil aggregates help water and air move through soil and improve structure.'
  },
  {
    id: 'soil-58',
    text: 'Which farming practice can lead to soil salinization?',
    options: [
      'Over-irrigation',
      'Crop rotation',
      'Adding compost',
      'Mulching'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Over-irrigation without proper drainage can cause salts to build up in soil.'
  },
  {
    id: 'soil-59',
    text: 'What is the main role of earthworms in soil?',
    options: [
      'Decompose organic matter',
      'Eat plant roots',
      'Increase soil acidity',
      'Reduce soil moisture'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Earthworms break down organic matter and improve soil structure.'
  },
  {
    id: 'soil-60',
    text: 'Which soil property affects how much water it can hold?',
    options: [
      'Texture',
      'Color',
      'Smell',
      'Temperature'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Soil texture (sand, silt, clay) determines water-holding capacity.'
  },
  {
    id: 'soil-61',
    text: 'What is the main cause of nutrient leaching in soil?',
    options: [
      'Excessive rainfall or irrigation',
      'Adding mulch',
      'Planting cover crops',
      'Using compost'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Too much water can wash nutrients out of the soil.'
  },
  {
    id: 'soil-62',
    text: 'Which soil organism is important for nitrogen fixation?',
    options: [
      'Rhizobium bacteria',
      'Earthworms',
      'Ants',
      'Beetles'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Rhizobium bacteria fix nitrogen in the soil, making it available to plants.'
  },
  {
    id: 'soil-63',
    text: 'What is the main function of humus in soil?',
    options: [
      'Retain moisture and nutrients',
      'Increase soil temperature',
      'Make soil acidic',
      'Reduce plant growth'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Humus helps soil retain moisture and nutrients.'
  },
  {
    id: 'soil-64',
    text: 'Which soil type is best for growing most crops?',
    options: [
      'Loam',
      'Clay',
      'Sand',
      'Gravel'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Loam is a balanced soil type ideal for most crops.'
  },
  {
    id: 'soil-65',
    text: 'What is the main effect of soil compaction?',
    options: [
      'Reduces air and water movement',
      'Increases plant growth',
      'Makes soil lighter',
      'Adds nutrients'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Compacted soil has less space for air and water, making it harder for plants to grow.'
  },
  {
    id: 'soil-66',
    text: 'Which process describes the breakdown of rocks into soil?',
    options: [
      'Weathering',
      'Photosynthesis',
      'Evaporation',
      'Respiration'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Weathering is the process that breaks down rocks into soil.'
  },
  {
    id: 'soil-67',
    text: 'What is the main benefit of adding organic matter to soil?',
    options: [
      'Improves soil structure and fertility',
      'Makes soil harder',
      'Reduces plant growth',
      'Increases soil acidity'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Organic matter improves soil structure and fertility.'
  },
  {
    id: 'soil-68',
    text: 'Which soil property is measured by a pH meter?',
    options: [
      'Acidity or alkalinity',
      'Color',
      'Texture',
      'Temperature'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'A pH meter measures how acidic or alkaline the soil is.'
  },
  {
    id: 'soil-69',
    text: 'What is the main cause of soil erosion?',
    options: [
      'Wind and water movement',
      'Adding compost',
      'Planting trees',
      'Using mulch'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Wind and water can carry soil away, causing erosion.'
  },
  {
    id: 'soil-70',
    text: 'Which farming practice helps prevent soil erosion?',
    options: [
      'Contour plowing',
      'Overgrazing',
      'Monoculture',
      'Deforestation'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Contour plowing helps prevent soil erosion on slopes.'
  },
  {
    id: 'soil-71',
    text: 'Which mineral is most important for root development in plants?',
    options: ['Phosphorus', 'Iron', 'Potassium', 'Zinc'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Phosphorus is essential for strong root growth in plants.'
  },
  {
    id: 'soil-72',
    text: 'What is the main function of soil microorganisms?',
    options: ['Decompose organic matter', 'Increase soil compaction', 'Reduce soil fertility', 'Make soil dry'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Soil microorganisms break down organic matter and recycle nutrients.'
  },
  {
    id: 'soil-73',
    text: 'Which soil amendment is used to raise soil pH?',
    options: ['Lime', 'Sulfur', 'Compost', 'Sand'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Lime is commonly used to make soil less acidic (raise pH).'
  },
  {
    id: 'soil-74',
    text: 'What is the main cause of soil nutrient depletion?',
    options: ['Continuous cropping without replenishment', 'Adding compost', 'Planting cover crops', 'Using mulch'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Growing crops repeatedly without adding nutrients depletes soil fertility.'
  },
  {
    id: 'soil-75',
    text: 'Which soil property is most affected by organic matter?',
    options: ['Water retention', 'Color', 'Temperature', 'Slope'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Organic matter helps soil retain water.'
  },
  {
    id: 'soil-76',
    text: 'What is the main benefit of reduced tillage farming?',
    options: ['Preserves soil structure and reduces erosion', 'Increases soil compaction', 'Removes nutrients', 'Makes soil dry'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Reduced tillage helps maintain soil structure and prevents erosion.'
  },
  {
    id: 'soil-77',
    text: 'Which soil type is most likely to become waterlogged?',
    options: ['Clay', 'Sand', 'Loam', 'Silt'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Clay soils have small particles and can easily become waterlogged.'
  },
  {
    id: 'soil-78',
    text: 'What is the main function of gypsum as a soil amendment?',
    options: ['Improves soil structure and drainage', 'Raises soil pH', 'Adds nitrogen', 'Increases soil compaction'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Gypsum helps improve soil structure and drainage, especially in clay soils.'
  },
  {
    id: 'soil-79',
    text: 'Which process describes the movement of water downward through soil?',
    options: ['Percolation', 'Evaporation', 'Photosynthesis', 'Respiration'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Percolation is the movement of water through soil layers.'
  },
  {
    id: 'soil-80',
    text: 'What is the main effect of excessive fertilizer use on soil?',
    options: ['Can lead to nutrient runoff and pollution', 'Improves soil structure', 'Reduces soil erosion', 'Makes soil more acidic'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Too much fertilizer can cause nutrients to run off into water bodies, causing pollution.'
  },
  {
    id: 'soil-81',
    text: 'Which soil property is measured by a soil thermometer?',
    options: ['Temperature', 'pH', 'Texture', 'Color'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'A soil thermometer measures the temperature of the soil.'
  },
  {
    id: 'soil-82',
    text: 'What is the main benefit of using cover crops?',
    options: ['Protects soil from erosion and adds organic matter', 'Increases soil compaction', 'Removes nutrients', 'Makes soil dry'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Cover crops protect soil and add organic matter when they decompose.'
  },
  {
    id: 'soil-83',
    text: 'Which element is a secondary macronutrient for plants?',
    options: ['Calcium', 'Nitrogen', 'Phosphorus', 'Potassium'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Calcium is a secondary macronutrient important for plant growth.'
  },
  {
    id: 'soil-84',
    text: 'What is the main function of soil pores?',
    options: ['Allow air and water movement', 'Increase soil compaction', 'Reduce plant growth', 'Make soil dry'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Soil pores are spaces that allow air and water to move through soil.'
  },
  {
    id: 'soil-85',
    text: 'Which soil property is most important for seed germination?',
    options: ['Moisture', 'Color', 'Slope', 'Smell'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Seeds need moisture in the soil to germinate.'
  },
  {
    id: 'soil-86',
    text: 'What is the main cause of soil crusting?',
    options: ['Heavy rain on bare soil', 'Adding mulch', 'Planting cover crops', 'Using compost'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Heavy rain on bare soil can cause a hard crust to form on the surface.'
  },
  {
    id: 'soil-87',
    text: 'Which soil property is measured by a soil test kit?',
    options: ['Nutrient content', 'Color', 'Slope', 'Temperature'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Soil test kits measure the nutrient content of soil.'
  },
  {
    id: 'soil-88',
    text: 'What is the main function of soil bacteria?',
    options: ['Decompose organic matter and recycle nutrients', 'Increase soil compaction', 'Reduce soil fertility', 'Make soil dry'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Soil bacteria break down organic matter and recycle nutrients.'
  },
  {
    id: 'soil-89',
    text: 'Which soil type is best for drainage?',
    options: ['Sand', 'Clay', 'Loam', 'Silt'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Sandy soils have large particles and drain water quickly.'
  },
  {
    id: 'soil-90',
    text: 'What is the main benefit of adding mulch to soil?',
    options: ['Reduces evaporation and keeps soil moist', 'Increases soil compaction', 'Removes nutrients', 'Makes soil dry'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'medium',
    explanation: 'Mulch helps reduce evaporation and keeps soil moist.'
  },
  // --- SOIL HEALTH: HARD ---
  {
    id: 'soil-21',
    text: 'Which element is a micronutrient essential for plant growth in soil?',
    options: ['Iron', 'Oxygen', 'Carbon', 'Neon'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Iron is a micronutrient that plants need in small amounts.'
  },
  {
    id: 'soil-22',
    text: 'What is the Cation Exchange Capacity (CEC) of soil?',
    options: ["Soil's ability to hold onto nutrients", "Soil's color", "Soil's temperature", "Soil's smell"],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'CEC measures how well soil can retain and supply nutrients to plants.'
  },
  {
    id: 'soil-23',
    text: 'Which soil horizon contains the most organic material?',
    options: ['O horizon', 'C horizon', 'R horizon', 'B horizon'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'The O horizon is the top layer, rich in organic material.'
  },
  {
    id: 'soil-24',
    text: 'What is mycorrhiza?',
    options: ['A fungus that forms a symbiotic relationship with plant roots', 'A type of soil insect', 'A soil mineral', 'A farming tool'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Mycorrhizae are fungi that help plants absorb nutrients from soil.'
  },
  {
    id: 'soil-25',
    text: 'What is the main cause of soil salinization?',
    options: ['Over-irrigation with poor drainage', 'Planting trees', 'Adding compost', 'Using cover crops'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Over-irrigation without proper drainage can cause salts to build up in soil.'
  },
  {
    id: 'soil-26',
    text: 'Which process converts atmospheric nitrogen into a form plants can use?',
    options: ['Nitrogen fixation', 'Photosynthesis', 'Respiration', 'Erosion'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Nitrogen fixation turns nitrogen gas into plant-usable forms.'
  },
  {
    id: 'soil-27',
    text: 'What is leaching in soil science?',
    options: ['Loss of nutrients from soil by water movement', 'Addition of nutrients', 'Soil compaction', 'Soil aeration'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Leaching is when water carries nutrients away from the soil.'
  },
  {
    id: 'soil-28',
    text: 'Which soil organism is known for decomposing tough plant material like cellulose?',
    options: ['Fungi', 'Ants', 'Earthworms', 'Beetles'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Fungi are excellent at breaking down tough plant material.'
  },
  {
    id: 'soil-29',
    text: 'What is the main function of soil aggregates?',
    options: ['Improve soil structure and water infiltration', 'Make soil heavier', 'Increase soil temperature', 'Add color to soil'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Soil aggregates help water move through soil and improve structure.'
  },
  {
    id: 'soil-30',
    text: 'What is biochar and how does it help soil?',
    options: ['Charcoal added to soil to improve fertility and carbon storage', 'A type of fertilizer', 'A soil pest', 'A plant disease'],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Biochar is charcoal that improves soil fertility and stores carbon.'
  },
  // --- PLANT HEALTH: EASY (advanced) ---
  {
    id: 'plant-1',
    text: 'Which process allows plants to absorb water from the soil?',
    options: ['Transpiration', 'Osmosis', 'Photosynthesis', 'Respiration'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Osmosis is the process by which plants absorb water from the soil through their roots.'
  },
  {
    id: 'plant-2',
    text: 'What is the main function of stomata in plant leaves?',
    options: ['Absorb nutrients', 'Gas exchange', 'Anchor the plant', 'Store water'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Stomata are pores on leaves that allow for gas exchange (CO2 in, O2 out).'
  },
  {
    id: 'plant-3',
    text: 'Which macronutrient is most responsible for promoting root growth in plants?',
    options: ['Nitrogen', 'Phosphorus', 'Potassium', 'Calcium'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Phosphorus is essential for strong root development in plants.'
  },
  {
    id: 'plant-4',
    text: 'What is chlorosis in plants?',
    options: ['Wilting', 'Yellowing of leaves', 'Leaf drop', 'Root rot'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Chlorosis is the yellowing of leaves due to lack of chlorophyll.'
  },
  {
    id: 'plant-5',
    text: 'Which plant hormone is primarily responsible for cell elongation?',
    options: ['Auxin', 'Ethylene', 'Abscisic acid', 'Cytokinin'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Auxin is the hormone that promotes cell elongation in plants.'
  },
  {
    id: 'plant-6',
    text: 'What is the function of xylem tissue?',
    options: ['Transport sugars', 'Transport water and minerals', 'Store starch', 'Protect against pests'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Xylem tissue transports water and minerals from roots to the rest of the plant.'
  },
  {
    id: 'plant-7',
    text: 'Which mineral deficiency causes blossom end rot in tomatoes?',
    options: ['Magnesium', 'Calcium', 'Iron', 'Nitrogen'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Calcium deficiency is the main cause of blossom end rot in tomatoes.'
  },
  {
    id: 'plant-8',
    text: 'What is the main symptom of powdery mildew on plants?',
    options: ['Black spots', 'White powdery coating', 'Wilting', 'Leaf curling'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Powdery mildew appears as a white, powdery coating on leaves and stems.'
  },
  {
    id: 'plant-9',
    text: 'Which part of the plant is responsible for photosynthesis?',
    options: ['Roots', 'Stems', 'Leaves', 'Flowers'],
    correctAnswer: 2,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Leaves contain chloroplasts, where photosynthesis occurs.'
  },
  {
    id: 'plant-10',
    text: 'What is the main role of potassium in plant health?',
    options: ['Root development', 'Disease resistance and water regulation', 'Flower color', 'Seed production'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Potassium helps regulate water and increases disease resistance in plants.'
  },
  // --- PLANT HEALTH: MEDIUM (expert) ---
  {
    id: 'plant-11',
    text: 'Which enzyme is essential for carbon fixation in the Calvin cycle?',
    options: ['Rubisco', 'Amylase', 'Catalase', 'Lipase'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Rubisco is the enzyme that catalyzes carbon fixation in the Calvin cycle.'
  },
  {
    id: 'plant-12',
    text: 'What is the main function of phloem tissue?',
    options: ['Water transport', 'Sugar transport', 'Support', 'Gas exchange'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Phloem tissue transports sugars produced in the leaves to other parts of the plant.'
  },
  {
    id: 'plant-13',
    text: 'Which plant hormone is involved in fruit ripening and leaf abscission?',
    options: ['Gibberellin', 'Ethylene', 'Auxin', 'Cytokinin'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Ethylene is a hormone that triggers fruit ripening and leaf drop.'
  },
  {
    id: 'plant-14',
    text: 'What is the primary cause of iron chlorosis in plants?',
    options: ['Low soil pH', 'High soil pH', 'Excess nitrogen', 'Overwatering'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'High soil pH can make iron unavailable to plants, causing chlorosis.'
  },
  {
    id: 'plant-15',
    text: 'Which structure in plant cells stores pigments, waste, and water?',
    options: ['Mitochondria', 'Vacuole', 'Nucleus', 'Ribosome'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The vacuole stores water, pigments, and waste products in plant cells.'
  },
  {
    id: 'plant-16',
    text: 'What is the main function of the Casparian strip in roots?',
    options: ['Prevents water loss', 'Controls uptake of minerals into the xylem', 'Stores starch', 'Supports root hairs'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The Casparian strip regulates the flow of minerals into the xylem.'
  },
  {
    id: 'plant-17',
    text: 'Which nutrient is most likely to leach from sandy soils, causing plant deficiency?',
    options: ['Potassium', 'Nitrogen', 'Calcium', 'Iron'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Nitrogen is highly soluble and easily leaches from sandy soils.'
  },
  {
    id: 'plant-18',
    text: 'What is allelopathy?',
    options: ['Plant disease', 'Chemical inhibition of one plant by another', 'Insect pollination', 'Root nodulation'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Allelopathy is when one plant releases chemicals that inhibit the growth of another.'
  },
  {
    id: 'plant-19',
    text: 'Which plant structure is responsible for gravitropism?',
    options: ['Stomata', 'Amyloplasts', 'Chloroplasts', 'Xylem'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Amyloplasts in root cells help plants sense gravity.'
  },
  {
    id: 'plant-20',
    text: 'What is the main function of lignin in plant cell walls?',
    options: ['Flexibility', 'Water transport', 'Structural strength and rigidity', 'Energy storage'],
    correctAnswer: 2,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Lignin provides structural strength and rigidity to plant cell walls.'
  },
  // --- PLANT HEALTH: HARD (expert) ---
  {
    id: 'plant-21',
    text: 'Which gene family is primarily responsible for disease resistance in plants?',
    options: ['MADS-box genes', 'NBS-LRR genes', 'MYB genes', 'WRKY genes'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'NBS-LRR genes are a major class of disease resistance genes in plants.'
  },
  {
    id: 'plant-22',
    text: 'What is the role of the apoplast in plant nutrient transport?',
    options: ['Symplastic movement', 'Extracellular movement of water and solutes', 'DNA replication', 'Hormone synthesis'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'The apoplast is the network of cell walls and intercellular spaces through which water and solutes move.'
  },
  {
    id: 'plant-23',
    text: 'Which process describes the movement of sugars from source to sink in plants?',
    options: ['Transpiration', 'Pressure-flow hypothesis', 'Diffusion', 'Capillarity'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'The pressure-flow hypothesis explains how sugars move from source to sink in phloem.'
  },
  {
    id: 'plant-24',
    text: 'What is the function of the enzyme nitrate reductase in plants?',
    options: ['Converts nitrate to nitrite', 'Fixes atmospheric nitrogen', 'Synthesizes amino acids', 'Breaks down proteins'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Nitrate reductase converts nitrate (NO3-) to nitrite (NO2-) in plants.'
  },
  {
    id: 'plant-25',
    text: 'Which signaling molecule is involved in systemic acquired resistance (SAR) in plants?',
    options: ['Salicylic acid', 'Abscisic acid', 'Auxin', 'Cytokinin'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Salicylic acid is a key signaling molecule in SAR.'
  },
  {
    id: 'plant-26',
    text: 'What is the main function of plasmodesmata in plant cells?',
    options: ['Store water', 'Facilitate cell-to-cell communication', 'Photosynthesis', 'Anchor the cell'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Plasmodesmata are channels that allow communication and transport between plant cells.'
  },
  {
    id: 'plant-27',
    text: 'Which mineral is a cofactor for the enzyme superoxide dismutase in plants?',
    options: ['Zinc', 'Copper', 'Manganese', 'All of the above'],
    correctAnswer: 3,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Zinc, copper, and manganese can all act as cofactors for superoxide dismutase.'
  },
  {
    id: 'plant-28',
    text: 'What is the main effect of gibberellin deficiency in plants?',
    options: ['Dwarfism', 'Leaf yellowing', 'Root rot', 'Early flowering'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Gibberellin deficiency leads to dwarfism due to reduced cell elongation.'
  },
  {
    id: 'plant-29',
    text: 'Which pathogen type causes downy mildew in plants?',
    options: ['Fungus', 'Oomycete', 'Bacterium', 'Virus'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Downy mildew is caused by oomycetes, not true fungi.'
  },
  {
    id: 'plant-30',
    text: 'What is the function of phytochrome in plants?',
    options: ['Detects gravity', 'Senses light and regulates photoperiodism', 'Stores starch', 'Produces chlorophyll'],
    correctAnswer: 1,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Phytochrome is a photoreceptor that senses red/far-red light and regulates photoperiodism.'
  },
  // --- ANIMAL HEALTH: EASY (advanced) ---
  {
    id: 'animal-1',
    text: 'Which organ is primarily responsible for detoxification in mammals?',
    options: ['Heart', 'Liver', 'Kidney', 'Lung'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'The liver is the main organ for detoxification in mammals.'
  },
  {
    id: 'animal-2',
    text: 'What is the main function of hemoglobin in blood?',
    options: ['Fight infection', 'Carry oxygen', 'Digest food', 'Produce hormones'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Hemoglobin carries oxygen from the lungs to the body tissues.'
  },
  {
    id: 'animal-3',
    text: 'Which mineral is essential for strong bones and teeth in animals?',
    options: ['Iron', 'Calcium', 'Sodium', 'Potassium'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Calcium is vital for bone and teeth strength.'
  },
  {
    id: 'animal-4',
    text: 'What is the primary symptom of anemia in animals?',
    options: ['Hair loss', 'Pale gums', 'Coughing', 'Excessive thirst'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Pale gums are a common sign of anemia.'
  },
  {
    id: 'animal-5',
    text: 'Which vitamin is necessary for blood clotting?',
    options: ['Vitamin A', 'Vitamin C', 'Vitamin K', 'Vitamin D'],
    correctAnswer: 2,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Vitamin K is essential for the blood clotting process.'
  },
  {
    id: 'animal-6',
    text: 'What is the function of white blood cells?',
    options: ['Carry oxygen', 'Fight infection', 'Store fat', 'Produce energy'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'White blood cells are part of the immune system and fight infection.'
  },
  {
    id: 'animal-7',
    text: 'Which organ system is responsible for hormone production?',
    options: ['Digestive', 'Endocrine', 'Respiratory', 'Muscular'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'The endocrine system produces hormones.'
  },
  {
    id: 'animal-8',
    text: 'What is the main cause of rabies in animals?',
    options: ['Bacteria', 'Virus', 'Fungus', 'Parasite'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Rabies is caused by a virus.'
  },
  {
    id: 'animal-9',
    text: 'Which nutrient is most important for muscle development in animals?',
    options: ['Protein', 'Carbohydrate', 'Fat', 'Fiber'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Protein is essential for muscle growth and repair.'
  },
  {
    id: 'animal-10',
    text: 'What is the normal body temperature range for most mammals (in Celsius)?',
    options: ['30–32°C', '35–37°C', '38–39°C', '42–44°C'],
    correctAnswer: 2,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Most mammals have a normal body temperature of 38–39°C.'
  },
  // --- ANIMAL HEALTH: MEDIUM (expert) ---
  {
    id: 'animal-11',
    text: 'Which antibody class is most abundant in mammalian blood?',
    options: ['IgA', 'IgG', 'IgM', 'IgE'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'IgG is the most abundant antibody in blood.'
  },
  {
    id: 'animal-12',
    text: 'What is the function of the spleen in animals?',
    options: ['Produce insulin', 'Filter blood and recycle red blood cells', 'Store bile', 'Absorb nutrients'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The spleen filters blood and recycles old red blood cells.'
  },
  {
    id: 'animal-13',
    text: 'Which disease is caused by a deficiency of thiamine (vitamin B1) in animals?',
    options: ['Rickets', 'Scurvy', 'Beriberi', 'Anemia'],
    correctAnswer: 2,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Beriberi is caused by a lack of vitamin B1.'
  },
  {
    id: 'animal-14',
    text: 'What is the main function of alveoli in the lungs?',
    options: ['Trap dust', 'Exchange gases', 'Produce mucus', 'Move air'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Alveoli are the site of gas exchange in the lungs.'
  },
  {
    id: 'animal-15',
    text: 'Which parasite causes heartworm disease in dogs?',
    options: ['Tapeworm', 'Roundworm', 'Dirofilaria immitis', 'Hookworm'],
    correctAnswer: 2,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Dirofilaria immitis is the parasite that causes heartworm.'
  },
  {
    id: 'animal-16',
    text: 'What is the primary role of insulin in animal metabolism?',
    options: ['Regulate blood sugar', 'Break down proteins', 'Absorb calcium', 'Produce bile'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Insulin regulates blood sugar levels.'
  },
  {
    id: 'animal-17',
    text: 'Which organ produces bile for fat digestion?',
    options: ['Pancreas', 'Liver', 'Stomach', 'Spleen'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The liver produces bile for fat digestion.'
  },
  {
    id: 'animal-18',
    text: 'What is the main symptom of hypocalcemia in dairy cows?',
    options: ['Aggression', 'Milk fever', 'Blindness', 'Hair loss'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Milk fever is a symptom of hypocalcemia (low blood calcium) in dairy cows.'
  },
  {
    id: 'animal-19',
    text: 'Which hormone triggers milk letdown in mammals?',
    options: ['Prolactin', 'Oxytocin', 'Estrogen', 'Testosterone'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Oxytocin triggers milk letdown.'
  },
  {
    id: 'animal-20',
    text: 'What is the function of the myelin sheath in animal nerves?',
    options: ['Protects the heart', 'Speeds up nerve impulses', 'Produces hormones', 'Stores fat'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The myelin sheath insulates nerves and speeds up impulses.'
  },
  // --- ANIMAL HEALTH: HARD (expert) ---
  {
    id: 'animal-21',
    text: 'Which gene is commonly mutated in canine degenerative myelopathy?',
    options: ['SOD1', 'BRCA1', 'CFTR', 'TP53'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'SOD1 gene mutations are linked to canine degenerative myelopathy.'
  },
  {
    id: 'animal-22',
    text: 'What is the main function of the renin-angiotensin system in animals?',
    options: ['Regulate blood pressure and fluid balance', 'Control digestion', 'Produce red blood cells', 'Regulate body temperature'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The renin-angiotensin system regulates blood pressure and fluid balance.'
  },
  {
    id: 'animal-23',
    text: "Which pathogen causes Johne's disease in cattle?",
    options: ['Mycobacterium avium subspecies paratuberculosis', 'Escherichia coli', 'Salmonella enterica', 'Pasteurella multocida'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: "Johne's disease is caused by Mycobacterium avium subspecies paratuberculosis."
  },
  {
    id: 'animal-24',
    text: 'What is the role of surfactant in the lungs?',
    options: ['Absorb oxygen', 'Reduce surface tension in alveoli', 'Trap pathogens', 'Produce mucus'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Surfactant reduces surface tension in the alveoli, preventing collapse.'
  },
  {
    id: 'animal-25',
    text: 'Which vitamin acts as a cofactor for the synthesis of collagen in animals?',
    options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Vitamin C is required for collagen synthesis.'
  },
  {
    id: 'animal-26',
    text: 'What is the function of the loop of Henle in the kidney?',
    options: ['Filter blood', 'Concentrate urine', 'Produce hormones', 'Absorb nutrients'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The loop of Henle concentrates urine by reabsorbing water and salts.'
  },
  {
    id: 'animal-27',
    text: 'Which hormone is responsible for stimulating red blood cell production?',
    options: ['Insulin', 'Erythropoietin', 'Cortisol', 'Thyroxine'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Erythropoietin stimulates red blood cell production.'
  },
  {
    id: 'animal-28',
    text: 'What is the main cause of ketosis in dairy cows?',
    options: ['Excess protein', 'Negative energy balance', 'Vitamin deficiency', 'Dehydration'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Ketosis is caused by a negative energy balance, often in high-producing dairy cows.'
  },
  {
    id: 'animal-29',
    text: 'Which immune cells are responsible for producing antibodies?',
    options: ['T cells', 'B cells', 'Macrophages', 'Neutrophils'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'B cells are responsible for antibody production.'
  },
  {
    id: 'animal-30',
    text: 'What is the function of the sinoatrial (SA) node in the heart?',
    options: ['Pump blood', 'Initiate the heartbeat (pacemaker)', 'Filter blood', 'Produce white blood cells'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The SA node is the pacemaker of the heart, initiating each heartbeat.'
  },
  {
    id: '7',
    text: 'Which gas do animals exhale that plants need?',
    options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
    correctAnswer: 2,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Animals exhale CO2 which plants use for photosynthesis.'
  },
  {
    id: '8',
    text: 'What is the normal body temperature for most mammals?',
    options: ['35°C', '37°C', '39°C', '41°C'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: '37°C (98.6°F) is the normal body temperature for mammals.'
  },
  {
    id: '9',
    text: 'Which animal has the strongest bite force?',
    options: ['Lion', 'Shark', 'Crocodile', 'Hippo'],
    correctAnswer: 2,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Saltwater crocodiles have the strongest recorded bite force.'
  },
  {
    id: '10',
    text: 'What is the largest organ in the human body?',
    options: ['Heart', 'Brain', 'Liver', 'Skin'],
    correctAnswer: 3,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The skin is the largest organ and protects our body.'
  },
  {
    id: '11',
    text: 'How many bones are in an adult human body?',
    options: ['186', '206', '226', '246'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Adults have 206 bones, fewer than babies who have about 270.'
  },
  {
    id: '12',
    text: 'Which part of the brain controls balance?',
    options: ['Cerebrum', 'Cerebellum', 'Brainstem', 'Hypothalamus'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The cerebellum is responsible for balance and coordination.'
  },
  {
    id: '13',
    text: 'What percentage of Earth is covered by water?',
    options: ['50%', '61%', '71%', '81%'],
    correctAnswer: 2,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'About 71% of Earth surface is covered by water.'
  },
  {
    id: '14',
    text: 'Which layer of atmosphere contains the ozone layer?',
    options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'The ozone layer is located in the stratosphere.'
  },
  {
    id: '15',
    text: 'What is the main cause of ocean acidification?',
    options: ['Plastic pollution', 'CO2 absorption', 'Oil spills', 'Overfishing'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Ocean acidification is primarily caused by CO2 absorption from the atmosphere.'
  },
  // --- HUMAN HEALTH: EASY (advanced) ---
  {
    id: 'human-1',
    text: 'Which organ is primarily responsible for filtering blood in the human body?',
    options: ['Heart', 'Liver', 'Kidney', 'Lung'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The kidneys filter waste from the blood.'
  },
  {
    id: 'human-2',
    text: 'What is the main function of red blood cells?',
    options: ['Fight infection', 'Carry oxygen', 'Produce hormones', 'Store fat'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Red blood cells transport oxygen from the lungs to the body.'
  },
  {
    id: 'human-3',
    text: 'Which vitamin is essential for calcium absorption?',
    options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Vitamin D is necessary for calcium absorption.'
  },
  {
    id: 'human-4',
    text: 'What is the normal pH range of human blood?',
    options: ['5.5–6.0', '6.8–7.0', '7.35–7.45', '8.0–8.5'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Normal blood pH is tightly regulated between 7.35 and 7.45.'
  },
  {
    id: 'human-5',
    text: 'Which mineral is most important for oxygen transport in blood?',
    options: ['Calcium', 'Iron', 'Sodium', 'Potassium'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Iron is a key component of hemoglobin for oxygen transport.'
  },
  {
    id: 'human-6',
    text: 'What is the function of insulin in the human body?',
    options: ['Break down proteins', 'Regulate blood sugar', 'Absorb calcium', 'Produce bile'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Insulin helps regulate blood glucose levels.'
  },
  {
    id: 'human-7',
    text: 'Which part of the brain controls balance and coordination?',
    options: ['Cerebrum', 'Cerebellum', 'Brainstem', 'Hypothalamus'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The cerebellum is responsible for balance and coordination.'
  },
  {
    id: 'human-8',
    text: 'What is the main function of the alveoli in the lungs?',
    options: ['Trap dust', 'Exchange gases', 'Produce mucus', 'Move air'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Alveoli are the site of gas exchange in the lungs.'
  },
  {
    id: 'human-9',
    text: 'Which hormone regulates the sleep-wake cycle?',
    options: ['Insulin', 'Melatonin', 'Cortisol', 'Adrenaline'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Melatonin regulates the sleep-wake cycle.'
  },
  {
    id: 'human-10',
    text: 'What is the largest organ in the human body?',
    options: ['Heart', 'Brain', 'Liver', 'Skin'],
    correctAnswer: 3,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The skin is the largest organ in the human body.'
  },
  // --- HUMAN HEALTH: MEDIUM (expert) ---
  {
    id: 'human-11',
    text: 'Which enzyme breaks down starches in the human digestive system?',
    options: ['Lipase', 'Amylase', 'Pepsin', 'Trypsin'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Amylase breaks down starches into sugars.'
  },
  {
    id: 'human-12',
    text: 'What is the primary function of the lymphatic system?',
    options: ['Oxygen transport', 'Fat digestion', 'Immune defense and fluid balance', 'Hormone production'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The lymphatic system is involved in immune defense and fluid balance.'
  },
  {
    id: 'human-13',
    text: 'Which vitamin deficiency causes pernicious anemia?',
    options: ['Vitamin B1', 'Vitamin B6', 'Vitamin B12', 'Vitamin C'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Vitamin B12 deficiency leads to pernicious anemia.'
  },
  {
    id: 'human-14',
    text: 'What is the main function of the sinoatrial (SA) node in the heart?',
    options: ['Pump blood', 'Initiate the heartbeat (pacemaker)', 'Filter blood', 'Produce white blood cells'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The SA node is the pacemaker of the heart.'
  },
  {
    id: 'human-15',
    text: 'Which hormone is responsible for stimulating uterine contractions during childbirth?',
    options: ['Prolactin', 'Oxytocin', 'Estrogen', 'Progesterone'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Oxytocin stimulates uterine contractions during labor.'
  },
  {
    id: 'human-16',
    text: 'What is the function of the myelin sheath in neurons?',
    options: ['Store neurotransmitters', 'Speed up nerve impulses', 'Produce hormones', 'Absorb nutrients'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The myelin sheath insulates neurons and speeds up nerve impulses.'
  },
  {
    id: 'human-17',
    text: 'Which organ produces most of the digestive enzymes in the human body?',
    options: ['Stomach', 'Pancreas', 'Liver', 'Small intestine'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The pancreas produces most digestive enzymes.'
  },
  {
    id: 'human-18',
    text: 'What is the main function of platelets in blood?',
    options: ['Carry oxygen', 'Fight infection', 'Clot blood', 'Produce hormones'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Platelets are responsible for blood clotting.'
  },
  {
    id: 'human-19',
    text: 'Which structure in the kidney is responsible for filtering blood?',
    options: ['Nephron', 'Glomerulus', 'Loop of Henle', 'Collecting duct'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The glomerulus is the main filtering unit in the kidney.'
  },
  {
    id: 'human-20',
    text: 'What is the primary function of the hypothalamus?',
    options: ['Memory storage', 'Regulate homeostasis and hormone release', 'Control movement', 'Digest food'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The hypothalamus regulates homeostasis and hormone release.'
  },
  // --- HUMAN HEALTH: HARD (expert) ---
  {
    id: 'human-21',
    text: 'Which gene is most commonly mutated in cystic fibrosis?',
    options: ['BRCA1', 'CFTR', 'TP53', 'HBB'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'hard',
    explanation: 'CFTR gene mutations cause cystic fibrosis.'
  },
  {
    id: 'human-22',
    text: 'What is the main function of the hepatic portal vein?',
    options: ['Carry oxygenated blood to the liver', 'Transport nutrients from the gut to the liver', 'Remove waste from the liver', 'Supply bile to the gallbladder'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The hepatic portal vein transports nutrients from the digestive tract to the liver.'
  },
  {
    id: 'human-23',
    text: 'Which neurotransmitter is primarily involved in mood regulation and is targeted by many antidepressants?',
    options: ['Dopamine', 'Serotonin', 'Acetylcholine', 'GABA'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Serotonin is a key neurotransmitter in mood regulation.'
  },
  {
    id: 'human-24',
    text: 'What is the role of telomerase in human cells?',
    options: ['Repair DNA damage', 'Lengthen telomeres and maintain chromosome stability', 'Synthesize proteins', 'Regulate cell membrane'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Telomerase lengthens telomeres and helps maintain chromosome stability.'
  },
  {
    id: 'human-25',
    text: 'Which hormone is secreted by the pineal gland?',
    options: ['Melatonin', 'Insulin', 'Cortisol', 'Thyroxine'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The pineal gland secretes melatonin.'
  },
  {
    id: 'human-26',
    text: 'What is the function of the renin-angiotensin-aldosterone system (RAAS)?',
    options: ['Regulate blood pressure and fluid balance', 'Control digestion', 'Produce red blood cells', 'Regulate body temperature'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'RAAS regulates blood pressure and fluid balance.'
  },
  {
    id: 'human-27',
    text: 'Which vitamin acts as a cofactor for the synthesis of collagen in humans?',
    options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Vitamin C is required for collagen synthesis.'
  },
  {
    id: 'human-28',
    text: 'What is the main function of the HLA (human leukocyte antigen) system?',
    options: ['Oxygen transport', 'Immune system recognition', 'Hormone production', 'Blood clotting'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The HLA system is crucial for immune system recognition.'
  },
  {
    id: 'human-29',
    text: 'Which enzyme is deficient in people with phenylketonuria (PKU)?',
    options: ['Lactase', 'Phenylalanine hydroxylase', 'Amylase', 'Sucrase'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Phenylketonuria is caused by a deficiency of phenylalanine hydroxylase.'
  },
  {
    id: 'human-30',
    text: 'What is the primary function of the blood-brain barrier?',
    options: ['Produce cerebrospinal fluid', 'Protect the brain from toxins and pathogens', 'Transmit nerve impulses', 'Regulate body temperature'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The blood-brain barrier protects the brain from harmful substances.'
  },
  // --- PLANETARY HEALTH: EASY (advanced) ---
  {
    id: 'planetary-1',
    text: "Which gas is the most abundant in Earth's atmosphere?",
    options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Argon'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'easy',
    explanation: "Nitrogen makes up about 78% of Earth's atmosphere."
  },
  {
    id: 'planetary-2',
    text: 'What is the main cause of global sea level rise?',
    options: ['Volcanic eruptions', 'Melting glaciers and ice sheets', 'Earthquakes', 'Deforestation'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Melting glaciers and ice sheets add water to the oceans, raising sea levels.'
  },
  {
    id: 'planetary-3',
    text: 'Which process removes carbon dioxide from the atmosphere?',
    options: ['Respiration', 'Photosynthesis', 'Combustion', 'Erosion'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Photosynthesis by plants removes CO₂ from the atmosphere.'
  },
  {
    id: 'planetary-4',
    text: 'What is the primary greenhouse gas emitted by human activities?',
    options: ['Methane', 'Nitrous oxide', 'Carbon dioxide', 'Ozone'],
    correctAnswer: 2,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Carbon dioxide is the main greenhouse gas from fossil fuel burning.'
  },
  {
    id: 'planetary-5',
    text: 'Which layer of the atmosphere contains the ozone layer?',
    options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'The ozone layer is found in the stratosphere.'
  },
  {
    id: 'planetary-6',
    text: 'What is the main cause of ocean acidification?',
    options: ['Plastic pollution', 'CO₂ absorption', 'Oil spills', 'Overfishing'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Oceans absorb CO₂, which lowers pH and causes acidification.'
  },
  {
    id: 'planetary-7',
    text: 'Which ecosystem stores the most carbon per hectare?',
    options: ['Grassland', 'Boreal forest', 'Tropical rainforest', 'Wetland'],
    correctAnswer: 3,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Wetlands store more carbon per hectare than any other ecosystem.'
  },
  {
    id: 'planetary-8',
    text: 'What is the largest source of renewable energy worldwide?',
    options: ['Solar', 'Wind', 'Hydropower', 'Geothermal'],
    correctAnswer: 2,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Hydropower is the largest source of renewable energy globally.'
  },
  {
    id: 'planetary-9',
    text: 'Which human activity is the largest contributor to biodiversity loss?',
    options: ['Urbanization', 'Agriculture', 'Mining', 'Overfishing'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Agriculture is the leading cause of biodiversity loss.'
  },
  {
    id: 'planetary-10',
    text: 'What is the main cause of coral bleaching?',
    options: ['Overfishing', 'Rising sea temperatures', 'Oil spills', 'Plastic pollution'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Rising sea temperatures cause coral bleaching.'
  },
  // --- PLANETARY HEALTH: MEDIUM (expert) ---
  {
    id: 'planetary-11',
    text: 'Which protocol was established to phase out ozone-depleting substances?',
    options: ['Kyoto Protocol', 'Paris Agreement', 'Montreal Protocol', 'Rio Declaration'],
    correctAnswer: 2,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'The Montreal Protocol phased out ozone-depleting substances.'
  },
  {
    id: 'planetary-12',
    text: 'What is the main source of anthropogenic methane emissions?',
    options: ['Rice paddies', 'Landfills', 'Livestock', 'Coal mining'],
    correctAnswer: 2,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Livestock are the largest source of methane emissions from human activity.'
  },
  {
    id: 'planetary-13',
    text: "Which country emits the most carbon dioxide annually?",
    options: ['United States', 'China', 'India', 'Russia'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'medium',
    explanation: "China is the world's largest emitter of CO₂."
  },
  {
    id: 'planetary-14',
    text: 'What is the main driver of ocean deoxygenation?',
    options: ['Oil spills', 'Nutrient pollution and warming', 'Overfishing', 'Plastic waste'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Nutrient pollution and warming reduce oxygen in the oceans.'
  },
  {
    id: 'planetary-15',
    text: 'Which chemical is most responsible for stratospheric ozone depletion?',
    options: ['Carbon dioxide', 'Methane', 'Chlorofluorocarbons (CFCs)', 'Nitrous oxide'],
    correctAnswer: 2,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'CFCs are the main cause of ozone depletion.'
  },
  {
    id: 'planetary-16',
    text: 'What is the main environmental impact of nitrogen fertilizer runoff?',
    options: ['Soil erosion', 'Ocean acidification', 'Eutrophication', 'Deforestation'],
    correctAnswer: 2,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Nitrogen runoff causes eutrophication, leading to dead zones.'
  },
  {
    id: 'planetary-17',
    text: 'Which biome is most threatened by desertification?',
    options: ['Tundra', 'Grassland', 'Tropical rainforest', 'Savanna'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Grasslands are highly vulnerable to desertification.'
  },
  {
    id: 'planetary-18',
    text: 'What is the main cause of microplastic pollution in oceans?',
    options: ['Oil spills', 'Breakdown of larger plastics', 'Agricultural runoff', 'Mining'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Microplastics mainly come from the breakdown of larger plastic items.'
  },
  {
    id: 'planetary-19',
    text: 'Which renewable energy source has the lowest carbon footprint per kWh?',
    options: ['Solar', 'Wind', 'Hydropower', 'Biomass'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Wind energy has the lowest carbon footprint per kWh.'
  },
  {
    id: 'planetary-20',
    text: 'What is the main function of wetlands in planetary health?',
    options: ['Store carbon and filter water', 'Increase soil erosion', 'Produce methane', 'Support mining'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Wetlands store carbon and filter water, supporting planetary health.'
  },
  // --- PLANETARY HEALTH: HARD (expert) ---
  {
    id: 'planetary-21',
    text: 'Which feedback loop accelerates Arctic warming as ice melts?',
    options: ['Carbon cycle feedback', 'Albedo feedback', 'Methane clathrate feedback', 'Ocean conveyor feedback'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Albedo feedback accelerates Arctic warming as ice melts.'
  },
  {
    id: 'planetary-22',
    text: 'What is the main mechanism by which black carbon affects climate?',
    options: ['Absorbs sunlight and warms the atmosphere', 'Increases cloud formation', 'Promotes plant growth', 'Cools the ocean'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Black carbon absorbs sunlight and warms the atmosphere.'
  },
  {
    id: 'planetary-23',
    text: 'Which international agreement aims to limit global warming to well below 2°C?',
    options: ['Montreal Protocol', 'Paris Agreement', 'Kyoto Protocol', 'Stockholm Convention'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'The Paris Agreement aims to limit global warming to well below 2°C.'
  },
  {
    id: 'planetary-24',
    text: 'What is the main source of nitrous oxide emissions globally?',
    options: ['Fossil fuel combustion', 'Industrial processes', 'Agricultural soils', 'Landfills'],
    correctAnswer: 2,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Agricultural soils are the main source of nitrous oxide emissions.'
  },
  {
    id: 'planetary-25',
    text: 'Which process describes the movement of persistent organic pollutants (POPs) to polar regions?',
    options: ['Bioaccumulation', 'Global distillation', 'Eutrophication', 'Photodegradation'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Global distillation moves POPs to polar regions.'
  },
  {
    id: 'planetary-26',
    text: 'What is the main ecological risk of ocean acidification?',
    options: ['Coral reef degradation', 'Oil spills', 'Overfishing', 'Algal blooms'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Ocean acidification threatens coral reefs.'
  },
  {
    id: 'planetary-27',
    text: 'Which satellite system is used for global climate monitoring?',
    options: ['GPS', 'Landsat', 'GOES', 'Copernicus'],
    correctAnswer: 3,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Copernicus is a key satellite system for climate monitoring.'
  },
  {
    id: 'planetary-28',
    text: 'What is the main function of the Intergovernmental Panel on Climate Change (IPCC)?',
    options: ['Enforce environmental laws', 'Provide scientific assessments on climate change', 'Fund renewable energy projects', 'Monitor air quality'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'The IPCC provides scientific assessments on climate change.'
  },
  {
    id: 'planetary-29',
    text: 'Which process is responsible for the long-term removal of carbon dioxide from the atmosphere?',
    options: ['Photosynthesis', 'Ocean acidification', 'Weathering of rocks', 'Respiration'],
    correctAnswer: 2,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Weathering of rocks removes CO₂ from the atmosphere over long timescales.'
  },
  {
    id: 'planetary-30',
    text: 'What is the main impact of permafrost thawing on planetary health?',
    options: ['Increases freshwater supply', 'Releases greenhouse gases', 'Reduces soil fertility', 'Promotes plant growth'],
    correctAnswer: 1,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Thawing permafrost releases greenhouse gases like methane and CO₂.'
  },
  {
    id: 'planetary-31',
    text: 'What is the main benefit of using a reusable water bottle?',
    options: ['Reduce plastic waste', 'Create more waste', 'Increase pollution', 'Use more resources'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using a reusable water bottle helps reduce the number of single-use plastic bottles that end up in landfills or oceans.'
  },
  {
    id: 'planetary-32',
    text: 'Which of these is a way to reduce paper waste?',
    options: ['Use both sides of paper', 'Use more paper', 'Print everything', 'Buy more notebooks'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using both sides of paper helps reduce paper waste and saves trees.'
  },
  {
    id: 'planetary-33',
    text: 'What is the main benefit of using LED light bulbs?',
    options: ['Save energy', 'Use more electricity', 'Create more heat', 'Last shorter time'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'LED light bulbs use less energy and last longer than traditional light bulbs.'
  },
  {
    id: 'planetary-34',
    text: 'Which of these is a way to help bees and other pollinators?',
    options: ['Plant native flowers', 'Use more pesticides', 'Remove all flowers', 'Cut down trees'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Planting native flowers provides food and habitat for bees and other important pollinators.'
  },
  {
    id: 'planetary-35',
    text: 'What is the main benefit of using a clothesline instead of a dryer?',
    options: ['Save energy', 'Use more electricity', 'Create more pollution', 'Take more time'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using a clothesline saves energy by using the sun and wind to dry clothes instead of electricity.'
  },
  {
    id: 'planetary-36',
    text: 'Which of these is a way to reduce food packaging waste?',
    options: ['Buy in bulk', 'Buy more packaged food', 'Use more plastic bags', 'Buy individually wrapped items'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Buying in bulk reduces the amount of packaging waste per item purchased.'
  },
  {
    id: 'planetary-37',
    text: 'What is the main benefit of using a rain barrel?',
    options: ['Collect rainwater for plants', 'Create more waste', 'Increase pollution', 'Use more water'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Rain barrels collect rainwater that can be used to water plants, reducing the need for treated water.'
  },
  {
    id: 'planetary-38',
    text: 'Which of these is a way to reduce electronic waste?',
    options: ['Repair devices when possible', 'Buy new devices often', 'Throw away old devices', 'Use more electronics'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Repairing devices when possible extends their life and reduces electronic waste.'
  },
  {
    id: 'planetary-39',
    text: 'What is the main benefit of using a bike for short trips?',
    options: ['Reduce air pollution', 'Create more pollution', 'Use more fuel', 'Increase emissions'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using a bike for short trips reduces air pollution by avoiding car emissions.'
  },
  {
    id: 'planetary-40',
    text: 'Which of these is a way to help reduce soil erosion?',
    options: ['Plant ground cover', 'Remove all plants', 'Use more chemicals', 'Dig more soil'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Planting ground cover helps hold soil in place and prevents erosion.'
  },
  {
    id: 'planetary-41',
    text: 'What is the main benefit of using a reusable coffee cup?',
    options: ['Reduce waste', 'Create more waste', 'Increase pollution', 'Use more resources'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using a reusable coffee cup reduces the number of disposable cups that end up in landfills.'
  },
  {
    id: 'planetary-42',
    text: 'Which of these is a way to reduce energy use in winter?',
    options: ['Wear warm clothes indoors', 'Turn up the heat', 'Open windows', 'Use more electricity'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Wearing warm clothes indoors allows you to keep the thermostat lower, saving energy.'
  },
  {
    id: 'planetary-43',
    text: 'What is the main benefit of using a reusable lunch container?',
    options: ['Reduce waste', 'Create more waste', 'Increase pollution', 'Use more resources'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using a reusable lunch container reduces the amount of disposable packaging waste.'
  },
  {
    id: 'planetary-44',
    text: 'Which of these is a way to help reduce noise pollution?',
    options: ['Use headphones', 'Play loud music', 'Use more speakers', 'Increase volume'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using headphones helps contain sound and reduces noise pollution for others.'
  },
  {
    id: 'planetary-45',
    text: 'What is the main benefit of using a reusable straw?',
    options: ['Reduce plastic waste', 'Create more waste', 'Increase pollution', 'Use more resources'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using a reusable straw reduces the number of single-use plastic straws that end up in landfills or oceans.'
  },
  {
    id: 'planetary-46',
    text: 'Which of these is a way to reduce energy use in summer?',
    options: ['Use fans', 'Turn up the AC', 'Open windows in hot weather', 'Use more electricity'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using fans instead of air conditioning can significantly reduce energy consumption.'
  },
  {
    id: 'planetary-47',
    text: 'What is the main benefit of using a reusable shopping bag?',
    options: ['Reduce plastic waste', 'Create more waste', 'Increase pollution', 'Use more resources'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using a reusable shopping bag reduces the number of plastic bags that end up in landfills or oceans.'
  },
  {
    id: 'planetary-48',
    text: 'Which of these is a way to help reduce light pollution?',
    options: ['Use motion sensor lights', 'Leave lights on all night', 'Use more lights', 'Increase brightness'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using motion sensor lights ensures lights are only on when needed, reducing light pollution.'
  },
  {
    id: 'planetary-49',
    text: 'What is the main benefit of using a reusable food wrap?',
    options: ['Reduce plastic waste', 'Create more waste', 'Increase pollution', 'Use more resources'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using reusable food wrap reduces the amount of single-use plastic wrap that ends up in landfills.'
  },
  {
    id: 'planetary-50',
    text: 'Which of these is a way to reduce water use in the garden?',
    options: ['Water plants in the morning', 'Water during hot day', 'Use more water', 'Water at night'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Watering plants in the morning reduces water loss from evaporation and helps plants use water more efficiently.'
  },
  {
    id: 'planetary-51',
    text: 'What is the main benefit of using a programmable thermostat?',
    options: ['Save energy by adjusting temperature automatically', 'Use more electricity', 'Create more heat', 'Increase cooling'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Programmable thermostats help save energy by automatically adjusting temperatures when you\'re away or asleep.'
  },
  {
    id: 'planetary-52',
    text: 'Which of these is a way to reduce food waste at home?',
    options: ['Plan meals and use leftovers', 'Buy more food', 'Throw away food', 'Cook extra portions'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Planning meals and using leftovers helps reduce food waste and saves money.'
  },
  {
    id: 'planetary-53',
    text: 'What is the main benefit of using a water-saving showerhead?',
    options: ['Reduce water usage', 'Increase water pressure', 'Use more water', 'Create more waste'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Water-saving showerheads reduce water usage while maintaining good water pressure.'
  },
  {
    id: 'planetary-54',
    text: 'Which of these is a way to help reduce air pollution from cars?',
    options: ['Carpool or use public transport', 'Drive alone more often', 'Use more fuel', 'Take longer routes'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Carpooling or using public transport reduces the number of vehicles on the road and decreases air pollution.'
  },
  {
    id: 'planetary-55',
    text: 'What is the main benefit of using a compost bin?',
    options: ['Turn food waste into fertilizer', 'Create more waste', 'Increase pollution', 'Use more resources'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Compost bins turn food waste into nutrient-rich fertilizer for plants.'
  },
  {
    id: 'planetary-56',
    text: 'Which of these is a way to reduce energy use when cooking?',
    options: ['Use a pressure cooker', 'Leave the oven on', 'Use more burners', 'Cook longer'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Pressure cookers use less energy and cook food faster than traditional methods.'
  },
  {
    id: 'planetary-57',
    text: 'What is the main benefit of using a clothes rack indoors?',
    options: ['Save energy by air-drying clothes', 'Use more electricity', 'Create more humidity', 'Take more space'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using a clothes rack indoors saves energy by air-drying clothes instead of using a dryer.'
  },
  {
    id: 'planetary-58',
    text: 'Which of these is a way to reduce plastic waste in the bathroom?',
    options: ['Use bar soap instead of liquid soap', 'Use more plastic bottles', 'Buy more packaging', 'Use disposable items'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Bar soap typically uses less packaging than liquid soap in plastic bottles.'
  },
  {
    id: 'planetary-59',
    text: 'What is the main benefit of using a water filter at home?',
    options: ['Reduce plastic bottle waste', 'Create more waste', 'Increase pollution', 'Use more water'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using a water filter reduces the need for bottled water, decreasing plastic waste.'
  },
  {
    id: 'planetary-60',
    text: 'Which of these is a way to reduce energy use when washing dishes?',
    options: ['Use a dishwasher when full', 'Run half-empty loads', 'Use more water', 'Wash dishes longer'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Running a full dishwasher is more energy-efficient than washing dishes by hand or running partial loads.'
  },
  {
    id: 'planetary-61',
    text: 'What is the main benefit of using a reusable water filter pitcher?',
    options: ['Reduce plastic bottle waste', 'Create more waste', 'Increase pollution', 'Use more water'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'A reusable water filter pitcher reduces the need for bottled water, decreasing plastic waste.'
  },
  {
    id: 'planetary-62',
    text: 'Which of these is a way to reduce energy use when using electronics?',
    options: ['Use power strips and turn them off', 'Leave devices on standby', 'Use more power', 'Keep chargers plugged in'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using power strips and turning them off when not in use prevents energy waste from standby power.'
  },
  {
    id: 'planetary-63',
    text: 'What is the main benefit of using a reusable produce bag?',
    options: ['Reduce plastic waste', 'Create more waste', 'Increase pollution', 'Use more resources'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Reusable produce bags reduce the number of plastic bags used for fruits and vegetables.'
  },
  {
    id: 'planetary-64',
    text: 'Which of these is a way to reduce water use when brushing teeth?',
    options: ['Turn off the tap while brushing', 'Leave water running', 'Use more water', 'Brush longer'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Turning off the tap while brushing teeth saves a significant amount of water.'
  },
  {
    id: 'planetary-65',
    text: 'What is the main benefit of using a reusable razor?',
    options: ['Reduce plastic waste', 'Create more waste', 'Increase pollution', 'Use more resources'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'A reusable razor reduces the number of disposable razors that end up in landfills.'
  },
  {
    id: 'planetary-66',
    text: 'Which of these is a way to reduce energy use when using a computer?',
    options: ['Enable power-saving mode', 'Leave it on all day', 'Use more power', 'Keep screen bright'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Power-saving mode reduces energy consumption when the computer is not in active use.'
  },
  {
    id: 'planetary-67',
    text: 'What is the main benefit of using a reusable menstrual cup?',
    options: ['Reduce waste', 'Create more waste', 'Increase pollution', 'Use more resources'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'A reusable menstrual cup reduces the amount of disposable products that end up in landfills.'
  },
  {
    id: 'planetary-68',
    text: 'Which of these is a way to reduce energy use when using a microwave?',
    options: ['Use appropriate container size', 'Use larger containers', 'Cook longer', 'Use more power'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using appropriately sized containers in the microwave reduces energy waste.'
  },
  {
    id: 'planetary-69',
    text: 'What is the main benefit of using a reusable water bottle with a filter?',
    options: ['Reduce plastic waste and have clean water', 'Create more waste', 'Increase pollution', 'Use more resources'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'A reusable water bottle with a filter reduces plastic waste while providing clean drinking water.'
  },
  {
    id: 'planetary-70',
    text: 'Which of these is a way to reduce energy use when using a refrigerator?',
    options: ['Keep it well-organized', 'Leave door open', 'Set temperature colder', 'Add more items'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'A well-organized refrigerator allows for better air circulation and more efficient cooling.'
  },
  {
    id: 'planetary-71',
    text: 'What is the main environmental impact of microplastics in marine ecosystems?',
    options: [
      'They enter the food chain and affect marine life',
      'They only float on the surface',
      'They dissolve quickly in water',
      'They only affect large fish'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Microplastics are ingested by marine organisms and can bioaccumulate up the food chain, affecting entire ecosystems.'
  },
  {
    id: 'planetary-72',
    text: 'Which of these best describes the concept of carbon footprint?',
    options: [
      'Total greenhouse gas emissions caused by an individual or organization',
      'Only CO2 emissions from transportation',
      'Amount of carbon in the atmosphere',
      'Number of trees needed to offset emissions'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Carbon footprint measures the total greenhouse gas emissions, including CO2 and other gases, caused by activities.'
  },
  {
    id: 'planetary-73',
    text: 'What is the main environmental impact of fast fashion?',
    options: [
      'High water usage, chemical pollution, and textile waste',
      'Only affects local clothing stores',
      'Only impacts cotton production',
      'Only affects clothing prices'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Fast fashion contributes to water pollution, chemical waste, and massive amounts of textile waste in landfills.'
  },
  {
    id: 'planetary-74',
    text: 'Which of these best describes the concept of food miles?',
    options: [
      'Distance food travels from production to consumption',
      'Number of miles food can be transported',
      'Distance between farms',
      'Length of food storage time'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Food miles measure the distance food travels from where it\'s grown to where it\'s consumed, affecting its carbon footprint.'
  },
  {
    id: 'planetary-75',
    text: 'What is the main environmental impact of electronic waste (e-waste)?',
    options: [
      'Toxic chemicals leaching into soil and water',
      'Only affects landfills',
      'Only impacts air quality',
      'Only affects recycling centers'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'E-waste contains hazardous materials like lead and mercury that can contaminate soil and water when improperly disposed.'
  },
  {
    id: 'planetary-76',
    text: 'Which of these best describes the concept of water footprint?',
    options: [
      'Total volume of freshwater used to produce goods and services',
      'Only water used in manufacturing',
      'Amount of water in rivers',
      'Water used in households'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Water footprint measures the total volume of freshwater used directly and indirectly to produce goods and services.'
  },
  {
    id: 'planetary-77',
    text: 'What is the main environmental impact of palm oil production?',
    options: [
      'Deforestation and habitat loss',
      'Only affects local farmers',
      'Only impacts soil quality',
      'Only affects palm trees'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Palm oil production leads to deforestation, destroying habitats and contributing to climate change.'
  },
  {
    id: 'planetary-78',
    text: 'Which of these best describes the concept of ecological footprint?',
    options: [
      'Measure of human demand on Earth\'s ecosystems',
      'Only measures carbon emissions',
      'Only affects local areas',
      'Only measures water usage'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Ecological footprint measures how much of Earth\'s resources are needed to support human activities and absorb waste.'
  },
  {
    id: 'planetary-79',
    text: 'What is the main environmental impact of meat production?',
    options: [
      'High water usage, land use, and greenhouse gas emissions',
      'Only affects local farms',
      'Only impacts water quality',
      'Only affects animal welfare'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Meat production requires large amounts of water, land, and feed, and produces significant greenhouse gas emissions.'
  },
  {
    id: 'planetary-80',
    text: 'Which of these best describes the concept of greenwashing?',
    options: [
      'Misleading environmental claims by companies',
      'Cleaning with eco-friendly products',
      'Planting trees',
      'Recycling programs'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Greenwashing is when companies make false or misleading claims about their environmental practices to appear more eco-friendly.'
  },
  {
    id: 'planetary-81',
    text: 'What is the main environmental impact of cryptocurrency mining?',
    options: [
      'High energy consumption and carbon emissions',
      'Only affects computer hardware',
      'Only impacts internet speed',
      'Only affects digital security'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Cryptocurrency mining requires massive amounts of energy, often from fossil fuels, contributing to carbon emissions.'
  },
  {
    id: 'planetary-82',
    text: 'Which of these best describes the concept of circular economy?',
    options: [
      'Economic system aimed at eliminating waste and reusing resources',
      'Only recycling programs',
      'Only renewable energy',
      'Only sustainable farming'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Circular economy focuses on designing out waste, keeping products in use, and regenerating natural systems.'
  },
  {
    id: 'planetary-83',
    text: 'What is the main environmental impact of single-use coffee pods?',
    options: [
      'Non-recyclable waste and resource consumption',
      'Only affects coffee quality',
      'Only impacts water usage',
      'Only affects coffee prices'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Single-use coffee pods create significant waste and require more resources than traditional coffee brewing methods.'
  },
  {
    id: 'planetary-84',
    text: 'Which of these best describes the concept of environmental justice?',
    options: [
      'Fair treatment of all people regarding environmental laws and policies',
      'Only protecting wildlife',
      'Only cleaning up pollution',
      'Only conserving resources'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Environmental justice ensures that all communities have equal protection from environmental hazards and equal access to environmental benefits.'
  },
  {
    id: 'planetary-85',
    text: 'What is the main environmental impact of artificial turf?',
    options: [
      'Microplastic pollution and heat island effect',
      'Only affects sports fields',
      'Only impacts water drainage',
      'Only affects local parks'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Artificial turf contributes to microplastic pollution and creates heat islands, affecting local ecosystems and temperatures.'
  },
  {
    id: 'planetary-86',
    text: 'Which of these best describes the concept of regenerative agriculture?',
    options: [
      'Farming practices that improve soil health and ecosystem services',
      'Only organic farming',
      'Only crop rotation',
      'Only natural fertilizers'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Regenerative agriculture focuses on improving soil health, biodiversity, and ecosystem services while producing food.'
  },
  {
    id: 'planetary-87',
    text: 'What is the main environmental impact of disposable contact lenses?',
    options: [
      'Microplastic pollution in water systems',
      'Only affects eye health',
      'Only impacts packaging waste',
      'Only affects vision correction'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Disposable contact lenses contribute to microplastic pollution when flushed down drains, affecting water systems.'
  },
  {
    id: 'planetary-88',
    text: 'Which of these best describes the concept of blue economy?',
    options: [
      'Sustainable use of ocean resources for economic growth',
      'Only fishing industry',
      'Only marine tourism',
      'Only ocean conservation'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Blue economy promotes sustainable use of ocean resources while maintaining ecosystem health and biodiversity.'
  },
  {
    id: 'planetary-89',
    text: 'What is the main environmental impact of streaming services?',
    options: [
      'Energy consumption from data centers and network infrastructure',
      'Only affects internet speed',
      'Only impacts device storage',
      'Only affects entertainment industry'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Streaming services require massive data centers and network infrastructure, consuming significant amounts of energy.'
  },
  {
    id: 'planetary-90',
    text: 'Which of these best describes the concept of degrowth?',
    options: [
      'Economic strategy focusing on reducing consumption and production',
      'Only economic recession',
      'Only population control',
      'Only resource conservation'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Degrowth is an economic strategy that aims to reduce consumption and production while improving well-being and ecological conditions.'
  },
  {
    id: 'planetary-91',
    text: 'What is the main environmental impact of lithium-ion battery production?',
    options: [
      'Water pollution and habitat destruction from mining',
      'Only affects battery life',
      'Only impacts electricity usage',
      'Only affects device performance'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Lithium mining for batteries can cause water pollution and habitat destruction, affecting local ecosystems.'
  },
  {
    id: 'planetary-92',
    text: 'Which of these best describes the concept of embodied energy?',
    options: [
      'Total energy used to produce and transport a product',
      'Only energy used during manufacturing',
      'Only energy used during transportation',
      'Only energy used during packaging'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Embodied energy accounts for all energy used throughout a product\'s lifecycle, from raw materials to disposal.'
  },
  {
    id: 'planetary-93',
    text: 'What is the main environmental impact of cloud computing?',
    options: [
      'High energy consumption from data centers',
      'Only affects internet speed',
      'Only impacts device storage',
      'Only affects software updates'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Cloud computing requires massive data centers that consume significant amounts of energy for operation and cooling.'
  },
  {
    id: 'planetary-94',
    text: 'Which of these best describes the concept of environmental racism?',
    options: [
      'Disproportionate exposure of minority communities to environmental hazards',
      'Only affects urban areas',
      'Only impacts industrial zones',
      'Only affects rural communities'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Environmental racism refers to the disproportionate exposure of minority communities to environmental hazards and pollution.'
  },
  {
    id: 'planetary-95',
    text: 'What is the main environmental impact of synthetic fertilizer use?',
    options: [
      'Water pollution and soil degradation',
      'Only affects crop yields',
      'Only impacts plant growth',
      'Only affects farming costs'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Synthetic fertilizers can cause water pollution through runoff and contribute to soil degradation over time.'
  },
  {
    id: 'planetary-96',
    text: 'Which of these best describes the concept of environmental externalities?',
    options: [
      'Unintended environmental costs of economic activities',
      'Only affects business profits',
      'Only impacts consumer prices',
      'Only affects market competition'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Environmental externalities are the unintended environmental costs of economic activities that affect third parties.'
  },
  {
    id: 'planetary-97',
    text: 'What is the main environmental impact of artificial intelligence?',
    options: [
      'High energy consumption and electronic waste',
      'Only affects data processing',
      'Only impacts software development',
      'Only affects user experience'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'AI systems require significant computing power, leading to high energy consumption and contributing to electronic waste.'
  },
  {
    id: 'planetary-98',
    text: 'Which of these best describes the concept of environmental carrying capacity?',
    options: [
      'Maximum population size an environment can sustain',
      'Only affects wildlife populations',
      'Only impacts plant growth',
      'Only affects water resources'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Environmental carrying capacity is the maximum population size that an environment can sustain without degradation.'
  },
  {
    id: 'planetary-99',
    text: 'What is the main environmental impact of virtual reality technology?',
    options: [
      'High energy consumption and electronic waste',
      'Only affects user experience',
      'Only impacts software development',
      'Only affects gaming industry'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'VR technology requires significant computing power and contributes to electronic waste through hardware production.'
  },
  {
    id: 'planetary-100',
    text: 'Which of these best describes the concept of environmental resilience?',
    options: [
      'Ability of ecosystems to recover from disturbances',
      'Only affects climate change',
      'Only impacts natural disasters',
      'Only affects wildlife survival'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Environmental resilience refers to the ability of ecosystems to recover from disturbances while maintaining their functions.'
  },
  {
    id: 'planetary-101',
    text: 'What is the main environmental impact of 5G technology?',
    options: [
      'Increased energy consumption and electronic waste',
      'Only affects internet speed',
      'Only impacts mobile devices',
      'Only affects data transfer'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: '5G infrastructure requires more energy and contributes to electronic waste through increased device production.'
  },
  {
    id: 'planetary-102',
    text: 'Which of these best describes the concept of environmental tipping points?',
    options: [
      'Critical thresholds where small changes cause large impacts',
      'Only affects climate change',
      'Only impacts ecosystems',
      'Only affects natural resources'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Environmental tipping points are critical thresholds where small changes can trigger significant and often irreversible impacts.'
  },
  {
    id: 'planetary-103',
    text: 'What is the main environmental impact of blockchain technology?',
    options: [
      'High energy consumption from mining operations',
      'Only affects digital security',
      'Only impacts data storage',
      'Only affects financial transactions'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Blockchain mining operations require significant computing power, leading to high energy consumption.'
  },
  {
    id: 'planetary-104',
    text: 'Which of these best describes the concept of environmental justice?',
    options: [
      'Fair treatment and meaningful involvement in environmental decisions',
      'Only affects pollution control',
      'Only impacts resource management',
      'Only affects conservation efforts'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Environmental justice ensures fair treatment and meaningful involvement in environmental decision-making for all people.'
  },
  {
    id: 'planetary-105',
    text: 'What is the main environmental impact of artificial sweeteners?',
    options: [
      'Water pollution and ecosystem disruption',
      'Only affects human health',
      'Only impacts food production',
      'Only affects taste preferences'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Artificial sweeteners can enter water systems and disrupt aquatic ecosystems when not properly treated.'
  },
  {
    id: 'planetary-106',
    text: 'Which of these best describes the concept of environmental ethics?',
    options: [
      'Moral principles guiding human interaction with nature',
      'Only affects conservation laws',
      'Only impacts wildlife protection',
      'Only affects resource use'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Environmental ethics examines the moral principles that guide human interaction with the natural world.'
  },
  {
    id: 'planetary-107',
    text: 'What is the main environmental impact of electric vehicle production?',
    options: [
      'Resource extraction and manufacturing emissions',
      'Only affects vehicle performance',
      'Only impacts charging infrastructure',
      'Only affects transportation costs'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Electric vehicle production requires resource extraction and manufacturing processes that generate significant emissions.'
  },
  {
    id: 'planetary-108',
    text: 'Which of these best describes the concept of environmental governance?',
    options: [
      'Systems and processes for managing environmental resources',
      'Only affects government policies',
      'Only impacts business regulations',
      'Only affects conservation areas'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Environmental governance involves the systems and processes for managing environmental resources and addressing environmental issues.'
  },
  {
    id: 'planetary-109',
    text: 'What is the main environmental impact of smart home technology?',
    options: [
      'Increased electronic waste and energy consumption',
      'Only affects home security',
      'Only impacts convenience',
      'Only affects energy bills'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Smart home technology contributes to electronic waste and can increase energy consumption through constant connectivity.'
  },
  {
    id: 'planetary-110',
    text: 'Which of these best describes the concept of environmental stewardship?',
    options: [
      'Responsible management and protection of natural resources',
      'Only affects conservation areas',
      'Only impacts wildlife protection',
      'Only affects resource use'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'medium',
    explanation: 'Environmental stewardship involves responsible management and protection of natural resources for future generations.'
  },
  {
    id: 'planetary-111',
    text: 'What is the primary mechanism behind ocean acidification\'s impact on coral reef ecosystems?',
    options: [
      'Reduced carbonate ion availability affecting calcification',
      'Direct dissolution of coral structures',
      'Increased water temperature',
      'Changes in ocean salinity'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Ocean acidification reduces carbonate ion availability, which is essential for coral calcification and reef building.'
  },
  {
    id: 'planetary-112',
    text: 'Which of these best describes the concept of planetary boundaries?',
    options: [
      'Critical thresholds in Earth system processes that maintain stability',
      'Limits of human population growth',
      'Maximum resource extraction rates',
      'Boundaries of protected areas'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Planetary boundaries define the safe operating space for humanity within Earth\'s biophysical systems.'
  },
  {
    id: 'planetary-113',
    text: 'What is the main mechanism behind the positive feedback loop in Arctic permafrost thaw?',
    options: [
      'Methane release leading to increased warming and further thaw',
      'Only temperature increase',
      'Only ice melting',
      'Only sea level rise'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Permafrost thaw releases methane, a potent greenhouse gas, which increases warming and causes more permafrost to thaw.'
  },
  {
    id: 'planetary-114',
    text: 'Which of these best describes the concept of ecological overshoot?',
    options: [
      'Exceeding Earth\'s regenerative capacity to meet human demands',
      'Only population growth',
      'Only resource depletion',
      'Only pollution levels'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Ecological overshoot occurs when human demand exceeds Earth\'s ability to regenerate resources and absorb waste.'
  },
  {
    id: 'planetary-115',
    text: 'What is the primary mechanism behind the collapse of marine food webs due to microplastics?',
    options: [
      'Bioaccumulation and biomagnification of toxic substances',
      'Only physical blockage',
      'Only reduced feeding',
      'Only habitat destruction'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Microplastics accumulate toxins that biomagnify up the food chain, disrupting entire marine ecosystems.'
  },
  {
    id: 'planetary-116',
    text: 'Which of these best describes the concept of environmental Kuznets curve?',
    options: [
      'Relationship between economic development and environmental degradation',
      'Only pollution levels',
      'Only resource use',
      'Only conservation efforts'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'The environmental Kuznets curve suggests that environmental degradation increases with economic development until a certain point, after which it decreases.'
  },
  {
    id: 'planetary-117',
    text: 'What is the main mechanism behind the collapse of pollinator populations?',
    options: [
      'Synergistic effects of pesticides, habitat loss, and climate change',
      'Only pesticide use',
      'Only habitat loss',
      'Only climate change'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Pollinator decline results from the complex interaction of multiple factors, including pesticides, habitat loss, and climate change.'
  },
  {
    id: 'planetary-118',
    text: 'Which of these best describes the concept of environmental debt?',
    options: [
      'Accumulated environmental damage exceeding natural regeneration capacity',
      'Only financial costs',
      'Only resource depletion',
      'Only pollution levels'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental debt represents the accumulated environmental damage that exceeds the Earth\'s natural regeneration capacity.'
  },
  {
    id: 'planetary-119',
    text: 'What is the primary mechanism behind the collapse of soil biodiversity?',
    options: [
      'Disruption of soil food web and microbial communities',
      'Only chemical pollution',
      'Only physical compaction',
      'Only water erosion'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Soil biodiversity collapse occurs through the disruption of complex soil food webs and microbial communities.'
  },
  {
    id: 'planetary-120',
    text: 'Which of these best describes the concept of environmental hysteresis?',
    options: [
      'Irreversible changes in ecosystem states',
      'Only climate change',
      'Only species extinction',
      'Only habitat loss'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental hysteresis refers to the irreversible changes in ecosystem states due to threshold crossings.'
  },
  {
    id: 'planetary-121',
    text: 'What is the main mechanism behind the collapse of coral-algal symbiosis?',
    options: [
      'Disruption of photosynthetic pathways and nutrient exchange',
      'Only temperature increase',
      'Only ocean acidification',
      'Only pollution'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Coral-algal symbiosis collapse involves complex disruptions in photosynthetic pathways and nutrient exchange mechanisms.'
  },
  {
    id: 'planetary-122',
    text: 'Which of these best describes the concept of environmental telecoupling?',
    options: [
      'Long-distance environmental and socioeconomic interactions',
      'Only local impacts',
      'Only regional effects',
      'Only global changes'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental telecoupling refers to the long-distance environmental and socioeconomic interactions between different regions.'
  },
  {
    id: 'planetary-123',
    text: 'What is the primary mechanism behind the collapse of forest carbon sinks?',
    options: [
      'Disruption of carbon sequestration and storage processes',
      'Only deforestation',
      'Only climate change',
      'Only logging'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Forest carbon sink collapse involves complex disruptions in carbon sequestration and storage processes.'
  },
  {
    id: 'planetary-124',
    text: 'Which of these best describes the concept of environmental tipping cascades?',
    options: [
      'Interconnected threshold crossings in Earth systems',
      'Only climate change',
      'Only species extinction',
      'Only habitat loss'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental tipping cascades occur when threshold crossings in one Earth system trigger changes in others.'
  },
  {
    id: 'planetary-125',
    text: 'What is the main mechanism behind the collapse of marine oxygen minimum zones?',
    options: [
      'Complex interactions of warming, stratification, and nutrient loading',
      'Only temperature increase',
      'Only pollution',
      'Only overfishing'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Marine oxygen minimum zone collapse results from complex interactions between warming, stratification, and nutrient loading.'
  },
  {
    id: 'planetary-126',
    text: 'Which of these best describes the concept of environmental justice intersectionality?',
    options: [
      'Interconnected systems of environmental and social oppression',
      'Only pollution exposure',
      'Only resource access',
      'Only conservation efforts'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental justice intersectionality examines how environmental issues intersect with other forms of social oppression.'
  },
  {
    id: 'planetary-127',
    text: 'What is the primary mechanism behind the collapse of soil carbon stocks?',
    options: [
      'Disruption of microbial communities and carbon cycling processes',
      'Only tillage',
      'Only erosion',
      'Only pollution'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Soil carbon stock collapse involves complex disruptions in microbial communities and carbon cycling processes.'
  },
  {
    id: 'planetary-128',
    text: 'Which of these best describes the concept of environmental feedback loops?',
    options: [
      'Self-reinforcing or self-regulating processes in Earth systems',
      'Only climate change',
      'Only pollution',
      'Only resource use'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental feedback loops are self-reinforcing or self-regulating processes that can amplify or dampen environmental changes.'
  },
  {
    id: 'planetary-129',
    text: 'What is the main mechanism behind the collapse of marine food webs?',
    options: [
      'Trophic cascades and disruption of energy flow',
      'Only overfishing',
      'Only pollution',
      'Only climate change'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Marine food web collapse involves complex trophic cascades and disruptions in energy flow through ecosystems.'
  },
  {
    id: 'planetary-130',
    text: 'Which of these best describes the concept of environmental systems thinking?',
    options: [
      'Understanding complex interactions and feedbacks in environmental systems',
      'Only pollution control',
      'Only resource management',
      'Only conservation planning'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental systems thinking involves understanding complex interactions and feedbacks within environmental systems.'
  },
  {
    id: 'planetary-131',
    text: 'What is the primary mechanism behind the collapse of mangrove ecosystems?',
    options: [
      'Disruption of sediment dynamics and nutrient cycling',
      'Changes in tidal patterns and water flow',
      'Modification of root structure and growth',
      'Alteration of leaf decomposition rates'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Mangrove collapse involves complex disruptions in sediment dynamics and nutrient cycling processes that maintain ecosystem stability.'
  },
  {
    id: 'planetary-132',
    text: 'Which of these best describes the concept of environmental complexity theory?',
    options: [
      'Study of emergent properties in environmental systems',
      'Analysis of linear environmental relationships',
      'Measurement of environmental variables',
      'Documentation of species interactions'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental complexity theory examines how simple interactions can lead to complex, emergent properties in environmental systems.'
  },
  {
    id: 'planetary-133',
    text: 'What is the main mechanism behind the collapse of deep-sea ecosystems?',
    options: [
      'Disruption of chemosynthetic processes and food web dynamics',
      'Changes in pressure gradients and water density',
      'Modification of light penetration patterns',
      'Alteration of current flow dynamics'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Deep-sea ecosystem collapse involves complex disruptions in chemosynthetic processes and food web dynamics.'
  },
  {
    id: 'planetary-134',
    text: 'Which of these best describes the concept of environmental resilience thresholds?',
    options: [
      'Critical points where system reorganization occurs',
      'Maximum levels of environmental stress',
      'Minimum requirements for system function',
      'Optimal conditions for growth'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental resilience thresholds are critical points where systems undergo fundamental reorganization.'
  },
  {
    id: 'planetary-135',
    text: 'What is the primary mechanism behind the collapse of peatland ecosystems?',
    options: [
      'Disruption of hydrological and carbon cycling processes',
      'Changes in vegetation composition',
      'Modification of water table levels',
      'Alteration of microbial communities'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Peatland collapse involves complex disruptions in hydrological and carbon cycling processes that maintain ecosystem function.'
  },
  {
    id: 'planetary-136',
    text: 'Which of these best describes the concept of environmental network analysis?',
    options: [
      'Study of interconnected relationships in environmental systems',
      'Mapping of physical environmental features',
      'Calculation of resource distribution',
      'Assessment of population dynamics'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental network analysis examines the complex web of relationships and interactions within environmental systems.'
  },
  {
    id: 'planetary-137',
    text: 'What is the main mechanism behind the collapse of kelp forest ecosystems?',
    options: [
      'Disruption of trophic cascades and habitat complexity',
      'Changes in wave energy patterns',
      'Modification of light availability',
      'Alteration of nutrient distribution'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Kelp forest collapse involves complex disruptions in trophic cascades and habitat complexity that maintain ecosystem stability.'
  },
  {
    id: 'planetary-138',
    text: 'Which of these best describes the concept of environmental regime shifts?',
    options: [
      'Abrupt changes in ecosystem structure and function',
      'Gradual adaptation to new conditions',
      'Cyclical environmental patterns',
      'Seasonal variations in systems'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental regime shifts represent fundamental changes in ecosystem structure, function, and feedback processes.'
  },
  {
    id: 'planetary-139',
    text: 'What is the primary mechanism behind the collapse of seagrass ecosystems?',
    options: [
      'Disruption of sediment stability and nutrient cycling',
      'Changes in water column stratification',
      'Modification of root architecture',
      'Alteration of leaf morphology'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Seagrass ecosystem collapse involves complex disruptions in sediment stability and nutrient cycling processes.'
  },
  {
    id: 'planetary-140',
    text: 'Which of these best describes the concept of environmental complexity metrics?',
    options: [
      'Quantitative measures of system interconnectedness and resilience',
      'Assessment of individual species populations',
      'Calculation of resource availability',
      'Measurement of physical parameters'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental complexity metrics quantify the interconnectedness and resilience of environmental systems.'
  },
  {
    id: 'planetary-141',
    text: 'What is the main mechanism behind the collapse of coral reef fish communities?',
    options: [
      'Disruption of recruitment and population connectivity',
      'Changes in coral cover patterns',
      'Modification of reef structure',
      'Alteration of water chemistry'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Coral reef fish community collapse involves complex disruptions in recruitment and population connectivity processes.'
  },
  {
    id: 'planetary-142',
    text: 'Which of these best describes the concept of environmental system dynamics?',
    options: [
      'Study of feedback loops and time delays in environmental systems',
      'Analysis of static environmental conditions',
      'Measurement of instantaneous changes',
      'Documentation of linear processes'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental system dynamics examines how feedback loops and time delays affect system behavior over time.'
  },
  {
    id: 'planetary-143',
    text: 'What is the primary mechanism behind the collapse of mangrove fish nurseries?',
    options: [
      'Disruption of habitat complexity and predator-prey dynamics',
      'Changes in water flow patterns',
      'Modification of root structure',
      'Alteration of leaf litter decomposition'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Mangrove fish nursery collapse involves complex disruptions in habitat complexity and predator-prey dynamics.'
  },
  {
    id: 'planetary-144',
    text: 'Which of these best describes the concept of environmental complexity science?',
    options: [
      'Study of emergent properties and self-organization in environmental systems',
      'Analysis of simple environmental relationships',
      'Measurement of basic parameters',
      'Documentation of linear processes'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental complexity science examines how simple rules can lead to complex, self-organizing patterns in environmental systems.'
  },
  {
    id: 'planetary-145',
    text: 'What is the main mechanism behind the collapse of deep-sea coral communities?',
    options: [
      'Disruption of food supply and reproductive connectivity',
      'Changes in pressure gradients',
      'Modification of current patterns',
      'Alteration of temperature profiles'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Deep-sea coral community collapse involves complex disruptions in food supply and reproductive connectivity.'
  },
  {
    id: 'planetary-146',
    text: 'Which of these best describes the concept of environmental system resilience?',
    options: [
      'Capacity to maintain function while undergoing change',
      'Ability to resist all changes',
      'Speed of recovery from disturbance',
      'Maximum stress tolerance'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental system resilience refers to the capacity of systems to maintain function while undergoing change.'
  },
  {
    id: 'planetary-147',
    text: 'What is the primary mechanism behind the collapse of seagrass fish habitats?',
    options: [
      'Disruption of structural complexity and predator refuge',
      'Changes in water clarity patterns',
      'Modification of sediment composition',
      'Alteration of current flow'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Seagrass fish habitat collapse involves complex disruptions in structural complexity and predator refuge dynamics.'
  },
  {
    id: 'planetary-148',
    text: 'Which of these best describes the concept of environmental complexity modeling?',
    options: [
      'Simulation of emergent properties in environmental systems',
      'Calculation of basic parameters',
      'Measurement of simple relationships',
      'Documentation of linear processes'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental complexity modeling simulates how simple interactions can lead to complex, emergent properties in environmental systems.'
  },
  {
    id: 'planetary-149',
    text: 'What is the main mechanism behind the collapse of coral reef invertebrate communities?',
    options: [
      'Disruption of settlement and recruitment processes',
      'Changes in coral morphology',
      'Modification of reef structure',
      'Alteration of water chemistry'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Coral reef invertebrate community collapse involves complex disruptions in settlement and recruitment processes.'
  },
  {
    id: 'planetary-150',
    text: 'Which of these best describes the concept of environmental system adaptation?',
    options: [
      'Process of adjusting to changing conditions while maintaining function',
      'Complete transformation of system structure',
      'Return to previous conditions',
      'Maintenance of static conditions'
    ],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'hard',
    explanation: 'Environmental system adaptation involves the process of adjusting to changing conditions while maintaining essential functions.'
  },
  {
    id: 'soil-91',
    text: 'What is the primary function of glomalin in soil?',
    options: [
      'Stabilizes soil aggregates and stores carbon',
      'Acts as a plant hormone',
      'Increases soil acidity',
      'Reduces soil temperature'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Glomalin, produced by mycorrhizal fungi, helps bind soil particles and sequester carbon.'
  },
  {
    id: 'soil-92',
    text: 'Which process is responsible for the conversion of ammonium to nitrate in soil?',
    options: [
      'Nitrification',
      'Denitrification',
      'Ammonification',
      'Mineralization'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Nitrification is the microbial process that converts ammonium to nitrate.'
  },
  {
    id: 'soil-93',
    text: 'What is the main role of actinomycetes in soil?',
    options: [
      'Decompose complex organic compounds like cellulose and chitin',
      'Fix atmospheric nitrogen',
      'Increase soil salinity',
      'Reduce soil pH'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Actinomycetes are bacteria that break down tough organic matter in soil.'
  },
  {
    id: 'soil-94',
    text: 'Which soil enzyme is most closely associated with phosphorus cycling?',
    options: [
      'Phosphatase',
      'Dehydrogenase',
      'Urease',
      'Catalase'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Phosphatase enzymes release phosphate from organic matter.'
  },
  {
    id: 'soil-95',
    text: 'What is the typical Cation Exchange Capacity (CEC) range for clay soils (in cmol/kg)?',
    options: [
      '20-50',
      '1-5',
      '5-10',
      '50-100'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Clay soils typically have a CEC of 20-50 cmol/kg.'
  },
  {
    id: 'soil-96',
    text: 'Which soil order is characterized by a high content of organic matter and is common in wetlands?',
    options: [
      'Histosols',
      'Oxisols',
      'Aridisols',
      'Vertisols'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Histosols are organic-rich soils found in wetlands and bogs.'
  },
  {
    id: 'soil-97',
    text: 'What is the main effect of aluminum toxicity in acidic soils?',
    options: [
      'Inhibits root growth and nutrient uptake',
      'Increases soil pH',
      'Promotes nitrogen fixation',
      'Enhances microbial activity'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Aluminum toxicity in acidic soils can severely inhibit root growth.'
  },
  {
    id: 'soil-98',
    text: 'Which process describes the loss of nitrogen from soil as a gas?',
    options: [
      'Denitrification',
      'Nitrification',
      'Mineralization',
      'Immobilization'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Denitrification is the process where nitrate is reduced and lost as nitrogen gas.'
  },
  {
    id: 'soil-99',
    text: 'What is the main function of the O horizon in a soil profile?',
    options: [
      'Contains organic matter such as decomposing leaves',
      'Stores groundwater',
      'Is the main mineral layer',
      'Contains weathered bedrock'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'The O horizon is the top layer, rich in organic material.'
  },
  {
    id: 'soil-100',
    text: 'Which soil mineral is most responsible for cation exchange?',
    options: [
      'Montmorillonite',
      'Quartz',
      'Calcite',
      'Gypsum'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Montmorillonite, a type of clay, has a high cation exchange capacity.'
  },
  {
    id: 'soil-101',
    text: 'What is the main cause of sodic soil formation?',
    options: [
      'Excess sodium ions displacing calcium and magnesium',
      'High organic matter',
      'Low rainfall',
      'High phosphorus content'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Sodic soils form when sodium ions dominate the cation exchange sites.'
  },
  {
    id: 'soil-102',
    text: 'Which soil property is measured by the Atterberg limits?',
    options: [
      'Plasticity of fine-grained soils',
      'Soil color',
      'Soil pH',
      'Soil temperature'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Atterberg limits measure the plasticity and consistency of fine-grained soils.'
  },
  {
    id: 'soil-103',
    text: 'What is the main function of protozoa in soil?',
    options: [
      'Regulate bacterial populations and nutrient cycling',
      'Fix nitrogen',
      'Increase soil acidity',
      'Decompose cellulose'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Protozoa feed on bacteria and help release nutrients in soil.'
  },
  {
    id: 'soil-104',
    text: 'Which soil test is used to estimate available phosphorus?',
    options: [
      'Olsen test',
      'Kjeldahl method',
      'Loss on ignition',
      'Bouyoucos hydrometer'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'The Olsen test is commonly used to estimate available phosphorus in soil.'
  },
  {
    id: 'soil-105',
    text: 'What is the main effect of soil bulk density on plant growth?',
    options: [
      'High bulk density restricts root penetration and water movement',
      'Increases nutrient availability',
      'Improves soil aeration',
      'Reduces soil temperature'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'High soil bulk density can limit root growth and water infiltration.'
  },
  {
    id: 'soil-106',
    text: 'Which soil organism is most effective at decomposing lignin?',
    options: [
      'White rot fungi',
      'Earthworms',
      'Nematodes',
      'Actinomycetes'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'White rot fungi are specialized in breaking down lignin in plant material.'
  },
  {
    id: 'soil-107',
    text: 'What is the main cause of acid sulfate soils?',
    options: [
      'Oxidation of sulfide minerals when soils are drained',
      'Addition of lime',
      'High organic matter',
      'Low rainfall'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Acid sulfate soils form when sulfide minerals are exposed to air and oxidize.'
  },
  {
    id: 'soil-108',
    text: 'Which soil property is most affected by the presence of humic substances?',
    options: [
      'Cation exchange capacity',
      'Soil temperature',
      'Soil slope',
      'Soil color'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Humic substances greatly increase the cation exchange capacity of soil.'
  },
  {
    id: 'soil-109',
    text: 'What is the main function of the B horizon in a soil profile?',
    options: [
      'Zone of accumulation of leached materials',
      'Rich in organic matter',
      'Contains unweathered rock',
      'Is the surface layer'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'The B horizon accumulates minerals leached from above.'
  },
  {
    id: 'soil-110',
    text: 'Which soil process is most responsible for the formation of laterite soils?',
    options: [
      'Intense leaching in tropical climates',
      'Glacial deposition',
      'Volcanic activity',
      'Wind erosion'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Laterite soils form through intense leaching in hot, wet climates.'
  },
  {
    id: 'soil-111',
    text: 'Which soil process is responsible for the reduction of nitrate to nitrogen gas under anaerobic conditions?',
    options: [
      'Denitrification',
      'Nitrification',
      'Ammonification',
      'Mineralization'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Denitrification is the microbial process that reduces nitrate to nitrogen gas in the absence of oxygen.'
  },
  {
    id: 'soil-112',
    text: 'What is the main function of the C horizon in a soil profile?',
    options: [
      'Consists of weathered parent material',
      'Rich in organic matter',
      'Zone of leaching',
      'Contains the most plant roots'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'The C horizon is made up of weathered parent material and little organic matter.'
  },
  {
    id: 'soil-113',
    text: 'Which soil order is most commonly associated with volcanic ash soils?',
    options: [
      'Andisols',
      'Ultisols',
      'Spodosols',
      'Mollisols'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Andisols are soils formed from volcanic ash.'
  },
  {
    id: 'soil-114',
    text: 'What is the main effect of sodicity on soil structure?',
    options: [
      'Disperses clay particles and destroys soil aggregates',
      'Increases soil fertility',
      'Improves drainage',
      'Enhances microbial activity'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Sodicity causes clay particles to disperse, leading to poor soil structure.'
  },
  {
    id: 'soil-115',
    text: 'Which soil property is measured by the Proctor test?',
    options: [
      'Maximum dry density and optimum moisture content',
      'Soil pH',
      'Cation exchange capacity',
      'Soil color'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'The Proctor test determines the compaction characteristics of soil.'
  },
  {
    id: 'soil-116',
    text: 'What is the main function of the enzyme urease in soil?',
    options: [
      'Hydrolyzes urea to ammonia and carbon dioxide',
      'Oxidizes iron',
      'Reduces nitrate to nitrite',
      'Decomposes cellulose'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Urease breaks down urea, releasing ammonia and carbon dioxide.'
  },
  {
    id: 'soil-117',
    text: 'Which soil mineral is most effective at adsorbing phosphate ions?',
    options: [
      'Goethite (iron oxide)',
      'Quartz',
      'Calcite',
      'Gypsum'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Goethite, an iron oxide, strongly adsorbs phosphate ions in soil.'
  },
  {
    id: 'soil-118',
    text: 'What is the main cause of gleyed soil color (gray/blue) in the subsoil?',
    options: [
      'Prolonged water saturation and reduction of iron',
      'High organic matter',
      'Presence of manganese',
      'Volcanic ash'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Gleyed colors indicate reduced iron due to waterlogged, anaerobic conditions.'
  },
  {
    id: 'soil-119',
    text: 'Which soil process is most responsible for the formation of spodic horizons?',
    options: [
      'Leaching of organic matter and aluminum/iron',
      'Accumulation of calcium carbonate',
      'Clay illuviation',
      'Salt accumulation'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Spodic horizons form by leaching and accumulation of organic matter and metals.'
  },
  {
    id: 'soil-120',
    text: 'What is the main function of the enzyme dehydrogenase in soil?',
    options: [
      'Indicator of total microbial oxidative activity',
      'Breaks down cellulose',
      'Oxidizes ammonia',
      'Reduces nitrate'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Dehydrogenase activity reflects overall microbial activity in soil.'
  },
  {
    id: 'soil-121',
    text: 'Which soil property is most affected by the presence of sodium ions?',
    options: [
      'Soil dispersion and poor structure',
      'Soil color',
      'Soil temperature',
      'Soil pH'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Sodium ions cause soil particles to disperse, leading to poor structure.'
  },
  {
    id: 'soil-122',
    text: 'What is the main effect of biochar addition to soil?',
    options: [
      'Improves cation exchange capacity and water retention',
      'Increases soil acidity',
      'Reduces organic matter',
      'Promotes soil compaction'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Biochar can improve soil fertility, CEC, and water retention.'
  },
  {
    id: 'soil-123',
    text: 'Which soil process is responsible for the transformation of organic nitrogen to ammonium?',
    options: [
      'Mineralization',
      'Nitrification',
      'Denitrification',
      'Immobilization'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Mineralization converts organic nitrogen to ammonium.'
  },
  {
    id: 'soil-124',
    text: 'What is the main function of the enzyme catalase in soil?',
    options: [
      'Breaks down hydrogen peroxide into water and oxygen',
      'Decomposes cellulose',
      'Oxidizes ammonia',
      'Reduces nitrate'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Catalase protects soil microbes by breaking down hydrogen peroxide.'
  },
  {
    id: 'soil-125',
    text: 'Which soil order is most common in arid and semi-arid regions?',
    options: [
      'Aridisols',
      'Mollisols',
      'Ultisols',
      'Spodosols'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Aridisols are soils found in dry climates.'
  },
  {
    id: 'soil-126',
    text: 'What is the main effect of manganese toxicity in soil?',
    options: [
      'Inhibits plant growth and causes leaf chlorosis',
      'Increases soil pH',
      'Promotes nitrogen fixation',
      'Enhances microbial activity'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Excess manganese can be toxic to plants, causing chlorosis and stunted growth.'
  },
  {
    id: 'soil-127',
    text: 'Which soil process is most responsible for the formation of caliche layers?',
    options: [
      'Accumulation of calcium carbonate in arid soils',
      'Clay illuviation',
      'Salt leaching',
      'Organic matter decomposition'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Caliche forms by the accumulation of calcium carbonate in dry soils.'
  },
  {
    id: 'soil-128',
    text: 'What is the main function of the enzyme β-glucosidase in soil?',
    options: [
      'Breaks down cellulose into glucose',
      'Oxidizes ammonia',
      'Reduces nitrate',
      'Decomposes lignin'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'β-glucosidase is involved in cellulose degradation, releasing glucose.'
  },
  {
    id: 'soil-129',
    text: 'Which soil property is most affected by the presence of iron oxides?',
    options: [
      'Soil color (red/yellow hues)',
      'Soil pH',
      'Soil temperature',
      'Soil texture'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'Iron oxides give soil its characteristic red or yellow color.'
  },
  {
    id: 'soil-130',
    text: 'What is the main effect of soil salinity on plant growth?',
    options: [
      'Reduces water uptake and causes osmotic stress',
      'Increases nutrient availability',
      'Improves soil structure',
      'Promotes root elongation'
    ],
    correctAnswer: 0,
    category: 'soil',
    difficulty: 'hard',
    explanation: 'High soil salinity makes it harder for plants to absorb water, causing stress.'
  },
  {
    id: 'plant-31',
    text: 'Which plant hormone is primarily responsible for cell elongation and growth?',
    options: ['Auxin', 'Ethylene', 'Gibberellin', 'Cytokinin'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Auxin is a key hormone that promotes cell elongation and growth in plants.'
  },
  {
    id: 'plant-32',
    text: 'What is the main function of stomata in plant leaves?',
    options: ['Gas exchange', 'Water storage', 'Nutrient absorption', 'Support'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Stomata are pores that allow for gas exchange (CO₂ in, O₂ out) in leaves.'
  },
  {
    id: 'plant-33',
    text: 'Which pigment is essential for photosynthesis in plants?',
    options: ['Chlorophyll', 'Carotene', 'Anthocyanin', 'Xanthophyll'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Chlorophyll is the green pigment that captures light energy for photosynthesis.'
  },
  {
    id: 'plant-34',
    text: 'What is the process by which plants lose water vapor through their leaves?',
    options: ['Transpiration', 'Respiration', 'Photosynthesis', 'Germination'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Transpiration is the loss of water vapor from plant leaves.'
  },
  {
    id: 'plant-35',
    text: 'Which macronutrient is most important for strong root development in plants?',
    options: ['Phosphorus', 'Nitrogen', 'Potassium', 'Calcium'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Phosphorus is essential for healthy root growth.'
  },
  {
    id: 'plant-36',
    text: 'What is the main function of xylem tissue in plants?',
    options: ['Transport water and minerals', 'Store starch', 'Produce flowers', 'Absorb sunlight'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Xylem transports water and minerals from roots to the rest of the plant.'
  },
  {
    id: 'plant-37',
    text: 'Which part of the plant is primarily responsible for anchoring it in the soil?',
    options: ['Roots', 'Stems', 'Leaves', 'Flowers'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Roots anchor the plant and absorb water and nutrients.'
  },
  {
    id: 'plant-38',
    text: 'What is the main function of phloem tissue in plants?',
    options: ['Transport sugars and nutrients', 'Absorb water', 'Support the plant', 'Produce seeds'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Phloem transports sugars and nutrients produced by photosynthesis.'
  },
  {
    id: 'plant-39',
    text: 'Which element is a micronutrient essential for chlorophyll synthesis?',
    options: ['Magnesium', 'Iron', 'Copper', 'Zinc'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Magnesium is a central atom in the chlorophyll molecule.'
  },
  {
    id: 'plant-40',
    text: 'What is the main function of guard cells in plant leaves?',
    options: ['Regulate the opening and closing of stomata', 'Store water', 'Produce pollen', 'Absorb minerals'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Guard cells control the opening and closing of stomata for gas exchange.'
  },
  {
    id: 'plant-41',
    text: 'Which process allows plants to convert light energy into chemical energy?',
    options: ['Photosynthesis', 'Respiration', 'Transpiration', 'Fermentation'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Photosynthesis converts light energy into chemical energy (glucose).'
  },
  {
    id: 'plant-42',
    text: 'Which plant structure is responsible for producing seeds?',
    options: ['Flower', 'Leaf', 'Root', 'Stem'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Flowers are the reproductive structures that produce seeds.'
  },
  {
    id: 'plant-43',
    text: 'What is the main function of root hairs?',
    options: ['Increase surface area for water and nutrient absorption', 'Store starch', 'Anchor the plant', 'Produce flowers'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Root hairs increase the surface area for absorption.'
  },
  {
    id: 'plant-44',
    text: 'Which plant hormone is responsible for fruit ripening?',
    options: ['Ethylene', 'Auxin', 'Gibberellin', 'Cytokinin'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Ethylene is a gaseous hormone that promotes fruit ripening.'
  },
  {
    id: 'plant-45',
    text: 'What is the main function of the cuticle on plant leaves?',
    options: ['Reduce water loss', 'Absorb sunlight', 'Produce seeds', 'Transport nutrients'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'The cuticle is a waxy layer that reduces water loss from leaves.'
  },
  {
    id: 'plant-46',
    text: 'Which process describes the movement of sugars from leaves to other parts of the plant?',
    options: ['Translocation', 'Transpiration', 'Respiration', 'Germination'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Translocation is the movement of sugars through the phloem.'
  },
  {
    id: 'plant-47',
    text: 'Which mineral deficiency causes interveinal chlorosis in young leaves?',
    options: ['Iron', 'Magnesium', 'Potassium', 'Calcium'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Iron deficiency causes yellowing between the veins of young leaves.'
  },
  {
    id: 'plant-48',
    text: 'What is the main function of lenticels on plant stems?',
    options: ['Allow gas exchange', 'Store water', 'Produce flowers', 'Absorb nutrients'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Lenticels are small openings that allow gas exchange in stems.'
  },
  {
    id: 'plant-49',
    text: 'Which process is responsible for the uptake of water by plant roots?',
    options: ['Osmosis', 'Diffusion', 'Active transport', 'Transpiration'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Osmosis is the movement of water into roots from the soil.'
  },
  {
    id: 'plant-50',
    text: 'Which plant structure is responsible for the perception of gravity?',
    options: ['Statoliths in root cap cells', 'Guard cells', 'Xylem vessels', 'Phloem fibers'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Statoliths are specialized organelles in root cap cells that help plants sense gravity.'
  },
  {
    id: 'plant-51',
    text: 'Which process describes the movement of water from roots to leaves in plants?',
    options: ['Cohesion-tension', 'Diffusion', 'Active transport', 'Fermentation'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'The cohesion-tension theory explains how water moves upward through xylem.'
  },
  {
    id: 'plant-52',
    text: 'What is the main function of the endodermis in plant roots?',
    options: ['Regulates water and nutrient uptake', 'Stores starch', 'Produces flowers', 'Absorbs sunlight'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'The endodermis acts as a selective barrier for water and nutrients entering the vascular system.'
  },
  {
    id: 'plant-53',
    text: 'Which plant hormone is primarily responsible for seed dormancy?',
    options: ['Abscisic acid', 'Auxin', 'Gibberellin', 'Ethylene'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Abscisic acid (ABA) maintains seed dormancy until conditions are right for germination.'
  },
  {
    id: 'plant-54',
    text: 'What is the main function of the palisade mesophyll in leaves?',
    options: ['Photosynthesis', 'Water storage', 'Support', 'Transport'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'The palisade mesophyll contains many chloroplasts and is the main site of photosynthesis.'
  },
  {
    id: 'plant-55',
    text: 'Which mineral is essential for the synthesis of ATP in plants?',
    options: ['Phosphorus', 'Magnesium', 'Potassium', 'Calcium'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Phosphorus is a key component of ATP, the energy currency of cells.'
  },
  {
    id: 'plant-56',
    text: 'What is the main function of the pericycle in plant roots?',
    options: ['Initiates lateral root growth', 'Absorbs water', 'Stores starch', 'Produces flowers'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'The pericycle is a layer of cells that gives rise to lateral roots.'
  },
  {
    id: 'plant-57',
    text: 'Which pigment protects plants from excessive light by dissipating excess energy?',
    options: ['Carotenoids', 'Chlorophyll', 'Anthocyanins', 'Phytochrome'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Carotenoids protect plants from photooxidative damage.'
  },
  {
    id: 'plant-58',
    text: 'What is the main function of the casparian strip in roots?',
    options: ['Prevents uncontrolled water flow into the vascular system', 'Stores nutrients', 'Produces hormones', 'Absorbs sunlight'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'The casparian strip is a barrier that regulates water and solute movement into the xylem.'
  },
  {
    id: 'plant-59',
    text: 'Which process is responsible for the opening of stomata in response to light?',
    options: ['Active transport of potassium ions', 'Diffusion of CO₂', 'Transpiration', 'Fermentation'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Potassium ions are actively transported into guard cells, causing stomata to open.'
  },
  {
    id: 'plant-60',
    text: 'What is the main function of phytochrome in plants?',
    options: ['Senses red/far-red light and regulates photoperiodism', 'Stores starch', 'Absorbs water', 'Produces flowers'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Phytochrome is a photoreceptor that helps plants sense day length.'
  },
  {
    id: 'plant-61',
    text: 'Which mineral is essential for the activation of many plant enzymes?',
    options: ['Magnesium', 'Iron', 'Zinc', 'Copper'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Magnesium is a cofactor for many plant enzymes.'
  },
  {
    id: 'plant-62',
    text: 'What is the main function of the spongy mesophyll in leaves?',
    options: ['Facilitates gas exchange', 'Stores water', 'Provides support', 'Produces seeds'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'The spongy mesophyll has air spaces that facilitate gas exchange.'
  },
  {
    id: 'plant-63',
    text: 'Which process describes the movement of sugars from source to sink in plants?',
    options: ['Pressure-flow hypothesis', 'Cohesion-tension', 'Diffusion', 'Fermentation'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'The pressure-flow hypothesis explains how sugars move through phloem.'
  },
  {
    id: 'plant-64',
    text: 'What is the main function of the apical meristem?',
    options: ['Promotes primary growth and elongation', 'Stores nutrients', 'Absorbs water', 'Produces flowers'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'The apical meristem is a region of active cell division at the tips of roots and shoots.'
  },
  {
    id: 'plant-65',
    text: 'Which plant hormone is primarily responsible for stem elongation?',
    options: ['Gibberellin', 'Auxin', 'Cytokinin', 'Ethylene'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Gibberellins promote stem elongation and seed germination.'
  },
  {
    id: 'plant-66',
    text: 'What is the main function of the periderm in woody plants?',
    options: ['Protects against water loss and pathogens', 'Stores starch', 'Absorbs sunlight', 'Produces seeds'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'The periderm (bark) protects woody stems from water loss and infection.'
  },
  {
    id: 'plant-67',
    text: 'Which mineral is essential for the synthesis of chlorophyll and is often deficient in sandy soils?',
    options: ['Magnesium', 'Calcium', 'Potassium', 'Sulfur'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Magnesium is a central component of chlorophyll and is often low in sandy soils.'
  },
  {
    id: 'plant-68',
    text: 'What is the main function of the vascular cambium?',
    options: ['Produces new xylem and phloem', 'Stores water', 'Absorbs nutrients', 'Produces flowers'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'The vascular cambium is a lateral meristem that produces secondary xylem and phloem.'
  },
  {
    id: 'plant-69',
    text: 'Which process describes the loss of water from plant leaves at night?',
    options: ['Guttation', 'Transpiration', 'Respiration', 'Fermentation'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'Guttation is the exudation of water droplets from leaf edges, usually at night.'
  },
  {
    id: 'plant-70',
    text: 'What is the main function of the root cap?',
    options: ['Protects the root tip as it grows through soil', 'Absorbs water', 'Stores starch', 'Produces flowers'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'easy',
    explanation: 'The root cap protects the delicate tip of the root as it pushes through soil.'
  },
  {
    id: 'plant-71',
    text: 'Which plant hormone is primarily responsible for closing stomata during drought stress?',
    options: ['Abscisic acid', 'Auxin', 'Gibberellin', 'Cytokinin'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Abscisic acid signals guard cells to close stomata during drought.'
  },
  {
    id: 'plant-72',
    text: 'What is the main function of the pericycle in plant roots?',
    options: ['Initiates lateral root growth', 'Stores starch', 'Absorbs sunlight', 'Produces flowers'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The pericycle is a layer of cells that gives rise to lateral roots.'
  },
  {
    id: 'plant-73',
    text: 'Which mineral is essential for the synthesis of chlorophyll and is often deficient in sandy soils?',
    options: ['Magnesium', 'Calcium', 'Potassium', 'Sulfur'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Magnesium is a central component of chlorophyll and is often low in sandy soils.'
  },
  {
    id: 'plant-74',
    text: 'What is the main function of the spongy mesophyll in leaves?',
    options: ['Facilitates gas exchange', 'Stores water', 'Provides support', 'Produces seeds'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The spongy mesophyll has air spaces that facilitate gas exchange.'
  },
  {
    id: 'plant-75',
    text: 'Which process describes the movement of sugars from source to sink in plants?',
    options: ['Pressure-flow hypothesis', 'Cohesion-tension', 'Diffusion', 'Fermentation'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The pressure-flow hypothesis explains how sugars move through phloem.'
  },
  {
    id: 'plant-76',
    text: 'Which mineral is essential for the activation of many plant enzymes?',
    options: ['Magnesium', 'Iron', 'Zinc', 'Copper'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Magnesium is a cofactor for many plant enzymes.'
  },
  {
    id: 'plant-77',
    text: 'What is the main function of the apical meristem?',
    options: ['Promotes primary growth and elongation', 'Stores nutrients', 'Absorbs water', 'Produces flowers'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The apical meristem is a region of active cell division at the tips of roots and shoots.'
  },
  {
    id: 'plant-78',
    text: 'Which pigment protects plants from excessive light by dissipating excess energy?',
    options: ['Carotenoids', 'Chlorophyll', 'Anthocyanins', 'Phytochrome'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Carotenoids protect plants from photooxidative damage.'
  },
  {
    id: 'plant-79',
    text: 'What is the main function of the periderm in woody plants?',
    options: ['Protects against water loss and pathogens', 'Stores starch', 'Absorbs sunlight', 'Produces seeds'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The periderm (bark) protects woody stems from water loss and infection.'
  },
  {
    id: 'plant-80',
    text: 'Which process describes the loss of water from plant leaves at night?',
    options: ['Guttation', 'Transpiration', 'Respiration', 'Fermentation'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Guttation is the exudation of water droplets from leaf edges, usually at night.'
  },
  {
    id: 'plant-81',
    text: 'Which plant structure is responsible for the perception of gravity?',
    options: ['Statoliths in root cap cells', 'Guard cells', 'Xylem vessels', 'Phloem fibers'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Statoliths are specialized organelles in root cap cells that help plants sense gravity.'
  },
  {
    id: 'plant-82',
    text: 'Which mineral deficiency causes interveinal chlorosis in young leaves?',
    options: ['Iron', 'Magnesium', 'Potassium', 'Calcium'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Iron deficiency causes yellowing between the veins of young leaves.'
  },
  {
    id: 'plant-83',
    text: 'What is the main function of lenticels on plant stems?',
    options: ['Allow gas exchange', 'Store water', 'Produce flowers', 'Absorb nutrients'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Lenticels are small openings that allow gas exchange in stems.'
  },
  {
    id: 'plant-84',
    text: 'Which process is responsible for the uptake of water by plant roots?',
    options: ['Osmosis', 'Diffusion', 'Active transport', 'Transpiration'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Osmosis is the movement of water into roots from the soil.'
  },
  {
    id: 'plant-85',
    text: 'Which plant hormone is primarily responsible for seed dormancy?',
    options: ['Abscisic acid', 'Auxin', 'Gibberellin', 'Ethylene'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Abscisic acid (ABA) maintains seed dormancy until conditions are right for germination.'
  },
  {
    id: 'plant-86',
    text: 'What is the main function of the palisade mesophyll in leaves?',
    options: ['Photosynthesis', 'Water storage', 'Support', 'Transport'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The palisade mesophyll contains many chloroplasts and is the main site of photosynthesis.'
  },
  {
    id: 'plant-87',
    text: 'Which process is responsible for the opening of stomata in response to light?',
    options: ['Active transport of potassium ions', 'Diffusion of CO₂', 'Transpiration', 'Fermentation'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Potassium ions are actively transported into guard cells, causing stomata to open.'
  },
  {
    id: 'plant-88',
    text: 'What is the main function of phytochrome in plants?',
    options: ['Senses red/far-red light and regulates photoperiodism', 'Stores starch', 'Absorbs water', 'Produces flowers'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Phytochrome is a photoreceptor that helps plants sense day length.'
  },
  {
    id: 'plant-89',
    text: 'Which plant hormone is primarily responsible for stem elongation?',
    options: ['Gibberellin', 'Auxin', 'Cytokinin', 'Ethylene'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Gibberellins promote stem elongation and seed germination.'
  },
  {
    id: 'plant-90',
    text: 'What is the main function of the vascular cambium?',
    options: ['Produces new xylem and phloem', 'Stores water', 'Absorbs nutrients', 'Produces flowers'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The vascular cambium is a lateral meristem that produces secondary xylem and phloem.'
  },
  {
    id: 'plant-91',
    text: 'Which plant hormone is most involved in the response to wounding and herbivory?',
    options: ['Jasmonic acid', 'Auxin', 'Gibberellin', 'Cytokinin'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Jasmonic acid is a key hormone in plant defense against wounding and herbivores.'
  },
  {
    id: 'plant-92',
    text: 'What is the main function of the cuticle on plant leaves?',
    options: ['Prevents water loss', 'Absorbs sunlight', 'Stores starch', 'Produces seeds'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The cuticle is a waxy layer that prevents excessive water loss from leaves.'
  },
  {
    id: 'plant-93',
    text: 'Which mineral is a cofactor for the enzyme nitrate reductase in plants?',
    options: ['Molybdenum', 'Iron', 'Zinc', 'Copper'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Molybdenum is required for nitrate reductase activity.'
  },
  {
    id: 'plant-94',
    text: 'What is the main function of the endodermis in plant roots?',
    options: ['Regulates water and nutrient uptake', 'Stores starch', 'Produces flowers', 'Absorbs sunlight'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The endodermis acts as a selective barrier for water and nutrients entering the vascular system.'
  },
  {
    id: 'plant-95',
    text: 'Which process describes the movement of water through the plant from roots to leaves?',
    options: ['Transpiration stream', 'Diffusion', 'Active transport', 'Fermentation'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The transpiration stream is the flow of water from roots to leaves.'
  },
  {
    id: 'plant-96',
    text: 'Which plant structure is responsible for the majority of photosynthesis?',
    options: ['Palisade mesophyll', 'Spongy mesophyll', 'Guard cells', 'Root hairs'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The palisade mesophyll contains many chloroplasts and is the main site of photosynthesis.'
  },
  {
    id: 'plant-97',
    text: 'Which mineral is essential for the synthesis of DNA and RNA in plants?',
    options: ['Phosphorus', 'Potassium', 'Calcium', 'Magnesium'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Phosphorus is a key component of DNA and RNA.'
  },
  {
    id: 'plant-98',
    text: 'What is the main function of the Casparian strip in roots?',
    options: ['Blocks passive flow of substances into the stele', 'Stores water', 'Produces hormones', 'Absorbs sunlight'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The Casparian strip blocks passive flow of substances into the vascular cylinder.'
  },
  {
    id: 'plant-99',
    text: 'Which process is responsible for the movement of minerals into root cells against a concentration gradient?',
    options: ['Active transport', 'Diffusion', 'Osmosis', 'Transpiration'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Active transport moves minerals into root cells against a concentration gradient.'
  },
  {
    id: 'plant-100',
    text: 'Which plant hormone is most involved in promoting cell division?',
    options: ['Cytokinin', 'Auxin', 'Gibberellin', 'Abscisic acid'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Cytokinins are hormones that promote cell division in plant tissues.'
  },
  {
    id: 'plant-101',
    text: 'What is the main function of the pericycle in plant roots?',
    options: ['Initiates lateral root growth', 'Stores starch', 'Absorbs sunlight', 'Produces flowers'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'The pericycle is a layer of cells that gives rise to lateral roots.'
  },
  {
    id: 'plant-102',
    text: 'Which mineral is essential for the activation of Rubisco, the enzyme in photosynthesis?',
    options: ['Magnesium', 'Iron', 'Zinc', 'Copper'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Magnesium is required for Rubisco activation.'
  },
  {
    id: 'plant-103',
    text: 'What is the main function of the phloem in plants?',
    options: ['Transports sugars and nutrients', 'Transports water', 'Provides support', 'Produces seeds'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Phloem transports sugars and nutrients produced by photosynthesis.'
  },
  {
    id: 'plant-104',
    text: 'Which process describes the loss of water vapor from plant leaves?',
    options: ['Transpiration', 'Respiration', 'Photosynthesis', 'Germination'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Transpiration is the loss of water vapor from plant leaves.'
  },
  {
    id: 'plant-105',
    text: 'Which mineral is essential for the synthesis of chlorophyll?',
    options: ['Magnesium', 'Iron', 'Potassium', 'Calcium'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Magnesium is a central atom in the chlorophyll molecule.'
  },
  {
    id: 'plant-106',
    text: 'What is the main function of the guard cells in plant leaves?',
    options: ['Regulate the opening and closing of stomata', 'Store water', 'Produce pollen', 'Absorb minerals'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Guard cells control the opening and closing of stomata for gas exchange.'
  },
  {
    id: 'plant-107',
    text: 'Which plant hormone is responsible for fruit ripening?',
    options: ['Ethylene', 'Auxin', 'Gibberellin', 'Cytokinin'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Ethylene is a gaseous hormone that promotes fruit ripening.'
  },
  {
    id: 'plant-108',
    text: 'Which process allows plants to convert light energy into chemical energy?',
    options: ['Photosynthesis', 'Respiration', 'Transpiration', 'Fermentation'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Photosynthesis converts light energy into chemical energy (glucose).'
  },
  {
    id: 'plant-109',
    text: 'Which plant structure is responsible for producing seeds?',
    options: ['Flower', 'Leaf', 'Root', 'Stem'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Flowers are the reproductive structures that produce seeds.'
  },
  {
    id: 'plant-110',
    text: 'Which process is responsible for the movement of water into root cells from the soil?',
    options: ['Osmosis', 'Diffusion', 'Active transport', 'Transpiration'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'medium',
    explanation: 'Osmosis is the movement of water into roots from the soil.'
  },
  {
    id: 'plant-111',
    text: 'Which protein complex is responsible for the photolysis of water during photosynthesis?',
    options: ['Photosystem II', 'Photosystem I', 'ATP synthase', 'Rubisco'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Photosystem II splits water molecules, releasing oxygen and electrons.'
  },
  {
    id: 'plant-112',
    text: 'What is the main function of the glyoxylate cycle in plant seedlings?',
    options: ['Converts stored lipids to carbohydrates', 'Synthesizes chlorophyll', 'Fixes nitrogen', 'Produces ethylene'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'The glyoxylate cycle allows seedlings to convert fats into sugars for growth before photosynthesis is established.'
  },
  {
    id: 'plant-113',
    text: 'Which plant hormone is most directly involved in the triple response to mechanical stress in seedlings?',
    options: ['Ethylene', 'Auxin', 'Gibberellin', 'Cytokinin'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Ethylene mediates the triple response: inhibition of stem elongation, stem thickening, and horizontal growth.'
  },
  {
    id: 'plant-114',
    text: 'What is the role of the enzyme ACC synthase in plants?',
    options: ['Catalyzes the rate-limiting step in ethylene biosynthesis', 'Fixes carbon dioxide', 'Synthesizes abscisic acid', 'Degrades auxin'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'ACC synthase converts S-adenosylmethionine to ACC, a precursor of ethylene.'
  },
  {
    id: 'plant-115',
    text: 'Which mineral is a cofactor for the enzyme nitrate reductase in plants?',
    options: ['Molybdenum', 'Boron', 'Zinc', 'Copper'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Molybdenum is required for nitrate reductase activity.'
  },
  {
    id: 'plant-116',
    text: 'What is the function of the phytochrome-interacting factors (PIFs) in plants?',
    options: ['Regulate gene expression in response to light', 'Transport water', 'Synthesize chlorophyll', 'Fix nitrogen'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'PIFs are transcription factors that interact with phytochrome to regulate light-responsive genes.'
  },
  {
    id: 'plant-117',
    text: 'Which process is responsible for the movement of proteins and RNA between plant cells?',
    options: ['Plasmodesmata transport', 'Vesicle trafficking', 'Endocytosis', 'Phagocytosis'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Plasmodesmata are channels that allow the movement of proteins and RNA between cells.'
  },
  {
    id: 'plant-118',
    text: 'What is the main function of the enzyme superoxide dismutase in plants?',
    options: ['Detoxifies reactive oxygen species', 'Synthesizes ATP', 'Fixes nitrogen', 'Degrades starch'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Superoxide dismutase converts superoxide radicals to hydrogen peroxide, protecting cells from oxidative damage.'
  },
  {
    id: 'plant-119',
    text: 'Which plant hormone is most involved in the regulation of seed dormancy and drought tolerance?',
    options: ['Abscisic acid', 'Auxin', 'Gibberellin', 'Cytokinin'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Abscisic acid (ABA) regulates seed dormancy and drought response.'
  },
  {
    id: 'plant-120',
    text: 'What is the main function of the enzyme rubisco activase?',
    options: ['Maintains rubisco in an active state for carbon fixation', 'Synthesizes ATP', 'Degrades starch', 'Fixes nitrogen'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Rubisco activase removes inhibitors from rubisco, allowing it to fix carbon dioxide.'
  },
  {
    id: 'plant-121',
    text: 'Which process describes the movement of water through the apoplast pathway in roots?',
    options: ['Movement through cell walls and intercellular spaces', 'Movement through cytoplasm', 'Movement through plasmodesmata', 'Movement through xylem vessels only'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'The apoplast pathway involves water movement through cell walls and spaces outside the plasma membrane.'
  },
  {
    id: 'plant-122',
    text: 'What is the main function of the enzyme glutamine synthetase in plants?',
    options: ['Assimilates ammonium into amino acids', 'Synthesizes DNA', 'Degrades proteins', 'Fixes nitrogen'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Glutamine synthetase incorporates ammonium into glutamine, a key step in nitrogen assimilation.'
  },
  {
    id: 'plant-123',
    text: 'Which mineral is essential for the synthesis of the plant hormone auxin?',
    options: ['Zinc', 'Calcium', 'Magnesium', 'Potassium'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Zinc is required for the synthesis of tryptophan, a precursor of auxin.'
  },
  {
    id: 'plant-124',
    text: 'What is the main function of the enzyme phenylalanine ammonia-lyase (PAL) in plants?',
    options: ['Initiates the synthesis of phenolic compounds', 'Synthesizes ATP', 'Fixes nitrogen', 'Degrades starch'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'PAL catalyzes the first step in the synthesis of phenolics, important for plant defense.'
  },
  {
    id: 'plant-125',
    text: 'Which process is responsible for the formation of aerenchyma in plant roots?',
    options: ['Programmed cell death', 'Cell elongation', 'Photosynthesis', 'Transpiration'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Aerenchyma forms through programmed cell death, creating air spaces for oxygen transport.'
  },
  {
    id: 'plant-126',
    text: 'What is the main function of the enzyme invertase in plants?',
    options: ['Hydrolyzes sucrose into glucose and fructose', 'Synthesizes ATP', 'Fixes nitrogen', 'Degrades proteins'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Invertase breaks down sucrose into its component sugars for metabolism.'
  },
  {
    id: 'plant-127',
    text: 'Which plant hormone is most involved in the regulation of apical dominance?',
    options: ['Auxin', 'Gibberellin', 'Cytokinin', 'Ethylene'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Auxin produced in the shoot tip suppresses the growth of lateral buds (apical dominance).'
  },
  {
    id: 'plant-128',
    text: 'What is the main function of the enzyme peroxidase in plants?',
    options: ['Detoxifies hydrogen peroxide and strengthens cell walls', 'Synthesizes ATP', 'Fixes nitrogen', 'Degrades starch'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Peroxidase detoxifies hydrogen peroxide and is involved in lignin formation.'
  },
  {
    id: 'plant-129',
    text: 'Which process is responsible for the movement of organic molecules through the phloem?',
    options: ['Mass flow', 'Diffusion', 'Active transport', 'Transpiration'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Mass flow (pressure flow) moves organic molecules through the phloem.'
  },
  {
    id: 'plant-130',
    text: 'What is the main function of the enzyme ascorbate peroxidase in plants?',
    options: ['Removes hydrogen peroxide using ascorbate as an electron donor', 'Synthesizes ATP', 'Fixes nitrogen', 'Degrades proteins'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Ascorbate peroxidase is a key enzyme in the detoxification of hydrogen peroxide in plant cells.'
  },
  {
    id: 'plant-131',
    text: 'Which enzyme is responsible for the initial carboxylation step in C4 photosynthesis?',
    options: ['PEP carboxylase', 'Rubisco', 'Nitrate reductase', 'ATP synthase'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'PEP carboxylase fixes CO2 in the mesophyll cells of C4 plants before the Calvin cycle.'
  },
  {
    id: 'plant-132',
    text: 'What is the main function of the tonoplast in plant cells?',
    options: ['Surrounds the vacuole and regulates ion movement', 'Synthesizes proteins', 'Stores starch', 'Produces chlorophyll'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'The tonoplast is the membrane surrounding the vacuole, controlling ion and molecule transport.'
  },
  {
    id: 'plant-133',
    text: 'Which plant hormone is most involved in the regulation of leaf senescence?',
    options: ['Ethylene', 'Auxin', 'Gibberellin', 'Cytokinin'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Ethylene promotes leaf senescence and abscission.'
  },
  {
    id: 'plant-134',
    text: 'What is the main function of the enzyme allene oxide synthase in plants?',
    options: ['Catalyzes a key step in jasmonic acid biosynthesis', 'Synthesizes ATP', 'Fixes nitrogen', 'Degrades starch'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Allene oxide synthase is involved in the biosynthesis of jasmonic acid, a stress hormone.'
  },
  {
    id: 'plant-135',
    text: 'Which mineral is essential for the function of plastocyanin in the electron transport chain?',
    options: ['Copper', 'Iron', 'Manganese', 'Zinc'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Copper is a cofactor in plastocyanin, which transfers electrons in photosynthesis.'
  },
  {
    id: 'plant-136',
    text: 'What is the main function of the enzyme glutathione reductase in plants?',
    options: ['Regenerates reduced glutathione for antioxidant defense', 'Synthesizes ATP', 'Fixes nitrogen', 'Degrades proteins'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Glutathione reductase maintains the pool of reduced glutathione, a key antioxidant.'
  },
  {
    id: 'plant-137',
    text: 'Which process is responsible for the movement of calcium ions into the plant cell cytosol during signaling?',
    options: ['Calcium influx through ion channels', 'Active transport by ATPases', 'Diffusion through plasmodesmata', 'Mass flow'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Calcium influx through ion channels is a rapid signaling mechanism in plant cells.'
  },
  {
    id: 'plant-138',
    text: 'What is the main function of the enzyme S-adenosylmethionine synthetase in plants?',
    options: ['Synthesizes SAM, a methyl group donor for many reactions', 'Synthesizes ATP', 'Fixes nitrogen', 'Degrades proteins'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'S-adenosylmethionine synthetase produces SAM, important for methylation and ethylene biosynthesis.'
  },
  {
    id: 'plant-139',
    text: 'Which protein is responsible for blue light perception in plants?',
    options: ['Cryptochrome', 'Phytochrome', 'Rubisco', 'Plastocyanin'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Cryptochromes are blue light photoreceptors involved in growth and circadian rhythms.'
  },
  {
    id: 'plant-140',
    text: 'What is the main function of the enzyme nitrate reductase in plants?',
    options: ['Reduces nitrate to nitrite', 'Synthesizes ATP', 'Fixes nitrogen', 'Degrades proteins'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Nitrate reductase catalyzes the reduction of nitrate to nitrite in nitrogen assimilation.'
  },
  {
    id: 'plant-141',
    text: 'Which process is responsible for the movement of potassium ions into guard cells during stomatal opening?',
    options: ['Active transport', 'Diffusion', 'Mass flow', 'Osmosis'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Active transport of potassium ions into guard cells causes water influx and stomatal opening.'
  },
  {
    id: 'plant-142',
    text: 'What is the main function of the enzyme UDP-glucose pyrophosphorylase in plants?',
    options: ['Synthesizes UDP-glucose for cell wall and starch biosynthesis', 'Synthesizes ATP', 'Fixes nitrogen', 'Degrades proteins'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'UDP-glucose pyrophosphorylase is essential for the synthesis of UDP-glucose, a precursor for polysaccharides.'
  },
  {
    id: 'plant-143',
    text: 'Which mineral is a cofactor for the enzyme carbonic anhydrase in plants?',
    options: ['Zinc', 'Iron', 'Copper', 'Manganese'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Zinc is required for carbonic anhydrase, which catalyzes the conversion of CO2 and water to bicarbonate.'
  },
  {
    id: 'plant-144',
    text: 'What is the main function of the enzyme ADP-glucose pyrophosphorylase in plants?',
    options: ['Initiates starch biosynthesis', 'Synthesizes ATP', 'Fixes nitrogen', 'Degrades proteins'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'ADP-glucose pyrophosphorylase catalyzes the first step in starch biosynthesis.'
  },
  {
    id: 'plant-145',
    text: 'Which protein is responsible for red light perception in plants?',
    options: ['Phytochrome', 'Cryptochrome', 'Rubisco', 'Plastocyanin'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Phytochromes are red/far-red light photoreceptors that regulate plant development.'
  },
  {
    id: 'plant-146',
    text: 'What is the main function of the enzyme malate dehydrogenase in plants?',
    options: ['Catalyzes the conversion of malate to oxaloacetate', 'Synthesizes ATP', 'Fixes nitrogen', 'Degrades proteins'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Malate dehydrogenase is involved in the citric acid cycle and C4 metabolism.'
  },
  {
    id: 'plant-147',
    text: 'Which mineral is essential for the function of the oxygen-evolving complex in photosystem II?',
    options: ['Manganese', 'Iron', 'Copper', 'Zinc'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Manganese is a key component of the oxygen-evolving complex that splits water in photosystem II.'
  },
  {
    id: 'plant-148',
    text: 'What is the main function of the enzyme ferredoxin-NADP+ reductase in plants?',
    options: ['Transfers electrons to NADP+ in the light reactions', 'Synthesizes ATP', 'Fixes nitrogen', 'Degrades proteins'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Ferredoxin-NADP+ reductase catalyzes the final electron transfer to NADP+ in photosynthesis.'
  },
  {
    id: 'plant-149',
    text: 'Which process is responsible for the movement of water through the symplast pathway in roots?',
    options: ['Movement through cytoplasm via plasmodesmata', 'Movement through cell walls', 'Movement through xylem vessels', 'Movement through intercellular spaces'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'The symplast pathway involves water movement through the cytoplasm and plasmodesmata.'
  },
  {
    id: 'plant-150',
    text: 'What is the main function of the enzyme polyphenol oxidase in plants?',
    options: ['Oxidizes phenolics to quinones for defense', 'Synthesizes ATP', 'Fixes nitrogen', 'Degrades proteins'],
    correctAnswer: 0,
    category: 'plant',
    difficulty: 'hard',
    explanation: 'Polyphenol oxidase is involved in plant defense by oxidizing phenolics to toxic quinones.'
  },
  {
    id: 'animal-31',
    text: 'Which organ in birds is responsible for grinding food since they lack teeth?',
    options: ['Gizzard', 'Crop', 'Liver', 'Heart'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'The gizzard grinds food in birds, compensating for the lack of teeth.'
  },
  {
    id: 'animal-32',
    text: 'What is the main function of the diaphragm in mammals?',
    options: ['Aids in breathing', 'Pumps blood', 'Digests food', 'Produce hormones'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'The diaphragm is a muscle that helps mammals breathe by expanding and contracting the lungs.'
  },
  {
    id: 'animal-33',
    text: 'Which vitamin is essential for proper blood clotting in animals?',
    options: ['Vitamin K', 'Vitamin A', 'Vitamin D', 'Vitamin E'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Vitamin K is necessary for the synthesis of proteins involved in blood clotting.'
  },
  {
    id: 'animal-34',
    text: 'What is the main function of the rumen in ruminant animals like cows?',
    options: ['Ferment plant material', 'Store fat', 'Produce bile', 'Filter blood'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'The rumen ferments plant material, allowing ruminants to digest cellulose.'
  },
  {
    id: 'animal-35',
    text: 'Which mineral is important for thyroid hormone production in animals?',
    options: ['Iodine', 'Calcium', 'Iron', 'Magnesium'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Iodine is essential for the synthesis of thyroid hormones.'
  },
  {
    id: 'animal-36',
    text: 'What is the main function of the alveoli in animal lungs?',
    options: ['Gas exchange', 'Digest food', 'Pump blood', 'Produce hormones'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Alveoli are tiny air sacs where oxygen and carbon dioxide are exchanged.'
  },
  {
    id: 'animal-37',
    text: 'Which nutrient is most important for energy in animal diets?',
    options: ['Carbohydrates', 'Protein', 'Fat', 'Vitamins'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Carbohydrates are the primary source of energy for most animals.'
  },
  {
    id: 'animal-38',
    text: 'What is the main function of the cornea in animal eyes?',
    options: ['Focuses light onto the retina', 'Produces tears', 'Detects color', 'Controls eye movement'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'The cornea is the transparent front part of the eye that helps focus light.'
  },
  {
    id: 'animal-39',
    text: 'Which organ in fish helps control buoyancy?',
    options: ['Swim bladder', 'Liver', 'Heart', 'Gills'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'The swim bladder allows fish to control their buoyancy in water.'
  },
  {
    id: 'animal-40',
    text: 'What is the main function of the pancreas in animals?',
    options: ['Produce digestive enzymes and insulin', 'Pumps blood', 'Stores fat', 'Produce bile'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'The pancreas produces enzymes for digestion and insulin for blood sugar regulation.'
  },
  {
    id: 'animal-41',
    text: 'Which vitamin is important for healthy skin and coat in animals?',
    options: ['Vitamin E', 'Vitamin K', 'Vitamin B12', 'Vitamin D'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Vitamin E is an antioxidant that supports healthy skin and coat.'
  },
  {
    id: 'animal-42',
    text: 'What is the main function of the large intestine in animals?',
    options: ['Absorbs water and forms feces', 'Produce hormones', 'Pumps blood', 'Exchanges gases'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'The large intestine absorbs water and compacts waste into feces.'
  },
  {
    id: 'animal-43',
    text: 'Which mineral is essential for nerve impulse transmission in animals?',
    options: ['Sodium', 'Iron', 'Zinc', 'Iodine'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Sodium is crucial for the transmission of nerve impulses.'
  },
  {
    id: 'animal-44',
    text: 'What is the main function of the spleen in animals?',
    options: ['Filters blood and helps fight infection', 'Pumps blood', 'Produces hormones', 'Stores fat'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'The spleen filters blood and is part of the immune system.'
  },
  {
    id: 'animal-45',
    text: 'Which nutrient is most important for proper nerve function in animals?',
    options: ['B vitamins', 'Vitamin C', 'Vitamin D', 'Vitamin K'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'B vitamins are essential for healthy nerve function.'
  },
  {
    id: 'animal-46',
    text: 'What is the main function of the trachea in animals?',
    options: ['Carries air to the lungs', 'Pumps blood', 'Produces hormones', 'Stores fat'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'The trachea is the windpipe that carries air to and from the lungs.'
  },
  {
    id: 'animal-47',
    text: 'Which organ in reptiles is responsible for egg production?',
    options: ['Ovary', 'Liver', 'Heart', 'Kidney'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'The ovary produces eggs in reptiles and other female animals.'
  },
  {
    id: 'animal-48',
    text: 'What is the main function of the pituitary gland in animals?',
    options: ['Regulates other endocrine glands', 'Pumps blood', 'Digests food', 'Exchanges gases'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'The pituitary gland is the master gland that regulates other endocrine glands.'
  },
  {
    id: 'animal-49',
    text: 'Which mineral is important for blood clotting in animals?',
    options: ['Calcium', 'Iron', 'Zinc', 'Magnesium'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'Calcium is necessary for the blood clotting process.'
  },
  {
    id: 'animal-50',
    text: 'What is the main function of the esophagus in animals?',
    options: ['Transports food from mouth to stomach', 'Pumps blood', 'Produces hormones', 'Exchanges gases'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'easy',
    explanation: 'The esophagus is a muscular tube that moves food from the mouth to the stomach.'
  },
  {
    id: 'animal-51',
    text: 'Which hormone is primarily responsible for stimulating milk production in mammals?',
    options: ['Prolactin', 'Oxytocin', 'Estrogen', 'Testosterone'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Prolactin stimulates the mammary glands to produce milk.'
  },
  {
    id: 'animal-52',
    text: 'What is the main function of the myelin sheath in animal nerves?',
    options: ['Insulates axons and speeds up nerve impulses', 'Produces hormones', 'Stores fat', 'Filters blood'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The myelin sheath insulates nerve fibers and increases the speed of electrical impulses.'
  },
  {
    id: 'animal-53',
    text: 'Which mineral is essential for the synthesis of thyroid hormones in animals?',
    options: ['Iodine', 'Calcium', 'Iron', 'Magnesium'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Iodine is required for the production of thyroid hormones.'
  },
  {
    id: 'animal-54',
    text: 'What is the primary function of alveoli in the lungs?',
    options: ['Gas exchange', 'Produce mucus', 'Trap dust', 'Move air'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Alveoli are the site of gas exchange in the lungs.'
  },
  {
    id: 'animal-55',
    text: 'Which antibody class is most abundant in mammalian blood?',
    options: ['IgA', 'IgG', 'IgM', 'IgE'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'IgG is the most abundant antibody in blood.'
  },
  {
    id: 'animal-56',
    text: 'What is the function of the spleen in animals?',
    options: ['Filter blood and recycle red blood cells', 'Produce insulin', 'Store bile', 'Absorb nutrients'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The spleen filters blood and recycles old red blood cells.'
  },
  {
    id: 'animal-57',
    text: 'Which disease is caused by a deficiency of thiamine (vitamin B1) in animals?',
    options: ['Rickets', 'Scurvy', 'Beriberi', 'Anemia'],
    correctAnswer: 2,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Beriberi is caused by a lack of vitamin B1.'
  },
  {
    id: 'animal-58',
    text: 'What is the main function of alveoli in the lungs?',
    options: ['Exchange gases', 'Trap dust', 'Produce mucus', 'Move air'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Alveoli are the site of gas exchange in the lungs.'
  },
  {
    id: 'animal-59',
    text: 'Which parasite causes heartworm disease in dogs?',
    options: ['Tapeworm', 'Roundworm', 'Dirofilaria immitis', 'Hookworm'],
    correctAnswer: 2,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Dirofilaria immitis is the parasite that causes heartworm.'
  },
  {
    id: 'animal-60',
    text: 'What is the primary role of insulin in animal metabolism?',
    options: ['Regulate blood sugar', 'Break down proteins', 'Absorb calcium', 'Produce bile'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Insulin regulates blood sugar levels.'
  },
  {
    id: 'animal-61',
    text: 'Which organ produces bile for fat digestion?',
    options: ['Pancreas', 'Liver', 'Stomach', 'Spleen'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The liver produces bile for fat digestion.'
  },
  {
    id: 'animal-62',
    text: 'What is the main symptom of hypocalcemia in dairy cows?',
    options: ['Aggression', 'Milk fever', 'Blindness', 'Hair loss'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Milk fever is a symptom of hypocalcemia (low blood calcium) in dairy cows.'
  },
  {
    id: 'animal-63',
    text: 'Which hormone triggers milk letdown in mammals?',
    options: ['Prolactin', 'Oxytocin', 'Estrogen', 'Testosterone'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Oxytocin triggers milk letdown.'
  },
  {
    id: 'animal-64',
    text: 'What is the function of the myelin sheath in animal nerves?',
    options: ['Speeds up nerve impulses', 'Protects the heart', 'Produces hormones', 'Stores fat'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The myelin sheath insulates nerves and speeds up impulses.'
  },
  {
    id: 'animal-65',
    text: 'Which hormone is responsible for stimulating red blood cell production?',
    options: ['Insulin', 'Erythropoietin', 'Cortisol', 'Thyroxine'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Erythropoietin stimulates red blood cell production.'
  },
  {
    id: 'animal-66',
    text: 'What is the main cause of ketosis in dairy cows?',
    options: ['Excess protein', 'Negative energy balance', 'Vitamin deficiency', 'Dehydration'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Ketosis is caused by a negative energy balance, often in high-producing dairy cows.'
  },
  {
    id: 'animal-67',
    text: 'Which immune cells are responsible for producing antibodies?',
    options: ['T cells', 'B cells', 'Macrophages', 'Neutrophils'],
    correctAnswer: 1,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'B cells are responsible for antibody production.'
  },
  {
    id: 'animal-68',
    text: 'What is the function of the sinoatrial (SA) node in the heart?',
    options: ['Initiate the heartbeat (pacemaker)', 'Pump blood', 'Filter blood', 'Produce white blood cells'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The SA node is the pacemaker of the heart, initiating each heartbeat.'
  },
  {
    id: 'animal-69',
    text: 'Which hormone is responsible for regulating calcium levels in the blood?',
    options: ['Parathyroid hormone', 'Insulin', 'Cortisol', 'Adrenaline'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Parathyroid hormone regulates blood calcium levels.'
  },
  {
    id: 'animal-70',
    text: 'What is the main function of the loop of Henle in the kidney?',
    options: ['Concentrate urine', 'Filter blood', 'Produce hormones', 'Absorb nutrients'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The loop of Henle concentrates urine by reabsorbing water and salts.'
  },
  {
    id: 'animal-71',
    text: 'Which organ in birds is responsible for storing food before digestion?',
    options: ['Crop', 'Gizzard', 'Liver', 'Heart'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The crop stores food in birds before it moves to the gizzard for grinding.'
  },
  {
    id: 'animal-72',
    text: 'What is the main function of the lymphatic system in animals?',
    options: ['Return fluid to the bloodstream and fight infection', 'Digest food', 'Pump blood', 'Produce hormones'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The lymphatic system returns fluid to the blood and helps fight infection.'
  },
  {
    id: 'animal-73',
    text: 'Which mineral is essential for the function of hemoglobin in animal blood?',
    options: ['Iron', 'Calcium', 'Zinc', 'Magnesium'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Iron is a key component of hemoglobin, which carries oxygen in the blood.'
  },
  {
    id: 'animal-74',
    text: 'What is the main function of the adrenal glands in animals?',
    options: ['Produce stress hormones like cortisol and adrenaline', 'Filter blood', 'Digest food', 'Store fat'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The adrenal glands produce hormones that help the body respond to stress.'
  },
  {
    id: 'animal-75',
    text: 'Which vitamin deficiency can cause rickets in young animals?',
    options: ['Vitamin D', 'Vitamin A', 'Vitamin C', 'Vitamin K'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Vitamin D deficiency can cause rickets, a disease affecting bone development.'
  },
  {
    id: 'animal-76',
    text: 'What is the main function of the cochlea in animal ears?',
    options: ['Detects sound vibrations and aids in hearing', 'Maintains balance', 'Produces earwax', 'Regulates pressure'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The cochlea is a spiral-shaped organ that detects sound vibrations.'
  },
  {
    id: 'animal-77',
    text: 'Which hormone is responsible for regulating metabolism in animals?',
    options: ['Thyroxine', 'Insulin', 'Cortisol', 'Estrogen'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Thyroxine, produced by the thyroid gland, regulates metabolism.'
  },
  {
    id: 'animal-78',
    text: 'What is the main function of the retina in animal eyes?',
    options: ['Detects light and sends signals to the brain', 'Focuses light', 'Produces tears', 'Controls eye movement'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The retina contains photoreceptor cells that detect light and send signals to the brain.'
  },
  {
    id: 'animal-79',
    text: 'Which mineral is important for muscle contraction in animals?',
    options: ['Calcium', 'Iron', 'Zinc', 'Iodine'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Calcium is essential for muscle contraction.'
  },
  {
    id: 'animal-80',
    text: 'What is the main function of the hypothalamus in animal brains?',
    options: ['Regulates body temperature, hunger, and thirst', 'Pumps blood', 'Produces insulin', 'Stores fat'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The hypothalamus controls many autonomic functions, including temperature and hunger.'
  },
  {
    id: 'animal-81',
    text: 'Which vitamin is essential for proper nerve function in animals?',
    options: ['Vitamin B12', 'Vitamin D', 'Vitamin K', 'Vitamin E'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Vitamin B12 is crucial for healthy nerve function.'
  },
  {
    id: 'animal-82',
    text: 'What is the main function of the medulla oblongata in animal brains?',
    options: ['Controls breathing and heart rate', 'Produces hormones', 'Stores memories', 'Regulates vision'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The medulla oblongata controls vital functions like breathing and heart rate.'
  },
  {
    id: 'animal-83',
    text: 'Which hormone is responsible for stimulating uterine contractions during birth?',
    options: ['Oxytocin', 'Prolactin', 'Estrogen', 'Testosterone'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Oxytocin stimulates uterine contractions during labor.'
  },
  {
    id: 'animal-84',
    text: 'What is the main function of the glomerulus in the kidney?',
    options: ['Filters blood to form urine', 'Produces hormones', 'Stores fat', 'Regulates temperature'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The glomerulus is a network of capillaries that filters blood in the kidney.'
  },
  {
    id: 'animal-85',
    text: 'Which antibody class is most important for mucosal immunity in animals?',
    options: ['IgA', 'IgG', 'IgM', 'IgE'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'IgA is the main antibody found in mucous membranes.'
  },
  {
    id: 'animal-86',
    text: 'What is the main function of the semicircular canals in animal ears?',
    options: ['Maintain balance and detect head movement', 'Detect sound', 'Produce earwax', 'Regulate pressure'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The semicircular canals are involved in balance and spatial orientation.'
  },
  {
    id: 'animal-87',
    text: 'Which mineral is essential for the function of many enzymes in animal metabolism?',
    options: ['Zinc', 'Calcium', 'Iron', 'Iodine'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Zinc is a cofactor for many enzymes in metabolism.'
  },
  {
    id: 'animal-88',
    text: 'What is the main function of the pulmonary artery in animals?',
    options: ['Carries deoxygenated blood from the heart to the lungs', 'Carries oxygenated blood to the body', 'Filters blood', 'Produces hormones'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The pulmonary artery carries deoxygenated blood from the heart to the lungs.'
  },
  {
    id: 'animal-89',
    text: 'Which hormone is responsible for stimulating appetite in animals?',
    options: ['Ghrelin', 'Leptin', 'Insulin', 'Cortisol'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'Ghrelin is known as the hunger hormone.'
  },
  {
    id: 'animal-90',
    text: 'What is the main function of the cerebellum in animal brains?',
    options: ['Coordinates movement and balance', 'Regulates breathing', 'Produces hormones', 'Stores memories'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'medium',
    explanation: 'The cerebellum is responsible for coordinating movement and balance.'
  },
  {
    id: 'animal-91',
    text: 'Which enzyme is deficient in the genetic disorder bovine leukocyte adhesion deficiency (BLAD)?',
    options: ['CD18 integrin', 'Lactase', 'Amylase', 'Caspase-3'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'BLAD is caused by a deficiency of the CD18 integrin protein in cattle.'
  },
  {
    id: 'animal-92',
    text: 'What is the main function of the juxtaglomerular apparatus in the kidney?',
    options: ['Regulates blood pressure via renin secretion', 'Produces erythropoietin', 'Concentrates urine', 'Filters blood'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The juxtaglomerular apparatus regulates blood pressure by secreting renin.'
  },
  {
    id: 'animal-93',
    text: 'Which gene is commonly mutated in feline hypertrophic cardiomyopathy?',
    options: ['MYBPC3', 'TP53', 'CFTR', 'SOD1'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Mutations in the MYBPC3 gene are associated with hypertrophic cardiomyopathy in cats.'
  },
  {
    id: 'animal-94',
    text: 'What is the primary function of surfactant in the lungs of newborn mammals?',
    options: ['Reduces surface tension in alveoli', 'Absorbs oxygen', 'Traps pathogens', 'Produces mucus'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Surfactant reduces surface tension in alveoli, preventing collapse and aiding breathing.'
  },
  {
    id: 'animal-95',
    text: 'Which vitamin acts as a cofactor for the synthesis of collagen in animals?',
    options: ['Vitamin C', 'Vitamin A', 'Vitamin D', 'Vitamin K'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Vitamin C is required for collagen synthesis.'
  },
  {
    id: 'animal-96',
    text: 'What is the main function of the hepatic portal vein in animals?',
    options: ['Transports nutrient-rich blood from the gut to the liver', 'Carries oxygenated blood to the liver', 'Removes waste from the liver', 'Supplies bile to the intestine'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The hepatic portal vein carries blood from the digestive tract to the liver for processing.'
  },
  {
    id: 'animal-97',
    text: 'Which hormone is responsible for stimulating the release of gastric acid in the stomach?',
    options: ['Gastrin', 'Secretin', 'Cholecystokinin', 'Insulin'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Gastrin stimulates the secretion of gastric acid in the stomach.'
  },
  {
    id: 'animal-98',
    text: 'What is the main function of the Purkinje fibers in the heart?',
    options: ['Conduct electrical impulses for coordinated contraction', 'Produce red blood cells', 'Filter blood', 'Regulate blood pressure'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Purkinje fibers rapidly conduct electrical impulses to ensure coordinated heart contraction.'
  },
  {
    id: 'animal-99',
    text: 'Which mineral is a cofactor for the enzyme carbonic anhydrase in animals?',
    options: ['Zinc', 'Iron', 'Copper', 'Magnesium'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Zinc is required for the activity of carbonic anhydrase.'
  },
  {
    id: 'animal-100',
    text: 'What is the main function of the loop of Henle in the kidney?',
    options: ['Concentrates urine by reabsorbing water and salts', 'Filters blood', 'Produces hormones', 'Absorbs nutrients'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The loop of Henle concentrates urine by reabsorbing water and salts.'
  },
  {
    id: 'animal-101',
    text: 'Which gene is associated with canine progressive retinal atrophy (PRA)?',
    options: ['PDE6B', 'BRCA1', 'CFTR', 'TP53'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Mutations in the PDE6B gene are linked to PRA in dogs.'
  },
  {
    id: 'animal-102',
    text: 'What is the main function of the macula densa in the nephron?',
    options: ['Senses sodium concentration and regulates filtration', 'Produces insulin', 'Stores fat', 'Regulates blood pH'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The macula densa senses sodium levels and helps regulate glomerular filtration rate.'
  },
  {
    id: 'animal-103',
    text: 'Which hormone is responsible for stimulating the release of bile from the gallbladder?',
    options: ['Cholecystokinin', 'Gastrin', 'Secretin', 'Insulin'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Cholecystokinin stimulates the gallbladder to release bile.'
  },
  {
    id: 'animal-104',
    text: 'What is the main function of the sinoatrial (SA) node in the heart?',
    options: ['Initiates the heartbeat (pacemaker)', 'Pumps blood', 'Filters blood', 'Produce white blood cells'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The SA node is the pacemaker of the heart, initiating each heartbeat.'
  },
  {
    id: 'animal-105',
    text: 'Which mineral is essential for the synthesis of thyroid hormones in animals?',
    options: ['Iodine', 'Calcium', 'Iron', 'Magnesium'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Iodine is required for the production of thyroid hormones.'
  },
  {
    id: 'animal-106',
    text: 'What is the main function of the hepatic artery in animals?',
    options: ['Supplies oxygenated blood to the liver', 'Carries bile to the intestine', 'Removes waste from the liver', 'Transports nutrients from the gut'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The hepatic artery delivers oxygen-rich blood to the liver.'
  },
  {
    id: 'animal-107',
    text: 'Which enzyme is deficient in the genetic disorder porcine stress syndrome?',
    options: ['Ryanodine receptor (RYR1)', 'Lactase', 'Amylase', 'Caspase-3'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Porcine stress syndrome is caused by a mutation in the ryanodine receptor gene.'
  },
  {
    id: 'animal-109',
    text: 'Which hormone is responsible for stimulating the release of insulin from the pancreas?',
    options: ['Glucagon-like peptide-1 (GLP-1)', 'Gastrin', 'Secretin', 'Cortisol'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'GLP-1 stimulates insulin secretion from the pancreas.'
  },
  {
    id: 'animal-110',
    text: 'What is the main function of the ductus arteriosus in fetal circulation?',
    options: ['Shunts blood from the pulmonary artery to the aorta', 'Filters blood', 'Produces hormones', 'Stores fat'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The ductus arteriosus allows blood to bypass the lungs in fetal circulation.'
  },
  {
    id: 'animal-111',
    text: 'Which protein is mutated in the genetic disorder hyperkalemic periodic paralysis (HYPP) in horses?',
    options: ['Sodium channel (SCN4A)', 'Ryanodine receptor', 'Dystrophin', 'Collagen type I'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'HYPP in horses is caused by a mutation in the SCN4A sodium channel gene.'
  },
  {
    id: 'animal-112',
    text: 'What is the main function of the countercurrent multiplier system in the kidney?',
    options: ['Concentrates urine by creating an osmotic gradient', 'Filters blood', 'Produces hormones', 'Regulates blood pH'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The countercurrent multiplier system in the nephron concentrates urine.'
  },
  {
    id: 'animal-113',
    text: 'Which gene is associated with progressive retinal atrophy (PRA) in Abyssinian cats?',
    options: ['rdAc', 'BRCA1', 'CFTR', 'TP53'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The rdAc gene mutation is linked to PRA in Abyssinian cats.'
  },
  {
    id: 'animal-114',
    text: 'What is the main function of the hepatic sinusoids in the liver?',
    options: ['Allow blood to flow between hepatocytes for filtration', 'Produce bile', 'Store glycogen', 'Regulate blood pressure'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Hepatic sinusoids are capillary spaces that allow blood to be filtered by liver cells.'
  },
  {
    id: 'animal-115',
    text: 'Which enzyme is deficient in the genetic disorder maple syrup urine disease in cattle?',
    options: ['Branched-chain alpha-keto acid dehydrogenase', 'Lactase', 'Amylase', 'Caspase-3'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Maple syrup urine disease is caused by a deficiency of branched-chain alpha-keto acid dehydrogenase.'
  },
  {
    id: 'animal-116',
    text: 'What is the main function of the Sertoli cells in the testes?',
    options: ['Support and nourish developing sperm cells', 'Produce testosterone', 'Store sperm', 'Regulate blood flow'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Sertoli cells support and nourish developing sperm in the seminiferous tubules.'
  },
  {
    id: 'animal-117',
    text: 'Which hormone is responsible for stimulating the release of cortisol from the adrenal cortex?',
    options: ['ACTH (adrenocorticotropic hormone)', 'TSH', 'FSH', 'LH'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'ACTH stimulates the adrenal cortex to release cortisol.'
  },
  {
    id: 'animal-118',
    text: 'What is the main function of the foramen ovale in fetal circulation?',
    options: ['Allows blood to flow from the right to the left atrium', 'Filters blood', 'Produces hormones', 'Stores fat'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The foramen ovale allows blood to bypass the fetal lungs by flowing from the right to the left atrium.'
  },
  {
    id: 'animal-119',
    text: 'Which mineral is a cofactor for the enzyme glutathione peroxidase in animals?',
    options: ['Selenium', 'Zinc', 'Iron', 'Copper'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Selenium is required for the activity of glutathione peroxidase.'
  },
  {
    id: 'animal-120',
    text: 'What is the main function of the zona pellucida in mammalian eggs?',
    options: ['Protects the egg and regulates sperm entry', 'Produces hormones', 'Stores nutrients', 'Regulates blood flow'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The zona pellucida is a glycoprotein layer that protects the egg and controls sperm entry.'
  },
  {
    id: 'animal-121',
    text: 'Which gene is mutated in the genetic disorder muscular dystrophy in Golden Retrievers?',
    options: ['Dystrophin', 'MYBPC3', 'CFTR', 'TP53'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Dystrophin gene mutations cause muscular dystrophy in Golden Retrievers.'
  },
  {
    id: 'animal-122',
    text: 'What is the main function of the spiral valve in the intestine of some fish?',
    options: ['Increases surface area for nutrient absorption', 'Produces bile', 'Stores fat', 'Regulates blood flow'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The spiral valve increases the surface area for absorption in the intestines of some fish.'
  },
  {
    id: 'animal-123',
    text: 'Which hormone is responsible for stimulating ovulation in female mammals?',
    options: ['Luteinizing hormone (LH)', 'FSH', 'ACTH', 'TSH'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'LH triggers ovulation in female mammals.'
  },
  {
    id: 'animal-124',
    text: 'What is the main function of the hepatic stellate cells in the liver?',
    options: ['Store vitamin A and regulate liver fibrosis', 'Produce bile', 'Filter blood', 'Regulate blood pressure'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Hepatic stellate cells store vitamin A and play a role in liver fibrosis.'
  },
  {
    id: 'animal-125',
    text: 'Which enzyme is deficient in the genetic disorder glycogen storage disease type II (Pompe disease) in animals?',
    options: ['Acid alpha-glucosidase', 'Lactase', 'Amylase', 'Caspase-3'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Pompe disease is caused by a deficiency of acid alpha-glucosidase.'
  },
  {
    id: 'animal-126',
    text: 'What is the main function of the macula lutea in the retina?',
    options: ['Central vision and high acuity', 'Color vision', 'Night vision', 'Peripheral vision'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The macula lutea is responsible for central, high-acuity vision.'
  },
  {
    id: 'animal-127',
    text: 'Which hormone is responsible for stimulating the release of antidiuretic hormone (ADH)?',
    options: ['Increased blood osmolality', 'Decreased blood pressure', 'High calcium', 'Low potassium'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Increased blood osmolality stimulates the release of ADH from the posterior pituitary.'
  },
  {
    id: 'animal-128',
    text: 'What is the main function of the tapetum lucidum in animal eyes?',
    options: ['Enhances night vision by reflecting light', 'Focuses light', 'Produces tears', 'Controls eye movement'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The tapetum lucidum reflects light, improving night vision in many animals.'
  },
  {
    id: 'animal-129',
    text: 'Which mineral is a cofactor for the enzyme superoxide dismutase in animals?',
    options: ['Copper', 'Iron', 'Zinc', 'Selenium'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'Copper is a cofactor for some forms of superoxide dismutase.'
  },
  {
    id: 'animal-130',
    text: 'What is the main function of the ductus venosus in fetal circulation?',
    options: ['Shunts blood from the umbilical vein to the inferior vena cava', 'Filters blood', 'Produces hormones', 'Stores fat'],
    correctAnswer: 0,
    category: 'animal',
    difficulty: 'hard',
    explanation: 'The ductus venosus allows oxygenated blood from the placenta to bypass the liver in fetal circulation.'
  },
  {
    id: 'human-111',
    text: 'Which part of the eye is responsible for color vision?',
    options: ['Cornea', 'Retina', 'Iris', 'Cones'],
    correctAnswer: 3,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Cones in the retina are responsible for color vision.'
  },
  {
    id: 'human-112',
    text: 'What is the main function of platelets in blood?',
    options: ['Carry oxygen', 'Fight infection', 'Clot blood', 'Remove waste'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Platelets help form blood clots to stop bleeding.'
  },
  {
    id: 'human-113',
    text: 'Which organ produces bile for fat digestion?',
    options: ['Pancreas', 'Stomach', 'Liver', 'Gallbladder'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The liver produces bile which helps digest fats.'
  },
  {
    id: 'human-114',
    text: 'What is the function of the eustachian tube in the ear?',
    options: ['Balance', 'Equalize pressure', 'Hearing', 'Produce earwax'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The eustachian tube equalizes pressure between the middle ear and atmosphere.'
  },
  {
    id: 'human-115',
    text: 'Which vitamin is produced by the skin when exposed to sunlight?',
    options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin E'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Vitamin D is synthesized in the skin when exposed to UV light.'
  },
  {
    id: 'human-116',
    text: 'What is the main function of the appendix?',
    options: ['Digest food', 'Store bacteria', 'Produce hormones', 'Filter blood'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The appendix stores beneficial gut bacteria.'
  },
  {
    id: 'human-117',
    text: 'Which part of the brain controls breathing and heart rate?',
    options: ['Cerebrum', 'Cerebellum', 'Brainstem', 'Thalamus'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The brainstem controls vital functions like breathing and heart rate.'
  },
  {
    id: 'human-118',
    text: 'What is the function of the thymus gland?',
    options: ['Produce insulin', 'Mature T-cells', 'Filter blood', 'Produce bile'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The thymus gland helps mature T-cells for the immune system.'
  },
  {
    id: 'human-119',
    text: 'Which mineral is essential for muscle contraction?',
    options: ['Iron', 'Calcium', 'Zinc', 'Magnesium'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Calcium is crucial for muscle contraction.'
  },
  {
    id: 'human-120',
    text: 'What is the function of the sebaceous glands?',
    options: ['Produce sweat', 'Produce oil', 'Produce hormones', 'Filter blood'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Sebaceous glands produce oil to lubricate the skin and hair.'
  },
  {
    id: 'human-121',
    text: 'Which part of the digestive system absorbs most nutrients?',
    options: ['Stomach', 'Small intestine', 'Large intestine', 'Esophagus'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The small intestine is where most nutrient absorption occurs.'
  },
  {
    id: 'human-122',
    text: 'What is the function of the pineal gland?',
    options: ['Produce insulin', 'Regulate sleep', 'Filter blood', 'Produce bile'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The pineal gland produces melatonin to regulate sleep cycles.'
  },
  {
    id: 'human-123',
    text: 'Which part of the eye controls the amount of light entering?',
    options: ['Retina', 'Iris', 'Lens', 'Cornea'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The iris controls the size of the pupil to regulate light entry.'
  },
  {
    id: 'human-124',
    text: 'What is the function of the parathyroid glands?',
    options: ['Produce insulin', 'Regulate calcium', 'Filter blood', 'Produce bile'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Parathyroid glands regulate calcium levels in the blood.'
  },
  {
    id: 'human-125',
    text: 'Which part of the brain processes visual information?',
    options: ['Frontal lobe', 'Occipital lobe', 'Temporal lobe', 'Parietal lobe'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The occipital lobe processes visual information.'
  },
  {
    id: 'human-126',
    text: 'What is the function of the adrenal glands?',
    options: ['Produce insulin', 'Produce stress hormones', 'Filter blood', 'Produce bile'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Adrenal glands produce stress hormones like cortisol and adrenaline.'
  },
  {
    id: 'human-127',
    text: 'Which part of the ear is responsible for balance?',
    options: ['Cochlea', 'Eardrum', 'Semicircular canals', 'Eustachian tube'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The semicircular canals in the inner ear help maintain balance.'
  },
  {
    id: 'human-128',
    text: 'What is the function of the spleen?',
    options: ['Produce insulin', 'Filter blood', 'Produce bile', 'Store fat'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The spleen filters blood and helps fight infections.'
  },
  {
    id: 'human-129',
    text: 'Which part of the brain controls speech production?',
    options: ['Broca area', 'Wernicke area', 'Cerebellum', 'Brainstem'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The Broca area in the frontal lobe controls speech production.'
  },
  {
    id: 'human-130',
    text: 'What is the function of the thyroid gland?',
    options: ['Produce insulin', 'Regulate metabolism', 'Filter blood', 'Produce bile'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The thyroid gland produces hormones that regulate metabolism.'
  },
  {
    id: 'human-131',
    text: 'Which part of the brain is responsible for memory formation?',
    options: ['Hippocampus', 'Cerebellum', 'Brainstem', 'Thalamus'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The hippocampus plays a crucial role in forming new memories.'
  },
  {
    id: 'human-132',
    text: 'What is the function of the gallbladder?',
    options: ['Produce bile', 'Store bile', 'Filter blood', 'Produce insulin'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The gallbladder stores and concentrates bile produced by the liver.'
  },
  {
    id: 'human-133',
    text: 'Which part of the respiratory system contains the vocal cords?',
    options: ['Trachea', 'Bronchi', 'Larynx', 'Alveoli'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The larynx (voice box) contains the vocal cords.'
  },
  {
    id: 'human-134',
    text: 'What is the function of the pancreas?',
    options: ['Filter blood', 'Produce bile', 'Produce digestive enzymes and insulin', 'Store nutrients'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The pancreas produces both digestive enzymes and insulin.'
  },
  {
    id: 'human-135',
    text: 'Which part of the eye focuses light onto the retina?',
    options: ['Iris', 'Cornea', 'Lens', 'Pupil'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The lens focuses light onto the retina.'
  },
  {
    id: 'human-136',
    text: 'What is the function of the lymphatic system?',
    options: ['Transport oxygen', 'Filter blood', 'Transport lymph and fight infection', 'Produce hormones'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The lymphatic system transports lymph and helps fight infections.'
  },
  {
    id: 'human-137',
    text: 'Which part of the brain controls body temperature?',
    options: ['Cerebrum', 'Cerebellum', 'Hypothalamus', 'Thalamus'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The hypothalamus regulates body temperature.'
  },
  {
    id: 'human-138',
    text: 'What is the function of the fallopian tubes?',
    options: ['Produce eggs', 'Store eggs', 'Transport eggs to uterus', 'Produce hormones'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Fallopian tubes transport eggs from ovaries to the uterus.'
  },
  {
    id: 'human-139',
    text: 'Which part of the digestive system absorbs water?',
    options: ['Stomach', 'Small intestine', 'Large intestine', 'Esophagus'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The large intestine absorbs water from undigested food.'
  },
  {
    id: 'human-140',
    text: 'What is the function of the prostate gland?',
    options: ['Produce sperm', 'Store sperm', 'Produce seminal fluid', 'Filter blood'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The prostate gland produces seminal fluid.'
  },
  {
    id: 'human-141',
    text: 'Which part of the brain processes sound?',
    options: ['Frontal lobe', 'Temporal lobe', 'Parietal lobe', 'Occipital lobe'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The temporal lobe processes auditory information.'
  },
  {
    id: 'human-142',
    text: 'What is the function of the salivary glands?',
    options: ['Produce hormones', 'Filter blood', 'Produce saliva', 'Store nutrients'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Salivary glands produce saliva to begin food digestion.'
  },
  {
    id: 'human-143',
    text: 'Which part of the eye contains the photoreceptor cells?',
    options: ['Cornea', 'Iris', 'Retina', 'Lens'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The retina contains photoreceptor cells (rods and cones).'
  },
  {
    id: 'human-144',
    text: 'What is the function of the pituitary gland?',
    options: ['Produce insulin', 'Filter blood', 'Produce growth hormone', 'Store hormones'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The pituitary gland produces growth hormone and other important hormones.'
  },
  {
    id: 'human-145',
    text: 'Which part of the ear converts sound waves to nerve impulses?',
    options: ['Eardrum', 'Cochlea', 'Eustachian tube', 'Semicircular canals'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The cochlea converts sound waves into nerve impulses.'
  },
  {
    id: 'human-146',
    text: 'What is the function of the bone marrow?',
    options: ['Store calcium', 'Produce blood cells', 'Produce hormones', 'Filter blood'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Bone marrow produces blood cells.'
  },
  {
    id: 'human-147',
    text: 'Which part of the brain controls voluntary movement?',
    options: ['Cerebellum', 'Brainstem', 'Motor cortex', 'Thalamus'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The motor cortex controls voluntary movement.'
  },
  {
    id: 'human-148',
    text: 'What is the function of the sebum?',
    options: ['Moisturize skin', 'Produce sweat', 'Filter blood', 'Produce hormones'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Sebum moisturizes and protects the skin.'
  },
  {
    id: 'human-149',
    text: 'Which part of the digestive system produces hydrochloric acid?',
    options: ['Small intestine', 'Large intestine', 'Stomach', 'Esophagus'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'easy',
    explanation: 'The stomach produces hydrochloric acid for digestion.'
  },
  {
    id: 'human-150',
    text: 'What is the function of the synovial fluid?',
    options: ['Produce blood cells', 'Lubricate joints', 'Filter blood', 'Produce hormones'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'easy',
    explanation: 'Synovial fluid lubricates joints to reduce friction.'
  },
  {
    id: 'human-151',
    text: 'Which enzyme is responsible for breaking down lactose in the small intestine?',
    options: ['Amylase', 'Lactase', 'Lipase', 'Pepsin'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Lactase breaks down lactose into glucose and galactose.'
  },
  {
    id: 'human-152',
    text: 'What is the primary function of the juxtaglomerular apparatus in the kidney?',
    options: ['Filter blood', 'Produce urine', 'Regulate blood pressure', 'Absorb water'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The juxtaglomerular apparatus helps regulate blood pressure through the renin-angiotensin system.'
  },
  {
    id: 'human-153',
    text: 'Which neurotransmitter is primarily associated with the reward system in the brain?',
    options: ['Serotonin', 'Dopamine', 'Acetylcholine', 'GABA'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Dopamine is the primary neurotransmitter involved in the brain reward system.'
  },
  {
    id: 'human-154',
    text: 'What is the function of the zona fasciculata in the adrenal cortex?',
    options: ['Produce aldosterone', 'Produce cortisol', 'Produce adrenaline', 'Produce insulin'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The zona fasciculata produces glucocorticoids, primarily cortisol.'
  },
  {
    id: 'human-155',
    text: 'Which type of white blood cell is primarily responsible for fighting parasitic infections?',
    options: ['Neutrophils', 'Eosinophils', 'Basophils', 'Lymphocytes'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Eosinophils are specialized in fighting parasitic infections.'
  },
  {
    id: 'human-156',
    text: 'What is the function of the islets of Langerhans in the pancreas?',
    options: ['Produce digestive enzymes', 'Produce insulin and glucagon', 'Store bile', 'Filter blood'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The islets of Langerhans produce insulin and glucagon to regulate blood sugar.'
  },
  {
    id: 'human-157',
    text: 'Which part of the brain is responsible for processing emotional responses?',
    options: ['Cerebellum', 'Amygdala', 'Thalamus', 'Pons'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The amygdala processes emotional responses and fear.'
  },
  {
    id: 'human-158',
    text: 'What is the function of the Kupffer cells in the liver?',
    options: ['Produce bile', 'Filter blood', 'Phagocytize bacteria', 'Store glycogen'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Kupffer cells are specialized macrophages that phagocytize bacteria and other foreign particles.'
  },
  {
    id: 'human-159',
    text: 'Which hormone is responsible for stimulating the release of thyroid hormones?',
    options: ['ACTH', 'TSH', 'FSH', 'LH'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Thyroid-stimulating hormone (TSH) stimulates the thyroid to produce thyroid hormones.'
  },
  {
    id: 'human-160',
    text: 'What is the function of the Haversian canals in bone?',
    options: ['Store calcium', 'Provide blood supply', 'Produce blood cells', 'Store fat'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Haversian canals contain blood vessels and nerves that supply the bone.'
  },
  {
    id: 'human-161',
    text: 'Which type of muscle fiber is specialized for endurance activities?',
    options: ['Type I', 'Type IIa', 'Type IIb', 'Type III'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Type I (slow-twitch) muscle fibers are specialized for endurance activities.'
  },
  {
    id: 'human-162',
    text: 'What is the function of the zona pellucida in the female reproductive system?',
    options: ['Produce eggs', 'Protect the egg', 'Transport sperm', 'Produce hormones'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The zona pellucida is a protective layer around the egg that helps with sperm binding.'
  },
  {
    id: 'human-163',
    text: 'Which part of the brain is responsible for regulating the sleep-wake cycle?',
    options: ['Pineal gland', 'Suprachiasmatic nucleus', 'Pituitary gland', 'Hypothalamus'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The suprachiasmatic nucleus is the master circadian pacemaker.'
  },
  {
    id: 'human-164',
    text: 'What is the function of the brush border in the small intestine?',
    options: ['Produce enzymes', 'Increase surface area', 'Store nutrients', 'Filter blood'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The brush border increases the surface area for nutrient absorption.'
  },
  {
    id: 'human-165',
    text: 'Which type of cell in the pancreas produces somatostatin?',
    options: ['Alpha cells', 'Beta cells', 'Delta cells', 'Gamma cells'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Delta cells in the pancreas produce somatostatin.'
  },
  {
    id: 'human-166',
    text: 'What is the function of the arachnoid mater in the brain?',
    options: ['Produce CSF', 'Protect the brain', 'Filter blood', 'Produce hormones'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The arachnoid mater is one of the protective meningeal layers around the brain.'
  },
  {
    id: 'human-167',
    text: 'Which type of receptor is responsible for detecting changes in blood pressure?',
    options: ['Chemoreceptors', 'Baroreceptors', 'Thermoreceptors', 'Nociceptors'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Baroreceptors detect changes in blood pressure.'
  },
  {
    id: 'human-168',
    text: 'What is the function of the sertoli cells in the testes?',
    options: ['Produce sperm', 'Produce testosterone', 'Support sperm development', 'Store sperm'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Sertoli cells support and nourish developing sperm cells.'
  },
  {
    id: 'human-169',
    text: 'Which part of the brain is responsible for processing visual information about motion?',
    options: ['V1', 'V2', 'V5/MT', 'V4'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Area V5/MT is specialized for processing visual motion.'
  },
  {
    id: 'human-170',
    text: 'What is the function of the podocytes in the kidney?',
    options: ['Filter blood', 'Produce urine', 'Absorb water', 'Regulate blood pressure'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Podocytes are specialized cells that help filter blood in the kidney.'
  },
  {
    id: 'human-171',
    text: 'Which type of collagen is most abundant in bone tissue?',
    options: ['Type I', 'Type II', 'Type III', 'Type IV'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Type I collagen is the most abundant type in bone tissue.'
  },
  {
    id: 'human-172',
    text: 'What is the function of the stellate cells in the liver?',
    options: ['Produce bile', 'Store vitamin A', 'Filter blood', 'Produce hormones'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Hepatic stellate cells store vitamin A and play a role in liver fibrosis.'
  },
  {
    id: 'human-173',
    text: 'Which part of the brain is responsible for processing taste information?',
    options: ['Frontal lobe', 'Insular cortex', 'Temporal lobe', 'Parietal lobe'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The insular cortex processes taste information.'
  },
  {
    id: 'human-174',
    text: 'What is the function of the mesangial cells in the kidney?',
    options: ['Filter blood', 'Produce urine', 'Regulate blood flow', 'Absorb water'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Mesangial cells help regulate blood flow in the glomerulus.'
  },
  {
    id: 'human-175',
    text: 'Which type of cell in the adrenal medulla produces epinephrine?',
    options: ['Chromaffin cells', 'Zona glomerulosa cells', 'Zona fasciculata cells', 'Zona reticularis cells'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Chromaffin cells in the adrenal medulla produce epinephrine.'
  },
  {
    id: 'human-176',
    text: 'What is the function of the intercalated cells in the kidney?',
    options: ['Filter blood', 'Regulate acid-base balance', 'Produce urine', 'Absorb glucose'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Intercalated cells help regulate acid-base balance in the kidney.'
  },
  {
    id: 'human-177',
    text: 'Which part of the brain is responsible for processing spatial navigation?',
    options: ['Hippocampus', 'Amygdala', 'Cerebellum', 'Thalamus'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The hippocampus is involved in spatial navigation and memory.'
  },
  {
    id: 'human-178',
    text: 'What is the function of the Paneth cells in the small intestine?',
    options: ['Absorb nutrients', 'Produce digestive enzymes', 'Secrete antimicrobial peptides', 'Produce mucus'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Paneth cells secrete antimicrobial peptides to protect the intestinal epithelium.'
  },
  {
    id: 'human-179',
    text: 'Which type of cell in the pancreas produces pancreatic polypeptide?',
    options: ['Alpha cells', 'Beta cells', 'Delta cells', 'PP cells'],
    correctAnswer: 3,
    category: 'human',
    difficulty: 'medium',
    explanation: 'PP cells in the pancreas produce pancreatic polypeptide.'
  },
  {
    id: 'human-180',
    text: 'What is the function of the Merkel cells in the skin?',
    options: ['Produce melanin', 'Sense touch', 'Produce keratin', 'Fight infection'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Merkel cells are touch receptors in the skin.'
  },
  {
    id: 'human-181',
    text: 'Which part of the brain is responsible for processing auditory information about speech?',
    options: ['Primary auditory cortex', 'Wernicke area', 'Broca area', 'Temporal lobe'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Wernicke area processes auditory information related to speech comprehension.'
  },
  {
    id: 'human-182',
    text: 'What is the function of the Leydig cells in the testes?',
    options: ['Produce sperm', 'Produce testosterone', 'Support sperm development', 'Store sperm'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Leydig cells produce testosterone in the testes.'
  },
  {
    id: 'human-183',
    text: 'Which type of cell in the thyroid produces calcitonin?',
    options: ['Follicular cells', 'Parafollicular cells', 'Basal cells', 'Stromal cells'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Parafollicular cells (C cells) in the thyroid produce calcitonin.'
  },
  {
    id: 'human-184',
    text: 'What is the function of the brush cells in the respiratory system?',
    options: ['Produce mucus', 'Sense chemicals', 'Move particles', 'Absorb oxygen'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Brush cells in the respiratory system act as chemosensory cells.'
  },
  {
    id: 'human-185',
    text: 'Which part of the brain is responsible for processing visual information about color?',
    options: ['V1', 'V2', 'V4', 'V5/MT'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Area V4 is specialized for processing color information.'
  },
  {
    id: 'human-186',
    text: 'What is the function of the Clara cells in the lungs?',
    options: ['Produce mucus', 'Detoxify harmful substances', 'Absorb oxygen', 'Move particles'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Clara cells help detoxify harmful substances in the lungs.'
  },
  {
    id: 'human-187',
    text: 'Which type of cell in the adrenal cortex produces aldosterone?',
    options: ['Zona glomerulosa', 'Zona fasciculata', 'Zona reticularis', 'Medulla'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The zona glomerulosa produces aldosterone.'
  },
  {
    id: 'human-188',
    text: 'What is the function of the M cells in the small intestine?',
    options: ['Absorb nutrients', 'Produce enzymes', 'Transport antigens', 'Produce mucus'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'medium',
    explanation: 'M cells transport antigens to immune cells in the gut.'
  },
  {
    id: 'human-189',
    text: 'Which part of the brain is responsible for processing information about body position?',
    options: ['Cerebellum', 'Parietal lobe', 'Temporal lobe', 'Frontal lobe'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'The parietal lobe processes information about body position and spatial awareness.'
  },
  {
    id: 'human-190',
    text: 'What is the function of the chief cells in the stomach?',
    options: ['Produce acid', 'Produce pepsinogen', 'Produce mucus', 'Produce hormones'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'medium',
    explanation: 'Chief cells in the stomach produce pepsinogen, which is converted to pepsin.'
  },
  {
    id: 'human-191',
    text: 'Which signaling pathway is primarily responsible for the activation of T cells during an immune response?',
    options: ['JAK-STAT', 'TCR-CD3 complex', 'Toll-like receptor', 'B cell receptor'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The TCR-CD3 complex is the primary signaling pathway for T cell activation, involving multiple phosphorylation events and downstream signaling cascades.'
  },
  {
    id: 'human-192',
    text: 'What is the molecular mechanism behind the action of the ryanodine receptor in muscle contraction?',
    options: ['Calcium-induced calcium release', 'IP3-mediated calcium release', 'Voltage-gated calcium channels', 'Sodium-calcium exchange'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The ryanodine receptor mediates calcium-induced calcium release, where a small amount of calcium triggers a larger release from the sarcoplasmic reticulum.'
  },
  {
    id: 'human-193',
    text: 'Which epigenetic modification is primarily associated with the silencing of the X chromosome in females?',
    options: ['Histone acetylation', 'DNA methylation', 'Histone methylation', 'Xist RNA coating'],
    correctAnswer: 3,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Xist RNA coating initiates X chromosome inactivation by recruiting various chromatin-modifying complexes to establish heterochromatin.'
  },
  {
    id: 'human-194',
    text: 'What is the molecular mechanism of action of the CFTR channel in chloride transport?',
    options: ['Voltage-gated', 'Ligand-gated', 'ATP-dependent', 'Phosphorylation-dependent'],
    correctAnswer: 3,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The CFTR channel requires phosphorylation by PKA and binding of ATP for its activation and chloride transport.'
  },
  {
    id: 'human-195',
    text: 'Which signaling pathway is responsible for the regulation of cellular apoptosis through the intrinsic pathway?',
    options: ['Fas-FasL', 'TNF-alpha', 'Mitochondrial cytochrome c release', 'Caspase-8 activation'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The intrinsic pathway of apoptosis is initiated by mitochondrial cytochrome c release, which activates the apoptosome and caspase cascade.'
  },
  {
    id: 'human-196',
    text: 'What is the molecular mechanism behind the action of the sodium-potassium ATPase pump?',
    options: ['Primary active transport', 'Secondary active transport', 'Facilitated diffusion', 'Simple diffusion'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The sodium-potassium ATPase uses ATP hydrolysis to actively transport 3 Na+ out and 2 K+ in against their concentration gradients.'
  },
  {
    id: 'human-197',
    text: 'Which molecular mechanism is responsible for the generation of action potentials in cardiac pacemaker cells?',
    options: ['Voltage-gated sodium channels', 'HCN channels', 'Calcium channels', 'Potassium channels'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'hard',
    explanation: 'HCN (hyperpolarization-activated cyclic nucleotide-gated) channels are responsible for the funny current that initiates pacemaker potential.'
  },
  {
    id: 'human-198',
    text: 'What is the molecular mechanism of insulin receptor signaling?',
    options: ['G-protein coupled', 'Receptor tyrosine kinase', 'Nuclear receptor', 'Ion channel'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The insulin receptor is a receptor tyrosine kinase that autophosphorylates and activates downstream signaling cascades including PI3K and MAPK pathways.'
  },
  {
    id: 'human-199',
    text: 'Which molecular mechanism is responsible for the regulation of gene expression by microRNAs?',
    options: ['DNA methylation', 'Histone modification', 'mRNA degradation', 'Protein phosphorylation'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'hard',
    explanation: 'MicroRNAs bind to complementary sequences in target mRNAs, leading to their degradation or translational repression.'
  },
  {
    id: 'human-200',
    text: 'What is the molecular mechanism of action of the NMDA receptor in synaptic plasticity?',
    options: ['Voltage-gated', 'Ligand-gated', 'Both voltage and ligand-gated', 'Mechanically-gated'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The NMDA receptor requires both glutamate binding and membrane depolarization to remove the magnesium block and allow calcium influx.'
  },
  {
    id: 'human-201',
    text: 'Which molecular mechanism is responsible for the regulation of cellular iron homeostasis?',
    options: ['Transferrin receptor', 'Ferritin', 'Hepcidin', 'DMT1'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Hepcidin regulates iron homeostasis by binding to ferroportin, causing its internalization and degradation, thus controlling iron export from cells.'
  },
  {
    id: 'human-202',
    text: 'What is the molecular mechanism behind the action of the ryanodine receptor in cardiac muscle?',
    options: ['Calcium spark', 'Calcium wave', 'Calcium-induced calcium release', 'Store-operated calcium entry'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Calcium sparks are local, brief releases of calcium from the sarcoplasmic reticulum through ryanodine receptor clusters.'
  },
  {
    id: 'human-203',
    text: 'Which molecular mechanism is responsible for the regulation of cellular autophagy?',
    options: ['mTOR pathway', 'p53 pathway', 'NF-κB pathway', 'Wnt pathway'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The mTOR pathway is the primary regulator of autophagy, where mTOR inhibition leads to the formation of autophagosomes.'
  },
  {
    id: 'human-204',
    text: 'What is the molecular mechanism of action of the P2X7 receptor in inflammation?',
    options: ['Ion channel', 'G-protein coupled', 'Enzyme-linked', 'Nuclear receptor'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The P2X7 receptor is an ATP-gated ion channel that, when activated, forms a large pore allowing the release of pro-inflammatory cytokines.'
  },
  {
    id: 'human-205',
    text: 'Which molecular mechanism is responsible for the regulation of cellular senescence?',
    options: ['Telomere shortening', 'DNA damage', 'Oncogene activation', 'All of the above'],
    correctAnswer: 3,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Cellular senescence can be triggered by telomere shortening, DNA damage, or oncogene activation, leading to permanent cell cycle arrest.'
  },
  {
    id: 'human-206',
    text: 'What is the molecular mechanism behind the action of the ryanodine receptor in smooth muscle?',
    options: ['Calcium spark', 'Calcium wave', 'IP3 receptor coupling', 'Store-operated calcium entry'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'hard',
    explanation: 'In smooth muscle, ryanodine receptors are often coupled to IP3 receptors, creating a complex calcium signaling system.'
  },
  {
    id: 'human-207',
    text: 'Which molecular mechanism is responsible for the regulation of cellular iron export?',
    options: ['Transferrin', 'Ferritin', 'Ferroportin', 'DMT1'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Ferroportin is the only known cellular iron exporter, regulated by hepcidin binding and subsequent internalization.'
  },
  {
    id: 'human-208',
    text: 'What is the molecular mechanism of action of the TRPV1 receptor in pain sensation?',
    options: ['Voltage-gated', 'Ligand-gated', 'Temperature-gated', 'Mechanically-gated'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'hard',
    explanation: 'TRPV1 is a temperature-gated ion channel that responds to heat and capsaicin, playing a key role in thermal nociception.'
  },
  {
    id: 'human-209',
    text: 'Which molecular mechanism is responsible for the regulation of cellular iron import?',
    options: ['Transferrin receptor', 'Ferritin', 'Ferroportin', 'DMT1'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The transferrin receptor mediates cellular iron import through receptor-mediated endocytosis of iron-bound transferrin.'
  },
  {
    id: 'human-210',
    text: 'What is the molecular mechanism behind the action of the ryanodine receptor in neuronal calcium signaling?',
    options: ['Calcium spark', 'Calcium wave', 'Calcium-induced calcium release', 'Store-operated calcium entry'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'hard',
    explanation: 'In neurons, ryanodine receptors mediate calcium-induced calcium release, contributing to calcium waves and synaptic plasticity.'
  },
  {
    id: 'human-211',
    text: 'What is the molecular mechanism behind the regulation of the unfolded protein response (UPR) in the endoplasmic reticulum?',
    options: ['PERK pathway', 'IRE1 pathway', 'ATF6 pathway', 'All of the above'],
    correctAnswer: 3,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The UPR is regulated by three parallel pathways: PERK, IRE1, and ATF6, which together coordinate the cellular response to ER stress.'
  },
  {
    id: 'human-212',
    text: 'Which molecular mechanism is responsible for the regulation of cellular iron sensing through the iron regulatory protein (IRP) system?',
    options: ['Protein degradation', 'mRNA stability', 'Translational control', 'All of the above'],
    correctAnswer: 3,
    category: 'human',
    difficulty: 'hard',
    explanation: 'IRPs regulate iron metabolism through multiple mechanisms including mRNA stability, translational control, and protein degradation.'
  },
  {
    id: 'human-213',
    text: 'What is the molecular mechanism behind the action of the ryanodine receptor in the regulation of calcium oscillations?',
    options: ['Calcium-induced calcium release', 'IP3-mediated release', 'Store-operated calcium entry', 'Voltage-gated calcium entry'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Calcium oscillations are generated through calcium-induced calcium release, where the ryanodine receptor mediates regenerative calcium release from the ER.'
  },
  {
    id: 'human-214',
    text: 'Which molecular mechanism is responsible for the regulation of cellular iron storage through ferritin?',
    options: ['Transcriptional control', 'Post-translational modification', 'Iron-responsive element binding', 'Protein degradation'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Ferritin expression is regulated through iron-responsive elements (IREs) in its mRNA, which are bound by IRPs in response to cellular iron levels.'
  },
  {
    id: 'human-215',
    text: 'What is the molecular mechanism behind the action of the ryanodine receptor in the regulation of calcium sparks in cardiac muscle?',
    options: ['Local calcium release', 'Global calcium release', 'Store-operated calcium entry', 'Voltage-gated calcium entry'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Calcium sparks are local, brief releases of calcium from the sarcoplasmic reticulum through ryanodine receptor clusters, regulated by local control mechanisms.'
  },
  {
    id: 'human-216',
    text: 'Which molecular mechanism is responsible for the regulation of cellular iron transport through the transferrin cycle?',
    options: ['Receptor-mediated endocytosis', 'Direct membrane transport', 'Vesicular transport', 'Channel-mediated transport'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The transferrin cycle involves receptor-mediated endocytosis of iron-bound transferrin, followed by iron release in acidic endosomes and receptor recycling.'
  },
  {
    id: 'human-217',
    text: 'What is the molecular mechanism behind the action of the ryanodine receptor in the regulation of calcium waves in smooth muscle?',
    options: ['Calcium-induced calcium release', 'IP3-mediated release', 'Store-operated calcium entry', 'Voltage-gated calcium entry'],
    correctAnswer: 1,
    category: 'human',
    difficulty: 'hard',
    explanation: 'In smooth muscle, calcium waves are primarily mediated by IP3 receptors, with ryanodine receptors playing a modulatory role.'
  },
  {
    id: 'human-218',
    text: 'Which molecular mechanism is responsible for the regulation of cellular iron sensing through the hepcidin-ferroportin axis?',
    options: ['Transcriptional control', 'Post-translational modification', 'Protein degradation', 'All of the above'],
    correctAnswer: 3,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The hepcidin-ferroportin axis regulates iron homeostasis through multiple mechanisms including transcriptional control, post-translational modification, and protein degradation.'
  },
  {
    id: 'human-219',
    text: 'What is the molecular mechanism behind the action of the ryanodine receptor in the regulation of calcium release in neurons?',
    options: ['Calcium-induced calcium release', 'IP3-mediated release', 'Store-operated calcium entry', 'Voltage-gated calcium entry'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'In neurons, ryanodine receptors mediate calcium-induced calcium release, contributing to calcium waves and synaptic plasticity.'
  },
  {
    id: 'human-220',
    text: 'Which molecular mechanism is responsible for the regulation of cellular iron export through ferroportin?',
    options: ['Transcriptional control', 'Post-translational modification', 'Protein degradation', 'All of the above'],
    correctAnswer: 3,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Ferroportin regulation involves multiple mechanisms including transcriptional control, post-translational modification, and hepcidin-mediated degradation.'
  },
  {
    id: 'human-221',
    text: 'What is the molecular mechanism behind the action of the ryanodine receptor in the regulation of calcium sparks in skeletal muscle?',
    options: ['Local calcium release', 'Global calcium release', 'Store-operated calcium entry', 'Voltage-gated calcium entry'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'In skeletal muscle, calcium sparks are local, brief releases of calcium from the sarcoplasmic reticulum through ryanodine receptor clusters.'
  },
  {
    id: 'human-222',
    text: 'Which molecular mechanism is responsible for the regulation of cellular iron import through DMT1?',
    options: ['Transcriptional control', 'Post-translational modification', 'Protein degradation', 'All of the above'],
    correctAnswer: 3,
    category: 'human',
    difficulty: 'hard',
    explanation: 'DMT1 regulation involves multiple mechanisms including transcriptional control, post-translational modification, and protein degradation.'
  },
  {
    id: 'human-223',
    text: 'What is the molecular mechanism behind the action of the ryanodine receptor in the regulation of calcium release in cardiac muscle?',
    options: ['Calcium-induced calcium release', 'IP3-mediated release', 'Store-operated calcium entry', 'Voltage-gated calcium entry'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'In cardiac muscle, ryanodine receptors mediate calcium-induced calcium release, which is essential for excitation-contraction coupling.'
  },
  {
    id: 'human-224',
    text: 'Which molecular mechanism is responsible for the regulation of cellular iron storage through ferritin?',
    options: ['Transcriptional control', 'Post-translational modification', 'Iron-responsive element binding', 'Protein degradation'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Ferritin expression is regulated through iron-responsive elements (IREs) in its mRNA, which are bound by IRPs in response to cellular iron levels.'
  },
  {
    id: 'human-225',
    text: 'What is the molecular mechanism behind the action of the ryanodine receptor in the regulation of calcium waves in cardiac muscle?',
    options: ['Calcium-induced calcium release', 'IP3-mediated release', 'Store-operated calcium entry', 'Voltage-gated calcium entry'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'In cardiac muscle, calcium waves are generated through calcium-induced calcium release, where the ryanodine receptor mediates regenerative calcium release.'
  },
  {
    id: 'human-226',
    text: 'Which molecular mechanism is responsible for the regulation of cellular iron transport through the transferrin cycle?',
    options: ['Receptor-mediated endocytosis', 'Direct membrane transport', 'Vesicular transport', 'Channel-mediated transport'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'The transferrin cycle involves receptor-mediated endocytosis of iron-bound transferrin, followed by iron release in acidic endosomes and receptor recycling.'
  },
  {
    id: 'human-227',
    text: 'What is the molecular mechanism behind the action of the ryanodine receptor in the regulation of calcium sparks in smooth muscle?',
    options: ['Local calcium release', 'Global calcium release', 'Store-operated calcium entry', 'Voltage-gated calcium entry'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'In smooth muscle, calcium sparks are local, brief releases of calcium from the sarcoplasmic reticulum through ryanodine receptor clusters.'
  },
  {
    id: 'human-228',
    text: 'Which molecular mechanism is responsible for the regulation of cellular iron sensing through the iron regulatory protein (IRP) system?',
    options: ['Protein degradation', 'mRNA stability', 'Translational control', 'All of the above'],
    correctAnswer: 3,
    category: 'human',
    difficulty: 'hard',
    explanation: 'IRPs regulate iron metabolism through multiple mechanisms including mRNA stability, translational control, and protein degradation.'
  },
  {
    id: 'human-229',
    text: 'What is the molecular mechanism behind the action of the ryanodine receptor in the regulation of calcium oscillations?',
    options: ['Calcium-induced calcium release', 'IP3-mediated release', 'Store-operated calcium entry', 'Voltage-gated calcium entry'],
    correctAnswer: 0,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Calcium oscillations are generated through calcium-induced calcium release, where the ryanodine receptor mediates regenerative calcium release from the ER.'
  },
  {
    id: 'human-230',
    text: 'Which molecular mechanism is responsible for the regulation of cellular iron storage through ferritin?',
    options: ['Transcriptional control', 'Post-translational modification', 'Iron-responsive element binding', 'Protein degradation'],
    correctAnswer: 2,
    category: 'human',
    difficulty: 'hard',
    explanation: 'Ferritin expression is regulated through iron-responsive elements (IREs) in its mRNA, which are bound by IRPs in response to cellular iron levels.'
  },
  {
    id: 'planetary-1',
    text: 'What is the main cause of the greenhouse effect on Earth?',
    options: ['Greenhouse gases trapping heat', 'Sunlight reflection', 'Ocean currents', 'Wind patterns'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'The greenhouse effect occurs when greenhouse gases in the atmosphere trap heat from the sun, warming the Earth.'
  },
  {
    id: 'planetary-2',
    text: 'Which of these is a renewable energy source?',
    options: ['Solar power', 'Coal', 'Natural gas', 'Oil'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Solar power is a renewable energy source that uses sunlight to generate electricity without depleting natural resources.'
  },
  {
    id: 'planetary-3',
    text: 'What is the main purpose of recycling?',
    options: ['Reduce waste and conserve resources', 'Create more landfills', 'Increase pollution', 'Use more energy'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Recycling helps reduce waste and conserve natural resources by reusing materials instead of creating new ones.'
  },
  {
    id: 'planetary-4',
    text: 'Which of these is a way to reduce water pollution?',
    options: ['Proper waste disposal', 'Using more chemicals', 'Dumping waste in rivers', 'Increasing industrial waste'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Proper waste disposal helps prevent harmful substances from entering water sources and causing pollution.'
  },
  {
    id: 'planetary-5',
    text: 'What is the main benefit of planting trees?',
    options: ['Absorb carbon dioxide', 'Create more waste', 'Increase pollution', 'Use more water'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Trees absorb carbon dioxide and release oxygen, helping to clean the air and combat climate change.'
  },
  {
    id: 'planetary-6',
    text: 'Which of these is a sustainable transportation option?',
    options: ['Walking or cycling', 'Driving alone', 'Using private jets', 'Taking long flights'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Walking or cycling are sustainable transportation options that don\'t produce greenhouse gas emissions.'
  },
  {
    id: 'planetary-7',
    text: 'What is the main purpose of composting?',
    options: ['Create natural fertilizer', 'Increase waste', 'Create pollution', 'Use more energy'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Composting turns organic waste into natural fertilizer, reducing landfill waste and improving soil quality.'
  },
  {
    id: 'planetary-8',
    text: 'Which of these is a way to save energy at home?',
    options: ['Turning off lights when not in use', 'Leaving appliances on', 'Using more electricity', 'Keeping windows open'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Turning off lights when not in use is a simple way to save energy and reduce electricity consumption.'
  },
  {
    id: 'planetary-9',
    text: 'What is the main benefit of using reusable shopping bags?',
    options: ['Reduce plastic waste', 'Create more waste', 'Increase pollution', 'Use more resources'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Reusable shopping bags help reduce plastic waste and the amount of single-use plastic in landfills.'
  },
  {
    id: 'planetary-10',
    text: 'Which of these is a way to conserve water?',
    options: ['Fixing leaky faucets', 'Leaving water running', 'Taking longer showers', 'Using more water'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Fixing leaky faucets helps prevent water waste and conserves this valuable resource.'
  },
  {
    id: 'planetary-11',
    text: 'What is the main purpose of wildlife conservation?',
    options: ['Protect animal species', 'Hunt more animals', 'Destroy habitats', 'Increase pollution'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Wildlife conservation helps protect animal species and their habitats from extinction.'
  },
  {
    id: 'planetary-12',
    text: 'Which of these is a way to reduce air pollution?',
    options: ['Using public transportation', 'Driving more cars', 'Burning more fuel', 'Increasing emissions'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Using public transportation helps reduce the number of vehicles on the road and decreases air pollution.'
  },
  {
    id: 'planetary-13',
    text: 'What is the main benefit of organic farming?',
    options: ['Reduce chemical use', 'Increase pollution', 'Use more pesticides', 'Create more waste'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Organic farming reduces the use of harmful chemicals and promotes healthier soil and water systems.'
  },
  {
    id: 'planetary-14',
    text: 'Which of these is a way to protect marine life?',
    options: ['Reduce plastic waste', 'Dump more waste', 'Increase pollution', 'Use more plastic'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Reducing plastic waste helps prevent ocean pollution and protects marine animals from harm.'
  },
  {
    id: 'planetary-15',
    text: 'What is the main purpose of energy-efficient appliances?',
    options: ['Save energy', 'Use more electricity', 'Increase pollution', 'Create more waste'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Energy-efficient appliances use less electricity, helping to reduce energy consumption and costs.'
  },
  {
    id: 'planetary-16',
    text: 'Which of these is a way to reduce food waste?',
    options: ['Plan meals ahead', 'Buy more food', 'Throw away food', 'Cook more than needed'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Planning meals ahead helps reduce food waste by ensuring you only buy what you need.'
  },
  {
    id: 'planetary-17',
    text: 'What is the main benefit of using solar panels?',
    options: ['Generate clean energy', 'Create more pollution', 'Use more resources', 'Increase waste'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Solar panels generate clean, renewable energy from sunlight without producing harmful emissions.'
  },
  {
    id: 'planetary-18',
    text: 'Which of these is a way to protect forests?',
    options: ['Sustainable logging', 'Clear-cutting', 'Burning trees', 'Destroying habitats'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Sustainable logging practices help protect forests by ensuring trees are harvested responsibly.'
  },
  {
    id: 'planetary-19',
    text: 'What is the main purpose of water conservation?',
    options: ['Save water resources', 'Waste more water', 'Increase pollution', 'Use more water'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Water conservation helps ensure we have enough clean water for future generations.'
  },
  {
    id: 'planetary-20',
    text: 'Which of these is a way to reduce carbon footprint?',
    options: ['Eat local food', 'Import more food', 'Use more packaging', 'Increase transportation'],
    correctAnswer: 0,
    category: 'planetary',
    difficulty: 'easy',
    explanation: 'Eating local food reduces the distance food travels, decreasing transportation emissions and carbon footprint.'
  }
];
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

app.use(cors());
app.use(express.json());

const indianDadTransformations = {
  // Casual responses
  "ok": "Hmm. Do whatever you want.",
  "okay": "Hmm. Do whatever you want.",
  "fine": "Fine fine, I don't want to argue with you.",
  "yes": "Haan haan, I know everything.",
  "no": "No means no. Don't ask again.",
  
  // Location/Movement
  "where are you": "Where are you roaming unnecessarily?",
  "where r u": "Where are you roaming unnecessarily?",
  "going out": "Going out again? When will you study?",
  "coming home": "What time? Don't be late like last time.",
  
  // Money related
  "need money": "Money doesn't grow on trees, beta.",
  "broke": "This is what happens when you don't listen to papa.",
  "expensive": "Everything is expensive when you don't earn.",
  
  // Food related
  "pizza": "Pizza pizza... when I was your age, we ate dal chawal happily.",
  "outside food": "Outside food will make you sick. Mama ka khana khao.",
  
  // Study/Career
  "exam": "Have you studied properly? No phone till exam is over.",
  "job": "Focus on studies first. Job will come automatically.",
  "tired": "Tired? We work 12 hours and don't complain.",
  
  // Technology/Phone
  "phone": "Always on phone. When will you talk to family?",
  "internet": "Internet se kya hoga? Read books.",
  "game": "Games games... study karo beta.",
  
  // Time related
  "late": "Late because you woke up late. Early to bed, early to rise.",
  "sleep": "So early? When I was young, I slept at 12 and woke up at 5.",
  
  // General life advice
  "problem": "Every problem has solution. Just think properly.",
  "confused": "Confusion is because you don't plan properly.",
  "help": "Help? First try yourself, then ask papa.",
  
  // Weather
  "cold": "Cold? Wear proper clothes. I told you yesterday only.",
  "hot": "Drink water. Not cold drinks, normal water.",
  
  // Friends
  "friends": "Choose friends wisely. They influence your future.",
  "party": "Party party... when will you be serious about life?",
  
  // Common phrases
  "whatever": "Whatever means you don't respect elders.",
  "boring": "Life is not entertainment channel. Find meaning in simple things.",
  "busy": "Busy in phone or busy in studies? There is difference.",
  
  // Emotional
  "sad": "Sad why? Count your blessings beta.",
  "happy": "Good. Happiness comes from within, not from outside things.",
  "angry": "Anger will not solve anything. Take deep breath.",
  
  // Default transformations for common words
  "you": "you (remember to respect elders)",
  "me": "me (think about family too)",
  "why": "why (everything happens for a reason)",
  "how": "how (with proper planning and hard work)",
  "what": "what (think before you speak)",

   // Emotions & Moods
   "stressed": "Stress is part of life, beta. Handle it with grace.",
   "depressed": "Don’t use such big words. Go take a walk and talk to someone.",
   "anxious": "Meditation helps. Also, stop scrolling the phone all the time.",
   "bored": "When we were kids, we found joy even in a stick and a stone.",
   
   // Relationships & Friends
   "girlfriend": "First focus on career, beta. Girlfriend can wait.",
   "boyfriend": "Beta, don’t get distracted. Studies first.",
   "breakup": "Breakup? This is why papa told you not to waste time.",
   "best friend": "Best friend or not, don’t follow blindly.",
   
   // Slang/Modern expressions
   "lol": "Laughing like this? Go study something useful.",
   "bruh": "Bruh? What kind of language is this?",
   "lmao": "Better laugh less and read more.",
   "omg": "Stop with this drama. Face things calmly.",
   
   // Work or college stress
   "internship": "Do properly. This builds your career foundation.",
   "presentation": "Practice in front of mirror. Confidence will come.",
   "assignment": "Don’t wait till the last minute like always.",
   "project": "Keep your team in line. Leadership starts now.",
   
   // Health & Fitness
   "gym": "Good, but don’t forget brain needs exercise too.",
   "diet": "Just eat what your mother makes. That’s the best diet.",
   "sleepy": "Don’t use phone at night. Then you won’t feel sleepy.",
   "sick": "Did you drink cold water again after sweating?",
   
   // Festive/Events
   "birthday": "Another year older. More responsible now, okay?",
   "vacation": "After exams. Not before.",
   "wedding": "Is it necessary to go? What about studies?",
   
   // Career & Future
   "startup": "Startup? First get experience. Don’t jump blindly.",
   "entrepreneur": "Big words. Do small things right first.",
   "interview": "Be honest and confident. Dress properly also.",
   "promotion": "Good. But don’t let it go to your head.",
   
   // Tech/Trends
   "reels": "This Instagram has spoiled the generation.",
   "tiktok": "Chinese app, beta. Stay away.",
   "ai": "AI or not, common sense is most important.",
   "coding": "Good. Learn something useful like Java or C.",
   
   // Time wasting
   "chilling": "Chilling or wasting time?",
   "scrolling": "Put phone down. Open book instead.",
   "binge": "Watch one episode, not whole season.",
   
   // Fashion/Looks
   "haircut": "Why like this? Proper haircut looks better.",
   "tattoo": "Tattoo? What will society say?",
   "piercing": "Piercing? You're not in some rock band.",
   
   // Expressions of independence
   "my life": "Yes, but remember, your life affects the whole family.",
   "i know": "Knowing is not enough. Doing matters.",
   "don’t worry": "Papa will always worry, beta. That’s his job.",

   "I got a job for 50LPA": "50LPA? That's good, but my son is earning 150k dollars in US.",  
   "exam": "My Rohan already finished his syllabus twice. You kids these days!",
   "job": "Oh, you’re still looking? My Priya got 3 offers before graduation.",
   "college": "Which college? Haan... Riya got into IIT, you know.",
   "marks": "Only 80%? You know Rohan got 98.5% in the same subject!",
   "promotion": "Very good, beta... but Riya got promoted to manager last month only.",
 
   // Nosiness
   "boyfriend": "Boyfriend? Aiyyo! Does your mother know??",
   "girlfriend": "Ohho... does she cook well at least?",
   "where are you": "Out again? Whom are you meeting ah? Tell me na!",
   "going out": "With friends or *someone special*? 👀",
   "party": "Another party? Is it a birthday or breakup this time?",
 
   // Drama
   "tired": "Tired? Beta, you’re young! Try managing house, kids, husband, then say tired.",
   "sleeping": "Still sleeping?? My children wake up by 5 to study yoga and coding.",
   "breakup": "Breakup? Aiyyo, this is why we say no love until marriage!",
   "broke": "No money? See, I told your mummy — children these days waste everything!",
   "hungry": "You’re hungry? So thin already! Come home, I’ll feed you till you roll.",
 
   // Boastfulness
   "travel": "Oh you're going to Goa? We just came back from Switzerland!",
   "shopping": "Shopping again? I buy only in Dubai — better deals you know.",
   "gym": "Gym? I stay slim without all this nonsense.",
   "diet": "Keto? Paleo? My figure is from home food only, no diet needed.",
   "instagram": "Oh I saw your photo... very nice filter. But beta, real beauty doesn’t need it.",
 
   // General snark
   "pizza": "Pizza? My kids eat only homemade quinoa khichdi.",
   "friends": "Too many friends is never good. Keep distance also.",
   "tattoo": "Tattoo?? What will you do when skin starts sagging?",
   "sleep": "Sleep early beta, not like my neighbor’s daughter who’s always on mobile.",
   "phone": "Always on phone! Will you marry your mobile or what?",

  // Comparison & Boasting
  "interview": "In my day, we had 1 position and 500 people — and I got it!",
  "college": "I got rank 23 in my state. Back then, competition was real.",
  "exam": "We studied under street lights. And look where I am now!",
  "travel": "You went to Pondicherry? I did Europe tour in 2001 itself.",
  "gym": "Fitness is important. I still walk 5km daily, even at this age.",
  
  // Unsolicited Opinions
  "relationship": "Focus on career now. Relationships can wait.",
  "love": "Love happens naturally. But degree first, marriage later.",
  "friends": "Choose friends who push you forward. Not chai-sutta gang.",
  "sleep": "Sleep 6 hours. Not 10 like your generation does.",
  "phone": "Reduce screen time. I read newspapers, not scroll reels.",
  
  // Olden days nostalgia
  "movie": "These days it’s all graphics. In our time, real acting happened.",
  "music": "Arijit is good, but have you heard Kishore Kumar live?",
  "party": "Parties? We used to enjoy just playing cards and eating bhel.",

};

const getAIResponse = async (text, persona = 'dad') => {
  console.log(text,'text');
  if (!process.env.ANTHROPIC_API_KEY) {
    return null;
  }

  const prompts = {
    dad: `You are a typical Indian dad responding to your child's message . Your responses should be in a tamil accent:
- Practical and slightly dramatic
- Include life advice even for simple messages
- Mix English with occasional Hindi words (beta, haan, etc.)
- Show concern but also mild exasperation
- Reference your own generation ("When I was your age...")
- End with wisdom or concern for their future

Child's message: "${text}"

Respond as an Indian dad would (1-2 sentences max):`,
    
    mom: `You are a typical Indian mom responding to your child's message. Your responses should be in a tamil accent:
- Very caring and nurturing
- Always worried about food, health, and safety
- Use terms like "beta", "baccha"
- Ask follow-up questions about eating, sleeping
- Give motherly advice

Child's message: "${text}"

Respond as an Indian mom would (1-2 sentences max):`,
    
    uncle: `You are a typical Indian uncle responding to your nephew/niece. Your responses should be in a tamil accent:
- Share stories from your time
- Give unsolicited career advice
- Be slightly more relaxed than parents but still advisory
- Reference your achievements or experiences

Child's message: "${text}"

Respond as an Indian uncle would (1-2 sentences max):`,

    aunty: `You are a typical Indian aunty responding to your niece/nephew. Your responses should be in a tamil accent:
- Compare everything to her own children
- Be extremely nosy and dramatic
- Make everything about herself
- Show off and boast subtly

Child's message: "${text}"

Respond as an Indian aunty would (1-2 sentences max):`

  };

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `Context: You are transforming casual messages into responses typical of Indian family members. Keep responses natural, caring but slightly dramatic, and culturally appropriate.

${prompts[persona] || prompts.dad}`
        }
      ]
    });
 console.log(response,'response');
    return response.content[0].text.trim();
  } catch (error) {
    console.error('Claude API error:', error);
    return null;
  }
};

const transformText = (text) => {
  const lowerText = text.toLowerCase();
  
  // Sort keys by length (longest first) to match longer phrases before shorter ones
  const sortedKeys = Object.keys(indianDadTransformations).sort((a, b) => b.length - a.length);
  
  // Check for phrase matches with word boundaries for single words
  for (const key of sortedKeys) {
    if (key.includes(' ')) {
      // Multi-word phrases - use simple includes
      if (lowerText.includes(key)) {
        return indianDadTransformations[key];
      }
    } else {
      // Single words - use word boundaries to avoid partial matches
      const regex = new RegExp('\\b' + key + '\\b', 'i');
      if (regex.test(lowerText)) {
        return indianDadTransformations[key];
      }
    }
  }
  
  // If no match found, return a generic Indian dad response
  const genericResponses = [
    "Hmm, think about it properly.",
    "This is for your own good, beta.",
    "When you grow up, you'll understand.",
    "Papa knows what's best for you.",
    "We have seen more life than you.",
    "Listen to your elders, beta."
  ];
  
  const randomResponse = genericResponses[Math.floor(Math.random() * genericResponses.length)];
  return randomResponse;
};

app.post('/api/transform', async (req, res) => {
  const { text, useAI = false, persona = 'dad' } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  
  let transformedText;
  let isAI = false;
  
  if (useAI && process.env.ANTHROPIC_API_KEY) {
    console.log(text,'text');
    const aiResponse = await getAIResponse(text, persona);
    if (aiResponse) {
      transformedText = aiResponse;
      isAI = true;
    } else {
      transformedText = transformText(text);
    }
  } else {
    transformedText = transformText(text);
  }
  
  res.json({
    original: text,
    transformed: transformedText,
    isAI,
    persona: persona || 'dad'
  });
});

app.get('/api/suggestions', (req, res) => {
  const suggestions = Object.keys(indianDadTransformations).slice(0, 10);
  res.json({ suggestions });
});

app.get('/api/personas', (req, res) => {
  const personas = [
    { id: 'dad', name: '👨 Indian Dad', description: 'Practical advice with mild exasperation' },
    { id: 'mom', name: '👩 Indian Mom', description: 'Caring and nurturing, always worried' },
    { id: 'uncle', name: '👨‍🦳 Indian Uncle', description: 'Stories from the past with career advice' },
    { id: 'aunty', name: '👩‍🦳 Indian Aunty', description: 'Compares you to her own children, being extremely nosy, self-centered, and creates a lot of drama' },
  ];
  res.json({ personas });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    aiEnabled: !!process.env.ANTHROPIC_API_KEY,
    aiProvider: process.env.ANTHROPIC_API_KEY ? 'Claude' : 'None',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
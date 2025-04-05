const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google GenAI with API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Helper function to parse AI response (improved for markdown)
function parseAIResponse(markdownText) {
  try {
    console.log("Raw Gemini response:", markdownText); // Log the raw response for debugging
    
    // Common patterns in markdown responses
    const headingPattern = /#+\s+(.+)/g;
    const listItemPattern = /[-*]\s+(.+)/g;
    const numberedListPattern = /\d+\.\s+(.+)/g;
    
    // Find sections by headers
    const sections = {};
    let currentSection = null;
    let currentContent = [];
    
    // Split the markdown into lines
    const lines = markdownText.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check if this line is a heading
      const headingMatch = line.match(/^#+\s+(.+)$/);
      if (headingMatch) {
        // If we were building a previous section, save it
        if (currentSection && currentContent.length > 0) {
          sections[currentSection.toLowerCase()] = currentContent.join('\n');
          currentContent = [];
        }
        
        currentSection = headingMatch[1].trim();
        continue;
      }
      
      // If we have a current section, add this line to its content
      if (currentSection) {
        currentContent.push(line);
      }
    }
    
    // Save the last section if there is one
    if (currentSection && currentContent.length > 0) {
      sections[currentSection.toLowerCase()] = currentContent.join('\n');
    }
    
    console.log("Parsed sections:", Object.keys(sections)); // Log the identified sections
    
    // Function to extract list items from a section
    function extractListItems(sectionContent) {
      const items = [];
      const lines = sectionContent.split('\n');
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        const bulletMatch = trimmedLine.match(/^[-*]\s+(.+)$/);
        const numberMatch = trimmedLine.match(/^\d+\.\s+(.+)$/);
        
        if (bulletMatch) {
          items.push(bulletMatch[1].trim());
        } else if (numberMatch) {
          items.push(numberMatch[1].trim());
        }
      }
      
      return items.filter(item => item.length > 0);
    }
    
    // Function to find a section by checking variations of the key
    function findSection(possibleKeys) {
      for (const key of possibleKeys) {
        const matchingKey = Object.keys(sections).find(k => 
          k.toLowerCase().includes(key.toLowerCase())
        );
        if (matchingKey) {
          return sections[matchingKey];
        }
      }
      return null;
    }
    
    // Extract overview
    const overviewContent = findSection(['overview', 'introduction', 'about']) || "";
    const overview = overviewContent.split('\n').filter(line => line.trim().length > 0).join(' ');
    
    // Extract things to do
    const thingsToDoContent = findSection(['things to do', 'attractions', 'activities', 'what to do']);
    const thingsToDo = thingsToDoContent ? extractListItems(thingsToDoContent) : [];
    
    // Extract best time to visit
    const timeContent = findSection(['best time', 'when to visit', 'seasons']);
    const bestTimeToVisit = timeContent ? timeContent.split('\n').filter(line => line.trim().length > 0).join(' ') : "Information not available";
    
    // Extract cost analysis
    const costContent = findSection(['cost', 'budget', 'expenses', 'pricing']);
    let budget = "Information not available";
    let moderate = "Information not available";
    let luxury = "Information not available";
    
    if (costContent) {
      const budgetMatch = costContent.match(/\b(?:budget|economy|cheap|low-cost)(?:[^:]*):?\s*([^,\n.]+)/i);
      const moderateMatch = costContent.match(/\b(?:moderate|mid-range|standard|mid-budget)(?:[^:]*):?\s*([^,\n.]+)/i);
      const luxuryMatch = costContent.match(/\b(?:luxury|high-end|premium|expensive)(?:[^:]*):?\s*([^,\n.]+)/i);
      
      budget = budgetMatch ? budgetMatch[1].trim() : budget;
      moderate = moderateMatch ? moderateMatch[1].trim() : moderate;
      luxury = luxuryMatch ? luxuryMatch[1].trim() : luxury;
    }
    
    // Extract local culture
    const cultureContent = findSection(['local culture', 'culture', 'traditions', 'customs']);
    const localCulture = cultureContent ? cultureContent.split('\n').filter(line => line.trim().length > 0).join(' ') : "Information not available";
    
    // Extract travel tips
    const tipsContent = findSection(['travel tips', 'tips', 'advice', 'recommendations']);
    const travelTips = tipsContent ? extractListItems(tipsContent) : [];
    
    return {
      overview: overview || "Information not available",
      thingsToDo: thingsToDo.length ? thingsToDo : ["Information not available"],
      bestTimeToVisit,
      costAnalysis: {
        budget,
        moderate,
        luxury
      },
      localCulture,
      travelTips: travelTips.length ? travelTips : ["Information not available"]
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return {
      overview: "Failed to parse destination information.",
      thingsToDo: ["Information not available"],
      bestTimeToVisit: "Information not available",
      costAnalysis: {
        budget: "Information not available",
        moderate: "Information not available",
        luxury: "Information not available"
      },
      localCulture: "Information not available",
      travelTips: ["Information not available"]
    };
  }
}

// Route to get destination information
app.get('/api/destinations/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // You might want to fetch the destination name from a database using the id
    // For this example, we'll use the id as the destination name
    const destinationName = id.replace(/-/g, ' ');
    
    // Create the prompt - specifying markdown format
    const prompt = `Generate comprehensive travel information about ${destinationName} only about the following points, make sure each section is titled exactly as such:
      1. Brief overview
      2. Top things to do
      3. Best time to visit
      4. Cost analysis for different budgets (budget, moderate, luxury)
      5. Local culture insights
      6. Essential travel tips
      
      Format the response in markdown with clear section headers (## Section Name) and use bullet points or numbered lists for lists.`;

    // Use the newer API approach
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",  // or whichever model version you want to use
      contents: prompt,
    });
    
    // Extract the text
    const text = response.text;
    
    // Parse the AI response and structure it
    const parsedInfo = parseAIResponse(text);
    
    res.json({
      id,
      name: destinationName,
      ...parsedInfo
    });
  } catch (error) {
    console.error('Error generating destination info:', error);
    res.status(500).json({ error: 'Failed to generate destination information', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
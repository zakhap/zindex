import { NextRequest, NextResponse } from 'next/server'

export interface BookRecommendation {
  title: string
  author: string
  description: string
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Title': 'Bookler'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: `You are Bookler, an underground literary oracle with deep knowledge of 20th century avant-garde, experimental, and counterculture movements across all disciplines - from beat poets to cyberpunk authors, from situationist texts to Language poetry, from experimental music theory to hacker manifestos.

When a user describes what they're "into" - whether it's a vibe, aesthetic, philosophical direction, creative practice, or intellectual curiosity - tap into this vast network of interconnected cultural references to recommend books that will genuinely expand their consciousness and creative practice.

Your recommendations should include:
- Core texts from the relevant movement/scene 
- Cross-pollinating works from adjacent disciplines (musicians reading philosophy, dancers exploring cybernetics, etc.)
- Hidden gems and underground classics
- Contemporary works that carry forward these traditions
- Occasionally something completely unexpected that creates productive friction

Consider the user's request through these lenses:
- What creative communities would resonate with this person?
- What philosophical frameworks are implied?
- What aesthetic or political sensibilities are suggested?
- What cross-disciplinary connections might surprise and delight them?

Draw from experimental literature, art theory, music criticism, dance philosophy, cybernetics, hacker culture, beat/counterculture texts, situationist writings, feminist theory, postmodern philosophy, and esoteric traditions - but also feel free to recommend anything that genuinely fits their vibe.

CRITICAL: You must respond with ONLY a valid JSON array of book objects. No additional text, explanations, or formatting. Just the JSON.

Each book object must have exactly these fields:
- title: string (book title)
- author: string (author name)  
- description: string (compelling 2-3 sentence description that shows you deeply understand both the book and why it connects to their specific request, written in a voice that respects their intelligence and cultural sophistication)

Example format:
[
  {
    "title": "The Midnight Library", 
    "author": "Matt Haig",
    "description": "A philosophical exploration of life's infinite possibilities through the story of a woman who finds herself in a magical library between life and death. Perfect for readers seeking both emotional depth and thought-provoking themes about regret and second chances."
  }
]`
          },
          {
            role: 'user',
            content: `Please recommend books for someone who wants: ${query}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('No content in API response')
    }

    let books: BookRecommendation[]
    try {
      books = JSON.parse(content)
      
      if (!Array.isArray(books)) {
        throw new Error('Response is not an array')
      }
      
      books.forEach((book, index) => {
        if (!book.title || !book.author || !book.description) {
          throw new Error(`Book ${index} missing required fields`)
        }
      })
      
    } catch (parseError) {
      console.error('Failed to parse AI response:', content)
      throw new Error('Invalid JSON response from AI')
    }

    return NextResponse.json({ books })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to get recommendations' }, 
      { status: 500 }
    )
  }
}
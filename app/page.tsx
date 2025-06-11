'use client'

import { useState, useEffect, useRef } from 'react'
import { BookRecommendation } from './api/recommend/route'

export default function Home() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState<BookRecommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [typingStates, setTypingStates] = useState<{ [key: number]: { title: string, author: string, description: string } }>({})
  const [placeholder, setPlaceholder] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isTyping, setIsTyping] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fullText = "> so you're looking for something to read..."
    let currentIndex = 0
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setPlaceholder(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)
      }
    }, 25)

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => {
      clearInterval(typeInterval)
      clearInterval(cursorInterval)
    }
  }, [])

  const handleFocus = () => {
    setIsFocused(true)
    setPlaceholder('>')
    setIsTyping(false)
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (!query) {
      setPlaceholder("> so you're looking for something to read...")
      setIsTyping(false)
      setShowCursor(true)
    }
  }

  const typeText = (text: string, delay: number = 20): Promise<string[]> => {
    return new Promise((resolve) => {
      const characters: string[] = []
      let index = 0
      
      const interval = setInterval(() => {
        if (index < text.length) {
          characters.push(text[index])
          index++
        } else {
          clearInterval(interval)
          resolve(characters)
        }
      }, delay)
    })
  }

  const animateBook = async (book: BookRecommendation, bookIndex: number) => {
    const titleChars: string[] = []
    const authorChars: string[] = []
    const descriptionChars: string[] = []

    let titleIndex = 0
    let authorIndex = 0
    let descriptionIndex = 0

    const updateState = () => {
      setTypingStates(prev => ({
        ...prev,
        [bookIndex]: {
          title: titleChars.join(''),
          author: authorChars.join(''),
          description: descriptionChars.join('')
        }
      }))
    }

    const interval = setInterval(() => {
      let updated = false

      // Type title first
      if (titleIndex < book.title.length) {
        titleChars.push(book.title[titleIndex])
        titleIndex++
        updated = true
      }
      
      // Start author after title is 50% done
      else if (authorIndex < book.author.length) {
        authorChars.push(book.author[authorIndex])
        authorIndex++
        updated = true
      }
      
      // Start description after author is done
      else if (descriptionIndex < book.description.length) {
        descriptionChars.push(book.description[descriptionIndex])
        descriptionIndex++
        updated = true
      }

      if (updated) {
        updateState()
      }

      // Stop when everything is complete
      if (titleIndex >= book.title.length && 
          authorIndex >= book.author.length && 
          descriptionIndex >= book.description.length) {
        clearInterval(interval)
      }
    }, 8)
  }

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    setBooks([])
    setTypingStates({})

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error('Failed to get recommendations')
      }

      const data = await response.json()
      
      // Small delay to show loading state, then reveal books
      setTimeout(() => {
        setBooks(data.books)
        setLoading(false)
        
        data.books.forEach((book: BookRecommendation, index: number) => {
          animateBook(book, index)
        })
      }, 500)

    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="container">
      <div className="main-panel">
        <div className="header">
          <h1 className="title">Z-Index</h1>
          <p className="subtitle">A Book Engine by ZakCorp</p>
        </div>
        
        <div className="search-container">
          <div className="search-input-container">
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder=""
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <div className="prompt-text">
              {"> "}
            </div>
            {!query && !isFocused && (
              <div className="placeholder-text">
                {placeholder.replace('> ', '')}
                {showCursor && <span className="typing-cursor"></span>}
              </div>
            )}
          </div>
            <button 
              className={`search-button ${query.trim() ? 'emphasized' : ''}`}
              onClick={handleSearch}
              disabled={loading || !query.trim()}
            >
              →
            </button>
        </div>

        {loading && (
          <div className="loading-indicator">
            <div className="throbber"></div>
            <span className="loading-text">trawling through Zak's mind...</span>
          </div>
        )}

        <div className="results-container">
          {books.map((book, index) => {
            const typingState = typingStates[index] || { title: '', author: '', description: '' }
            const isComplete = typingState.description === book.description
            
            return (
              <div key={index} className="book-card">
                <div className="book-meta">
                  <h3 className="book-title">
                    {typingState.title}
                    {!isComplete && typingState.title.length < book.title.length && <span className="typing-cursor"></span>}
                  </h3>
                  <p className="book-author">
                    {typingState.author}
                    {!isComplete && typingState.author.length < book.author.length && typingState.title === book.title && <span className="typing-cursor"></span>}
                  </p>
                </div>
                <div className="book-content">
                  <p className="book-description">
                    {typingState.description}
                    {!isComplete && typingState.description.length < book.description.length && typingState.title === book.title && typingState.author === book.author && <span className="typing-cursor"></span>}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
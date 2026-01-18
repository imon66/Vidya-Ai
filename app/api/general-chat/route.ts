import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { API_KEYS, MODELS } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const { message, model, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    if (model === 'gemini') {
      // Gemini API Implementation
      const apiKey = API_KEYS.GEMINI_API_KEY
      if (!apiKey) {
        return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 })
      }

      try {
        const genAI = new GoogleGenerativeAI(apiKey)
        const geminiModel = genAI.getGenerativeModel({ model: MODELS.GEMINI })

        // Build conversation context
        let prompt = `You are Vidya AI, a helpful and knowledgeable assistant. You can help with various topics including coding, explanations, writing, and general questions.

User: ${message}
Assistant:`

        const result = await geminiModel.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        return NextResponse.json({ response: text })
      } catch (geminiError: any) {
        console.error('Gemini API Error:', geminiError)
        return NextResponse.json({ 
          error: `Gemini API Error: ${geminiError.message || 'Unknown error'}` 
        }, { status: 500 })
      }
    } 
    
    else if (model === 'groq') {
      // Groq API Implementation
      const apiKey = API_KEYS.GROQ_API_KEY
      if (!apiKey) {
        return NextResponse.json({ error: 'Groq API key not configured' }, { status: 500 })
      }

      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: MODELS.GROQ,
            messages: [
              {
                role: 'system',
                content: 'You are Vidya AI, a helpful and knowledgeable assistant. You can help with various topics including coding, explanations, writing, and general questions.'
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 1000,
            temperature: 0.7,
          }),
        })

        if (!response.ok) {
          const errorData = await response.text()
          console.error('Groq API Error Response:', errorData)
          throw new Error(`Groq API returned ${response.status}: ${errorData}`)
        }

        const data = await response.json()
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          throw new Error('Invalid response format from Groq API')
        }

        return NextResponse.json({ response: data.choices[0].message.content })
      } catch (groqError: any) {
        console.error('Groq API Error:', groqError)
        return NextResponse.json({ 
          error: `Groq API Error: ${groqError.message || 'Unknown error'}` 
        }, { status: 500 })
      }
    }

    else {
      return NextResponse.json({ error: 'Invalid model selected' }, { status: 400 })
    }

  } catch (error: any) {
    console.error('General API Error:', error)
    return NextResponse.json({ 
      error: `Server Error: ${error.message || 'Unknown error'}` 
    }, { status: 500 })
  }
}
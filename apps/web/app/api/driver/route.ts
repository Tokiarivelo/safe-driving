import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client'

export async function GET(request: NextRequest) {
  try {
    console.log('=== Début API Driver ===')
    
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })
    
    console.log('Token sub:', token?.sub)
    
    if (!token?.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const accessToken = token.accessToken || token.token;
    console.log('Access Token présent:', !!accessToken)

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token missing' }, { status: 401 })
    }

    const client = new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
      cache: new InMemoryCache(),
    })

    const SIMPLE_ME_QUERY = gql`
      query me {
        me {
          id
          firstName
          lastName
          email
          phone
          username
          images {
            id
            url
            type
          }
          Role {
            id
            name
          }
        }
      }
    `

    try {
      const result = await client.query({
        query: SIMPLE_ME_QUERY,
      })
      
      
      if (!result.data?.me) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      return NextResponse.json({
        user: {
          id: result.data.me.id,
          firstName: result.data.me.firstName,
          lastName: result.data.me.lastName,
          email: result.data.me.email,
          phone: result.data.me.phone || '',
        }
      })

    } catch (error) {
      console.error('Erreur avec requête simple:', error)
      
      if (error.networkError && error.networkError.result) {
        console.error('Détails erreur réseau:', error.networkError.result)
      }
      if (error.graphQLErrors) {
        console.error('Erreurs GraphQL:', error.graphQLErrors)
      }
      
      return NextResponse.json({
        error: 'GraphQL query failed',
        details: error.message
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Erreur générale API Driver:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error.message
      },
      { status: 500 }
    )
  }
}
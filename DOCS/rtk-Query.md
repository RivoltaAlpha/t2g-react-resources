# RTK Query - Complete Guide

## Table of Contents
1. [What Is RTK Query?](#what-is-rtk-query)
2. [Why Use RTK Query?](#why-use-rtk-query)
3. [Installation & Setup](#installation--setup)
4. [Core Concepts](#core-concepts)
5. [Creating Your First API](#creating-your-first-api)
6. [Using RTK Query in Components](#using-rtk-query-in-components)
7. [Advanced Features](#advanced-features)
8. [Best Practices](#best-practices)
9. [Common Patterns](#common-patterns)

---

## What Is RTK Query?

**RTK Query** is a powerful data fetching and caching tool built into Redux Toolkit. Think of it as a **smart assistant** that handles all your API calls, caching, loading states, and data synchronization automatically.

### The Problem It Solves

Without RTK Query, you'd need to:
```tsx
// ❌ The manual way (lots of boilerplate!)
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

useEffect(() => {
  setLoading(true)
  fetch('https://api.example.com/users')
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(err => setError(err))
    .finally(() => setLoading(false))
}, [])
```

With RTK Query:
```tsx
// ✅ The RTK Query way (so much simpler!)
const { data: users, isLoading, error } = useGetUsersQuery()
```

That's it! No manual loading states, no error handling boilerplate, automatic caching, and intelligent refetching.

---

## Why Use RTK Query?

### Key Benefits

✅ **Eliminates Boilerplate** - No more manual `useState`, `useEffect`, or loading state management  
✅ **Automatic Caching** - Data is cached and reused across components  
✅ **Smart Refetching** - Automatically refetches when data becomes stale  
✅ **Optimistic Updates** - Update UI immediately, sync with server later  
✅ **Auto-Generated Hooks** - Get React hooks for free from your API definitions  
✅ **Request Deduplication** - Multiple components requesting the same data? Only one network request  
✅ **Built-in DevTools** - Full visibility into requests, caching, and cache invalidation  

### Real-World Analogy

Imagine a **personal librarian**:
- You ask for a book (make a request)
- The librarian checks if they already have it (cache lookup)
- If not, they fetch it from storage (network request)
- They remember you borrowed it (caching)
- Next time you ask, they give it to you instantly (cache hit)
- If the book gets updated, they notify you (automatic refetching)

---

## Installation & Setup

RTK Query is included in `@reduxjs/toolkit` - no separate installation needed!

```bash
# If you haven't installed Redux Toolkit
npm install @reduxjs/toolkit react-redux

# Or with pnpm
pnpm install @reduxjs/toolkit react-redux
```

### Import Options

```typescript
// Generic entry point (for any framework)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

// React-specific entry point (automatically generates hooks!)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
```

**💡 Tip:** Always use the `/react` entry point for React apps to get auto-generated hooks!

---

## Core Concepts

### 1. API Slice

An **API slice** defines your entire API interface in one place. Think of it as your API contract.

```typescript
const api = createApi({
  reducerPath: 'api',           // Name for the Redux slice
  baseQuery: fetchBaseQuery(),  // How to make requests
  endpoints: (builder) => ({    // Your API endpoints
    // Define queries and mutations here
  })
})
```

### 2. Queries vs Mutations

| **Query** | **Mutation** |
|-----------|--------------|
| Fetches data (GET) | Modifies data (POST, PUT, DELETE) |
| Auto-cached | Not cached |
| Can be refetched | Executed on demand |
| `builder.query()` | `builder.mutation()` |
| Generates `useXQuery` hook | Generates `useXMutation` hook |

### 3. Cache Tags

**Tags** are like labels that tell RTK Query which data is related. When you invalidate a tag, all queries with that tag automatically refetch.

```typescript
// Query provides a tag
getUsers: builder.query({
  query: () => '/users',
  providesTags: ['Users']  // This query provides 'Users' data
})

// Mutation invalidates that tag
deleteUser: builder.mutation({
  query: (id) => ({ url: `/users/${id}`, method: 'DELETE' }),
  invalidatesTags: ['Users']  // This causes getUsers to refetch
})
```

**Think of it as:** "When I delete a user, tell all components showing user lists to refresh"

---

## Creating Your First API

### Step 1: Define the API Slice

```typescript
// services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.example.com',
  }),
  tagTypes: ['Posts', 'Users'],  // Define your cache tags
  endpoints: (builder) => ({
    // Endpoints will go here
  })
})
```

### Step 2: Add Endpoints

```typescript
// types/types.ts
export interface User {
  id: number
  name: string
  email: string
}

export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

// services/api.ts (continued)
export const api = createApi({
  // ... base config from above
  endpoints: (builder) => ({
    // GET request - Fetch all users
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['Users']
    }),

    // GET request - Fetch single user
    getUser: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }]
    }),

    // POST request - Create user
    createUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser
      }),
      invalidatesTags: ['Users']
    }),

    // PUT request - Update user
    updateUser: builder.mutation<User, { id: number; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }]
    }),

    // DELETE request - Delete user
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Users']
    })
  })
})

// Export auto-generated hooks
export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = api
```

### Step 3: Add API to Store

```typescript
// app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { api } from '../services/api'

export const store = configureStore({
  reducer: {
    // Add the API reducer
    [api.reducerPath]: api.reducer,
    // Your other reducers...
  },
  // Add the API middleware (enables caching, invalidation, polling, etc.)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### Step 4: Setup Listeners (Optional but Recommended)

```typescript
// app/store.ts (add this)
import { setupListeners } from '@reduxjs/toolkit/query'

// ... store configuration

// Enable refetchOnFocus and refetchOnReconnect behaviors
setupListeners(store.dispatch)
```

This enables:
- **refetchOnFocus**: Refetch when user returns to the tab
- **refetchOnReconnect**: Refetch when internet reconnects

---

## Using RTK Query in Components

### Query Hook (Fetching Data)

```tsx
import { useGetUsersQuery } from '../services/api'

function UsersList() {
  const { 
    data: users,           // The data returned from the API
    isLoading,            // True during first fetch
    isFetching,           // True during any fetch (including background)
    isSuccess,            // True when data is available
    isError,              // True if request failed
    error,                // Error object if request failed
    refetch               // Function to manually refetch
  } = useGetUsersQuery()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

### Query with Parameters

```tsx
function UserProfile({ userId }: { userId: number }) {
  const { data: user, isLoading } = useGetUserQuery(userId)

  if (isLoading) return <div>Loading user...</div>

  return (
    <div>
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  )
}
```

### Mutation Hook (Modifying Data)

```tsx
import { useCreateUserMutation } from '../services/api'

function CreateUserForm() {
  const [createUser, { isLoading, isSuccess, isError, error }] = useCreateUserMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      await createUser({
        name: formData.get('name') as string,
        email: formData.get('email') as string
      }).unwrap()  // .unwrap() throws on error, useful for try/catch
      
      alert('User created!')
    } catch (err) {
      console.error('Failed to create user:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create User'}
      </button>
      {isSuccess && <p>✅ User created successfully!</p>}
      {isError && <p>❌ Error: {error}</p>}
    </form>
  )
}
```

### Complete CRUD Example

```tsx
import { 
  useGetUsersQuery, 
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation 
} from '../services/api'

function UsersManager() {
  const { data: users, isLoading } = useGetUsersQuery()
  const [createUser] = useCreateUserMutation()
  const [updateUser] = useUpdateUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  const handleCreate = async () => {
    await createUser({ name: 'New User', email: 'new@example.com' })
  }

  const handleUpdate = async (id: number) => {
    await updateUser({ 
      id, 
      data: { name: 'Updated Name' } 
    })
  }

  const handleDelete = async (id: number) => {
    if (confirm('Delete this user?')) {
      await deleteUser(id)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <button onClick={handleCreate}>Add User</button>
      <ul>
        {users?.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleUpdate(user.id)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## Advanced Features

### 1. Authentication & Headers

```typescript
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.example.com',
    prepareHeaders: (headers, { getState }) => {
      // Get token from localStorage, Redux state, or cookies
      const token = localStorage.getItem('token')
      
      // Or from Redux state:
      // const token = (getState() as RootState).auth.token
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  // ... rest of config
})
```

### 2. Conditional Fetching

```tsx
function UserProfile({ userId }: { userId?: number }) {
  // Skip the query if userId is undefined
  const { data: user } = useGetUserQuery(userId!, {
    skip: !userId  // Don't fetch if no userId
  })

  if (!userId) return <div>Select a user</div>
  return <div>{user?.name}</div>
}
```

### 3. Polling (Auto-Refresh)

```tsx
function LiveUsersList() {
  const { data: users } = useGetUsersQuery(undefined, {
    pollingInterval: 5000  // Refetch every 5 seconds
  })

  return <ul>{users?.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}
```

### 4. Optimistic Updates

```typescript
updateUser: builder.mutation({
  query: ({ id, data }) => ({
    url: `/users/${id}`,
    method: 'PUT',
    body: data
  }),
  // Optimistically update cache before server responds
  async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
    // Update cache immediately
    const patchResult = dispatch(
      api.util.updateQueryData('getUsers', undefined, (draft) => {
        const user = draft.find(u => u.id === id)
        if (user) {
          Object.assign(user, data)
        }
      })
    )
    
    try {
      await queryFulfilled
    } catch {
      // Revert on error
      patchResult.undo()
    }
  }
})
```

### 5. Transforming Responses

```typescript
getUsers: builder.query<User[], void>({
  query: () => '/users',
  // Transform the response before caching
  transformResponse: (response: { data: User[] }) => {
    // Extract data from nested response
    return response.data
  },
  // Transform error before returning
  transformErrorResponse: (response: { status: number }) => {
    return `Error ${response.status}: Failed to fetch users`
  }
})
```

### 6. Advanced Cache Tagging

```typescript
tagTypes: ['Users'],
endpoints: (builder) => ({
  getUsers: builder.query<User[], void>({
    query: () => '/users',
    // Provide tags for each user + a general 'Users' tag
    providesTags: (result) =>
      result
        ? [
            ...result.map(({ id }) => ({ type: 'Users' as const, id })),
            { type: 'Users', id: 'LIST' }
          ]
        : [{ type: 'Users', id: 'LIST' }]
  }),
  
  updateUser: builder.mutation({
    query: ({ id, data }) => ({
      url: `/users/${id}`,
      method: 'PUT',
      body: data
    }),
    // Only invalidate the specific user and the list
    invalidatesTags: (result, error, { id }) => [
      { type: 'Users', id },
      { type: 'Users', id: 'LIST' }
    ]
  })
})
```

### 7. Manual Cache Updates

```tsx
function UserActions() {
  const [deleteUser] = useDeleteUserMutation()

  const handleDelete = async (userId: number) => {
    await deleteUser(userId)
    
    // Manually update cache to remove user immediately
    dispatch(
      api.util.updateQueryData('getUsers', undefined, (draft) => {
        return draft.filter(user => user.id !== userId)
      })
    )
  }

  return <button onClick={() => handleDelete(1)}>Delete User 1</button>
}
```

---

## Best Practices

### 1. **One API Slice Per Base URL**

```typescript
// ✅ Good - One API per backend service
export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com' })
})

export const analyticsApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://analytics.example.com' })
})

// ❌ Avoid - Multiple base URLs in one API
```

### 2. **Use TypeScript**

Always type your requests and responses:

```typescript
interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: User
}

login: builder.mutation<LoginResponse, LoginRequest>({
  query: (credentials) => ({
    url: '/login',
    method: 'POST',
    body: credentials
  })
})
```

### 3. **Organize Endpoints by Feature**

```typescript
// Instead of one giant API file, use injectEndpoints:

// services/api.ts (base)
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com' }),
  tagTypes: ['Users', 'Posts', 'Comments'],
  endpoints: () => ({})  // Empty initially
})

// services/users.ts
export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({ /* ... */ }),
    createUser: builder.mutation({ /* ... */ })
  })
})

// services/posts.ts
export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({ /* ... */ }),
    createPost: builder.mutation({ /* ... */ })
  })
})
```

### 4. **Handle Loading States Properly**

```tsx
const { data, isLoading, isFetching, isSuccess } = useGetUsersQuery()

// isLoading: true only on first fetch
// isFetching: true on any fetch (including background refetches)
// isSuccess: true when data is available

if (isLoading) return <Spinner />  // First load
if (!data) return null
return (
  <div>
    {isFetching && <RefreshIndicator />}  {/* Background refresh */}
    <UsersList users={data} />
  </div>
)
```

### 5. **Error Handling**

```tsx
const { data, error, isError } = useGetUsersQuery()

if (isError) {
  if ('status' in error) {
    // FetchBaseQueryError
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
    return <div>Error: {errMsg}</div>
  } else {
    // SerializedError
    return <div>Error: {error.message}</div>
  }
}
```

### 6. **Use RTK Query DevTools**

Install Redux DevTools Extension to see:
- All API requests
- Cache state
- Request timings
- Cache invalidations
- Refetching behavior

---

## Common Patterns

### Pattern 1: Master-Detail View

```tsx
function UsersPage() {
  const [selectedId, setSelectedId] = useState<number>()
  const { data: users } = useGetUsersQuery()
  const { data: selectedUser } = useGetUserQuery(selectedId!, {
    skip: !selectedId
  })

  return (
    <div style={{ display: 'flex' }}>
      <div>
        {users?.map(user => (
          <div key={user.id} onClick={() => setSelectedId(user.id)}>
            {user.name}
          </div>
        ))}
      </div>
      <div>
        {selectedUser && (
          <UserDetails user={selectedUser} />
        )}
      </div>
    </div>
  )
}
```

### Pattern 2: Dependent Queries

```tsx
function UserPosts({ userId }: { userId: number }) {
  // First get the user
  const { data: user } = useGetUserQuery(userId)
  
  // Then get their posts (skip until we have user)
  const { data: posts } = useGetPostsQuery(user?.id!, {
    skip: !user
  })

  return <div>{posts?.length} posts</div>
}
```

### Pattern 3: Infinite Scroll / Pagination

```typescript
getPosts: builder.query<Post[], { page: number; limit: number }>({
  query: ({ page, limit }) => `/posts?page=${page}&limit=${limit}`,
  // Merge pages together
  serializeQueryArgs: ({ endpointName }) => endpointName,
  merge: (currentCache, newItems) => {
    currentCache.push(...newItems)
  },
  forceRefetch({ currentArg, previousArg }) {
    return currentArg?.page !== previousArg?.page
  }
})
```

### Pattern 4: Prefetching

```tsx
import { api } from '../services/api'
import { useAppDispatch } from '../app/hooks'

function UserListItem({ user }: { user: User }) {
  const dispatch = useAppDispatch()

  // Prefetch user details on hover
  const prefetchUser = () => {
    dispatch(api.util.prefetch('getUser', user.id, { force: false }))
  }

  return (
    <div onMouseEnter={prefetchUser}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </div>
  )
}
```

---

## Real-World Example: Complete API Setup

```typescript
// services/usersApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

interface CreateUserRequest {
  name: string
  email: string
  password: string
}

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.example.com',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    // GET /users - Fetch all users
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LIST' }
            ]
          : [{ type: 'Users', id: 'LIST' }]
    }),

    // GET /users/:id - Fetch single user
    getUser: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }]
    }),

    // POST /users - Create user
    createUser: builder.mutation<User, CreateUserRequest>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),

    // PUT /users/:id - Update user
    updateUser: builder.mutation<User, { id: number; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Users', id },
        { type: 'Users', id: 'LIST' }
      ]
    }),

    // DELETE /users/:id - Delete user
    deleteUser: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Users', id },
        { type: 'Users', id: 'LIST' }
      ]
    })
  })
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersAPI

export default usersAPI
```

---

## Summary

RTK Query eliminates data fetching boilerplate by providing:

✅ **Automatic caching** - No manual cache management  
✅ **Auto-generated hooks** - Just define endpoints, get hooks for free  
✅ **Smart refetching** - Data updates when it should  
✅ **Loading & error states** - Built-in, no manual tracking  
✅ **Request deduplication** - One request, many components  
✅ **Optimistic updates** - Update UI instantly  
✅ **DevTools integration** - Full visibility into requests  

### Quick Decision Guide

**Use RTK Query when:**
- Fetching data from REST APIs
- Need automatic caching
- Want to eliminate boilerplate
- Building a React app

**Consider alternatives when:**
- Using GraphQL (use Apollo/urql instead)
- Need streaming data (use WebSockets)
- Very simple apps (plain fetch might be enough)

---

## Resources

- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [RTK Query Quick Start](https://redux-toolkit.js.org/tutorials/rtk-query)
- [RTK Query Examples](https://github.com/reduxjs/redux-toolkit/tree/master/examples)
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)

---

**Pro Tip:** Start simple with basic queries and mutations, then gradually add advanced features like optimistic updates and cache manipulation as needed!
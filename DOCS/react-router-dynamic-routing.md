# React Router Dynamic Routing - Complete Guide

## What is Dynamic Routing?

Dynamic routing allows you to create routes with variable segments that can match multiple URLs with a similar pattern. Instead of defining a separate route for each possible URL, you use route parameters to capture dynamic values.

### Example:
```
/users/1       → User with ID 1
/users/2       → User with ID 2
/users/john    → User with username "john"
/products/123  → Product with ID 123
```

All these can be handled by a single route pattern: `/users/:id` or `/products/:productId`

---

## How React Router Handles Dynamic Routing

### 1. **Route Parameters (URL Params)**

Route parameters are defined using a colon (`:`) prefix in the route path.

```typescript
// Route Definition
<Route path="/users/:userId" element={<UserProfile />} />
<Route path="/products/:productId" element={<ProductDetail />} />
<Route path="/blog/:category/:postId" element={<BlogPost />} />
```

### 2. **Accessing Parameters with `useParams`**

Inside your component, use the `useParams` hook to access the dynamic values:

```typescript
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  
  return <div>User ID: {userId}</div>;
}
```

### 3. **TypeScript with useParams**

For type safety, define an interface for your parameters:

```typescript
interface UserParams {
  userId: string;
}

function UserProfile() {
  const { userId } = useParams<UserParams>();
  // userId is typed as string | undefined
  
  return <div>User ID: {userId}</div>;
}
```

---

## Types of Dynamic Routing

### 1. **Single Parameter Routes**

```typescript
// Route
<Route path="/users/:userId" element={<UserProfile />} />

// Component
function UserProfile() {
  const { userId } = useParams();
  
  // URL: /users/123
  // userId = "123"
  
  return <div>Viewing user {userId}</div>;
}
```

### 2. **Multiple Parameters**

```typescript
// Route
<Route path="/blog/:category/:postId" element={<BlogPost />} />

// Component
function BlogPost() {
  const { category, postId } = useParams();
  
  // URL: /blog/recipes/healthy-chai
  // category = "recipes"
  // postId = "healthy-chai"
  
  return (
    <div>
      <p>Category: {category}</p>
      <p>Post: {postId}</p>
    </div>
  );
}
```

### 3. **Optional Parameters**

Use a question mark (`?`) to make a parameter optional:

```typescript
// Route
<Route path="/products/:category?/:productId" element={<Product />} />

// This matches both:
// /products/123
// /products/electronics/123

function Product() {
  const { category, productId } = useParams();
  
  // If URL is /products/123:
  // category = undefined
  // productId = "123"
  
  // If URL is /products/electronics/123:
  // category = "electronics"
  // productId = "123"
}
```

### 4. **Wildcard Routes (Catch-All)**

Use an asterisk (`*`) to match any remaining path segments:

```typescript
// Route
<Route path="/docs/*" element={<Documentation />} />

// This matches:
// /docs/getting-started
// /docs/api/endpoints
// /docs/guides/authentication/jwt
```

To access the wildcard value, use `useParams` with `*`:

```typescript
function Documentation() {
  const { "*": splat } = useParams();
  
  // URL: /docs/guides/authentication
  // splat = "guides/authentication"
}
```

---

## Advanced Dynamic Routing Patterns

### 1. **Nested Dynamic Routes**

```typescript
<Route path="/users/:userId" element={<UserLayout />}>
  <Route index element={<UserProfile />} />
  <Route path="posts" element={<UserPosts />} />
  <Route path="posts/:postId" element={<UserPostDetail />} />
  <Route path="settings" element={<UserSettings />} />
</Route>

// UserLayout.tsx
function UserLayout() {
  const { userId } = useParams();
  
  return (
    <div>
      <h1>User {userId}</h1>
      <nav>
        <Link to={`/users/${userId}`}>Profile</Link>
        <Link to={`/users/${userId}/posts`}>Posts</Link>
        <Link to={`/users/${userId}/settings`}>Settings</Link>
      </nav>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}

// UserPostDetail.tsx
function UserPostDetail() {
  const { userId, postId } = useParams();
  
  // URL: /users/123/posts/456
  // userId = "123"
  // postId = "456"
}
```

### 2. **Programmatic Navigation with Dynamic Routes**

```typescript
import { useNavigate, useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const goToSettings = () => {
    navigate(`/users/${userId}/settings`);
  };
  
  const goToPost = (postId: string) => {
    navigate(`/users/${userId}/posts/${postId}`);
  };
  
  return (
    <div>
      <button onClick={goToSettings}>Edit Settings</button>
      <button onClick={() => goToPost('123')}>View Post 123</button>
    </div>
  );
}
```

### 3. **Dynamic Routes with Data Fetching**

```typescript
function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (userId) {
      fetchUser();
    }
  }, [userId]); // Re-fetch when userId changes
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return <div>Welcome, {user.name}!</div>;
}
```

### 4. **Route Constraints and Validation**

React Router doesn't have built-in route constraints, but you can validate params in your component:

```typescript
function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Validate that userId is a number
    if (userId && !/^\d+$/.test(userId)) {
      navigate('/404', { replace: true });
    }
  }, [userId, navigate]);
  
  // Or use a guard pattern
  if (!userId || !/^\d+$/.test(userId)) {
    return <Navigate to="/404" replace />;
  }
  
  return <div>User ID: {userId}</div>;
}
```

---

## Real-World Example: Blog System

```typescript
// App.tsx
function App() {
  return (
    <Routes>
      {/* Static routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      
      {/* Dynamic routes */}
      <Route path="/blog" element={<BlogLayout />}>
        <Route index element={<BlogList />} />
        <Route path=":postSlug" element={<BlogPost />} />
        <Route path="category/:categoryName" element={<CategoryPosts />} />
        <Route path="author/:authorId" element={<AuthorPosts />} />
        <Route path="tag/:tagName" element={<TagPosts />} />
      </Route>
      
      {/* User routes */}
      <Route path="/users/:userId" element={<UserProfile />} />
      
      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// BlogPost.tsx - Single post
function BlogPost() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    // Fetch post by slug
    fetchPost(postSlug).then(setPost);
  }, [postSlug]);
  
  if (!post) return <div>Loading...</div>;
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>By <Link to={`/blog/author/${post.authorId}`}>{post.author}</Link></p>
      <div>{post.content}</div>
      <div>
        Tags: {post.tags.map(tag => (
          <Link key={tag} to={`/blog/tag/${tag}`}>{tag}</Link>
        ))}
      </div>
    </article>
  );
}

// CategoryPosts.tsx - Posts by category
function CategoryPosts() {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetchPostsByCategory(categoryName).then(setPosts);
  }, [categoryName]);
  
  return (
    <div>
      <h1>Posts in {categoryName}</h1>
      {posts.map(post => (
        <Link key={post.id} to={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      ))}
    </div>
  );
}
```

---

## Common Patterns and Best Practices

### 1. **URL-Friendly Parameters**

Use slugs instead of IDs for better SEO:

```typescript
// Good: /blog/kenyan-chai-recipe
// Bad: /blog/123

// Generate slug from title
const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
```

### 2. **Handling 404s for Invalid Params**

```typescript
function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);
  
  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .catch(() => setNotFound(true));
  }, [userId]);
  
  if (notFound) return <Navigate to="/404" replace />;
  if (!user) return <div>Loading...</div>;
  
  return <div>{user.name}</div>;
}
```

### 3. **Preserving Query Params**

```typescript
function ProductList() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort');
  
  // URL: /products/electronics?sort=price
  // category = "electronics"
  // sortBy = "price"
  
  return (
    <div>
      <h1>Products in {category}</h1>
      <p>Sorted by: {sortBy}</p>
    </div>
  );
}
```

### 4. **Type-Safe Route Definitions**

```typescript
// Define your routes with types
const ROUTES = {
  USER_PROFILE: (userId: string) => `/users/${userId}`,
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  CATEGORY: (category: string) => `/blog/category/${category}`,
} as const;

// Usage
<Link to={ROUTES.USER_PROFILE('123')}>User Profile</Link>
<Link to={ROUTES.BLOG_POST('chai-recipe')}>Blog Post</Link>

navigate(ROUTES.CATEGORY('recipes'));
```

---

## Performance Considerations

### 1. **Memoize Expensive Operations**

```typescript
function UserProfile() {
  const { userId } = useParams();
  
  // Expensive computation based on userId
  const processedData = useMemo(() => {
    return expensiveOperation(userId);
  }, [userId]);
  
  return <div>{processedData}</div>;
}
```

### 2. **Debounce Route Changes**

When implementing search or filters:

```typescript
function SearchResults() {
  const { query } = useParams();
  const [debouncedQuery] = useDebounce(query, 300);
  
  useEffect(() => {
    if (debouncedQuery) {
      fetchResults(debouncedQuery);
    }
  }, [debouncedQuery]);
}
```

---

## Common Pitfalls

### ❌ **Don't do this:**

```typescript
// Bad: Hard-coded route strings scattered everywhere
navigate('/users/' + userId + '/posts/' + postId);
```

### ✅ **Do this instead:**

```typescript
// Good: Centralized route definitions
const ROUTES = {
  USER_POST: (userId: string, postId: string) => `/users/${userId}/posts/${postId}`
};

navigate(ROUTES.USER_POST(userId, postId));
```

### ❌ **Don't do this:**

```typescript
// Bad: Not handling undefined params
function UserProfile() {
  const { userId } = useParams();
  return <div>User: {userId.toUpperCase()}</div>; // Error if userId is undefined
}
```

### ✅ **Do this instead:**

```typescript
// Good: Handle undefined cases
function UserProfile() {
  const { userId } = useParams();
  
  if (!userId) {
    return <Navigate to="/404" replace />;
  }
  
  return <div>User: {userId.toUpperCase()}</div>;
}
```

---

## Integration with KenyanTea Project

Your existing KenyanTea project already uses dynamic routing for blog posts:

```typescript
// Current implementation
<Route path="/blogs/:id" element={<BlogPostPage />} />

function BlogPostPage() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id || '0'));
  
  if (!post) {
    return <Navigate to="/404" replace />;
  }
  
  return <article>{/* post content */}</article>;
}
```

### Potential Enhancements:

1. **Use slugs instead of IDs:**
```typescript
<Route path="/blogs/:slug" element={<BlogPostPage />} />

// URL: /blogs/perfect-kenyan-chai-recipe
```

2. **Add category filtering:**
```typescript
<Route path="/blogs/category/:category" element={<CategoryBlogs />} />

// URL: /blogs/category/recipes
```

3. **Add author pages:**
```typescript
<Route path="/blogs/author/:authorName" element={<AuthorBlogs />} />

// URL: /blogs/author/wanjiku-mwangi
```

---

## Summary

**Dynamic routing in React Router works by:**

1. **Defining route patterns** with parameters using `:paramName` syntax
2. **Matching URLs** against these patterns at runtime
3. **Extracting parameter values** from the URL
4. **Providing access** to these values via the `useParams` hook
5. **Re-rendering components** when parameters change

**Key benefits:**
- Single component handles multiple similar routes
- Clean, maintainable code
- SEO-friendly URLs
- Easy navigation between related resources
- Type-safe with TypeScript

**Remember:**
- Parameters are always strings
- Handle undefined/invalid parameters
- Use slugs for better SEO
- Centralize route definitions
- Consider nesting for complex hierarchies
# Frontend Architecture

## Technology Stack

- **Framework**: Angular 17
- **Architecture**: Standalone components
- **HTTP Client**: Angular HttpClient
- **Styling**: SCSS
- **Testing**: Jasmine/Karma

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Root component
│   │   ├── app.config.ts          # Application configuration
│   │   ├── app.routes.ts          # Route definitions
│   │   ├── items/
│   │   │   ├── items.component.ts
│   │   │   ├── items.component.html
│   │   │   ├── items.component.scss
│   │   │   └── items.component.spec.ts
│   │   ├── services/
│   │   │   ├── item.service.ts
│   │   │   └── item.service.spec.ts
│   │   └── models/
│   │       └── item.model.ts
│   ├── environments/
│   │   ├── environment.ts         # Development config
│   │   └── environment.prod.ts    # Production config
│   ├── assets/                    # Static assets
│   ├── index.html                 # Main HTML
│   ├── main.ts                    # Bootstrap file
│   └── styles.scss                # Global styles
├── angular.json                   # Angular CLI config
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── karma.conf.js                  # Test config
└── Dockerfile                     # Container definition
```

## Key Features

### Standalone Components

Angular 17 uses standalone components:
- No NgModules required
- Direct imports in component
- Simplified architecture
- Better tree-shaking

### Routing

Client-side routing with lazy loading:
```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', component: ItemsComponent }
];
```

### Services

Injectable services for data:
- HTTP communication
- State management
- Business logic
- Error handling

### Models

TypeScript interfaces for type safety:
```typescript
export interface Item {
  id?: number;
  name: string;
  description?: string;
}
```

## Component Structure

### Items Component

Features:
- List all items
- Create new item
- Edit existing item
- Delete item
- Error handling
- Loading states

### Component Lifecycle

1. `ngOnInit()`: Load initial data
2. User interactions: CRUD operations
3. Service calls: API communication
4. State updates: Refresh UI

## HTTP Communication

### Item Service

Handles all API calls:
```typescript
getItems(): Observable<Item[]>
getItem(id: number): Observable<Item>
createItem(item: Item): Observable<Item>
updateItem(id: number, item: Item): Observable<Item>
deleteItem(id: number): Observable<void>
```

### Error Handling

Consistent error handling:
- Display user-friendly messages
- Log errors to console
- Maintain UI stability

## Styling

### SCSS Organization

- Global styles in `styles.scss`
- Component-specific styles
- Responsive design
- Consistent theme

### CSS Classes

- `.card`: Container styling
- `.form-group`: Form field wrapper
- `.item-actions`: Button group
- Utility classes for layout

## State Management

Simple component-based state:
- Component properties
- Service observables
- No external state library

## Forms

Reactive forms with:
- Two-way data binding
- Validation
- Submit handling
- Reset functionality

## Testing

### Unit Tests

- Component tests
- Service tests
- Mock HTTP requests
- Coverage reporting

### Test Structure

```typescript
describe('Component', () => {
  beforeEach(() => {
    // Setup
  });
  
  it('should...', () => {
    // Test
  });
});
```

## Build & Deployment

### Development

```bash
npm start
# Serves on http://localhost:4200
```

### Production

```bash
npm run build:prod
# Outputs to dist/spark-frontend
```

### Docker

Multi-stage build:
1. Development: Node with hot reload
2. Build: Compile application
3. Production: Nginx serving static files

## Performance

- Lazy loading routes
- OnPush change detection
- Production optimizations
- AOT compilation
- Tree shaking

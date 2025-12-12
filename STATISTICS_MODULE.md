# Statistics Module Documentation

## Overview

The Statistics Module provides comprehensive statistics tracking for both drivers and users in the Safe-Driving application. It tracks completed rides, revenue, ratings, reviews, and motivation scores.

## Backend Architecture

### Database Schema

**RideStatistic Model**
```prisma
model RideStatistic {
  id              String    @id @default(uuid())
  driverId        String?   // nullable for user-only statistics
  userId          String?   // nullable for driver-only statistics
  completedRides  Int       @default(0)
  revenue         Float     @default(0) // in MGA
  averageRating   Float     @default(0)
  totalReviews    Int       @default(0)
  motivationScore Int       @default(0) // 0-100, based on activity level
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  driver User? @relation("DriverStatistics")
  user   User? @relation("UserStatistics")
}
```

### Business Logic

**Motivation Score Calculation**
- **Drivers**: Based on completed rides (30%), total reviews (20%), and average rating (50%)
  - Formula: `min(100, floor((completedRides * 0.3 + totalReviews * 0.2 + averageRating * 10) * 2))`
- **Users**: Based on completed rides (50%) and total reviews (30%)
  - Formula: `min(100, floor((completedRides * 0.5 + totalReviews * 0.3) * 2))`

**Revenue Calculation**
- Automatically calculated from completed rides with status `COMPLETED`
- Sum of all ride prices for the driver

**Average Rating**
- Calculated from all reviews linked to the driver/user
- Reviews are stored in the `Review` model

## GraphQL API

### Queries

#### Get Driver Statistics
```graphql
query GetDriverStatistics($driverId: String) {
  getDriverStatistics(driverId: $driverId) {
    statistics {
      id
      driverId
      completedRides
      revenue
      averageRating
      totalReviews
      motivationScore
      createdAt
      updatedAt
      driver {
        id
        firstName
        lastName
        email
        avatar {
          url
        }
      }
    }
    success
    message
  }
}
```

**Variables:**
```json
{
  "driverId": "uuid-of-driver" // Optional: defaults to current user
}
```

**Response:**
```json
{
  "data": {
    "getDriverStatistics": {
      "statistics": {
        "id": "stat-uuid",
        "driverId": "driver-uuid",
        "completedRides": 125,
        "revenue": 450000,
        "averageRating": 4.7,
        "totalReviews": 89,
        "motivationScore": 85,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-12-12T00:00:00.000Z",
        "driver": {
          "id": "driver-uuid",
          "firstName": "John",
          "lastName": "Doe",
          "email": "john.doe@example.com",
          "avatar": {
            "url": "https://example.com/avatar.jpg"
          }
        }
      },
      "success": true,
      "message": "Statistics retrieved successfully"
    }
  }
}
```

#### Get User Statistics
```graphql
query GetUserStatistics($userId: String) {
  getUserStatistics(userId: $userId) {
    statistics {
      id
      userId
      completedRides
      averageRating
      totalReviews
      motivationScore
      createdAt
      updatedAt
      user {
        id
        firstName
        lastName
        email
      }
    }
    success
    message
  }
}
```

#### Get Top Drivers
```graphql
query GetTopDrivers($limit: Int) {
  getTopDrivers(limit: $limit) {
    drivers {
      driverId
      firstName
      lastName
      avatarUrl
      completedRides
      revenue
      averageRating
      totalReviews
      motivationScore
    }
    total
  }
}
```

**Variables:**
```json
{
  "limit": 10 // Default: 10
}
```

**Response:**
```json
{
  "data": {
    "getTopDrivers": {
      "drivers": [
        {
          "driverId": "driver-1-uuid",
          "firstName": "John",
          "lastName": "Doe",
          "avatarUrl": "https://example.com/avatar1.jpg",
          "completedRides": 300,
          "revenue": 1000000,
          "averageRating": 4.9,
          "totalReviews": 250,
          "motivationScore": 95
        },
        {
          "driverId": "driver-2-uuid",
          "firstName": "Jane",
          "lastName": "Smith",
          "avatarUrl": "https://example.com/avatar2.jpg",
          "completedRides": 275,
          "revenue": 950000,
          "averageRating": 4.8,
          "totalReviews": 230,
          "motivationScore": 92
        }
      ],
      "total": 2
    }
  }
}
```

### Mutations

#### Update Driver Statistics
```graphql
mutation UpdateDriverStatistics($driverId: String!, $input: UpdateStatisticInput!) {
  updateDriverStatistics(driverId: $driverId, input: $input) {
    id
    completedRides
    revenue
    averageRating
    totalReviews
    motivationScore
    updatedAt
  }
}
```

**Variables:**
```json
{
  "driverId": "driver-uuid",
  "input": {
    "completedRides": 126,
    "revenue": 455000,
    "averageRating": 4.7,
    "totalReviews": 90,
    "motivationScore": 86
  }
}
```

#### Recalculate Driver Statistics
```graphql
mutation RecalculateDriverStatistics($driverId: String) {
  recalculateDriverStatistics(driverId: $driverId) {
    id
    completedRides
    revenue
    averageRating
    totalReviews
    motivationScore
    updatedAt
  }
}
```

**Note:** This mutation recalculates statistics from actual ride and review data in the database.

#### Update User Statistics
```graphql
mutation UpdateUserStatistics($userId: String!, $input: UpdateStatisticInput!) {
  updateUserStatistics(userId: $userId, input: $input) {
    id
    completedRides
    averageRating
    totalReviews
    motivationScore
    updatedAt
  }
}
```

#### Recalculate User Statistics
```graphql
mutation RecalculateUserStatistics($userId: String) {
  recalculateUserStatistics(userId: $userId) {
    id
    completedRides
    averageRating
    totalReviews
    motivationScore
    updatedAt
  }
}
```

## Seeding Data

The module includes a seed script that generates mock statistics data:

### Drivers
- 20 drivers with random statistics
- Revenue: 100,000 - 1,000,000 MGA
- Completed rides: 10 - 300
- Average rating: 3.0 - 5.0
- Total reviews: 5 - 20
- Motivation score: 40 - 100

### Users
- 50 users with random statistics
- Completed rides: 1 - 40
- Average rating: 3.0 - 5.0
- Total reviews: 1 - 10
- Motivation score: 20 - 90

**Run seed script:**
```bash
cd apps/graphql-server
pnpm seed
```

## Frontend Integration

### Next.js Web App

**Routes:**
- Driver Dashboard: `/driver/dashboard/stats`
- User Dashboard: `/user/dashboard/stats`

**Components:**
- Driver Statistics Card
- User Statistics Card
- Top Drivers Leaderboard
- Progress Bars
- Motivation Score Indicators

### Flutter Mobile App

**Screens:**
- `DriverStatisticsScreen`: Shows driver performance metrics
- `UserStatisticsScreen`: Displays user activity history

**Features:**
- Circular progress indicators
- Statistics cards with color gradients
- Performance breakdown
- Activity history
- Tips for improvement

## Testing

### Unit Tests

Tests are located in `apps/graphql-server/src/statistics/statistics.service.spec.ts`

**Run tests:**
```bash
cd apps/graphql-server
pnpm test statistics.service.spec.ts
```

**Test Coverage:**
- ✅ Get driver statistics
- ✅ Get user statistics
- ✅ Get top drivers
- ✅ Update statistics
- ✅ Recalculate statistics
- ✅ Handle missing data
- ✅ Create statistics on demand

## Security

- All queries and mutations require authentication via `JwtAuthGuard`
- Users can only view/update their own statistics (unless admin role is implemented)
- Driver ID and User ID validation before operations

## Performance Considerations

1. **Indexing**: The RideStatistic model has indexes on:
   - `driverId`
   - `userId`
   - `revenue`
   - `averageRating`
   - `motivationScore`

2. **Caching**: Consider implementing Redis caching for frequently accessed statistics

3. **Batch Updates**: Use the recalculate mutations to update statistics in bulk

## Future Enhancements

1. **Time-based Statistics**: Add monthly/yearly breakdown
2. **Comparative Analytics**: Compare driver performance over time
3. **Real-time Updates**: Use GraphQL subscriptions for live statistics
4. **Advanced Metrics**: 
   - Response time
   - Cancellation rate
   - Peak hours performance
   - Geographic performance
5. **Achievements System**: Badges based on milestones
6. **Predictive Analytics**: ML-based performance predictions

## API Examples

### Complete Example: Fetch and Display Driver Stats

```typescript
// Frontend (Next.js)
import { useGetDriverStatisticsQuery } from '@/graphql/generated/graphql';

function DriverStatsComponent() {
  const { data, loading, error } = useGetDriverStatisticsQuery({
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const stats = data?.getDriverStatistics.statistics;

  return (
    <div>
      <h2>My Statistics</h2>
      <p>Completed Rides: {stats?.completedRides}</p>
      <p>Revenue: {stats?.revenue.toLocaleString()} MGA</p>
      <p>Rating: {stats?.averageRating.toFixed(1)} ⭐</p>
      <p>Motivation: {stats?.motivationScore}%</p>
    </div>
  );
}
```

### Recalculate Statistics After Ride Completion

```typescript
// Backend Service
async completeRide(rideId: string) {
  // Complete the ride
  await this.prisma.ride.update({
    where: { id: rideId },
    data: { status: 'COMPLETED' }
  });

  // Get the driver ID
  const ride = await this.prisma.ride.findUnique({
    where: { id: rideId },
    select: { driverId: true }
  });

  if (ride?.driverId) {
    // Recalculate driver statistics
    await this.statisticsService.recalculateDriverStatistics(ride.driverId);
  }
}
```

## Troubleshooting

### Statistics Not Showing
1. Check if user/driver exists in database
2. Verify authentication token is valid
3. Check GraphQL network request in browser devtools
4. Ensure seed script has been run for mock data

### Incorrect Calculations
1. Run recalculate mutations to sync with actual data
2. Check if rides have proper `status` field
3. Verify reviews are linked correctly

### Performance Issues
1. Add indexes if querying large datasets
2. Implement pagination for top drivers list
3. Cache frequently accessed statistics

## Contact & Support

For issues or questions about the statistics module, please:
1. Check existing documentation
2. Review test files for usage examples
3. Create an issue in the repository

# QR Code Scan via Mobile Flow

This feature allows users to scan QR codes on the Web interface using their mobile device, enabling a seamless cross-platform scanning experience.

## 🚀 Overview

The feature enables a two-step QR scanning process:
1. User initiates "Scan with phone" on the Web
2. User scans the displayed QR code with the mobile app
3. Mobile app scans the target QR code (user/driver/ride)
4. Result is sent back to the Web in real-time

## 🔄 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FLOW DIAGRAM                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Web clicks "Scan with phone"                                │
│         │                                                       │
│         ▼                                                       │
│  2. Web → GraphQL Mutation: createScanSession                   │
│         │                                                       │
│         ▼                                                       │
│  3. Backend creates session in Redis (TTL: 60s)                 │
│     Returns: { sessionId, qrBase64 }                            │
│         │                                                       │
│         ▼                                                       │
│  4. Web displays QR code + connects to Socket.IO                │
│         │                                                       │
│         ▼                                                       │
│  5. User scans QR with mobile app                               │
│     Deep link: myapp://scan?sessionId=xxx                       │
│         │                                                       │
│         ▼                                                       │
│  6. Mobile opens ScanUserPage with sessionId                    │
│     User scans target QR code                                   │
│         │                                                       │
│         ▼                                                       │
│  7. Mobile → GraphQL Mutation: sendScanResult                   │
│         │                                                       │
│         ▼                                                       │
│  8. Backend updates Redis + broadcasts via Socket.IO            │
│         │                                                       │
│         ▼                                                       │
│  9. Web receives scan-result event                              │
│     Displays scanned value to user                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📦 Components

### Backend (NestJS GraphQL)

#### GraphQL Schema

```graphql
# Mutations
mutation CreateScanSession {
  createScanSession {
    sessionId
    qrBase64
  }
}

mutation SendScanResult($input: SendScanResultInput!) {
  sendScanResult(input: $input)
}

# Query
query GetScanSessionStatus($sessionId: String!) {
  getScanSessionStatus(sessionId: $sessionId) {
    sessionId
    status
    scannedValue
  }
}

# Input Type
input SendScanResultInput {
  sessionId: String!
  scannedValue: String!
}
```

#### Files

- `src/scan-session/scan-session.module.ts` - Module definition
- `src/scan-session/scan-session.service.ts` - Business logic + Redis operations
- `src/scan-session/scan-session.resolver.ts` - GraphQL resolvers
- `src/scan-session/scan-session.gateway.ts` - Socket.IO gateway
- `src/dtos/scan-session/` - DTOs for input/output types

#### Redis Key Pattern

```
scan:session:{sessionId}
```

Data structure:
```json
{
  "status": "waiting|scanned|expired",
  "scannedValue": "optional string",
  "createdAt": "ISO timestamp"
}
```

TTL: 60 seconds (extended to 30 seconds after scan)

### Web Frontend (Next.js)

#### Components

- `components/scan-session/ScanWithPhoneButton.tsx` - Main component with modal

#### Hooks

- `hooks/useScanSession.ts` - WebSocket connection management

#### GraphQL Files

- `graphql/scan-session/mutation.graphql`
- `graphql/scan-session/query.graphql`

#### Usage

```tsx
import { ScanWithPhoneButton } from '@/components/scan-session';

function MyComponent() {
  const handleScanResult = (value: string) => {
    console.log('Scanned value:', value);
  };

  return (
    <ScanWithPhoneButton
      onScanResult={handleScanResult}
      onSessionExpired={() => console.log('Session expired')}
      onError={(error) => console.error(error)}
      buttonText="Scan with your phone"
    />
  );
}
```

### Mobile App (Flutter)

#### Files

- `lib/features/scan_session/ui/screens/scan_user_page.dart` - QR scanner screen
- `lib/services/scan_session/scan_session_service.dart` - API service
- `lib/services/scan_session/deep_link_service.dart` - Deep link handling
- `lib/api/graph-ql/modules/scan-session/` - GraphQL mutations/queries

#### Deep Link Configuration

##### Android (AndroidManifest.xml)

Add inside `<activity>`:

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="myapp" android:host="scan" />
</intent-filter>
```

##### iOS (Info.plist)

Add to `Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>myapp</string>
        </array>
        <key>CFBundleURLName</key>
        <string>com.safedriving.app</string>
    </dict>
</array>
```

#### QR Scanner Integration

The `ScanUserPage` provides the UI structure. To enable actual QR scanning, integrate a scanner package:

**Option 1: mobile_scanner (recommended)**

```yaml
dependencies:
  mobile_scanner: ^3.0.0
```

**Option 2: qr_code_scanner**

```yaml
dependencies:
  qr_code_scanner: ^1.0.0
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=optional
```

#### Web (.env.local)
```env
NEXT_PUBLIC_API_GRAPHQL_BASE_URL=http://localhost:4000
NEXT_PUBLIC_GRAPHQL_API_URL=http://localhost:4000/graphql
```

#### Mobile (.env)
```env
GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

## 🧪 Testing

### Backend Unit Test

```typescript
describe('ScanSessionService', () => {
  it('should create a scan session', async () => {
    const result = await service.createScanSession();
    expect(result.sessionId).toBeDefined();
    expect(result.qrBase64).toMatch(/^data:image\/png;base64,/);
  });

  it('should update scan session', async () => {
    const session = await service.createScanSession();
    const success = await service.updateScanSession(session.sessionId, 'test-value');
    expect(success).toBe(true);
  });
});
```

### Integration Test Flow

1. Call `createScanSession` mutation
2. Connect to Socket.IO `/scan` namespace
3. Join session room: `emit('joinScanSession', { sessionId })`
4. Call `sendScanResult` mutation from another client
5. Verify `scan-result` event is received

## 🔒 Security Considerations

1. **Session Expiration**: Sessions expire after 60 seconds to prevent replay attacks
2. **No Authentication for sendScanResult**: The sessionId acts as a temporary token
3. **Rate Limiting**: Consider adding rate limiting on session creation
4. **Input Validation**: All inputs are validated using class-validator decorators

## 📝 API Reference

### Socket.IO Events

**Namespace**: `/scan`

**Client → Server**:
- `joinScanSession`: `{ sessionId: string }` - Join a session room
- `leaveScanSession`: `{ sessionId: string }` - Leave a session room

**Server → Client**:
- `scan-result`: `{ sessionId, scannedValue, timestamp }` - Scan completed
- `scan-session-expired`: `{ sessionId, timestamp }` - Session expired

## 🔍 Troubleshooting

### Common Issues

1. **QR Code not generating**
   - Check if qrcode npm package is installed
   - Verify Redis connection

2. **WebSocket not connecting**
   - Verify CORS configuration in gateway
   - Check if Socket.IO client URL is correct

3. **Deep link not opening app**
   - Verify platform-specific configuration
   - Test with: `adb shell am start -a android.intent.action.VIEW -d "myapp://scan?sessionId=test"`

4. **Session expired too quickly**
   - Increase TTL in `scan-session.service.ts` if needed
   - Check Redis connection stability

# 🔧 Customer Search Troubleshooting Guide

## Issue: After Adding a User, Search Shows Register Window Instead of Login

This guide will help you debug and understand what's happening.

---

## 📋 Step-by-Step Testing

### Step 1: Open Browser Developer Tools
1. Open the app: `http://localhost:4200`
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. You should see: `✅ Using MOCK backend service`

### Step 2: Add a New Customer
1. Click the register button
2. Fill in the form:
   - First Name: `TestUser`
   - Last Name: `Demo`
   - Email: `test@example.com`
   - City ID: `1`
3. Click **Submit**
4. **Check the Console** - You should see:
   ```
   ➕ Adding new customer: {Id: 4, firstName: "TestUser", lastName: "Demo", ...}
   📝 Updated database: [{Id: 1, ...}, {Id: 2, ...}, {Id: 3, ...}, {Id: 4, ...}]
   ```
5. Note the new customer **ID** (should be 4 or higher)
6. You'll see a success alert: "New Customer ID: 4"

### Step 3: Search for the New Customer
1. Enter the ID from step 5 in the search field (e.g., `4`)
2. Click "Check if registered" button
3. **Check the Console** - You should see:
   ```
   🔐 Checking for customer with ID: 4
   🔍 Searching for customer ID: 4
   Current customers in database: [{Id: 1, ...}, {Id: 2, ...}, {Id: 3, ...}, {Id: 4, ...}]
   ✅ Found customer: {Id: 4, firstName: "TestUser", ...}
   ✅ Next callback - Customer: {Id: 4, firstName: "TestUser", ...}
   ✅ Customer found: TestUser Demo
   ```

---

## ❌ If Registration Window Opens Instead

### Check These Console Logs:

#### Bad Scenario 1: Customer Not in Database
```
🔍 Searching for customer ID: 4
Current customers in database: [{Id: 1, ...}, {Id: 2, ...}, {Id: 3, ...}]  ← ID 4 is MISSING!
❌ Customer ID 4 not found
```

**Solution:** The new customer wasn't saved properly. The mock service instance might be different.

#### Bad Scenario 2: Error Callback Called
```
❌ Error callback triggered: {status: 404, message: "Customer not found"}
404 - Customer not found, showing register modal
```

**Solution:** Customer isn't in the database at search time.

#### Bad Scenario 3: Customer Object Empty
```
❌ Customer object is null/empty
```

**Solution:** The getCustomerById returned an empty object.

---

## 🔍 Debugging Steps

### 1. Verify Mock Service is Singleton
Open Console and run:
```javascript
// This will show if the service is being reused
console.log('Service check complete');
```

### 2. Check Initial Database
Look for this on page load:
```
📦 MockCustomersService initialized
Initial customers: (3) [{…}, {…}, {…}]
```

### 3. Monitor Add Customer Process
When adding a customer:
```
➕ Adding new customer: {Id: 4, firstName: "...", ...}
📝 Updated database: (4) [{…}, {…}, {…}, {…}]  ← Should show 4 customers
```

### 4. Monitor Search Process
When searching:
```
🔐 Checking for customer with ID: 4
🔍 Searching for customer ID: 4
Current customers in database: (4) [{…}, {…}, {…}, {…}]  ← Should match
✅ Found customer: ...
```

---

## 💡 Most Common Issues & Fixes

### Issue 1: "ID changes after registration"
The mock service assigns new IDs (4, 5, 6...) instead of using the form ID.

**Expected Behavior:** ✅ User enters any ID, system assigns a new one (4, 5, 6...)

**Solution:** Use the new ID provided in the success message

---

### Issue 2: "Can't find customer after adding"
Mock service instance might be creating new instances.

**Solution:** The MockCustomersService is marked as `@Injectable({ providedIn: 'root' })` which means it should be a singleton. If the issue persists, check:

```typescript
// In customers.service.ts
export class CustomerService {
  constructor(private http: HttpClient, mockService: MockCustomersService) {
    this.mockService = mockService;  // ← Same instance
  }
}
```

---

### Issue 3: "Page refresh loses new customers"
This is **expected behavior** - mock data is in memory only.

**Solution:** This is normal. When you refresh the page, the app resets to the initial 3 customers.

---

## 🛠️ Manual Testing Checklist

- [ ] Add customer with name "Test123"
  - [ ] Console shows "Adding new customer"
  - [ ] Note the ID (should be 4+)
  - [ ] Success alert shows the ID

- [ ] Search for the new customer by ID
  - [ ] Should show "Customer found"
  - [ ] Should NOT show register modal
  - [ ] Console shows "Found customer" message

- [ ] Try invalid ID (e.g., 999)
  - [ ] Should show register modal
  - [ ] Console shows "Customer ID 999 not found"

- [ ] Register another customer
  - [ ] Should get a different ID
  - [ ] Should be findable afterward

- [ ] Refresh page
  - [ ] New customers are gone (normal for mock)
  - [ ] Original 3 customers (ID 1,2,3) still there

---

## 📊 Database State Examples

### After adding one customer:
```
[
  {Id: 1, firstName: 'John', lastName: 'Doe', ...},
  {Id: 2, firstName: 'Jane', lastName: 'Smith', ...},
  {Id: 3, firstName: 'David', lastName: 'Johnson', ...},
  {Id: 4, firstName: 'TestUser', lastName: 'Demo', ...}  ← New
]
```

### After adding two customers:
```
[
  {Id: 1, firstName: 'John', lastName: 'Doe', ...},
  {Id: 2, firstName: 'Jane', lastName: 'Smith', ...},
  {Id: 3, firstName: 'David', lastName: 'Johnson', ...},
  {Id: 4, firstName: 'TestUser', lastName: 'Demo', ...},  ← New
  {Id: 5, firstName: 'John2', lastName: 'Doe2', ...}      ← New
]
```

---

## ✅ What Should Happen

```
1. App loads
   ↓
2. Add customer → Mock service adds ID 4
   ↓
3. Search for ID 4 → Found in database → Show "Customer found"
   ↓
4. Success! ✅
```

---

## 🚀 To Enable Real Backend

Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  useMockBackend: false  // Set to false
};
```

Then rebuild and make sure your backend:
- Is running on `https://localhost:44372`
- Has CORS enabled for `http://localhost:4200`
- Has endpoints for:
  - `GET /api/customer/getcustomerbyid/{id}`
  - `POST /api/customer/insertcustomer`

---

## 📞 Need More Help?

Check the console for the colored logs:
- `✅` = Success
- `❌` = Error
- `📦` = Initialization
- `🔍` = Searching
- `➕` = Adding
- `📝` = Database updated
- `🔐` = Login check

These will tell you exactly where the issue is!


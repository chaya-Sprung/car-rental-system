# API Connection Troubleshooting Guide

## Error: "Http failure response for https://localhost:44372/api/customer/insertcustomer: 0 Unknown Error"

This error indicates that your Angular frontend **cannot connect to the backend API**. Follow these steps to resolve it.

---

## 🔍 Diagnosis Checklist

### 1. **Backend API Status** ✅
- [ ] Is your backend API running on `https://localhost:44372`?
- [ ] Check if the backend server is still active
- [ ] Look for any error messages in the backend console

### 2. **CORS (Cross-Origin Resource Sharing)** 🔐
This is the **most common cause** of this error.

#### Fix for ASP.NET Core Backend:

In your backend's `Program.cs` or `Startup.cs`, add CORS configuration:

```csharp
// Add CORS service
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularClient", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Use CORS middleware (BEFORE MapControllers)
app.UseCors("AllowAngularClient");
app.MapControllers();
```

#### For other backends:
Add these headers to your API responses:
```
Access-Control-Allow-Origin: http://localhost:4200
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept
Access-Control-Allow-Credentials: true
```

---

### 3. **SSL Certificate Issue** 🔒
The API uses `https://localhost:44372`

- [ ] Backend has a valid SSL certificate
- [ ] Try accessing `https://localhost:44372/api/customer/getallcustomers` directly in browser
- [ ] Accept any SSL warnings if using self-signed certificate

**If SSL is the issue**, you can test with HTTP first:
1. Change API URL to `http://localhost:44372/api/customer/`
2. Update in `src/app/Services/customers.service.ts`

---

### 4. **Browser Console Errors** 🖥️
Open **Developer Tools** (F12) → **Console** tab and check for:
- CORS errors (blocks in Network tab)
- SSL certificate warnings
- Exact error messages

---

## 🛠️ Step-by-Step Fix

### Option A: Fix CORS on Backend (Recommended)

**ASP.NET Core Example:**
```csharp
var builder = WebApplicationBuilder.CreateBuilder(args);

// Add controllers
builder.Services.AddControllers();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", builder =>
    {
        builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Use CORS middleware
app.UseCors("AllowAngular");
app.UseHttpsRedirection();
app.UseRouting();
app.MapControllers();
app.Run();
```

---

### Option B: Test Backend Connection

Run this in your Angular app's browser console:

```javascript
// Test if backend is accessible
fetch('https://localhost:44372/api/customer/getallcustomers')
  .then(r => {
    console.log('Status:', r.status);
    console.log('Response:', r);
    return r.json();
  })
  .then(data => console.log('Data:', data))
  .catch(err => console.error('Error:', err));
```

---

### Option C: Temporary Workaround (HTTP Instead of HTTPS)

Edit `src/app/Services/customers.service.ts`:
```typescript
export class CustomerService {
  url = "http://localhost:44372/api/customer/"; // Changed from https
  // ... rest of code
}
```

---

## ✅ Verification Steps

After making changes:

1. **Restart Backend API**
2. **Rebuild Angular:**
   ```powershell
   ng build
   ```
3. **Serve Angular:**
   ```powershell
   ng serve
   ```
4. **Test in Browser** (http://localhost:4200):
   - Open Dev Tools → Network tab
   - Try to add a customer
   - Look for the API request and check response

---

## 📝 Common Issues Summary

| Issue | Solution |
|-------|----------|
| CORS blocked | Add CORS middleware to backend |
| SSL certificate invalid | Accept certificate or use HTTP |
| Backend not running | Start the backend service |
| Wrong API URL | Verify URL in customers.service.ts |
| Port number incorrect | Check backend actual port |

---

## 🔗 Related Files

- **API Service:** `src/app/Services/customers.service.ts`
- **Login Component:** `src/app/login/login.component.ts`
- **Main Config:** `src/main.ts`

---

## 📞 Need Help?

Check:
1. Backend console for errors
2. Browser Network tab for failed requests
3. CORS headers in response
4. Backend API documentation


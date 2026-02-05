# 🔍 HOTSPOT DEBUGGING GUIDE

## Current Status

### ✅ What's Working:
- Hotspots are being saved to database correctly
- Admin editor shows hotspots
- Database has hotspot data with yaw, pitch, labels

### ❌ What's Not Working:
- Hotspots not visible in public tour viewer
- Hotspot clicks not navigating

---

## Database Check Results

Found hotspots in database:
```
Scene: "outsiude" → Target: "WhatsApp Image..." (label: "backyard")
Scene: "WhatsApp Image..." → Target: "outsiude" (label: null)
Scene: "outsiude" → Target: "WhatsApp Image..." (label: "kitchen")
```

**Data looks good!** ✅

---

## Debugging Steps

### **Step 1: Open Browser Console**

1. Go to your listing tour page
2. Press **F12** to open Developer Tools
3. Click **Console** tab
4. Look for these messages:

**Expected logs:**
```
[TourViewer] Initializing scene: outsiude with 2 hotspots
[TourViewer] Creating hotspot: {id: "...", label: "backyard", targetScene: "WhatsApp Image..."}
[TourViewer] Created 2 hotspots
[TourViewer] Viewer initialized successfully
```

**If you see errors:**
- Screenshot the error
- Check if Pannellum library loaded
- Check if scenes data is correct

---

### **Step 2: Check if Hotspots Are Rendered**

1. In the tour viewer, right-click anywhere
2. Select "Inspect Element"
3. In the Elements tab, search for `tour-hotspot`
4. You should see elements like:
```html
<div class="tour-hotspot" style="..."></div>
```

**If you DON'T see them:**
- Hotspots aren't being created
- Check console for errors
- Verify Pannellum loaded

**If you DO see them but they're invisible:**
- CSS issue
- Check z-index
- Check if they're behind other elements

---

### **Step 3: Check CSS Styles**

The hotspots should have these styles (inline in TourViewer.tsx):
```css
.tour-hotspot {
  width: 50px;
  height: 50px;
  background: rgba(14, 165, 233, 0.95);  /* Blue */
  border: 4px solid white;
  border-radius: 50%;
  animation: pulse-hotspot 2s infinite;
}
```

**Check:**
1. Inspect a hotspot element
2. Look at "Computed" styles
3. Verify background color is blue
4. Verify size is 50x50px

---

### **Step 4: Test Hotspot Click**

1. Try clicking where hotspots should be
2. Check console for:
```
[TourViewer] Hotspot clicked: <id> Target: <scene-name> Index: <number>
```

**If you see the log:**
- Click handler works
- Navigation might be broken

**If you DON'T see the log:**
- Hotspot not clickable
- Might be covered by overlay
- Z-index issue

---

## Common Issues & Fixes

### **Issue 1: Pannellum Not Loading**

**Symptoms:**
- Console error: "pannellum is not defined"
- Viewer doesn't initialize

**Fix:**
```typescript
// Check if script loaded
console.log('Pannellum loaded:', !!window.pannellum)
```

---

### **Issue 2: Hotspots Behind Overlay**

**Symptoms:**
- Hotspots exist in DOM but not clickable
- Can't see them visually

**Fix:**
Check z-index of hotspots vs other elements:
```css
.pnlm-hotspot {
  z-index: 100 !important;
}
```

---

### **Issue 3: Scene Data Not Loading**

**Symptoms:**
- Console shows "0 hotspots"
- Scenes load but no hotspots

**Fix:**
Check the database query includes hotspots:
```typescript
.select(`
    *,
    hotspots!hotspots_scene_id_fkey (*)
`)
```

---

### **Issue 4: Target Scene Not Found**

**Symptoms:**
- Console: "Target scene not found"
- Click doesn't navigate

**Fix:**
Verify target_scene_id matches an existing scene:
```sql
SELECT id, name FROM scenes WHERE listing_id = '<your-listing-id>';
```

---

## Quick Test

### **Test 1: Verify Data Flow**

Add this to TourViewer.tsx (line 60):
```typescript
console.log('=== TOUR VIEWER DEBUG ===')
console.log('Scenes:', scenes.map(s => ({ id: s.id, name: s.name, hotspots: s.hotspots.length })))
console.log('Current scene:', currentScene.name)
console.log('Current scene hotspots:', currentScene.hotspots)
console.log('========================')
```

### **Test 2: Force Hotspot Visibility**

Add this CSS to globals.css:
```css
.pnlm-hotspot,
.tour-hotspot {
  background: red !important;
  width: 100px !important;
  height: 100px !important;
  z-index: 9999 !important;
  opacity: 1 !important;
}
```

**If you NOW see red circles:**
- Hotspots are rendering
- Original CSS might be the issue

**If you STILL don't see anything:**
- Hotspots aren't being created
- Check Pannellum initialization

---

## Next Steps

1. **Open the tour page**
2. **Open browser console (F12)**
3. **Look for the debug logs**
4. **Take a screenshot of:**
   - Console output
   - Network tab (check if Pannellum loaded)
   - Elements tab (search for "tour-hotspot")

5. **Share what you see:**
   - Any error messages?
   - Do you see the debug logs?
   - Do hotspot elements exist in DOM?

---

## Expected Behavior

### **When Working Correctly:**

1. **Page loads** → See "Loading virtual tour..."
2. **Pannellum loads** → See panorama
3. **Hotspots appear** → Blue pulsing circles
4. **Hover hotspot** → See tooltip with label
5. **Click hotspot** → Navigate to target scene
6. **Console shows** → All debug logs

---

## Report Template

When reporting the issue, include:

```
Browser: Chrome/Firefox/Safari
Console Errors: [paste errors]
Debug Logs: [paste logs]
Hotspots in DOM: Yes/No
Hotspots Visible: Yes/No
Hotspots Clickable: Yes/No
```

---

**Let's debug this together! Open the tour page and check the console.** 🔍

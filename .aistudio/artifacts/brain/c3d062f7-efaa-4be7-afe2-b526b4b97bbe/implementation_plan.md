# UNIQUE HOMES: Client Admin Portal & Direct Mobile Publishing

A dedicated, mobile-responsive Admin Portal allowing the business owner to log in with Google from any phone, tablet, or laptop, automatically claim Master Admin privileges on first sign-in, and post/update fragrance products live on the website in seconds.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following parameters were confirmed by the user:
> - **Product Management Scope (Choice A)**: Full capability to add, edit, and delete products (name, category, price in ₦, volume, description, scent notes, photos, and in-stock toggle).
> - **Authentication Flow (Choice A)**: Google Sign-In integration coupled with an Admin PIN for fast mobile authentication.
> - **Master Admin Claiming**: The first Google account that logs in is automatically claimed and registered as the permanent **Master Admin Email** (no developer email required; client gets full direct ownership).
> - **Cross-Device Responsiveness**: Tailored for seamless publishing directly from smartphones (iPhone/Android), tablets (iPad), laptops, and desktops.

---

### 1. Overview & Core Concept

- **What It Does**: Gives the business owner a private admin portal (`#admin`) to manage her fragrance catalog on the fly. She can introduce a new perfume, change prices, mark items sold out, or update scent descriptions, with changes immediately reflected across both the **Storefront** and the **Social Bio Hub**.
- **Target Audience / Persona**: The boutique owner who actively posts on Instagram and TikTok and needs to rapidly update products directly from her phone or laptop without writing any code.
- **Key Value**: Delivers complete autonomy to the client within 20 minutes, backed by Google identity and instant publishing.

---

### 2. User Experience & Visual Design

#### Key User Flows

1. **Accessing the Portal (`#admin`)**:
   - Discreet *"Admin Portal"* access link in the footer and quick key shortcut.
   - Clean, luxury-branded authentication lock screen matching the black & gold aesthetic.

2. **Master Admin Setup & Google Sign-In**:
   - Google Sign-In trigger with client identity detection.
   - **First Sign-In (Master Claim)**: Displays a welcome banner: *"Welcome! This Google account will be registered as the Master Owner for UNIQUE HOMES."*
   - She enters her chosen 4-to-6 digit Admin PIN to secure fast mobile access.
   - Subsequent visits require Google authentication and/or her Admin PIN.

3. **Publishing New Products from Phone / Desktop**:
   - Tapping **"+ Add New Product"** opens a smooth modal or form drawer.
   - Fields:
     - Product Name (e.g., *"Velvet Amber EDP"*)
     - Category (Perfumes, Home Diffusers, Body Sprays, Air Fresheners)
     - Price in ₦ (numeric input, formatted live)
     - Volume / Size (e.g., *"100ml"*, *"250ml"*)
     - Description & Scent Notes (comma-separated tags)
     - Image (upload local photo from phone camera/gallery or choose from luxury presets)
     - Availability switch (*In Stock* / *Sold Out*)
   - Instant publish: Appears immediately on the live website and bio links!

4. **Managing Existing Catalog**:
   - Table / Card view showing current inventory with quick inline edit, price adjustments, and delete confirmation.

#### Visual Theme & Mobile Ergonomics

- **Consistent Aesthetic**: Pitch black (`#000`), luxury dark surface (`#111`), gold accents (`#D4AF37`), and emerald confirmation (`#25D366`).
- **Touch-Friendly Controls**: Minimum 44px tap targets, spacious inputs, and fixed mobile bottom action bar for one-hand phone usability.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dynamic First-Login Master Admin Ownership**
  - *Chosen Approach*: The first Google account to authenticate claims the Master Admin badge. The email is stored in secure local state so the client owns her shop without hardcoding third-party emails.
  - *Why*: Perfectly satisfies the client's requirement: *"not my email that would be when she signs in make the one she use the Master email"*.
- **Decision 2: Direct Client-Side State Synchronization with Local Storage Fallback**
  - *Chosen Approach*: Maintain product catalog in unified React state with local persistence, immediately syncing with the storefront, cart, and bio hub.
  - *Why*: Changes are instantaneous, testable in real-time, and resilient against network latency on mobile.

---

### 4. Technical Architecture & Component Mapping

```
┌─────────────────────────────────────────────────────────────┐
│                          App Shell                          │
│         (Routing: #store  •  #bio  •  #admin)               │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
       ┌───────▼────────┐             ┌───────▼────────┐
       │ Storefront &   │             │  Admin Portal  │
       │ Bio Hub Views  │             │   Component    │
       └───────┬────────┘             └───────┬────────┘
               │                              │
               │   ┌──────────────────────────▼──────────────────────────┐
               │   │ Auth Guard:                                         │
               │   │ - Google Identity Provider                          │
               │   │ - Master Admin Claiming & Verification              │
               │   │ - 4-Digit Security PIN                              │
               │   └──────────────────────────┬──────────────────────────┘
               │                              │
               │   ┌──────────────────────────▼──────────────────────────┐
               │   │ Admin Console:                                      │
               │   │ - Catalog Overview (Items, Active Scents, Revenue)  │
               │   │ - Add New Product Form (Camera upload / Presets)    │
               │   │ - Inline Price & In-Stock Status Editor             │
               │   └──────────────────────────┬──────────────────────────┘
               │                              │
               └───────────────◄──────────────┘
                       (Syncs live catalog)
```

#### State & Storage

- **`AdminAuthState`**: `{ isAuthenticated: boolean; masterEmail: string | null; currentUser: GoogleUser | null }`
- **`ProductCatalogState`**: Live reactive array of `Product[]` shared across the public shop and admin editor.

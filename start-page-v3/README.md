# ☕ Sip - Your Cozy New Tab Page

Transform your browser's new tab into a beautiful, personalized workspace with Sip. Featuring stunning Catppuccin themes, glassmorphism effects, and intelligent customization, Sip makes every new tab a delightful experience.

## ✨ Key Features

**Beautiful Design**
- Gorgeous Catppuccin color themes (Mocha dark & Latte light)
- Modern glassmorphism UI with ambient glow effects
- Smooth animations and responsive layout

**Smart Search**
- Integrated search respecting your default search engine (Chrome)
- Quick engine switching between multiple search providers
- Keyboard shortcuts for lightning-fast navigation

**Personalization**
- Dynamic time-based greetings with beautiful icons
- Real-time weather with OpenWeather API integration
- Customizable quick links organized by categories (up to 8 categories, 10 links each)
- Choose between 12hr/24hr time formats
- Toggle between Fahrenheit and Celsius
- Show/hide inspirational quotes

**Productivity**
- Organize your favorite sites in customizable categories
- Built-in help system for easy icon customization
- All settings persist locally (no data collection)
- Keyboard shortcuts: `/` for search, `1-7` for engines, `Esc` to clear

**Privacy First**
- No data collection or tracking
- All preferences stored locally on your device
- Open source and transparent

## 🎯 Perfect For

- Developers who want quick access to GitHub, Stack Overflow, and dev tools
- Anyone who values beautiful, functional design
- Users who want a personalized browsing experience
- Privacy-conscious individuals

## 🔒 Privacy & Permissions

**Required Permissions:**
- `search` - To integrate with your browser's default search engine (Chrome only)

**What We DON'T Do:**
- No data collection or analytics
- No tracking or monitoring
- No remote servers (except OpenWeather API if you configure it)
- All settings stored locally using browser's localStorage

See our full [Privacy Policy](https://github.com/bgibson72/start-page-v3/blob/main/PRIVACY.md) for complete details.

## 📸 Screenshots & More

Visit our [GitHub repository](https://github.com/bgibson72/start-page-v3) for:
- Detailed screenshots
- Customization guide
- Icon usage instructions
- Development information
- Source code

## 🆘 Support

Need help? Have suggestions?
- Open an issue on [GitHub](https://github.com/bgibson72/start-page-v3/issues)
- Read our detailed [README](https://github.com/bgibson72/start-page-v3)

---

Made with ☕ and 💜 using Catppuccin themes

![Preview Image](sip_preview.png)

<details>
<summary>📸 Screenshots</summary>

### Dark Theme (Mocha)
![Dark Theme](screenshots/dark-theme.png)

### Light Theme (Latte)
![Light Theme](screenshots/light-theme.png)

### Settings Panel
![Settings](screenshots/settings.png)

### Help Panel
![Help](screenshots/help.png)

</details>

## ✨ Features

- **Catppuccin Themes** - Mocha (dark) and Latte (light) color palettes
- **Glassmorphism UI** - Modern frosted glass effects with ambient glows
- **Multi-Engine Search** - Quick switch between popular search engines and developer resources
- **Dynamic Greeting** - Personalized time-based greetings with sunrise/sun/sunset/moon icons
- **Quick Links** - Categorized bookmarks (Development, Social, Media, Productivity)
- **Weather Widget** - Current weather with °F/°C toggle
- **Settings Panel** - Toggle 12hr/24hr clock, temperature units, and theme
- **Inspirational Quotes** - Random quotes to brighten your day
- **Keyboard Navigation** - Fast access with keyboard shortcuts
- **Responsive Design** - Works on all screen sizes

---

## 🧩 Installation

**Sip** is available as a browser extension:

- **Chrome Web Store** - Coming soon!
- **Firefox Add-ons** - Coming soon!

Once published, simply install from your browser's extension store and Sip will replace your new tab page.

---

## 🚀 Standalone Installation

### Clone the Repository

```bash
git clone https://github.com/bgibson72/start-page-v3.git
cd start-page-v3
```

### Set as Browser Homepage

1. Open the `index.html` file in your browser
2. Copy the file path (e.g., `file:///home/username/start-page-v3/index.html`)
3. Set this as your browser's homepage in settings

**Or host locally:**

```bash
# Using Python
python -m http.server 8080

# Then set http://localhost:8080 as your homepage
```

## ⚙️ Customization

### Change Your Name

Edit `script.js` and find the `userName` variable near the top:

```javascript
const userName = 'Bryan';  // Change to your name
```

### Add/Remove Quick Links

Edit `index.html` and modify the link cards in each category section:

```html
<a href="https://your-site.com" class="link-card">
    <span class="link-icon"><i class="fa-brands fa-icon-name"></i></span>
    <span class="link-text">Site Name</span>
</a>
```

Browse [Font Awesome Icons](https://fontawesome.com/icons) for icon options.

### Modify Categories

Each category is a `<section class="link-group">` in `index.html`. You can:
- Rename categories by changing the `<h2>` text
- Add new categories by duplicating a section
- Remove categories by deleting a section

The grid automatically adjusts (2 columns for even count, 3 for odd).

### Change Color Scheme

Edit `style.css` and modify the CSS variables in `:root`:

```css
:root {
    /* Catppuccin Mocha Colors */
    --crust: #11111b;
    --mantle: #181825;
    --base: #1e1e2e;
    --surface0: #313244;
    --surface1: #45475a;
    --surface2: #585b70;
    --text: #cdd6f4;
    --subtext: #a6adc8;
    --primary: #cba6f7;    /* Mauve - accent color */
    --secondary: #89b4fa;  /* Blue */
    --accent: #f5c2e7;     /* Pink */
    /* ... */
}
```

### Change Weather Units

In `script.js`, find the `fetchWeather` function and change `units=imperial` to `units=metric` for Celsius:

```javascript
const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`
);
```

Change `fahrenheit` to `celsius` for metric units.

### Add Custom Quotes

Edit the `quotes` array in `script.js`:

```javascript
const quotes = [
    "Your custom quote here.",
    "Another inspiring message.",
    // Add more quotes...
];
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search bar |
| `1-4` | Switch search engine |
| `Esc` | Clear search / unfocus |

## 🎨 Icons

This startpage uses:
- [Font Awesome 6](https://fontawesome.com/) for most icons
- [Nerd Fonts](https://www.nerdfonts.com/) for DuckDuckGo duck and time-of-day icons

## 🔒 Privacy

This extension respects your privacy. See our [Privacy Policy](PRIVACY.md) for details.

**TL;DR:** No data collection. All preferences stored locally on your device.

## 📄 License

MIT License - feel free to modify and use as you wish!

---

Made with ☕ and 💜 using Catppuccin

# House of Legacy Editor

<div align="center">
  <img src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2503770/b33b96f5e8795a6ddad37c3cc1e5abb3557b8274/capsule_616x353.jpg?t=1752485158" alt="House of Legacy Game Banner" width="600">
</div>
<br />

A modern web-based save editor for [House of Legacy](https://store.steampowered.com/app/2503770/House_of_Legacy/), the addictive dynasty management game. This tool allows you to customize your save files to enhance your gameplay experience and skip the early-game grind.

## 🌐 Quick Start

**[✨ Try the Editor Online →](https://riandyrn.github.io/house-of-legacy-editor/)**

*No installation required - runs entirely in your browser with secure client-side processing*

## ✨ Features

### Character Management
- **Clan Members** - Modify attributes and stats of your family members
- **Spouse** - Customize your spouse's attributes and abilities  
- **Retainers** - Edit retainer stats and optimize their performance

### Resources & Economy
- **Currency** - Adjust Money and Yuanbao amounts
- **Food Supplies** - Modify quantities of Food, Vegetables, and Meat

### Quality of Life Tools
- **All Best Attributes** - Instantly set retainers to maximum attributes with young age and zero monthly salary
- **Bulk Operations** - Apply changes to multiple characters at once

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- Modern web browser

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/riandyrn/house-of-legacy-editor.git
   cd house-of-legacy-editor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/house-of-legacy-editor/`

### Building for Production

```bash
npm run build
```

## 🎮 How to Use

1. **Load Save File** - Upload your House of Legacy save file
2. **Edit Values** - Modify the attributes, resources, or character stats as desired
3. **Download** - Save the modified file back to your game directory
4. **Play** - Launch House of Legacy and enjoy your customized gameplay

## 🛠️ Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Build Tool**: Vite
- **Code Quality**: ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 🙏 Acknowledgments

This project was inspired by [savefile.space/house-of-legacy](https://savefile.space/house-of-legacy/), an excellent web-based save editor. While that tool works great, I wanted to create a more streamlined solution tailored to my specific gameplay preferences and workflow.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
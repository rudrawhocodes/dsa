# DSA Visualizer 🎯

An interactive web-based visualizer for learning Data Structures and Algorithms with implementations in both **Java** and **C++**.

## 🌟 Features

### Data Structures
- **Arrays** - Dynamic access and manipulation
- **Linked Lists** - Dynamic memory allocation with pointers
- **Stacks** - LIFO (Last In First Out) operations
- **Queues** - FIFO (First In First Out) operations
- **Binary Trees** - Hierarchical data organization
- **Graphs** - Network representation and traversal

### Algorithms
- **Bubble Sort** - Step-by-step comparison and swapping
- **Quick Sort** - Divide and conquer approach
- **Merge Sort** - Efficient divide and merge strategy
- **BFS (Breadth-First Search)** - Level-order graph traversal
- **DFS (Depth-First Search)** - Deep graph exploration

### Interactive Features
- 🎮 **Play/Pause/Step Controls** - Control animation speed and execution
- 🎯 **Real-time Visualization** - See algorithms in action
- 💻 **Dual Language Support** - Compare Java and C++ implementations
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 📋 **Copy Code Feature** - Easy code copying for practice
- 🎨 **Beautiful UI** - Modern, clean interface

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rudrawhocodes/dsa.git
   cd dsa
   ```

2. **Open the visualizer**
   - Simply open `index.html` in your web browser
   - Or use a local server for better performance:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Start Learning!**
   - Navigate to `http://localhost:8000` (if using a local server)
   - Select a topic from the sidebar
   - Switch between Java and C++ implementations
   - Use the controls to visualize algorithms step-by-step

## 📖 How to Use

### Navigation
1. **Select a Topic**: Click on any data structure or algorithm from the sidebar
2. **Choose Language**: Toggle between Java and C++ using the language buttons
3. **Visualize**: Use the play controls to see animations
4. **Learn**: Read explanations and study the code implementations

### Controls
- **▶ Play**: Start automatic animation
- **⏸ Pause**: Pause the current animation
- **🔄 Reset**: Reset to initial state
- **⏭ Step**: Move forward one step manually
- **Speed Slider**: Adjust animation speed

### Code Features
- **Syntax Highlighting**: Color-coded syntax for better readability
- **Copy Function**: One-click code copying
- **Language Toggle**: Instant switching between Java and C++

## 🎓 Educational Benefits

### For Students
- **Visual Learning**: See how data structures and algorithms work in real-time
- **Code Comparison**: Compare Java and C++ implementations side-by-side
- **Step-by-Step Understanding**: Control the pace of learning
- **Interactive Practice**: Hands-on experience with algorithms

### For Educators
- **Teaching Tool**: Perfect for classroom demonstrations
- **Curriculum Support**: Covers fundamental CS concepts
- **Engagement**: Interactive elements keep students engaged
- **Multi-Language**: Supports different programming language preferences

## 🛠️ Technical Details

### Built With
- **HTML5** - Structure and canvas for visualizations
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Interactive functionality and animations
- **Canvas API** - High-performance graphics rendering

### Architecture
```
dsa/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── visualizer.js       # Core JavaScript functionality
└── README.md          # Documentation
```

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🎨 Screenshots

### Main Interface
The clean, modern interface with sidebar navigation and dual-language support.

### Array Visualization
Interactive array operations with visual feedback for insertions, deletions, and access.

### Sorting Algorithms
Step-by-step visualization of sorting algorithms with color-coded comparisons and swaps.

### Data Structure Operations
Real-time visualization of stack, queue, and linked list operations.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/new-algorithm
   ```
3. **Add your implementation**
   - Add new algorithms or data structures
   - Ensure both Java and C++ code examples
   - Include proper visualization logic
4. **Test thoroughly**
5. **Submit a pull request**

### Contribution Ideas
- [ ] Add more sorting algorithms (Heap Sort, Radix Sort)
- [ ] Implement advanced data structures (AVL Trees, Hash Tables)
- [ ] Add graph algorithms (Dijkstra's, Kruskal's)
- [ ] Improve mobile responsiveness
- [ ] Add sound effects for interactions
- [ ] Create algorithm complexity analysis
- [ ] Add quiz/practice mode

## 📝 Code Examples

### Adding a New Data Structure

```javascript
// In visualizer.js, add to getTopicData()
newstructure: {
    title: 'New Structure Name',
    explanation: 'Detailed explanation...',
    code: {
        java: `// Java implementation`,
        cpp: `// C++ implementation`
    }
}
```

### Adding Visualization

```javascript
// Add visualization method
visualizeNewStructure() {
    this.clearCanvas();
    // Your visualization logic here
}
```

## 🐛 Bug Reports

Found a bug? Please help us improve by reporting issues:

1. **Check existing issues** first
2. **Create a detailed bug report** including:
   - Browser and version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need for visual learning in computer science education
- Thanks to all contributors and educators who provide feedback
- Built with modern web technologies for accessibility and performance

## 📞 Contact

- **GitHub**: [@rudrawhocodes](https://github.com/rudrawhocodes)
- **Issues**: [Project Issues](https://github.com/rudrawhocodes/dsa/issues)

---

**Happy Learning! 🎉** Start your journey into Data Structures and Algorithms with interactive visualizations!
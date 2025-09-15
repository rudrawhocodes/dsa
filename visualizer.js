// DSA Visualizer - Main JavaScript File
class DSAVisualizer {
    constructor() {
        this.canvas = document.getElementById('visualization-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentLanguage = 'java';
        this.currentTopic = null;
        this.isPlaying = false;
        this.animationSpeed = 500; // milliseconds
        this.currentStep = 0;
        this.maxSteps = 0;
        this.animationId = null;
        
        this.initializeEventListeners();
        this.resizeCanvas();
        this.showWelcomeMessage();
    }

    initializeEventListeners() {
        // Language selector buttons
        document.getElementById('java-btn').addEventListener('click', () => this.setLanguage('java'));
        document.getElementById('cpp-btn').addEventListener('click', () => this.setLanguage('cpp'));

        // Topic buttons
        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.loadTopic(e.target.dataset.topic));
        });

        // Control buttons
        document.getElementById('play-btn').addEventListener('click', () => this.play());
        document.getElementById('pause-btn').addEventListener('click', () => this.pause());
        document.getElementById('reset-btn').addEventListener('click', () => this.reset());
        document.getElementById('step-btn').addEventListener('click', () => this.step());

        // Speed slider
        document.getElementById('speed-slider').addEventListener('input', (e) => {
            this.animationSpeed = 1000 - (e.target.value * 90); // Inverse relationship
        });

        // Copy code button
        document.getElementById('copy-code-btn').addEventListener('click', () => this.copyCode());

        // Resize canvas when window resizes
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    setLanguage(language) {
        this.currentLanguage = language;
        
        // Update button states
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${language}-btn`).classList.add('active');

        // Reload current topic with new language
        if (this.currentTopic) {
            this.loadTopic(this.currentTopic);
        }
    }

    loadTopic(topic) {
        this.currentTopic = topic;
        this.reset();

        // Update active topic button
        document.querySelectorAll('.topic-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-topic="${topic}"]`).classList.add('active');

        // Load topic-specific content
        const topicData = this.getTopicData(topic);
        document.getElementById('current-topic').textContent = topicData.title;
        document.getElementById('explanation-text').textContent = topicData.explanation;
        document.getElementById('code-display').innerHTML = this.formatCode(topicData.code[this.currentLanguage]);

        // Initialize visualization
        this.initializeVisualization(topic);
    }

    getTopicData(topic) {
        const topics = {
            array: {
                title: 'Arrays - Dynamic Access',
                explanation: 'Arrays store elements in contiguous memory locations. Each element can be accessed using its index in constant time O(1).',
                code: {
                    java: `// Array implementation in Java
public class Array {
    private int[] arr;
    private int size;
    
    public Array(int capacity) {
        arr = new int[capacity];
        size = 0;
    }
    
    public void insert(int index, int value) {
        if (index >= 0 && index <= size) {
            // Shift elements to the right
            for (int i = size; i > index; i--) {
                arr[i] = arr[i - 1];
            }
            arr[index] = value;
            size++;
        }
    }
    
    public int get(int index) {
        if (index >= 0 && index < size) {
            return arr[index];
        }
        return -1; // Error value
    }
    
    public void delete(int index) {
        if (index >= 0 && index < size) {
            // Shift elements to the left
            for (int i = index; i < size - 1; i++) {
                arr[i] = arr[i + 1];
            }
            size--;
        }
    }
}`,
                    cpp: `// Array implementation in C++
#include <iostream>
#include <vector>
using namespace std;

class Array {
private:
    vector<int> arr;
    int size;
    
public:
    Array(int capacity) {
        arr.resize(capacity);
        size = 0;
    }
    
    void insert(int index, int value) {
        if (index >= 0 && index <= size) {
            // Shift elements to the right
            for (int i = size; i > index; i--) {
                arr[i] = arr[i - 1];
            }
            arr[index] = value;
            size++;
        }
    }
    
    int get(int index) {
        if (index >= 0 && index < size) {
            return arr[index];
        }
        return -1; // Error value
    }
    
    void remove(int index) {
        if (index >= 0 && index < size) {
            // Shift elements to the left
            for (int i = index; i < size - 1; i++) {
                arr[i] = arr[i + 1];
            }
            size--;
        }
    }
};`
                }
            },
            linkedlist: {
                title: 'Linked List - Dynamic Memory',
                explanation: 'Linked Lists store data in nodes connected by pointers. They allow dynamic memory allocation and efficient insertion/deletion.',
                code: {
                    java: `// Linked List implementation in Java
class ListNode {
    int val;
    ListNode next;
    
    ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}

public class LinkedList {
    private ListNode head;
    
    public LinkedList() {
        head = null;
    }
    
    public void insertAtHead(int val) {
        ListNode newNode = new ListNode(val);
        newNode.next = head;
        head = newNode;
    }
    
    public void insertAtTail(int val) {
        ListNode newNode = new ListNode(val);
        if (head == null) {
            head = newNode;
            return;
        }
        
        ListNode current = head;
        while (current.next != null) {
            current = current.next;
        }
        current.next = newNode;
    }
    
    public boolean delete(int val) {
        if (head == null) return false;
        
        if (head.val == val) {
            head = head.next;
            return true;
        }
        
        ListNode current = head;
        while (current.next != null && current.next.val != val) {
            current = current.next;
        }
        
        if (current.next != null) {
            current.next = current.next.next;
            return true;
        }
        return false;
    }
}`,
                    cpp: `// Linked List implementation in C++
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    
    ListNode(int x) : val(x), next(nullptr) {}
};

class LinkedList {
private:
    ListNode* head;
    
public:
    LinkedList() : head(nullptr) {}
    
    void insertAtHead(int val) {
        ListNode* newNode = new ListNode(val);
        newNode->next = head;
        head = newNode;
    }
    
    void insertAtTail(int val) {
        ListNode* newNode = new ListNode(val);
        if (!head) {
            head = newNode;
            return;
        }
        
        ListNode* current = head;
        while (current->next) {
            current = current->next;
        }
        current->next = newNode;
    }
    
    bool remove(int val) {
        if (!head) return false;
        
        if (head->val == val) {
            ListNode* temp = head;
            head = head->next;
            delete temp;
            return true;
        }
        
        ListNode* current = head;
        while (current->next && current->next->val != val) {
            current = current->next;
        }
        
        if (current->next) {
            ListNode* temp = current->next;
            current->next = current->next->next;
            delete temp;
            return true;
        }
        return false;
    }
};`
                }
            },
            stack: {
                title: 'Stack - LIFO Structure',
                explanation: 'Stack follows Last In First Out (LIFO) principle. Elements are added and removed from the same end called the top.',
                code: {
                    java: `// Stack implementation in Java
import java.util.ArrayList;

public class Stack {
    private ArrayList<Integer> stack;
    
    public Stack() {
        stack = new ArrayList<>();
    }
    
    public void push(int val) {
        stack.add(val);
    }
    
    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return stack.remove(stack.size() - 1);
    }
    
    public int peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return stack.get(stack.size() - 1);
    }
    
    public boolean isEmpty() {
        return stack.size() == 0;
    }
    
    public int size() {
        return stack.size();
    }
}`,
                    cpp: `// Stack implementation in C++
#include <iostream>
#include <vector>
#include <stdexcept>
using namespace std;

class Stack {
private:
    vector<int> stack;
    
public:
    void push(int val) {
        stack.push_back(val);
    }
    
    int pop() {
        if (isEmpty()) {
            throw runtime_error("Stack is empty");
        }
        int val = stack.back();
        stack.pop_back();
        return val;
    }
    
    int top() {
        if (isEmpty()) {
            throw runtime_error("Stack is empty");
        }
        return stack.back();
    }
    
    bool isEmpty() {
        return stack.empty();
    }
    
    int size() {
        return stack.size();
    }
};`
                }
            },
            queue: {
                title: 'Queue - FIFO Structure',
                explanation: 'Queue follows First In First Out (FIFO) principle. Elements are added at the rear and removed from the front.',
                code: {
                    java: `// Queue implementation in Java
import java.util.LinkedList;

public class Queue {
    private LinkedList<Integer> queue;
    
    public Queue() {
        queue = new LinkedList<>();
    }
    
    public void enqueue(int val) {
        queue.addLast(val);
    }
    
    public int dequeue() {
        if (isEmpty()) {
            throw new RuntimeException("Queue is empty");
        }
        return queue.removeFirst();
    }
    
    public int front() {
        if (isEmpty()) {
            throw new RuntimeException("Queue is empty");
        }
        return queue.peekFirst();
    }
    
    public boolean isEmpty() {
        return queue.size() == 0;
    }
    
    public int size() {
        return queue.size();
    }
}`,
                    cpp: `// Queue implementation in C++
#include <iostream>
#include <queue>
#include <stdexcept>
using namespace std;

class Queue {
private:
    queue<int> q;
    
public:
    void enqueue(int val) {
        q.push(val);
    }
    
    int dequeue() {
        if (isEmpty()) {
            throw runtime_error("Queue is empty");
        }
        int val = q.front();
        q.pop();
        return val;
    }
    
    int front() {
        if (isEmpty()) {
            throw runtime_error("Queue is empty");
        }
        return q.front();
    }
    
    bool isEmpty() {
        return q.empty();
    }
    
    int size() {
        return q.size();
    }
};`
                }
            },
            tree: {
                title: 'Binary Tree - Hierarchical Structure',
                explanation: 'Binary Trees organize data hierarchically where each node has at most two children (left and right). Perfect for searching and sorting operations.',
                code: {
                    java: `// Binary Tree implementation in Java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

public class BinaryTree {
    private TreeNode root;
    
    public BinaryTree() {
        root = null;
    }
    
    public void insert(int val) {
        root = insertRec(root, val);
    }
    
    private TreeNode insertRec(TreeNode node, int val) {
        if (node == null) {
            return new TreeNode(val);
        }
        
        if (val < node.val) {
            node.left = insertRec(node.left, val);
        } else if (val > node.val) {
            node.right = insertRec(node.right, val);
        }
        
        return node;
    }
    
    public boolean search(int val) {
        return searchRec(root, val);
    }
    
    private boolean searchRec(TreeNode node, int val) {
        if (node == null) return false;
        if (node.val == val) return true;
        
        return val < node.val ? 
            searchRec(node.left, val) : 
            searchRec(node.right, val);
    }
    
    public void inorderTraversal() {
        inorderRec(root);
    }
    
    private void inorderRec(TreeNode node) {
        if (node != null) {
            inorderRec(node.left);
            System.out.print(node.val + " ");
            inorderRec(node.right);
        }
    }
}`,
                    cpp: `// Binary Tree implementation in C++
#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class BinaryTree {
private:
    TreeNode* root;
    
    TreeNode* insertRec(TreeNode* node, int val) {
        if (!node) {
            return new TreeNode(val);
        }
        
        if (val < node->val) {
            node->left = insertRec(node->left, val);
        } else if (val > node->val) {
            node->right = insertRec(node->right, val);
        }
        
        return node;
    }
    
    bool searchRec(TreeNode* node, int val) {
        if (!node) return false;
        if (node->val == val) return true;
        
        return val < node->val ? 
            searchRec(node->left, val) : 
            searchRec(node->right, val);
    }
    
    void inorderRec(TreeNode* node) {
        if (node) {
            inorderRec(node->left);
            cout << node->val << " ";
            inorderRec(node->right);
        }
    }
    
public:
    BinaryTree() : root(nullptr) {}
    
    void insert(int val) {
        root = insertRec(root, val);
    }
    
    bool search(int val) {
        return searchRec(root, val);
    }
    
    void inorderTraversal() {
        inorderRec(root);
        cout << endl;
    }
};`
                }
            },
            graph: {
                title: 'Graph - Network Connections',
                explanation: 'Graphs represent networks of connected nodes (vertices) linked by edges. Used for modeling relationships, networks, and pathfinding.',
                code: {
                    java: `// Graph implementation in Java
import java.util.*;

public class Graph {
    private Map<Integer, List<Integer>> adjacencyList;
    
    public Graph() {
        adjacencyList = new HashMap<>();
    }
    
    public void addVertex(int vertex) {
        adjacencyList.putIfAbsent(vertex, new ArrayList<>());
    }
    
    public void addEdge(int source, int destination) {
        adjacencyList.get(source).add(destination);
        adjacencyList.get(destination).add(source); // Undirected graph
    }
    
    public void bfs(int startVertex) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        
        visited.add(startVertex);
        queue.offer(startVertex);
        
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            System.out.print(vertex + " ");
            
            for (int neighbor : adjacencyList.get(vertex)) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
    }
    
    public void dfs(int startVertex) {
        Set<Integer> visited = new HashSet<>();
        dfsUtil(startVertex, visited);
    }
    
    private void dfsUtil(int vertex, Set<Integer> visited) {
        visited.add(vertex);
        System.out.print(vertex + " ");
        
        for (int neighbor : adjacencyList.get(vertex)) {
            if (!visited.contains(neighbor)) {
                dfsUtil(neighbor, visited);
            }
        }
    }
}`,
                    cpp: `// Graph implementation in C++
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>
#include <unordered_map>
using namespace std;

class Graph {
private:
    unordered_map<int, vector<int>> adjacencyList;
    
    void dfsUtil(int vertex, unordered_set<int>& visited) {
        visited.insert(vertex);
        cout << vertex << " ";
        
        for (int neighbor : adjacencyList[vertex]) {
            if (visited.find(neighbor) == visited.end()) {
                dfsUtil(neighbor, visited);
            }
        }
    }
    
public:
    void addVertex(int vertex) {
        if (adjacencyList.find(vertex) == adjacencyList.end()) {
            adjacencyList[vertex] = vector<int>();
        }
    }
    
    void addEdge(int source, int destination) {
        adjacencyList[source].push_back(destination);
        adjacencyList[destination].push_back(source); // Undirected
    }
    
    void bfs(int startVertex) {
        unordered_set<int> visited;
        queue<int> q;
        
        visited.insert(startVertex);
        q.push(startVertex);
        
        while (!q.empty()) {
            int vertex = q.front();
            q.pop();
            cout << vertex << " ";
            
            for (int neighbor : adjacencyList[vertex]) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    q.push(neighbor);
                }
            }
        }
    }
    
    void dfs(int startVertex) {
        unordered_set<int> visited;
        dfsUtil(startVertex, visited);
    }
};`
                }
            },
            quicksort: {
                title: 'Quick Sort Algorithm',
                explanation: 'Quick Sort uses divide-and-conquer by selecting a pivot element and partitioning the array around it. Time Complexity: Average O(n log n), Worst O(n²)',
                code: {
                    java: `// Quick Sort implementation in Java
public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            
            quickSort(arr, low, pi - 1);  // Before pi
            quickSort(arr, pi + 1, high); // After pi
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // Choose rightmost as pivot
        int i = (low - 1); // Index of smaller element
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                
                // Swap elements
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        // Swap pivot with element at i+1
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;
    }
    
    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        System.out.println("Original array:");
        printArray(arr);
        
        quickSort(arr, 0, arr.length - 1);
        
        System.out.println("Sorted array:");
        printArray(arr);
    }
    
    public static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}`,
                    cpp: `// Quick Sort implementation in C++
#include <iostream>
#include <vector>
using namespace std;

class QuickSort {
private:
    static int partition(vector<int>& arr, int low, int high) {
        int pivot = arr[high]; // Choose rightmost as pivot
        int i = (low - 1); // Index of smaller element
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr[i], arr[j]);
            }
        }
        swap(arr[i + 1], arr[high]);
        return i + 1;
    }
    
public:
    static void quickSort(vector<int>& arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            
            quickSort(arr, low, pi - 1);  // Before pi
            quickSort(arr, pi + 1, high); // After pi
        }
    }
};

void printArray(const vector<int>& arr) {
    for (int value : arr) {
        cout << value << " ";
    }
    cout << endl;
}

int main() {
    vector<int> arr = {10, 7, 8, 9, 1, 5};
    
    cout << "Original array: ";
    printArray(arr);
    
    QuickSort::quickSort(arr, 0, arr.size() - 1);
    
    cout << "Sorted array: ";
    printArray(arr);
    
    return 0;
}`
                }
            },
            mergesort: {
                title: 'Merge Sort Algorithm',
                explanation: 'Merge Sort divides the array into halves, recursively sorts them, then merges the sorted halves. Time Complexity: O(n log n) - always stable performance.',
                code: {
                    java: `// Merge Sort implementation in Java
public class MergeSort {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            
            merge(arr, left, mid, right);
        }
    }
    
    private static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        int[] leftArr = new int[n1];
        int[] rightArr = new int[n2];
        
        for (int i = 0; i < n1; i++)
            leftArr[i] = arr[left + i];
        for (int j = 0; j < n2; j++)
            rightArr[j] = arr[mid + 1 + j];
        
        int i = 0, j = 0, k = left;
        
        while (i < n1 && j < n2) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }
        
        while (i < n1) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        
        while (j < n2) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }
}`,
                    cpp: `// Merge Sort implementation in C++
#include <iostream>
#include <vector>
using namespace std;

class MergeSort {
private:
    static void merge(vector<int>& arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        vector<int> leftArr(n1), rightArr(n2);
        
        for (int i = 0; i < n1; i++)
            leftArr[i] = arr[left + i];
        for (int j = 0; j < n2; j++)
            rightArr[j] = arr[mid + 1 + j];
        
        int i = 0, j = 0, k = left;
        
        while (i < n1 && j < n2) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }
        
        while (i < n1) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        
        while (j < n2) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }
    
public:
    static void mergeSort(vector<int>& arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            
            merge(arr, left, mid, right);
        }
    }
};`
                }
            },
            bfs: {
                title: 'Breadth-First Search (BFS)',
                explanation: 'BFS explores a graph level by level, visiting all neighbors before moving to the next level. Uses a queue data structure. Time Complexity: O(V + E)',
                code: {
                    java: `// BFS implementation in Java
import java.util.*;

public class BFS {
    public static void bfsTraversal(Map<Integer, List<Integer>> graph, int startVertex) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();
        
        visited.add(startVertex);
        queue.offer(startVertex);
        
        System.out.println("BFS Traversal starting from vertex " + startVertex + ":");
        
        while (!queue.isEmpty()) {
            int currentVertex = queue.poll();
            System.out.print(currentVertex + " ");
            
            // Visit all unvisited neighbors
            for (int neighbor : graph.getOrDefault(currentVertex, new ArrayList<>())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        Map<Integer, List<Integer>> graph = new HashMap<>();
        graph.put(0, Arrays.asList(1, 2));
        graph.put(1, Arrays.asList(0, 3, 4));
        graph.put(2, Arrays.asList(0, 5));
        graph.put(3, Arrays.asList(1));
        graph.put(4, Arrays.asList(1, 5));
        graph.put(5, Arrays.asList(2, 4));
        
        bfsTraversal(graph, 0);
    }
}`,
                    cpp: `// BFS implementation in C++
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>
#include <unordered_map>
using namespace std;

class BFS {
public:
    static void bfsTraversal(const unordered_map<int, vector<int>>& graph, int startVertex) {
        unordered_set<int> visited;
        queue<int> q;
        
        visited.insert(startVertex);
        q.push(startVertex);
        
        cout << "BFS Traversal starting from vertex " << startVertex << ":" << endl;
        
        while (!q.empty()) {
            int currentVertex = q.front();
            q.pop();
            cout << currentVertex << " ";
            
            // Visit all unvisited neighbors
            auto it = graph.find(currentVertex);
            if (it != graph.end()) {
                for (int neighbor : it->second) {
                    if (visited.find(neighbor) == visited.end()) {
                        visited.insert(neighbor);
                        q.push(neighbor);
                    }
                }
            }
        }
        cout << endl;
    }
};

int main() {
    unordered_map<int, vector<int>> graph = {
        {0, {1, 2}},
        {1, {0, 3, 4}},
        {2, {0, 5}},
        {3, {1}},
        {4, {1, 5}},
        {5, {2, 4}}
    };
    
    BFS::bfsTraversal(graph, 0);
    return 0;
}`
                }
            },
            dfs: {
                title: 'Depth-First Search (DFS)',
                explanation: 'DFS explores a graph by going as deep as possible before backtracking. Uses recursion or a stack. Time Complexity: O(V + E)',
                code: {
                    java: `// DFS implementation in Java
import java.util.*;

public class DFS {
    public static void dfsTraversal(Map<Integer, List<Integer>> graph, int startVertex) {
        Set<Integer> visited = new HashSet<>();
        System.out.println("DFS Traversal starting from vertex " + startVertex + ":");
        dfsUtil(graph, startVertex, visited);
        System.out.println();
    }
    
    private static void dfsUtil(Map<Integer, List<Integer>> graph, int vertex, Set<Integer> visited) {
        visited.add(vertex);
        System.out.print(vertex + " ");
        
        // Recursively visit all unvisited neighbors
        for (int neighbor : graph.getOrDefault(vertex, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                dfsUtil(graph, neighbor, visited);
            }
        }
    }
    
    public static void main(String[] args) {
        Map<Integer, List<Integer>> graph = new HashMap<>();
        graph.put(0, Arrays.asList(1, 2));
        graph.put(1, Arrays.asList(0, 3, 4));
        graph.put(2, Arrays.asList(0, 5));
        graph.put(3, Arrays.asList(1));
        graph.put(4, Arrays.asList(1, 5));
        graph.put(5, Arrays.asList(2, 4));
        
        dfsTraversal(graph, 0);
    }
}`,
                    cpp: `// DFS implementation in C++
#include <iostream>
#include <vector>
#include <unordered_set>
#include <unordered_map>
using namespace std;

class DFS {
private:
    static void dfsUtil(const unordered_map<int, vector<int>>& graph, int vertex, unordered_set<int>& visited) {
        visited.insert(vertex);
        cout << vertex << " ";
        
        // Recursively visit all unvisited neighbors
        auto it = graph.find(vertex);
        if (it != graph.end()) {
            for (int neighbor : it->second) {
                if (visited.find(neighbor) == visited.end()) {
                    dfsUtil(graph, neighbor, visited);
                }
            }
        }
    }
    
public:
    static void dfsTraversal(const unordered_map<int, vector<int>>& graph, int startVertex) {
        unordered_set<int> visited;
        cout << "DFS Traversal starting from vertex " << startVertex << ":" << endl;
        dfsUtil(graph, startVertex, visited);
        cout << endl;
    }
};

int main() {
    unordered_map<int, vector<int>> graph = {
        {0, {1, 2}},
        {1, {0, 3, 4}},
        {2, {0, 5}},
        {3, {1}},
        {4, {1, 5}},
        {5, {2, 4}}
    };
    
    DFS::dfsTraversal(graph, 0);
    return 0;
}`
                }
            },
            bubblesort: {
                title: 'Bubble Sort Algorithm',
                explanation: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Time Complexity: O(n²)',
                code: {
                    java: `// Bubble Sort implementation in Java
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // If no swapping occurred, array is sorted
            if (!swapped) {
                break;
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original array:");
        printArray(arr);
        
        bubbleSort(arr);
        
        System.out.println("Sorted array:");
        printArray(arr);
    }
    
    public static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}`,
                    cpp: `// Bubble Sort implementation in C++
#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        // If no swapping occurred, array is sorted
        if (!swapped) {
            break;
        }
    }
}

void printArray(const vector<int>& arr) {
    for (int value : arr) {
        cout << value << " ";
    }
    cout << endl;
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "Original array: ";
    printArray(arr);
    
    bubbleSort(arr);
    
    cout << "Sorted array: ";
    printArray(arr);
    
    return 0;
}`
                }
            }
        };

        return topics[topic] || {
            title: 'Topic Not Found',
            explanation: 'The selected topic is not yet implemented.',
            code: { java: '// Coming soon...', cpp: '// Coming soon...' }
        };
    }

    formatCode(code) {
        // Basic syntax highlighting
        return code
            .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
            .replace(/\b(public|private|class|int|void|if|else|for|while|return|new|static|import|include|using|namespace|struct|bool|true|false)\b/g, '<span class="keyword">$1</span>')
            .replace(/".*?"/g, '<span class="string">$&</span>')
            .replace(/\b\d+\b/g, '<span class="number">$&</span>')
            .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="function">$1</span>(');
    }

    initializeVisualization(topic) {
        this.clearCanvas();
        
        switch(topic) {
            case 'array':
                this.visualizeArray();
                break;
            case 'linkedlist':
                this.visualizeLinkedList();
                break;
            case 'stack':
                this.visualizeStack();
                break;
            case 'queue':
                this.visualizeQueue();
                break;
            case 'tree':
                this.visualizeTree();
                break;
            case 'graph':
                this.visualizeGraph();
                break;
            case 'quicksort':
                this.visualizeQuickSort();
                break;
            case 'mergesort':
                this.visualizeMergeSort();
                break;
            case 'bfs':
                this.visualizeBFS();
                break;
            case 'dfs':
                this.visualizeDFS();
                break;
            case 'bubblesort':
                this.visualizeBubbleSort();
                break;
            default:
                this.showWelcomeMessage();
        }
    }

    visualizeArray() {
        const array = [5, 2, 8, 1, 9, 3];
        const startX = 100;
        const startY = 200;
        const cellWidth = 80;
        const cellHeight = 50;

        this.clearCanvas();
        
        // Draw array cells
        array.forEach((value, index) => {
            const x = startX + index * cellWidth;
            
            // Draw cell border
            this.ctx.strokeStyle = '#667eea';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, startY, cellWidth, cellHeight);
            
            // Fill cell
            this.ctx.fillStyle = '#f7fafc';
            this.ctx.fillRect(x, startY, cellWidth, cellHeight);
            
            // Draw value
            this.ctx.fillStyle = '#4a5568';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(value, x + cellWidth/2, startY + cellHeight/2 + 7);
            
            // Draw index
            this.ctx.fillStyle = '#718096';
            this.ctx.font = '14px Arial';
            this.ctx.fillText(index, x + cellWidth/2, startY - 10);
        });

        // Draw title
        this.ctx.fillStyle = '#4a5568';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Array Elements (Index: 0, 1, 2, 3, 4, 5)', startX, startY - 30);
    }

    visualizeLinkedList() {
        const nodes = [5, 2, 8, 1];
        const startX = 50;
        const startY = 200;
        const nodeWidth = 80;
        const nodeHeight = 50;
        const spacing = 120;

        this.clearCanvas();

        nodes.forEach((value, index) => {
            const x = startX + index * spacing;
            
            // Draw node
            this.ctx.fillStyle = '#667eea';
            this.ctx.fillRect(x, startY, nodeWidth, nodeHeight);
            
            // Draw value
            this.ctx.fillStyle = 'white';
            this.ctx.font = '18px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(value, x + nodeWidth/2, startY + nodeHeight/2 + 6);
            
            // Draw arrow to next node
            if (index < nodes.length - 1) {
                this.drawArrow(x + nodeWidth, startY + nodeHeight/2, x + spacing - 10, startY + nodeHeight/2);
            } else {
                // Draw null pointer
                this.ctx.fillStyle = '#e53e3e';
                this.ctx.fillText('NULL', x + nodeWidth + 30, startY + nodeHeight/2 + 6);
            }
        });

        // Draw head pointer
        this.ctx.fillStyle = '#38a169';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('HEAD', startX + nodeWidth/2, startY - 20);
        this.drawArrow(startX + nodeWidth/2, startY - 5, startX + nodeWidth/2, startY);
    }

    visualizeStack() {
        const stack = [1, 3, 5, 7];
        const x = 300;
        const bottomY = 350;
        const width = 100;
        const height = 40;

        this.clearCanvas();

        // Draw stack base
        this.ctx.fillStyle = '#4a5568';
        this.ctx.fillRect(x - 10, bottomY, width + 20, 5);

        // Draw stack elements from bottom to top
        stack.forEach((value, index) => {
            const y = bottomY - (index + 1) * height;
            
            // Draw element
            this.ctx.fillStyle = index === stack.length - 1 ? '#667eea' : '#a0aec0';
            this.ctx.fillRect(x, y, width, height);
            
            // Draw border
            this.ctx.strokeStyle = '#4a5568';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, y, width, height);
            
            // Draw value
            this.ctx.fillStyle = 'white';
            this.ctx.font = '18px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(value, x + width/2, y + height/2 + 6);
        });

        // Draw TOP pointer
        this.ctx.fillStyle = '#e53e3e';
        this.ctx.font = '16px Arial';
        this.ctx.fillText('TOP', x + width + 20, bottomY - (stack.length - 1) * height + height/2);
        this.drawArrow(x + width + 15, bottomY - (stack.length - 1) * height + height/2, x + width, bottomY - (stack.length - 1) * height + height/2);

        // Operations
        this.ctx.fillStyle = '#4a5568';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Operations: PUSH (add to top), POP (remove from top)', 50, 50);
    }

    visualizeQueue() {
        const queue = [2, 4, 6, 8];
        const startX = 150;
        const y = 200;
        const width = 80;
        const height = 50;

        this.clearCanvas();

        // Draw queue elements
        queue.forEach((value, index) => {
            const x = startX + index * width;
            
            // Draw element
            this.ctx.fillStyle = '#667eea';
            this.ctx.fillRect(x, y, width, height);
            
            // Draw border
            this.ctx.strokeStyle = '#4a5568';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, y, width, height);
            
            // Draw value
            this.ctx.fillStyle = 'white';
            this.ctx.font = '18px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(value, x + width/2, y + height/2 + 6);
        });

        // Draw FRONT and REAR pointers
        this.ctx.fillStyle = '#38a169';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('FRONT', startX + width/2, y - 20);
        this.drawArrow(startX + width/2, y - 5, startX + width/2, y);

        this.ctx.fillStyle = '#e53e3e';
        this.ctx.fillText('REAR', startX + (queue.length - 1) * width + width/2, y + height + 35);
        this.drawArrow(startX + (queue.length - 1) * width + width/2, y + height + 20, startX + (queue.length - 1) * width + width/2, y + height);

        // Operations
        this.ctx.fillStyle = '#4a5568';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Operations: ENQUEUE (add to rear), DEQUEUE (remove from front)', 50, 50);
    }

    visualizeTree() {
        const nodes = [
            { value: 50, x: 400, y: 100, level: 0 },
            { value: 30, x: 250, y: 180, level: 1 },
            { value: 70, x: 550, y: 180, level: 1 },
            { value: 20, x: 180, y: 260, level: 2 },
            { value: 40, x: 320, y: 260, level: 2 },
            { value: 60, x: 480, y: 260, level: 2 },
            { value: 80, x: 620, y: 260, level: 2 }
        ];

        this.clearCanvas();

        // Draw connections first
        const connections = [
            [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]
        ];

        this.ctx.strokeStyle = '#4a5568';
        this.ctx.lineWidth = 2;
        connections.forEach(([from, to]) => {
            const fromNode = nodes[from];
            const toNode = nodes[to];
            this.ctx.beginPath();
            this.ctx.moveTo(fromNode.x, fromNode.y);
            this.ctx.lineTo(toNode.x, toNode.y);
            this.ctx.stroke();
        });

        // Draw nodes
        nodes.forEach(node => {
            // Draw circle
            this.ctx.fillStyle = '#667eea';
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
            this.ctx.fill();

            // Draw border
            this.ctx.strokeStyle = '#4a5568';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Draw value
            this.ctx.fillStyle = 'white';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(node.value, node.x, node.y + 5);
        });

        // Draw title
        this.ctx.fillStyle = '#4a5568';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Binary Search Tree (In-order: 20, 30, 40, 50, 60, 70, 80)', 50, 50);
    }

    visualizeGraph() {
        const nodes = [
            { id: 'A', x: 150, y: 150 },
            { id: 'B', x: 300, y: 100 },
            { id: 'C', x: 450, y: 150 },
            { id: 'D', x: 200, y: 280 },
            { id: 'E', x: 400, y: 280 }
        ];

        const edges = [
            ['A', 'B'], ['A', 'D'], ['B', 'C'], ['B', 'E'], ['C', 'E'], ['D', 'E']
        ];

        this.clearCanvas();

        // Draw edges
        this.ctx.strokeStyle = '#667eea';
        this.ctx.lineWidth = 3;
        edges.forEach(([from, to]) => {
            const fromNode = nodes.find(n => n.id === from);
            const toNode = nodes.find(n => n.id === to);
            
            this.ctx.beginPath();
            this.ctx.moveTo(fromNode.x, fromNode.y);
            this.ctx.lineTo(toNode.x, toNode.y);
            this.ctx.stroke();
        });

        // Draw nodes
        nodes.forEach(node => {
            // Draw circle
            this.ctx.fillStyle = '#38a169';
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 30, 0, 2 * Math.PI);
            this.ctx.fill();

            // Draw border
            this.ctx.strokeStyle = '#2d7d32';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();

            // Draw label
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 18px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(node.id, node.x, node.y + 6);
        });

        // Draw title
        this.ctx.fillStyle = '#4a5568';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Undirected Graph - Vertices: A, B, C, D, E', 50, 50);
        this.ctx.fillText('Edges represent connections between vertices', 50, 75);
    }

    visualizeQuickSort() {
        const array = [3, 6, 8, 10, 1, 2, 1];
        const startX = 100;
        const startY = 200;
        const barWidth = 60;
        const maxHeight = 150;
        const maxValue = Math.max(...array);

        this.clearCanvas();

        array.forEach((value, index) => {
            const x = startX + index * (barWidth + 10);
            const height = (value / maxValue) * maxHeight;
            const y = startY - height;

            // Highlight pivot (last element)
            let color = '#667eea';
            if (index === array.length - 1) {
                color = '#e53e3e'; // Red for pivot
            }

            // Draw bar
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, barWidth, height);
            
            // Draw value
            this.ctx.fillStyle = '#4a5568';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(value, x + barWidth/2, y - 10);
        });

        // Draw algorithm info
        this.ctx.fillStyle = '#4a5568';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Quick Sort - Divide and Conquer', 50, 50);
        this.ctx.fillText('Red bar shows pivot element', 50, 75);
        this.ctx.fillText('Partition around pivot, then recursively sort sub-arrays', 50, 100);
    }

    visualizeMergeSort() {
        this.clearCanvas();
        
        // Draw merge sort tree visualization
        const levels = [
            { arrays: [[38, 27, 43, 3, 9, 82, 10]], y: 80 },
            { arrays: [[38, 27, 43, 3], [9, 82, 10]], y: 140 },
            { arrays: [[38, 27], [43, 3], [9, 82], [10]], y: 200 },
            { arrays: [[38], [27], [43], [3], [9], [82], [10]], y: 260 },
        ];

        levels.forEach((level, levelIndex) => {
            level.arrays.forEach((array, arrayIndex) => {
                const totalWidth = level.arrays.length * 120;
                const startX = (this.canvas.width - totalWidth) / 2 + arrayIndex * 120;
                
                array.forEach((value, valueIndex) => {
                    const x = startX + valueIndex * 15;
                    const y = level.y;
                    
                    const color = levelIndex === 0 ? '#e53e3e' : 
                                 levelIndex === 1 ? '#667eea' : 
                                 levelIndex === 2 ? '#38a169' : '#ffd700';
                    
                    this.ctx.fillStyle = color;
                    this.ctx.fillRect(x, y, 12, 20);
                    
                    this.ctx.fillStyle = 'white';
                    this.ctx.font = '10px Arial';
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText(value, x + 6, y + 14);
                });
            });
        });

        // Title
        this.ctx.fillStyle = '#4a5568';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Merge Sort - Divide and Merge', 50, 30);
    }

    visualizeBFS() {
        const nodes = [
            { id: '0', x: 250, y: 100 },
            { id: '1', x: 150, y: 200 },
            { id: '2', x: 350, y: 200 },
            { id: '3', x: 100, y: 300 },
            { id: '4', x: 200, y: 300 }
        ];

        const edges = [[0, 1], [0, 2], [1, 3], [1, 4]];

        this.clearCanvas();

        // Draw edges
        this.ctx.strokeStyle = '#a0aec0';
        this.ctx.lineWidth = 2;
        edges.forEach(([from, to]) => {
            const fromNode = nodes[from];
            const toNode = nodes[to];
            this.ctx.beginPath();
            this.ctx.moveTo(fromNode.x, fromNode.y);
            this.ctx.lineTo(toNode.x, toNode.y);
            this.ctx.stroke();
        });

        // Draw nodes with BFS order coloring
        const colors = ['#e53e3e', '#fd7f6f', '#feb47b', '#ffeaa7', '#74b9ff'];
        nodes.forEach((node, index) => {
            this.ctx.fillStyle = colors[index];
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
            this.ctx.fill();

            this.ctx.strokeStyle = '#4a5568';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(node.id, node.x, node.y + 5);
        });

        this.ctx.fillStyle = '#4a5568';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('BFS Traversal - Level by Level', 50, 50);
        this.ctx.fillText('Visit order: 0 → 1 → 2 → 3 → 4', 50, 75);
    }

    visualizeDFS() {
        const nodes = [
            { id: '0', x: 250, y: 100 },
            { id: '1', x: 150, y: 200 },
            { id: '2', x: 350, y: 200 },
            { id: '3', x: 100, y: 300 },
            { id: '4', x: 200, y: 300 }
        ];

        const edges = [[0, 1], [0, 2], [1, 3], [1, 4]];

        this.clearCanvas();

        // Draw edges
        this.ctx.strokeStyle = '#a0aec0';
        this.ctx.lineWidth = 2;
        edges.forEach(([from, to]) => {
            const fromNode = nodes[from];
            const toNode = nodes[to];
            this.ctx.beginPath();
            this.ctx.moveTo(fromNode.x, fromNode.y);
            this.ctx.lineTo(toNode.x, toNode.y);
            this.ctx.stroke();
        });

        // Draw nodes with DFS order coloring
        const dfsOrder = [0, 1, 3, 4, 2];
        const colors = ['#e53e3e', '#fd7f6f', '#ffeaa7', '#feb47b', '#74b9ff'];
        nodes.forEach((node, index) => {
            const orderIndex = dfsOrder.indexOf(index);
            this.ctx.fillStyle = colors[orderIndex];
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
            this.ctx.fill();

            this.ctx.strokeStyle = '#4a5568';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(node.id, node.x, node.y + 5);
        });

        this.ctx.fillStyle = '#4a5568';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('DFS Traversal - Go Deep First', 50, 50);
        this.ctx.fillText('Visit order: 0 → 1 → 3 → 4 → 2', 50, 75);
    }

    visualizeBubbleSort() {
        this.sortArray = [64, 34, 25, 12, 22, 11, 90];
        this.currentStep = 0;
        this.maxSteps = this.sortArray.length * this.sortArray.length;
        this.sortSteps = this.generateBubbleSortSteps();
        this.drawSortVisualization();
    }

    generateBubbleSortSteps() {
        const arr = [...this.sortArray];
        const steps = [];
        
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                steps.push({
                    array: [...arr],
                    comparing: [j, j + 1],
                    action: arr[j] > arr[j + 1] ? 'swap' : 'compare'
                });
                
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    steps.push({
                        array: [...arr],
                        comparing: [j, j + 1],
                        action: 'swapped'
                    });
                }
            }
        }
        
        return steps;
    }

    drawSortVisualization() {
        this.clearCanvas();
        
        const currentStepData = this.sortSteps[this.currentStep] || { array: this.sortArray, comparing: [], action: 'start' };
        const startX = 100;
        const startY = 250;
        const barWidth = 60;
        const maxHeight = 150;
        const maxValue = Math.max(...this.sortArray);

        currentStepData.array.forEach((value, index) => {
            const x = startX + index * (barWidth + 10);
            const height = (value / maxValue) * maxHeight;
            const y = startY - height;

            // Determine color based on state
            let color = '#667eea';
            if (currentStepData.comparing.includes(index)) {
                color = currentStepData.action === 'swapped' ? '#51cf66' : '#ff6b6b';
            }

            // Draw bar
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, barWidth, height);
            
            // Draw value
            this.ctx.fillStyle = '#4a5568';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(value, x + barWidth/2, y - 10);
        });

        // Draw step information
        this.ctx.fillStyle = '#4a5568';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Step: ${this.currentStep + 1}/${this.sortSteps.length}`, 50, 50);
        this.ctx.fillText(`Action: ${currentStepData.action}`, 50, 75);
    }

    drawArrow(fromX, fromY, toX, toY) {
        const headlen = 10;
        const angle = Math.atan2(toY - fromY, toX - fromX);

        this.ctx.strokeStyle = '#4a5568';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
        this.ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
        this.ctx.moveTo(toX, toY);
        this.ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
        this.ctx.stroke();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    showWelcomeMessage() {
        this.clearCanvas();
        this.ctx.fillStyle = '#667eea';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Welcome to DSA Visualizer!', this.canvas.width / 2, this.canvas.height / 2 - 20);
        this.ctx.fillStyle = '#718096';
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Select a topic from the sidebar to begin', this.canvas.width / 2, this.canvas.height / 2 + 20);
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        this.canvas.width = Math.min(800, rect.width - 40);
        this.canvas.height = 400;
        
        if (this.currentTopic) {
            this.initializeVisualization(this.currentTopic);
        } else {
            this.showWelcomeMessage();
        }
    }

    play() {
        if (this.currentTopic === 'bubblesort' && this.sortSteps) {
            this.isPlaying = true;
            this.animate();
        }
    }

    pause() {
        this.isPlaying = false;
        if (this.animationId) {
            clearTimeout(this.animationId);
        }
    }

    reset() {
        this.pause();
        this.currentStep = 0;
        if (this.currentTopic) {
            this.initializeVisualization(this.currentTopic);
        }
    }

    step() {
        if (this.currentTopic === 'bubblesort' && this.sortSteps) {
            if (this.currentStep < this.sortSteps.length - 1) {
                this.currentStep++;
                this.drawSortVisualization();
            }
        }
    }

    animate() {
        if (!this.isPlaying) return;
        
        if (this.currentStep < this.sortSteps.length - 1) {
            this.currentStep++;
            this.drawSortVisualization();
            this.animationId = setTimeout(() => this.animate(), this.animationSpeed);
        } else {
            this.isPlaying = false;
        }
    }

    copyCode() {
        const codeElement = document.getElementById('code-display');
        const text = codeElement.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById('copy-code-btn');
            const originalText = btn.textContent;
            btn.textContent = '✓ Copied!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        }).catch(() => {
            alert('Failed to copy code to clipboard');
        });
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DSAVisualizer();
});
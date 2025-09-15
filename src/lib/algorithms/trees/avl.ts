export interface AlgorithmEvent {
  type: 'insert' | 'rotate' | 'rebalance' | 'done'
  nodeStates: NodeState[]
  focusNodeId?: string
  explanation: string
  meta: {
    rotations: number
    inserts: number
  }
}

export interface NodeState {
  id: string
  value: number
  leftId?: string
  rightId?: string
  height: number
  x?: number
  y?: number
}

class AVLNode {
  value: number
  left: AVLNode | null = null
  right: AVLNode | null = null
  height: number = 1
  id: string

  constructor(value: number) {
    this.value = value
    this.id = `node-${value}-${Date.now()}-${Math.random()}`
  }
}

export class AVLTreeGenerator {
  private root: AVLNode | null = null
  private events: AlgorithmEvent[] = []
  private rotationCount = 0
  private insertCount = 0

  private getHeight(node: AVLNode | null): number {
    return node ? node.height : 0
  }

  private getBalance(node: AVLNode | null): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0
  }

  private updateHeight(node: AVLNode): void {
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1
  }

  private rightRotate(y: AVLNode): AVLNode {
    const x = y.left!
    const T2 = x.right

    // Perform rotation
    x.right = y
    y.left = T2

    // Update heights
    this.updateHeight(y)
    this.updateHeight(x)

    this.rotationCount++
    this.emitEvent('rotate', x.id, `Right rotation on node ${y.value}`)

    return x
  }

  private leftRotate(x: AVLNode): AVLNode {
    const y = x.right!
    const T2 = y.left

    // Perform rotation
    y.left = x
    x.right = T2

    // Update heights
    this.updateHeight(x)
    this.updateHeight(y)

    this.rotationCount++
    this.emitEvent('rotate', y.id, `Left rotation on node ${x.value}`)

    return y
  }

  private insertNode(node: AVLNode | null, value: number): AVLNode {
    // Standard BST insertion
    if (!node) {
      const newNode = new AVLNode(value)
      this.insertCount++
      this.emitEvent('insert', newNode.id, `Inserted node with value ${value}`)
      return newNode
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value)
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value)
    } else {
      // Duplicate values not allowed
      return node
    }

    // Update height
    this.updateHeight(node)

    // Get balance factor
    const balance = this.getBalance(node)

    // Left Left Case
    if (balance > 1 && value < node.left!.value) {
      this.emitEvent('rebalance', node.id, `LL imbalance detected at node ${node.value}`)
      return this.rightRotate(node)
    }

    // Right Right Case
    if (balance < -1 && value > node.right!.value) {
      this.emitEvent('rebalance', node.id, `RR imbalance detected at node ${node.value}`)
      return this.leftRotate(node)
    }

    // Left Right Case
    if (balance > 1 && value > node.left!.value) {
      this.emitEvent('rebalance', node.id, `LR imbalance detected at node ${node.value}`)
      node.left = this.leftRotate(node.left!)
      return this.rightRotate(node)
    }

    // Right Left Case
    if (balance < -1 && value < node.right!.value) {
      this.emitEvent('rebalance', node.id, `RL imbalance detected at node ${node.value}`)
      node.right = this.rightRotate(node.right!)
      return this.leftRotate(node)
    }

    return node
  }

  private emitEvent(type: AlgorithmEvent['type'], focusNodeId?: string, explanation?: string): void {
    const nodeStates = this.getNodeStates()
    this.calculatePositions(nodeStates)
    
    this.events.push({
      type,
      nodeStates,
      focusNodeId,
      explanation: explanation || '',
      meta: {
        rotations: this.rotationCount,
        inserts: this.insertCount,
      },
    })
  }

  private getNodeStates(): NodeState[] {
    const states: NodeState[] = []
    
    const traverse = (node: AVLNode | null) => {
      if (!node) return
      
      states.push({
        id: node.id,
        value: node.value,
        leftId: node.left?.id,
        rightId: node.right?.id,
        height: node.height,
      })
      
      traverse(node.left)
      traverse(node.right)
    }
    
    traverse(this.root)
    return states
  }

  private calculatePositions(nodeStates: NodeState[]): void {
    if (nodeStates.length === 0) return

    const nodeMap = new Map<string, NodeState>()
    nodeStates.forEach(node => nodeMap.set(node.id, node))

    const rootNode = nodeStates.find(node => 
      !nodeStates.some(other => other.leftId === node.id || other.rightId === node.id)
    )

    if (!rootNode) return

    const levelWidth = 80
    const levelHeight = 100

    const assignPositions = (nodeId: string, x: number, y: number, level: number) => {
      const node = nodeMap.get(nodeId)
      if (!node) return

      node.x = x
      node.y = y

      const offset = levelWidth * Math.pow(0.7, level)
      
      if (node.leftId) {
        assignPositions(node.leftId, x - offset, y + levelHeight, level + 1)
      }
      
      if (node.rightId) {
        assignPositions(node.rightId, x + offset, y + levelHeight, level + 1)
      }
    }

    assignPositions(rootNode.id, 400, 50, 0) // Start at center
  }

  insert(value: number): void {
    this.root = this.insertNode(this.root, value)
  }

  generateInsertionSequence(values: number[]): AlgorithmEvent[] {
    this.events = []
    this.rotationCount = 0
    this.insertCount = 0
    this.root = null

    for (const value of values) {
      this.insert(value)
    }

    this.emitEvent('done', undefined, 'AVL Tree construction completed')
    return this.events
  }
}
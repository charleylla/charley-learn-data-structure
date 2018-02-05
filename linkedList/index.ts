interface ISingleNode{
    id:number;
    data:any;
    next:ISingleNode;
}

interface ISingleLinkedList{
    head:ISingleNode;
    find(item:ISingleNode):ISingleNode;
    findIfExists(item:ISingleNode):void;
    findIfNotExists(item:ISingleNode):void;
    insert(item:ISingleNode,oldItem:ISingleNode):ISingleNode;
    remove(item:ISingleNode):void;
    findPrevious(item:ISingleNode):ISingleNode;
    toString():ISingleNode[];
}

class SingleNode implements ISingleNode{
    static count:number = -1;
    id:number = -1;
    data:any;
    next:ISingleNode = null;
    constructor(data:any){
        this.data = data;
        this.id = ++SingleNode.count;
    }
}

class SingleLinkedList implements ISingleLinkedList{
    head:ISingleNode = new SingleNode("HEAD")
    find(item:ISingleNode):ISingleNode{
        let node:ISingleNode = this.head;
        while(node.next){
            if(node.next.id === item.id){
                return node;
            }
            node = node.next;
        }
        return null;
    }
    
    findIfExists(item:ISingleNode):void{
        const nodeExists = this.find(item);
        // 节点已存在
        if(nodeExists){
            throw new Error("节点已存在，不能重复添加！")
        }
    }

    findIfNotExists(item:ISingleNode):void{
        const nodeExists = this.find(item);
        // 节点不存在
        if(nodeExists === null){
            throw new Error(`节点：'id=${item.id}' 不在此链表上！`)
        }
    }

    insert(item:ISingleNode,oldItem:ISingleNode):ISingleNode{
        // 第一次添加
        if(!oldItem.id){
            oldItem.next = item;
            return;
        }
        // 检查节点的正确性
        this.findIfExists(item);
        this.findIfNotExists(oldItem);
        // 将新节点的后继指向原始节点的后继
        item.next = oldItem.next;
        // 将原始节点的后继指向新节点
        oldItem.next = item;
        return item;
    }

    findPrevious(item:ISingleNode):ISingleNode{
        const node = this.find(item);
        return node;
    }    

    remove(item:ISingleNode):void{
        this.findIfNotExists(item);
        const prevNode = this.findPrevious(item);
        prevNode.next = item.next;
        item = null;
    }    

    toString():ISingleNode[]{
        const nodeArr:ISingleNode[] = [];
        let node:ISingleNode = this.head.next;
        if(!node) return nodeArr;
        while(node.next){
            nodeArr.push(node.next)
            node = node.next;
        }
        return nodeArr;
    }
}

/**
 * 例：链表操作
 */

// const list = new SingleLinkedList();
// const firstNode = new SingleNode("first")
// const secondNode = new SingleNode("second")
// const thirdNode = new SingleNode("third")
// const forthNode = new SingleNode("forth")
// list.insert(firstNode,list.head);
// list.insert(secondNode,firstNode)
// list.insert(forthNode,secondNode)
// list.insert(thirdNode,forthNode)
// console.log("=====================")
// console.log(list.toString())
// console.log("=====================")
// list.remove(thirdNode);
// console.log(list.toString())
// console.log("=====================")
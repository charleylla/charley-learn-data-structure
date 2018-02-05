interface IDoubleNode{
    id:number;
    data:any;
    prev:IDoubleNode;
    next:IDoubleNode;
}

interface IDoubleLinkedList{
    head:IDoubleNode;
    find(item:IDoubleNode):IDoubleNode;
    findIfExists(item:IDoubleNode):void;
    findIfNotExists(item:IDoubleNode):void;
    insert(item:IDoubleNode,oldItem:IDoubleNode):IDoubleNode;
    remove(item:IDoubleNode):void;
    toString(flag?:boolean):IDoubleNode[];
}

class DoubleNode implements IDoubleNode{
    static count:number = -1;
    id:number = -1;
    data:any;
    next:IDoubleNode = null;
    prev:IDoubleNode = null;
    constructor(data:any){
        this.data = data;
        this.id = ++DoubleNode.count;
    }
}

class DoubleLinkedList implements IDoubleLinkedList{
    head:IDoubleNode = new DoubleNode("HEAD")
    find(item:IDoubleNode):IDoubleNode{
        let node:IDoubleNode = this.head;
        while(node.next){
            if(node.next.id === item.id){
                return node;
            }
            node = node.next;
        }
        return null;
    }
    
    findIfExists(item:IDoubleNode):void{
        const nodeExists = this.find(item);
        // 节点已存在
        if(nodeExists){
            throw new Error("节点已存在，不能重复添加！")
        }
    }

    findIfNotExists(item:IDoubleNode):void{
        const nodeExists = this.find(item);
        // 节点不存在
        if(nodeExists === null){
            throw new Error(`节点：'id=${item.id}' 不在此链表上！`)
        }
    }

    insert(item:IDoubleNode,oldItem:IDoubleNode):IDoubleNode{
        // 第一次添加
        if(!oldItem.id){
            oldItem.next = item;
            return;
        }
        // 检查节点的正确性
        this.findIfExists(item);
        this.findIfNotExists(oldItem);
        item.next = oldItem.next;
        item.prev = oldItem;
        oldItem.next = item;
        return item;
    }

    remove(item:IDoubleNode):void{
        this.findIfNotExists(item);
        item.prev.next = item.next
        if(item.next !== null){
            item.next.prev = item.prev
        }
        item = null;
    }    

    toString(flag?:boolean):IDoubleNode[]{
        const nodeArr:IDoubleNode[] = [];
        let node:IDoubleNode = this.head.next;
        if(!node) return nodeArr;
        while(node.next){
            if(!flag){
                nodeArr.push(node.next)
            }
            node = node.next;
        }
        if(flag){
            while(node.prev){
                nodeArr.push(node.prev);
                node = node.prev;
            }
        }
        return nodeArr;
    }
}

/**
 * 例：链表操作
 */

// const list = new DoubleLinkedList();
// const firstNode = new DoubleNode("first")
// const secondNode = new DoubleNode("second")
// const thirdNode = new DoubleNode("third")
// const forthNode = new DoubleNode("forth")
// list.insert(firstNode,list.head);
// list.insert(secondNode,firstNode)
// list.insert(forthNode,secondNode)
// list.insert(thirdNode,forthNode)
// console.log("=====================")
// console.log(list.toString(true))
// console.log("=====================")
// list.remove(thirdNode);
// console.log(list.toString())
// console.log("=====================")
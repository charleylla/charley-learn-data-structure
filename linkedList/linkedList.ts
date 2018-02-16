interface ISingleLinkedList<T>{
    // 获取链表的长度
    size():number;
    // 获取链表头
    head():ISingleNode<T>;
    // 增加节点
    append(item:T):ISingleNode<T>;
    // 删除节点
    remove(item:T):void;
    // 根据位置删除
    removeAt(pos:number):void;
    // 插入节点
    insert(newItem:T,oldItem:T):ISingleNode<T>;
    // 在具体的位置插入
    insertAt(newItem:T,pos:number):ISingleNode<T>;
    // 清空链表
    clear():void;
    // 判断链表是否为空
    isEmpty():boolean;
    // 查找节点和其前驱
    find(item:T):{
        previous:ISingleNode<T>,
        current:ISingleNode<T>,
        currentPos:number,
        previousPos:number
    };
    // 根据位置查找节点和其前驱
    findAt(pos:number):{
        previous:ISingleNode<T>,
        current:ISingleNode<T>,
        currentPos:number,
        previousPos:number
    };
    // 获取链表中的元素
    toString():ISingleNode<T>[];
}

interface ISingleNode<T>{
    // 数据区
    data:T;
    // 地址区
    next:ISingleNode<T>;
}

class SingleNode<T> implements ISingleNode<T>{
    data:T = null;
    next:ISingleNode<T> = null;
    constructor(data?:T){
        this.data = data;
    }
}

class SingleLinkedList<T> implements ISingleLinkedList<T>{
    private _size:number = 0;
    private _head:ISingleNode<T> = new SingleNode();
    size():number{
        return this._size;
    }
    head():ISingleNode<T>{
        return this._head;
    }
    clear():void{
        this._head = null;
        this._head = new SingleNode();
        this._size = 0;
    }
    isEmpty():boolean{
        return !this._size;
    }
    append(item:T):ISingleNode<T>{
        const newNode = new SingleNode<T>(item);
        // 链表中没有节点
        if(!this._size){
            this._head = newNode;
        }else{
            const {current} = this.findAt(this._size - 1);
            current.next = newNode
        }
        this._size++;
        return newNode;
    }
    find(item:T):{
        previous:ISingleNode<T>,
        current:ISingleNode<T>,
        currentPos:number,
        previousPos:number,
    }{
        if(!item){
            throw new Error("参数错误!")
        }
        let 
            previous:ISingleNode<T> = null,
            current:ISingleNode<T> = this._head,
            index:number = -1;
        while(current){
            // 更新索引值
            index++;
            // 判断当前节点中的数据和传入的是否匹配
            if(current.data === item){
                break;
            }
            // 将 current 赋值给 previous
            // 将 current.next 赋值给 current
            // 在下一次迭代中使用
            previous = current;
            current = current.next;
        }

        // HACK 在前面的循环中找不到对于的元素时,会获取到尾结点
        // 这里进行一次二次验证
        if(current.data !== item){
            index = -1;
        }

        // 处理未找到的情况
        if(index === -1){
            return{
                previous:null,
                current:null,
                previousPos:-1,
                currentPos:-1
            }
        }
        return{
            previous,
            current,
            currentPos:index,
            // 前驱的位置在当前节点之前
            previousPos:index - 1
        }
    }
    findAt(pos:number):{
        previous:ISingleNode<T>,
        current:ISingleNode<T>,
        currentPos:number,
        previousPos:number,
    }{
        let 
            previous:ISingleNode<T> = null,
            current:ISingleNode<T> = this._head,
            index:number = -1;
            
        if(pos < 0 || pos > this._size - 1){
            throw  new Error("索引越界！");
        }

        while(current){
            index++;
            if(index === pos){
                break;
            }
            previous = current;
            current = current.next;
        }

        // 处理未找到的情况
        if(index === -1){
            return{
                previous:null,
                current:null,
                previousPos:-1,
                currentPos:-1
            }
        }
        return{
            previous,
            current,
            currentPos:index,
            // 前驱的位置在当前节点之前
            previousPos:index - 1
        }
    }
    remove(item:T):void{
        // 获取当前节点和其的前驱
        let { current,previous } = this.find(item);
        // 还没有添加节点的情况
        if(!current) return;
        // 没有前驱节点，说明是头结点
        if(!previous){
            this._head = current.next;
        }else{
            // 将当前节点的前驱的 next 指向当前节点的后继
            previous.next = current.next;
        }
        // 移除当前节点
        current = null;
        // 更新链表长度
        this._size--;
    }    
    removeAt(pos:number):void{
        // 获取当前节点和其的前驱
        let { current,previous } = this.findAt(pos);
        // 还没有添加节点的情况
        if(!current) return;
        // 没有前驱节点，说明是头结点
        if(!previous){
            this._head = current.next;
        }else{
            // 将当前节点的前驱的 next 指向当前节点的后继
            previous.next = current.next;
        }
        // 移除当前节点
        current = null;
        // 更新链表长度
        this._size--;
    }
    insert(newItem:T,oldItem:T):ISingleNode<T>{
        // 创建新节点
        const newNode = new SingleNode(newItem);
        // 查找旧节点及其前驱节点
        const {current,previous} = this.find(oldItem);
        // 没有查找到旧节点,直接返回
        if(!current) return null;
        // 当 previous 为 null 时,说明是头结点
        if(!previous){
            newNode.next = current;
            this._head = newNode;
        }else{
            // 将新建节点的 next 指向旧节点
            newNode.next = current;
            // 将旧节点前驱的 next 指向新建的节点
            previous.next = newNode;
        }
        this._size++;
        return newNode;
    }
    insertAt(newItem:T,pos:number):ISingleNode<T>{
        // 创建新节点
        const newNode = new SingleNode(newItem);
        // 查找旧节点及其前驱节点
        const {current,previous} = this.findAt(pos);
        if(!current) return null;
        // 当 previous 为 null 时,说明是头结点
        if(!previous){
            newNode.next = current;
            this._head = newNode;
        }else{
            // 将新建节点的 next 指向旧节点
            newNode.next = current;
            // 将旧节点前驱的 next 指向新建的节点
            previous.next = newNode;
        }
        this._size++;
        return newNode;
    }
    toString():ISingleNode<T>[]{
        const tmp:ISingleNode<T>[] = [];
        let current:ISingleNode<T> = this._head;
        while(current){
            tmp.push(current);
            current = current.next;
        }
        return tmp;
    }
}
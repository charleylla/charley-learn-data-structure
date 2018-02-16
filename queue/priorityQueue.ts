interface IPriorityQueue<T>{
    // 获取队列的长度
    size():number;
    // 入队操作
    enqueue(ele:IQueueElement<T>):IQueueElement<T>;
    // 出队操作
    dequeue():IQueueElement<T>;
    // 清除队列
    clear():void;
    // 获取队列的第一个元素
    front():IQueueElement<T>;
    // 获取队列的最后一个元素
    end():IQueueElement<T>;
    // 判断队列是否为空
    isEmpty():boolean;
    // 获取队列中的所有元素
    toString():IQueueElement<T>[];
}

interface IQueueElement<T>{
    priority:number;
    data:T;
}

class QueueElement<T> implements IQueueElement<T>{
    priority:number = 1;
    data:T = null;
    constructor(data:T,priority:number){
        this.data = data;
        this.priority = priority;
    }
}

class PriorityQueue<T> implements IPriorityQueue<T>{
    private _size:number = 0;
    private dataStore:IQueueElement<T>[] = [];
    size():number{
        return this._size;
    }
    enqueue(ele:IQueueElement<T>):IQueueElement<T>{
        // 向队列中添加元素，借助数组的 push 方法
        this.dataStore.push(ele)
        // 对队列中的元素进行排序
        this.dataStore.sort((ele1,ele2) => ele1.priority - ele2.priority);
        this._size++;
        return ele;
    }
    dequeue():IQueueElement<T>{
        // 从队列中移除元素，借助数组的 shift 方法
        const ele:IQueueElement<T> = this.dataStore.shift();
        this._size--;
        return ele;
    }
    clear():void{
        // 清除队列
        this.dataStore = [];
        // 重置队列长度
        this._size = 0;
    }
    front():IQueueElement<T>{
        const index:number = 0;
        return this.dataStore[index];
    }
    end():IQueueElement<T>{
        const index:number = this._size - 1;
        return this.dataStore[index];
    }
    isEmpty():boolean{
        return !this._size;
    }
    toString():IQueueElement<T>[]{
        // 返回队列的元素信息
        return this.dataStore;
    }
}

const queue = new PriorityQueue<string>()
queue.enqueue(new QueueElement("MIKE",2));
queue.enqueue(new QueueElement("JACK",4));
queue.enqueue(new QueueElement("MARRY",1));
queue.enqueue(new QueueElement("PENNY",3));
for(let i = 0,len = queue.size();i < len; i ++){
    console.log(queue.dequeue())
}
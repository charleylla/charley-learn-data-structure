interface ICycleQueue<T>{
    // 获取队列的长度
    size():number;
    // 入队操作
    enqueue(ele:T):T;
    // 出队操作
    dequeue():T;
    // 清除队列
    clear():void;
    // 获取队列的第一个元素
    front():T;
    // 获取队列的最后一个元素
    end():T;
    // 判断队列是否为空
    isEmpty():boolean;
    // 获取队列中的所有元素
    toString():T[];
}

class CycleQueue<T> implements ICycleQueue<T>{
    private _size:number = 0;
    private dataStore:T[] = [];
    size():number{
        return this._size;
    }
    enqueue(ele:T):T{
        // 向队列中添加元素，借助数组的 push 方法
        this.dataStore.push(ele);
        this._size++;
        return ele;
    }
    dequeue():T{
        // 从队列中移除元素，借助数组的 shift 方法
        const ele:T = this.dataStore.shift();
        // 将移除的元素再次添加到队列中
        this.enqueue(ele);
        return ele;
    }
    clear():void{
        // 清除队列
        this.dataStore = [];
        // 重置队列长度
        this._size = 0;
    }
    front():T{
        const index:number = 0;
        return this.dataStore[index];
    }
    end():T{
        const index:number = this._size - 1;
        return this.dataStore[index];
    }
    isEmpty():boolean{
        return !this._size;
    }
    toString():T[]{
        // 返回队列的元素信息
        return this.dataStore;
    }
}

const queue = new CycleQueue<string>();
queue.enqueue("A")
queue.enqueue("B")
queue.enqueue("C")
queue.enqueue("D")
setInterval(()=>{
    queue.dequeue();
    console.log(queue.toString())
},1000);
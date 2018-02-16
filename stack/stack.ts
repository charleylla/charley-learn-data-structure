interface IStack<T>{
    // 获取栈的长度
    size():number;
    // 压栈操作
    push(ele:T):T;
    // 出栈操作
    pop():T;
    // 获取栈顶的元素
    peek():T;
    // 清除栈中的元素
    clear():void;
    // 判断栈是否为空
    isEmpety():boolean;
    // 获取栈中的元素信息
    toString():T[];
}

class Stack<T> implements IStack<T>{
    private _size:number = 0;
    private dataStore:T[] = [];
    size():number{
        // 获取栈的长度
        return this._size;
    }
    push(ele:T):T{
        // 向栈中插入元素，借助数组的 push 方法
        this.dataStore.push(ele);
        this._size++;
        return ele;
    }
    pop():T{
        // 从栈中移除元素，借助数组的 pop 方法
        const ele = this.dataStore.pop();
        this._size--;
        return ele;
    }
    peek():T{
        // 获取栈顶的元素
        const index = this._size ? (this._size - 1) : this._size;
        return this.dataStore[index];
    }
    clear():void{
        // 清除栈中的元素
        this.dataStore = [];
        this._size = 0;
    }
    isEmpety():boolean{
        // 判断栈是否为空
        return !this._size;
    }
    toString():T[]{
        // 返回栈中的元素信息
        return this.dataStore;
    }
}
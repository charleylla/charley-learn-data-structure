interface IList<T>{
    // 获取线性表的长度
    size():number;
    // 清除线性表中的元素
    clear():void;
    // 判断线性表是否为空
    isEmpty():boolean;
    // 查找元素
    find(ele:T,flag?:boolean):number;
    // 获取线性表中的所有元素
    toString():T[];
    // 插入元素
    insert(newEle:T,oldEle:T):T|boolean;
    // 添加元素
    append(ele:T):T;
    // 移除元素
    remove(ele:T):T|boolean;
    // 将元素指针移动到线性表开头
    front():void;
    // 将元素指针移动到线性表结尾
    end():void;
    // 将元素指针前移
    prev():void;
    // 将元素指针后移
    next():void;
    // 移动元素指针到具体位置
    moveTo(pos:number):void;
    // 根据元素指针获取元素
    peek():T;
    // 是否包含某个元素
    contains(ele:T):boolean;
}
class List<T> implements IList<T>{
    // 线性表长度
    private _size:number = 0;
    // 元素指针
    private pos:number = 0;
    // 存放元素
    private dataStore:T[] = [];
    size():number{
        return this._size;
    }
    clear():void{
        this.dataStore = [];
    }
    isEmpty():boolean{
        // 判断线性表是否为空
        return !this._size;
    }
    find(ele:T,flag?:boolean):number{
        // flag 标识用来指定顺序查找或者逆序查找
        const index:number = flag ? (
            this.dataStore.indexOf(ele)
        ):(
            this.dataStore.lastIndexOf(ele)
        );
        return index;
    }
    toString():T[]{
        return this.dataStore;
    }
    insert(newEle:T,oldEle:T):T|boolean{
        // 获取老元素的位置
        const oldElePos:number = this.find(oldEle);
        if(oldElePos === -1){
            return false;
        }else{
            // 使用 JavaScript 数组的 splice 方法进行元素插入
            this.dataStore.splice(oldElePos + 1,0,newEle);
            // 插入成功后更新线性表长度
            this._size++;
            // 返回被插入的元素
            return newEle;
        }
    }
    append(ele:T):T{
        // 使用 JavaScript 数组的 push 方法添加元素
        this.dataStore.push(ele);
        // 插入成功后更新线性表长度
        this._size++;
        // 返回被插入的元素
        return ele;
    }
    remove(ele:T):T|boolean{
        // 查找待移除元素的位置
        // 移除元素时从后向前删除
        const pos:number = this.find(ele,true);
        if(pos === -1){
            return false
        }else{
            // 通过 JavaScript 数组的 splice 方法移除元素
            this.dataStore.splice(pos,1);
            // 移除成功后更新线性表长度
            this._size--;
            // 删除元素时纠正元素指针的位置
            if(this.pos > this._size - 1){
                this.pos = this._size - 1;
            }
            // 返回被移除的元素
            return ele;
        };
    }
    front():void{
        // 将线性表的元素指针置于开头
        this.pos = 0;
    }
    end():void{
        // 将线性表的元素指针置于结尾
        this.pos = this._size - 1;
    }
    prev():void{
        // 将线性表的元素指针向前移动
        if(this.pos > 0){
            this.pos--;
            return;
        }
        throw new Error("已经是第一个元素了");
    }
    next():void{
        // 将线性表的元素指针向前移动
        const len:number = this._size - 1;
        if(this.pos < len){
            this.pos++;
            return;
        }
        throw new Error("已经是最后一个元素了");
    }
    moveTo(pos:number):void{
        // 将线性表的元素指针移动到指定位置
        const 
            min:number = 0,
            max:number = this._size - 1;
        // 越界判断
        if(pos > max || pos < min){
            throw new Error("索引越界！");
        }else{
            this.pos = pos;
        }
    }
    peek():T{
        // 根据线性表的元素指针获取当前元素
        return this.dataStore[this.pos];
    }
    contains(ele:T):boolean{
        // 查找元素是否存在于线性表
        const index:number = this.find(ele);
        if(index === -1)return false;
        return true;
    }
}
interface IMySet<T>{
    // 向集合中添加元素
    add(ele:T):void;
    // 从集合中移除元素
    remove(ele:T):T;
    // 判断集合中是否拥有某个元素
    has(ele:T):boolean;
    // 清空集合
    clear():void;
    // 获取集合的长度
    size():number;
    // 获取集合中的元素
    toString():T[];
    // 获取并集
    getUnionSet(newSet:IMySet<T>):IMySet<T>;
    // 获取交集
    getIntersectionSet(newSet:IMySet<T>):IMySet<T>;
    // 获取差集
    getDifferenceSet(newSet:IMySet<T>):IMySet<T>;
    // 判断是否是子集
    isSubset(parSet:IMySet<T>):boolean;
}

class MySet<T> implements IMySet<T>{
    private dataStore:{
        [propName:string]:T
    } = {};
    private _size:number = 0;
    add(ele:T):void{
        // 判断该元素是否存在
        if(!this.has(ele)){
            // 获取字符串的键值
            const key:string = ele.toString();
            this.dataStore[key] = ele;
            this._size++;
        }
    }
    remove(ele:T):T{
        // 获取字符串的键值
        const key:string = ele.toString();
        // 获取元素
        const val:T = this.dataStore[key];
        // 删除 dataStore 上的键
        delete this.dataStore[key]
        this._size--;
        return val;
    }
    has(ele:T):boolean{
        const key:string = ele.toString();
        // 通过 hasOwnProperty 方法判断集合中是否存在某个值
        return this.dataStore.hasOwnProperty(key);
    }
    size():number{
        return this._size;
    }
    clear():void{
        // 情况集合
        this.dataStore = {};
    }
    toString():T[]{
        // 遍历 dataStore 中的所有键值
        const res:T[] = Object.keys(this.dataStore).map(v => this.dataStore[v]);
        return res;
    }
    // 获取并集
    getUnionSet(newSet:IMySet<T>):IMySet<T>{
        const 
            // 新建空集合
            tmp:IMySet<T> = new MySet<T>(),
            // 获取新集合中的所有值
            newSetVals:T[] = newSet.toString(),
            // 获取当前集合中的所有值
            currentSetVals:T[] = this.toString();
        // 遍历新集合
        newSetVals.forEach(v => {
            tmp.add(v);
        })

        // 遍历当前集合
        currentSetVals.forEach(v => {
            tmp.add(v);
        })

        return tmp;
    }
    // 获取交集
    getIntersectionSet(newSet:IMySet<T>):IMySet<T>{
        const 
            // 新建空集合
            tmp:IMySet<T> = new MySet<T>(),
            // 获取新集合中的所有值
            newSetVals:T[] = newSet.toString();

        newSetVals.forEach(v => {
            if(this.has(v)){
                tmp.add(v);
            }
        })
        return tmp;
    }
    // 获取差集
    getDifferenceSet(newSet:IMySet<T>):IMySet<T>{
        const 
            // 新建空集合
            tmp:IMySet<T> = new MySet<T>(),
            // 获取新集合中的所有值
            newSetVals:T[] = newSet.toString();

        newSetVals.forEach(v => {
            if(!this.has(v)){
                tmp.add(v);
            }
        })
        return tmp;
    }
    // 判断是否是子集
    isSubset(parSet:IMySet<T>):boolean{
        const 
            // 获取父集合的所有元素
            parSetVals:T[] = parSet.toString(),
            // 获取当前集合的所有元素
            currentSetVals:T[] = this.toString();
        
        let res:boolean = false;
        if(parSet.size() >= this.size()){
            // 判断当前集合中的元素是否都存在于父集合中
            res = currentSetVals.every(v => parSet.has(v))
        }
        return res;
    }
}
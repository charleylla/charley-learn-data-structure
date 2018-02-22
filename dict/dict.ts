interface IDict<T>{
    // 添加元素
    add(key:string,val:T):void;
    // 移除元素
    remove(key:string):T;
    // 判断是否存在
    has(key:string):boolean;
    // 根据键获取值
    get(key:string):T;
    // 清空字典
    clear():void;
    // 获取字典的长度
    size():number;
    // 获取所有的键
    keys():string[];
    // 获取所有的值
    values():T[];
}

class Dict<T> implements IDict<T>{
    private dataStore:{
        [propNames:string]:T
    } = {};
    private _size:number = 0;
    add(key:string,val:T):void{
        if(!this.has(key)){
            this.dataStore[key] = val;
            this._size++;
        }
    }
    remove(key:string):T{
        const res:T = this.dataStore[key];
        delete this.dataStore[key];
        this._size--;
        return res;
    }
    has(key:string):boolean{
        return this.dataStore.hasOwnProperty(key);
    }
    get(key:string):T{
        return this.dataStore[key]
    }
    clear():void{
        this.dataStore = {};
    }
    size():number{
        return this._size;
    }
    keys():string[]{
        return Object.keys(this.dataStore);
    }
    values():T[]{
        const tmp:T[] = [];
        Object.keys(this.dataStore).forEach(v => {
            tmp.push(this.dataStore[v])
        })
        return tmp;
    }
}
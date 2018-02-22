interface IHashTable<T>{
    // 获取索引值
    getIndex(flag:string):number;
    // 两种存放方式：放入值，放入一个值和简称值
    put(flag:string,ele:T):void;
    // 获取值
    get(flag:string):T;
    // 移除元素
    remove(flag:string):T;
    // 获取散列中的元素
    toString():Map<string,T>[];    
}

class HashTable<T> implements IHashTable<T>{
    // 散列表
    private dataStore:Map<string,T>[] = [];
    // 散列表的长度
    private dataStoreLen:number = 0;
    // 盐值
    private hashSalt:number = 71;
    constructor(dataStoreLen:number,hashSalt?:number){
        // 创建散列对象时传入散列表的长度和盐值
        this.dataStoreLen = dataStoreLen;
        if(hashSalt){
            this.hashSalt = hashSalt;
        }
    }
    getIndex(flag:string):number{
        // let hash:number = 5381;
        // for (const c of flag) {
        //     hash = hash * 33 + c.charCodeAt(0);
        // }
        // return hash % 1013;
        let hash:number = -1,pos:number = -1;
        if(flag.length){
          hash = 0;
          for(const c of flag){
              hash += c.charCodeAt(0);
          }
          pos = hash % this.dataStoreLen;
        }
        // 存放位置为计算出的 hash 值对数组的长度取余
        return pos;
    }
    put(flag:string,ele:T):void{
        const pos:number = this.getIndex(flag);
        // 促使化操作
        if(this.dataStore[pos] === undefined){
            // 创建一个 Map 对象
            const tmp = new Map<string,T>();
            tmp.set(flag,ele);
            this.dataStore[pos] = tmp;
        }else{
            this.dataStore[pos].set(flag,ele);
        }
    }
    get(flag:string):T{
        const pos:number = this.getIndex(flag);
        return this.dataStore[pos].get(flag);
    }
    remove(flag:string):T{
        const pos:number = this.getIndex(flag);
        const res = this.get(flag);        
        this.dataStore[pos].delete(flag);
        return res;
    }
    toString():Map<string,T>[]{
        const tmp:Map<string,T>[] = [];
        for(const ele of this.dataStore){
            if(ele !== undefined){
                tmp.push(ele);
            }
        }
        return tmp;
    }
}
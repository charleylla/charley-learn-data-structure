interface IHashTable<T>{
    // 获取索引值
    getIndex(flag:string):number;
    // 两种存放方式：放入值，放入一个值和简称值
    put(flag:string,ele:T):void;
    // 获取值
    get(flag:string):T;
    // 移除元素
    remove(flag:string):T;
    // 查找元素
    find(flag:string,startPos:number):number;
    // 获取散列中的元素
    toString():{key:string,value:T}[];    
}

class HashTable<T> implements IHashTable<T>{
    // 散列表
    private dataStore:{key:string,value:T}[] = [];
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
    find(flag:string,startPos:number):number{
        let len:number = this.dataStoreLen;
        while(len--){
            const tmp = this.dataStore[startPos];
            if(tmp.key === flag){
                return startPos;
            }
            startPos++;
        }
    }    
    put(flag:string,ele:T):void{
        let pos:number = this.getIndex(flag);
        // 初始化操作
        if(this.dataStore[pos] === undefined){
            const tmp = {key:flag,value:ele};
            this.dataStore[pos] = tmp;
        }else{
            const tmp = {key:flag,value:ele};
            while(this.dataStore[pos] !== undefined){
                pos++;
            }            
            this.dataStore[pos] = tmp;
        }
    }
    get(flag:string):T{
        const pos:number = this.getIndex(flag);
        const realPos:number = this.find(flag,pos);
        return this.dataStore[realPos].value;
    }
    remove(flag:string):T{
        const pos:number = this.getIndex(flag);
        const realPos:number = this.find(flag,pos);
        const res = this.get(flag);        
        this.dataStore[realPos] = undefined;
        return res;
    }
    toString():{key:string,value:T}[]{
        const tmp:{key:string,value:T}[] = [];
        for(const ele of this.dataStore){
            if(ele !== undefined){
                tmp.push(ele);
            }
        }
        return tmp;
    }
}
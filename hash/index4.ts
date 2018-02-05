interface IHashTable{
    getHash(data:string):number;
    put(data:string):string;
    toString():string[];
    get(data:string):number;
}

class HashTable implements IHashTable{
    // 数组长度为质数，可以防止碰撞
    // HASH 运算有很多方式，也有很多库供选择
    // 为了简单起见，这里我采用对字符串应用的加法 HASH 运算
    private dataTable:string[]
    private arrLen:number = 137;
    private hashSalt = 31;
    constructor(){
        this.dataTable = new Array(this.arrLen);
    }
    getHash(data:string):number{
        let count:number = 0;
        for(let chara of data){
            count += chara.charCodeAt(0);
        }
        return count % this.arrLen;
    }
    put(data:string):string{
        // 线性探测法
        const index:number = this.getHash(data);
        let count:number = index;
        while(this.dataTable[count]){
            count++;
        }
        this.dataTable[count] = data;
        return data;
    }
    get(data:string):number{
        const index:number = this.getHash(data);
        let res:number = -1,len = this.dataTable.length;
        // 如果散列中可以存放相同的值，那么只能找到第一个值所在的位置
        // 因此在使用线性探测法时，最好限制散列中不能存放相同的值
        for(let i = index;i < len;i++){
            if(this.dataTable[i] === data){
                res = i;
                break;
            }
        }
        return res;
    }
    toString():string[]{
        return this.dataTable;
    }
}

const hashTable = new HashTable();
hashTable.put("china")
hashTable.put("nicha")
hashTable.put("nihao")
hashTable.put("hello")
console.log(hashTable.toString())
console.log(hashTable.get("nicha"));
interface IHashTable{
    getHash(data:string):number;
    put(data:string):string;
    toString():string[][];
    get(data:string):number;
}

class HashTable implements IHashTable{
    // 数组长度为质数，可以防止碰撞
    // HASH 运算有很多方式，也有很多库供选择
    // 为了简单起见，这里我采用对字符串应用的加法 HASH 运算
    private dataTable:string[][]
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
        // 开链法解决冲突
        const index:number = this.getHash(data);
        if(!this.dataTable[index]){
            this.dataTable[index] = [data];
        }else{
            let count:number = 0; 
            while(this.dataTable[index][count]){
                count++;
            }
            this.dataTable[index][count] = data;
        }
        return data;
    }
    get(data:string):number{
        const index:number = this.getHash(data);
        let res:number = -1;
        this.dataTable.forEach((v,k) => {
            if(!v) return;
            v.forEach((v2,k2) => {
                if(v2 === data && k === index){
                    res = k;
                }
            })
        });
        return res;
    }
    toString():string[][]{
        return this.dataTable;
    }
}

const hashTable = new HashTable();
hashTable.put("china")
hashTable.put("nicha")
hashTable.put("nihao")
hashTable.put("hello")
console.log(hashTable.toString())
console.log(hashTable.get("hello"));

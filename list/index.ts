interface IList<T>{
    size:number;
    clear():void;
    find(ele:T):number;
    toString():T[];
    insert(newEle:T,oldEle:T):T|boolean;
    append(ele:T):T;
    remove(ele:T):T|boolean;
    front():void;
    end():void;
    prev():void;
    next():void;
    moveTo(pos:number):void;
    getElement():T;
    contains(ele:T):boolean;
}
class List<T> implements IList<T>{
    size:number = 0;
    private pos:number = 0;
    private dataStore:T[] = [];
    clear():void{
        this.dataStore = [];
    }
    find(ele:T):number{
        let index:number;
        this.dataStore.some((v,k):boolean=> {
            if(v == ele){
                index = k;
                return true;
            }
            index = -1;
            return false;
        });
        return index;
    }
    toString():T[]{
        return this.dataStore;
    }
    insert(newEle:T,oldEle:T):T|boolean{
        const oldElePos:number = this.find(oldEle);
        if(oldElePos === -1){
            return false;
        }else{
            this.dataStore.splice(oldElePos + 1,0,newEle);
            this.size++;
            return newEle;
        }
    }
    append(ele:T):T{
        this.size++;
        this.dataStore.push(ele);
        return ele;
    }

    remove(ele:T):T|boolean{
        const pos:number = this.find(ele);
        if(pos === -1){
            return false
        }else{
            this.dataStore.splice(pos,1);
            this.size--;
            return ele;
        };
    }

    front():void{
        this.pos = 0;
    }

    end():void{
        this.pos = this.dataStore.length - 1;
    }

    prev():void{
        if(this.pos > 0){
            this.pos--;
            return;
        }
        throw new Error("已经是第一个元素了");
    }

    next():void{
        const len:number = this.dataStore.length - 1;
        if(this.pos < len){
            this.pos++;
            return;
        }
        throw new Error("已经是最后一个元素了");
    }

    moveTo(pos:number):void{
        const 
            min:number = 0,
            max:number = this.dataStore.length - 1;
        if(pos > max || pos < min){
            throw new Error("索引越界！");
        }else{
            this.pos = pos;
        }
    }

    getElement():T{
        return this.dataStore[this.pos];
    }

    contains(ele:T):boolean{
        const index:number = this.find(ele);
        if(index === -1)return false;
        return true;
    }
}
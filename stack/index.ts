interface IStack<T>{
    push(ele:T):T;
    pop():T;
    peek():T;
    clear():void;
    toString():T[];
}

class Stack<T> implements IStack<T>{
    size:number = 0;
    private dataStore:T[] = [];
    private pos:number = 0;
    push(ele:T):T{
        this.dataStore.push(ele);
        this.size++;
        this.pos++;
        return ele;
    }
    pop():T{
        this.pos--;
        this.size--;
        return this.dataStore.pop();
    }
    peek():T{
        const index = this.pos - 1;
        return this.dataStore[index];
    }
    clear():void{
        this.pos = 0;
        this.size = 0;
        this.dataStore = [];
    }
    toString():T[]{
        return this.dataStore;
    }
}
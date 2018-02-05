interface IQueue<T>{
    enqueue(ele:T):T;
    dequeue():T;
    clear():void;
    getFirstElement():T;
    getLastElement():T;
    toString():T[];
}

class Queue<T> implements IQueue<T>{
    size:number = 0;
    private dataStore:T[] = [];
    enqueue(ele:T):T{
        this.dataStore.push(ele);
        this.size++;
        return ele;
    }
    dequeue():T{
        const ele:T = this.dataStore.shift();
        this.size--;
        return ele;
    }
    clear():void{
        this.dataStore = [];
        this.size = 0;
    }
    getFirstElement():T{
        const index = 0;
        return this.dataStore[index];
    }
    getLastElement():T{
        const index = this.dataStore.length - 1;
        return this.dataStore[index];
    }
    toString():T[]{
        return this.dataStore;
    }
}

/**
 * 应用：舞伴分配
 */
// const 
//     manDancers:Queue<string> = new Queue(),
//     womanDancers:Queue<string> = new Queue();

// manDancers.enqueue("JACK")
// manDancers.enqueue("MIKE")
// womanDancers.enqueue("MARRY")
// womanDancers.enqueue("STOYA")

// function getPairs():string{
//     return manDancers.dequeue() + "-" + womanDancers.dequeue();
// }

// console.log(getPairs());
// console.log(getPairs());
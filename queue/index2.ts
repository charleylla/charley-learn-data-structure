interface IPriorityQueue<T>{
    enqueue(ele:T):T;
    dequeue():T;
    clear():void;
    getFirstElement():T;
    getLastElement():T;
    toString():T[];
}

interface IQueueDesc{
    priority:number;
    [propName:string]:any;
}

class PriorityQueue<T extends IQueueDesc> implements IPriorityQueue<T>{
    size:number = 0;
    private dataStore:T[] = [];
    enqueue(ele:T):T{
        this.dataStore.push(ele);
        this.size++;
        return ele;
    }
    dequeue():T{
        let 
            priority:number = 0,
            index:number = 0;
        this.dataStore.forEach((v,k) => {
            if(v.priority > priority){
                priority = v.priority;
                index = k;
            }
        });
        this.size--;
        const ele = this.dataStore.splice(index,1)[0]
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
 * 应用：优先队列
 */
// const queue:PriorityQueue<{priority:number,name:string}> = new PriorityQueue();
// queue.enqueue({name:"MIKE",priority:4});
// queue.enqueue({name:"JERRY",priority:3});
// queue.enqueue({name:"MARRY",priority:0});
// queue.enqueue({name:"COOK",priority:1});
// queue.enqueue({name:"PENNY",priority:2});
// const { size } = queue;
// for(let i = 0;i < size; i++){
//     console.log(queue.dequeue())
// }
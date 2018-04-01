import { IList } from "../../lib/IList";

export class List<T> implements IList<T>{
    private _size:number = 0;
    private _dataStore:T[] = [];
    // JS 中数组是可以自动扩容的
    size():number{
        return this._size;
    }
    append(ele:T):void{
        if(ele === null){
            const msg:string = `Invalid Elements:cannot append null into list`;
            this.error(msg);
        }
        // JS 风格，可以使用 push 方法
        this._dataStore.push(ele);
        this._size++;
    }
    remove(index:number):T{
        const indexUsable:boolean = this.checkIndex(index);
        if(!indexUsable){
            const msg = `Index out of bounds:cannot remove element at index ${index}`;
            this.error(msg);
        }
        const ele:T = this.get(index);
        // JS 风格可以直接使用 splice 从数组中移除元素
        // 移除元素后，会自动挤压数组控件
        this._dataStore.splice(index,1);
        this._size --;
        return ele;
    }
    insert(index:number,ele:T):void{
        const indexUsable:boolean = this.checkIndex(index);
        if(!indexUsable){
            const msg:string = `Index out of bounds:cannot insert element at index ${index}`;
            this.error(msg);
        }
        // JS 风格可以通过 splice 直接插入元素
        this._dataStore.splice(index,0,ele);
        this._size++;
    }
    get(index:number):T{
        const indexUsable:boolean = this.checkIndex(index);
        if(!indexUsable){
            const msg:string = `Index out of bounds:cannot get element at index ${index}`;
            this.error(msg);
        }
        return this._dataStore[index]
    }
    clear():void{
        // JS 风格，直接重置数组，会自动进行垃圾回收
        this._dataStore = [];
        this._size = 0;
    }
    find(ele:T):number{
        // JS 风格，使用 find 方法进行查找，速度可能比循环更快
        let index:number = -1;
        this._dataStore.find((v,k) => {
            if(v === ele){
                index = k;
                return true;
            }
        })
        return index;
    }
    findBy(attr:string,value:any):number{
        // JS 风格，使用 find 方法进行查找，速度可能比循环更快
        let index:number = -1;
        this._dataStore.find((v,k) => {
            if(v[attr] === value){
                index = k;
                return true;
            }
        })
        return index;
    }
    empty():boolean{
        return !this._size;
    }
    checkIndex(index:number):boolean{
        if(index < 0 || index > this._size){
            return false;
        }
        return true;
    }
    error(msg:string):void{
        throw new Error(msg)
    }
    toString():T[]{
        const tmp:T[] = []
        for(let i = 0; i < this._size; i++){
            tmp[i] = this.get(i)
        }
        return tmp;
    }
}
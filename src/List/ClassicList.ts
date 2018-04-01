import { IList } from "../../lib/IList";

export class ClassicList<T> implements IList<T>{
    private _size:number = 0;
    private _maxSize:number;
    private _dataStore:T[];
    constructor(maxSize:number = 1000){
        // 初始化 _dataStore
        /**
         * C语言风格的数组应该是定长的
         * 同时，顺序表数据结构的长度本身应该是受限的
         */
        this._dataStore = new Array(maxSize);
    }
    size():number{
        return this._size;
    }
    append(ele:T):void{
        if(ele === null){
            const msg:string = `Invalid Elements:cannot append null into list`;
            this.error(msg);
        }
        this._dataStore[this._size] = ele;
        this._size++;
    }
    remove(index:number):T{
        const indexUsable:boolean = this.checkIndex(index);
        if(!indexUsable){
            const msg = `Index out of bounds:cannot remove element at index ${index}`;
            this.error(msg);
        }
        const ele:T = this.get(index);
        for(let i = index; i < this._size;i ++){
            this._dataStore[i] = this._dataStore[i + 1];
        }
        this._size --;
        return ele;
    }
    insert(index:number,ele:T):void{
        const indexUsable:boolean = this.checkIndex(index);
        if(!indexUsable){
            const msg:string = `Index out of bounds:cannot insert element at index ${index}`;
            this.error(msg);
        }
        for(let i = this._size - 1;i >= index;i--){
            const ele:T = this.get(i)
            this._dataStore[i+1] = ele;
        }
        this._dataStore[index] = ele;
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
        for(let i = 0; i < this._size;i ++){
            let ele:T = this.get(i);
            // 对应C语言中的 free
            // C语言没有自动垃圾回收，需要手动释放内存
            ele = null;
        }
        this._size = 0;
    }
    find(ele:T):number{
        for(let i = 0; i < this._size; i ++){
            const findEle:T = this.get(i);
            if(ele === findEle){
                return i;
            }
        }
        return -1;
    }
    findBy(attr:string,value:any):number{
        for(let i = 0; i < this._size; i ++){
            const findEle:T = this.get(i);
            if(value === findEle[attr]){
                return i;
            }
        }
        return -1;
    }
    expand():void{
        this._dataStore.length = this._dataStore.length + this._maxSize;
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
export interface IList<T>{
    // 添加元素
    append(ele:T):void;
    // 移除元素
    remove(index:number):T;
    // 插入元素
    insert(index:number,ele:T):void;
    // 是否为空
    empty():boolean;
    // 尺寸
    size():number;
    // 清空
    clear():void;
    // 获取指定位置的元素
    get(index:number):T;
    // 查找元素
    find(ele:T):number;
    toString():T[];
}
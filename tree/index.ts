interface ITree<T>{
    insert(data:T);
    mediumOrder(node:ITreeNode<T>);
    // getSmallest()
    // getMax()
    // find()
    // remove()
}

interface ITreeNode<T>{
    left:ITreeNode<T>;
    right:ITreeNode<T>;
    data:T;
    display():T;
}

class TreeNode<T> implements ITreeNode<T>{
    left:ITreeNode<T> = null;
    right:ITreeNode<T> = null;
    data:T = null;
    constructor(data:T){
        this.data = data;
    }
    display():T{
        return this.data;
    }
}

class Tree<T> implements ITree<T>{
    root:ITreeNode<T> = null;
    insert(data:T){
        const node:ITreeNode<T> = new TreeNode<T>(data);
        if(!this.root){
            this.root = node;
            return;
        }else{
            let current:ITreeNode<T> = this.root;
            let parent:ITreeNode<T>;
            while(true){
                parent = current;
                if(data < current.data){
                    current = current.left;
                    // 只有在没有左节点时才插入
                    if(!current){
                        parent.left = node;
                        break;
                    }
                }else{
                    current = current.right;
                    // 只有在没有右节点时才插入
                    if(!current){
                        parent.right = node;
                        break;
                    }
                }
            }
        }
    }
    mediumOrder(node:ITreeNode<T> = this.root){
        if(node){
            this.mediumOrder(node.left)
            console.log(node.data)
            this.mediumOrder(node.right)
        }
    }
    getMinValue(node:ITreeNode<T> = this.root){
        let current:ITreeNode<T> = node;
        while(current.left){
            current = current.left;
        }
        return current.data;
    }

    getMaxValue(node:ITreeNode<T> = this.root){
        let current:ITreeNode<T> = node;
        while(current.right){
            current = current.right;
        }
        return current.data;
    }
    find(data:T):ITreeNode<T>{
        let current:ITreeNode<T> = this.root;
        while(current){
            if(data === current.data){
                return current;
            }else if(data < current.data){
                current = current.left;
            }else if(data > current.data){
                current = current.right;
            }
        }
        return null;
    }
    remove(data:T):ITreeNode<T>{
        return
    }
}

const tree = new Tree<number>();
tree.insert(22);
tree.insert(33);
tree.insert(2);
tree.insert(3);
tree.insert(44);
tree.insert(4);
tree.insert(55);
tree.mediumOrder();
console.warn(tree.getMaxValue())
console.warn(tree.getMinValue())
@@ -2,96 +2,92 @@ import crypto from 'crypto'


const generateHash = (content) => crypto.createHash("sha256").update(content).digest("hex")	const generateHash = (content) => crypto.createHash("sha256").update(content).digest("hex")


class MerkleTree{	class Node{
    constructor(name,content,level,parent) {	    constructor(content) {
        this.name = name	
        this.content = content	        this.content = content
        this.level = level	
        this.parent = parent	

        this.children = []	

        this.hash = generateHash(JSON.stringify({	        this.hash = generateHash(JSON.stringify({
            name: this.name,	
            level: this.level,	
            content: this.content	            content: this.content
        }))	        }))
    }	    }


    setContent(content){	    setHash(content){
        this.content = content	
        this.hash = generateHash(JSON.stringify({	        this.hash = generateHash(JSON.stringify({
            name: this.name,	            content: content
            level: this.level,	
            content: this.content	
        }))	        }))

        this.updateChildrenHashes()	
    }	    }


    updateChildrenHashes(){	}
        if(this.children.length !== 0) {	
            this.hash = generateHash(this.getChildHashes())	
        }	
        // if its parent exists, we would update	
        this.parent && this.parent.updateChildrenHashes()	
    }	


    getChildHashes(){	class MerkleTree{
        return this.children.reduce((previous,current) => previous += current.hash,"")	
    }	


    initAddChild(node) {	    constructor(nodes) {
        this.children.push(node)	        this.rootHash = "rootHash not init"
        this.hash = generateHash(this.getChildHashes())	        this.nodes = nodes
        this.hashArray = []
    }	    }


    deleteChild(){	    // calculate the root hash
        // 只有左子树，删除左子树	    merkleTree(){
        if(this.children.length == 1){	        var arrLen = this.nodes.length
            this.children = []	        var height = Math.floor(Math.log2(arrLen)) // begin with 0
            this.hash = generateHash(JSON.stringify({	        var heightNumber = height
                name: this.name,	        var totalNumber = Math.pow(2,height)
                level: this.level,	        var allNodes = []
                content: this.content	        for (let i = 0; i < arrLen; i++) {
            }))	            const node = new Node(this.nodes[i])
            this.updateChildrenHashes()	            allNodes.push(node)
        }else {// 有左右子树，删除右子树	        }
            this.children.pop()	        for (let i = 0; i < totalNumber - arrLen; i++) {
            this.hash = generateHash(this.getChildHashes())	            const node = new Node("null")
            this.updateChildrenHashes()	            allNodes.push(node)
        }
        let arr_ = []
        for (let i = 0; i < arrLen; i++) {
            arr_.push(allNodes[i])
        }
        this.hashArray.push(arr_)
        for (let i = 0; i < height; i++) {
            var nodeNumber = allNodes.length
            var arr = []
            var hashArr = []
            for (let j = 0; j+1 < nodeNumber; j=j+2) {
                if(heightNumber==1){
                    var node = new Node(`root`)
                }else {
                    var node = new Node(`height:${heightNumber-1}`)
                }
                var temp = allNodes[j].hash+allNodes[j+1].hash
                node.setHash(temp)
                arr.push(node)
                hashArr.push(node)
            }
            heightNumber--
            this.hashArray.push(hashArr)
            allNodes = arr
            nodeNumber = nodeNumber / 2
        }	        }
        this.rootHash = allNodes[0].hash
        this.hashArray.reverse()
        return allNodes[0].hash
    }	    }


    addChild(node){	    // verify the hash
        this.children.push(node)	    verify(arr){
        this.hash = generateHash(this.getChildHashes())	        arr = arr.reverse()
        this.updateChildrenHashes()	        var num = arr.length - 1
        var hash = ""
        for (let i = num; i > 0; i--) {
            let temp = arr[i] + arr[i-1]
            hash = generateHash(JSON.stringify({
                content: temp
            }))
            arr.pop()
            arr.pop()
            arr.push(hash)
        }
        return arr[0] == this.rootHash
    }	    }
}	

function test(){	
    const root = new MerkleTree("rootNode","root",0,)	
    const child1 = new MerkleTree("child1","child 1 content",root.level+1,root)	
    const child2 = new MerkleTree("child2","child 2 content",root.level+1,root)	
    const child3 = new MerkleTree("child3","child 3 content",child1.level+1,child1)	
    const child4 = new MerkleTree("child4","child 4 content",child1.level+1,child1)	


    console.log(`刚创建root节点时头节点的hash值为: ${root.hash}`)	
    child1.initAddChild(child3)	
    console.log(`child1添加child3之后头节点的hash值为: ${root.hash}`)	
    root.initAddChild(child1)	
    console.log(`root添加child1之后头节点的hash值为: ${root.hash}`)	
    root.initAddChild(child2)	
    console.log(`root添加child2之后头节点的hash值为: ${root.hash}`)	
    child3.setContent("child 3 content")	
    console.log(`更改child3的信息，但内容不变,之后头节点的hash值为: ${root.hash}`)	
    child1.deleteChild()	
    console.log(`删除child3之后头节点的hash值为: ${root.hash}`)	
    child1.addChild(child4)	
    console.log(`child1添加回child1之后头节点的hash值为: ${root.hash}`)	
    child1.deleteChild()	
    console.log(`删除child4之后头节点的hash值为: ${root.hash}`)	
}	}


test()

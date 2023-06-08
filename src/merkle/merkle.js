import crypto from 'crypto'

const generateHash = (content) => crypto.createHash("sha256").update(content).digest("hex")

class Node{
    constructor(content) {
        this.content = content
        this.hash = generateHash(JSON.stringify({
            content: this.content
        }))
    }

    setHash(content){
        this.hash = generateHash(JSON.stringify({
            content: content
        }))
    }

}

class MerkleTree{

    constructor(nodes) {
        this.rootHash = "rootHash not init"
        this.nodes = nodes
        this.hashArray = []
    }

    // calculate the root hash
    merkleTree(){
        var arrLen = this.nodes.length
        var height = Math.floor(Math.log2(arrLen)) // begin with 0
        var heightNumber = height
        var totalNumber = Math.pow(2,height)
        var allNodes = []
        for (let i = 0; i < arrLen; i++) {
            const node = new Node(this.nodes[i])
            allNodes.push(node)
        }
        for (let i = 0; i < totalNumber - arrLen; i++) {
            const node = new Node("null")
            allNodes.push(node)
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
        }
        this.rootHash = allNodes[0].hash
        this.hashArray.reverse()
        return allNodes[0].hash
    }

    // verify the hash
    verify(arr){
        arr = arr.reverse()
        var num = arr.length - 1
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
    }

}

export default MerkleTree